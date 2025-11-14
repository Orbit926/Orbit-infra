variable "project" { type = string }
variable "env"     { type = string }

# Dominio opcional (si lo pasas, se crea/usa cert + registros DNS)
variable "domain_name" {
  type        = string
  description = "Dominio principal (ej: devaltra.com o app.devaltra.com). Dejar vacío para usar el dominio de CloudFront."
  default     = ""
}

variable "alternate_domains" {
  type        = list(string)
  description = "Dominios alternos (ej: www.devaltra.com)."
  default     = []
}

# Requiere que el dominio pertenezca a esta zona (para validar ACM y crear registros)
variable "route53_zone_id" {
  type        = string
  description = "Hosted Zone ID para crear records y validar ACM. Requerido si domain_name != \"\""
  default     = ""
}

# Si ya tienes un cert en us-east-1 puedes pasarlo y se omite la emisión
variable "acm_certificate_arn" {
  type        = string
  description = "ARN de certificado (us-east-1) ya existente para CloudFront. Opcional."
  default     = ""
}

variable "spa_mode" {
  type        = bool
  description = "Si true, CloudFront sirve /index.html en 403/404 (Single Page App)."
  default     = false
}

variable "index_document" {
  type        = string
  default     = "index.html"
}
variable "error_document" {
  type        = string
  default     = "error.html"
}

variable "force_destroy" {
  type        = bool
  description = "Permite vaciar y destruir el bucket en terraform destroy."
  default     = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
