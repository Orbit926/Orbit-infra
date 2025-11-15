output "domain_name" {
  description = "El nombre del dominio registrado"
  value       = aws_route53_domain_registration.domain.domain_name
}

output "domain_status" {
  description = "El estado del dominio registrado"
  value       = aws_route53_domain_registration.domain.status
}
