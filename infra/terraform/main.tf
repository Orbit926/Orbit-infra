# module "email_dispatcher_iam" {
#   source = "./modules/email-dispatcher-iam"

#   project          = var.project
#   env              = var.env
#   from_addresses   = var.from_addresses
#   role_name_prefix = var.role_name_prefix
#   tags             = var.tags
# }

# module "email_dispatcher_lambda" {
#   source = "./modules/email-dispatcher-lambda"

#   project  = var.project
#   env      = var.env
#   role_arn = module.email_dispatcher_iam.email_dispatcher_role_arn

#   # Config función
#   function_name   = "" # opcional
#   memory_mb       = 256
#   timeout_seconds = 10

#   # Env vars
#   ses_region     = var.aws_region
#   from_email     = var.from_email
#   vendor_email   = var.vendor_email
#   allowed_origin = var.allowed_origin

#   tags = var.tags
# }

# module "ses" {
#   source = "./modules/ses"

#   project = var.project
#   from_email = var.from_email
#   vendor_email = var.vendor_email
#   domain = var.domain
#   zone_id = var.zone_id

#   mail_from_subdomain    = "mail"         # Puedes dejarlo así por convención
#   configuration_set_name = "prod-default" # Nombre que usa tu Lambda (si lo añadiste)
#   dmarc_policy           = "none"     
# }

# module "iam_lambda_invoker" {
#   source = "./modules/iam_lambda_invoker"

#   project = var.project
#   env = var.env
#   role_name_prefix = var.role_name_prefix
#   tags = var.tags
# }

# module "contact_form_lambda" {
#   source = "./modules/contact-form-lambda"

#   project  = var.project
#   env      = var.env
#   role_arn = module.iam_lambda_invoker.lambda_invoker_role_arn
#   email_dispatcher_function_name = module.email_dispatcher_lambda.function_name

#   # Config función
#   function_name   = "" # opcional
#   memory_mb       = 256
#   timeout_seconds = 10

#   # Env vars
#   recaptcha_secret_key = var.recaptcha_secret_key

#   tags = var.tags
# }

# module "api_gateway" {
#   source = "./modules/api-gateway"

#   project = var.project
#   env = var.env

#   lambda_function_name = module.contact_form_lambda.function_name
#   lambda_invoke_arn = module.contact_form_lambda.invoke_arn

#   cors_allow_origins = var.cors_allow_origins
# }

module "site_cdn" {
  source = "./modules/static-site-cdn"

  project = var.project
  env     = var.env

  # # 👇 CON dominio propio
  # domain_name       = var.domain
  # alternate_domains = var.alternate_domains
  # route53_zone_id   = var.zone_id
  # acm_certificate_arn = ""

  # Si tu frontend es SPA (React, Vite, Next CSR)
  spa_mode = true

  # Si quieres permitir destruir el bucket aunque tenga archivos
  force_destroy = true

  tags = var.tags
}
