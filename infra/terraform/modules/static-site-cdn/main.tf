locals {
  name_prefix = "${var.project}-${var.env}-site"
}

# Para emitir certificado en us-east-1 (requisito de CloudFront)
provider "aws" {
  alias  = "use1"
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

########################
# S3 bucket (privado)  #
########################
resource "aws_s3_bucket" "site" {
  bucket        = "${local.name_prefix}-bucket"
  force_destroy = var.force_destroy
  tags          = merge({ Project = var.project, Environment = var.env, ManagedBy = "terraform", Purpose = "static-site" }, var.tags)
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule { object_ownership = "BucketOwnerEnforced" }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

#############################
# CloudFront OAC (S3 origin)#
#############################
resource "aws_cloudfront_origin_access_control" "oac" {
  name                   = "${local.name_prefix}-oac"
  description            = "OAC for ${aws_s3_bucket.site.bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior       = "always"
  signing_protocol       = "sigv4"
}

#############################
# (Opcional) Certificado    #
#############################
# Emite un cert en us-east-1 si domain_name != "" y no pasaste acm_certificate_arn
resource "aws_acm_certificate" "cert" {
  provider          = aws.use1
  count             = var.domain_name != "" && var.acm_certificate_arn == "" ? 1 : 0
  domain_name       = var.domain_name
  validation_method = "DNS"
  subject_alternative_names = var.alternate_domains

  tags = merge({ Project = var.project, Environment = var.env, ManagedBy = "terraform", Purpose = "cloudfront-cert" }, var.tags)
}

# Crea los CNAMEs de validación en la zona de Route 53
resource "aws_route53_record" "cert_validation" {
  # Solo si hay dominio y NO pasaste acm_certificate_arn
  for_each = (var.domain_name != "" && var.acm_certificate_arn == "") ? {
    for dvo in aws_acm_certificate.cert[0].domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  } : {}

  zone_id = var.route53_zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]

  allow_overwrite = true
}


resource "aws_acm_certificate_validation" "cert" {
  provider        = aws.use1
  count           = (var.domain_name != "" && var.acm_certificate_arn == "") ? 1 : 0
  certificate_arn = aws_acm_certificate.cert[0].arn
  validation_record_fqdns = values(aws_route53_record.cert_validation)[*].fqdn
}


#############################
# Políticas de caché y hdrs #
#############################
resource "aws_cloudfront_cache_policy" "static_policy" {
  name = "${local.name_prefix}-cache"
  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_gzip   = true
    enable_accept_encoding_brotli = true
    headers_config { header_behavior = "none" }
    cookies_config { cookie_behavior = "none" }
    query_strings_config { query_string_behavior = "none" }
  }
}

resource "aws_cloudfront_response_headers_policy" "security_headers" {
  name = "${local.name_prefix}-headers"

  security_headers_config {
    content_type_options { override = true }
    frame_options { 
        frame_option = "SAMEORIGIN"
        override = true 
    }
    referrer_policy { 
        referrer_policy = "no-referrer-when-downgrade"
        override = true 
    }
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    xss_protection { 
        protection = true
        mode_block = true
        override = true 
    }
  }

  cors_config {
    access_control_allow_credentials = false
    access_control_allow_methods  { items = ["GET", "HEAD", "OPTIONS"] }
    access_control_allow_origins  { items = ["*"] }
    access_control_allow_headers  { items = ["*"] }
    # access_control_expose_headers { items = [] }
    # access_control_max_age_sec = 600
    origin_override = true
  }
}



########################
# CloudFront Distribution
########################
locals {
  use_custom_domain = var.domain_name != ""

  cert_arn = (
    var.acm_certificate_arn != "" ?
      var.acm_certificate_arn :
      (
        var.domain_name != "" ?
          aws_acm_certificate_validation.cert[0].certificate_arn :
          null
      )
  )
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${local.name_prefix} distribution"
  default_root_object = var.index_document

  origin {
    origin_id                = "s3-origin"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]
    compress        = true

    cache_policy_id            = aws_cloudfront_cache_policy.static_policy.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # aliases es ATRIBUTO, no bloque. Lista vacía cuando no hay dominio.
  aliases = local.use_custom_domain ? concat([var.domain_name], var.alternate_domains) : []

  # Caso 1: con dominio propio -> usa ACM en us-east-1
  dynamic "viewer_certificate" {
    for_each = local.use_custom_domain ? [1] : []
    content {
      acm_certificate_arn      = local.cert_arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1.2_2021"
    }
  }

  # Caso 2: sin dominio propio -> usa el certificado default de CloudFront
  dynamic "viewer_certificate" {
    for_each = local.use_custom_domain ? [] : [1]
    content {
      cloudfront_default_certificate = true
    }
  }

  # SPA fallback opcional
  dynamic "custom_error_response" {
    for_each = var.spa_mode ? [403, 404] : []
    content {
      error_code         = custom_error_response.value
      response_code      = 200
      response_page_path = "/${var.index_document}"
    }
  }

  tags = merge(
    { Project = var.project, Environment = var.env, ManagedBy = "terraform", Purpose = "cdn" },
    var.tags
  )

  depends_on = [
    aws_s3_bucket_public_access_block.site,
    aws_s3_bucket_ownership_controls.site
  ]
}


########################
# S3 bucket policy (OAC)
########################
data "aws_iam_policy_document" "allow_cf_oac" {
  statement {
    sid     = "AllowCloudFrontAccessViaOAC"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.this.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.allow_cf_oac.json
}

########################
# Route53 (opcional)
########################
resource "aws_route53_record" "alias_a" {
  count   = local.use_custom_domain ? 1 : 0
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "alias_aaaa" {
  count   = local.use_custom_domain ? 1 : 0
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = false
  }
}

# Alternates (www, etc.)
resource "aws_route53_record" "alt_a" {
  count   = local.use_custom_domain ? length(var.alternate_domains) : 0
  zone_id = var.route53_zone_id
  name    = var.alternate_domains[count.index]
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = false
  }
}
resource "aws_route53_record" "alt_aaaa" {
  count   = local.use_custom_domain ? length(var.alternate_domains) : 0
  zone_id = var.route53_zone_id
  name    = var.alternate_domains[count.index]
  type    = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = false
  }
}
