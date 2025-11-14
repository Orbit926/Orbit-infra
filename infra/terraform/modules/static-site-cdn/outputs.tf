output "bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Nombre del bucket S3 para el sitio"
}

output "distribution_id" {
  value       = aws_cloudfront_distribution.this.id
  description = "ID de la distribución CloudFront"
}

output "distribution_domain" {
  value       = aws_cloudfront_distribution.this.domain_name
  description = "Dominio de CloudFront (si no usas dominio propio)"
}

output "site_url" {
  description = "URL público del sitio (dominio propio si existe, si no CloudFront)"
  value = var.domain_name != "" ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.this.domain_name}"
}
