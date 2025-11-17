# Registro TXT para verificación de Google Search Console
resource "aws_route53_record" "google_search_console_verification" {
  zone_id = var.zone_id

  # TXT en el root domain (orbit.com.mx)
  name = var.domain_name

  type = "TXT"
  ttl  = 300

  records = [
    "google-site-verification=-Rw0KkLzc0FC3SNkZ9Vpf_8oVlDLRkhv_EZiPPeA9xA"
  ]
}