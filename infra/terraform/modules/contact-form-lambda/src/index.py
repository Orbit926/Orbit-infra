import json
import os
import urllib.parse
import urllib.request
import socket
import boto3
from botocore.exceptions import ClientError

# Opcional: reducir tiempos de espera en sockets (evita Lambdas colgadas)
socket.setdefaulttimeout(5)

RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
RECAPTCHA_SECRET = os.getenv("RECAPTCHA_SECRET", "")
# Nombre o ARN de la Lambda que envía emails (debe existir)
EMAIL_DISPATCHER_FUNCTION_NAME = os.getenv("EMAIL_DISPATCHER_FUNCTION_NAME", "")

# Cliente Lambda para invocar la función de envío de emails
lambda_client = boto3.client("lambda")

def _response(status: int, body: dict):
    """HTTP API v2 response helper."""
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": json.dumps(body, ensure_ascii=False)
    }

def _parse_event_body(event):
    """Extrae el JSON del body (HTTP API v2). Maneja base64 si aplica."""
    if "body" not in event or event["body"] in (None, ""):
        return None

    body_raw = event["body"]
    if event.get("isBase64Encoded"):
        import base64
        body_raw = base64.b64decode(body_raw).decode("utf-8", errors="replace")

    try:
        return json.loads(body_raw)
    except json.JSONDecodeError:
        return None

def _get_remote_ip(event) -> str | None:
    # En HTTP API v2, el IP del cliente suele venir en requestContext.http.sourceIp
    return (
        event.get("requestContext", {})
             .get("http", {})
             .get("sourceIp")
    )

def verify_recaptcha(token: str, remoteip: str | None = None) -> tuple[bool, dict]:
    """Valida el token de reCAPTCHA con Google."""
    if not RECAPTCHA_SECRET:
        return False, {"error": "RECAPTCHA_SECRET not configured in environment"}

    data = {
        "secret": RECAPTCHA_SECRET,
        "response": token
    }
    if remoteip:
        data["remoteip"] = remoteip

    encoded = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(
        RECAPTCHA_VERIFY_URL,
        data=encoded,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )

    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
            ok = bool(payload.get("success", False))
            return ok, payload
    except Exception as e:
        return False, {"error": f"recaptcha_verification_failed: {e.__class__.__name__}: {e}"}

def _invoke_email_dispatcher(payload: dict, invocation_type: str = "RequestResponse", timeout_seconds: int = 10) -> dict:
    """
    Invoca la Lambda email-dispatcher y devuelve un dict con la respuesta parseada.
    invocation_type: "RequestResponse" (sync) o "Event" (async)
    """
    if not EMAIL_DISPATCHER_FUNCTION_NAME:
        return {"error": "EMAIL_DISPATCHER_FUNCTION_NAME not configured"}

    try:
        resp = lambda_client.invoke(
            FunctionName=EMAIL_DISPATCHER_FUNCTION_NAME,
            InvocationType=invocation_type,
            Payload=json.dumps(payload).encode("utf-8")
        )

        # Si es invocación asíncrona, AWS devuelve 202 y payload vacío
        if invocation_type == "Event":
            return {"ok": True, "invocation": "async", "status_code": resp.get("StatusCode")}

        # RequestResponse -> leer payload
        stream = resp.get("Payload")
        if stream is None:
            return {"error": "No payload returned from dispatcher", "raw_resp": resp}

        raw = stream.read().decode("utf-8")
        try:
            parsed = json.loads(raw) if raw else {}
        except Exception:
            parsed = {"raw": raw}

        # Si la función que llamaste devuelve un cuerpo HTTP (por ejemplo _api_response),
        # puede venir como string con keys statusCode/body -> intentamos extraer body si existe
        if isinstance(parsed, dict) and "statusCode" in parsed and "body" in parsed:
            try:
                body = json.loads(parsed.get("body") or "{}")
                return body
            except Exception:
                return {"raw_dispatcher_response": parsed}

        return parsed

    except ClientError as e:
        return {"error": "lambda_invoke_client_error", "detail": str(e)}
    except Exception as e:
        return {"error": "lambda_invoke_error", "detail": f"{e.__class__.__name__}: {e}"}

def handler(event, context):
    # 1) Parseo del body
    body = _parse_event_body(event)
    if body is None:
        return _response(400, {"ok": False, "error": "Invalid or empty JSON body"})

    # 2) Honeypot: _hp debe venir vacío
    hp = body.get("_hp", "")
    if hp != "":
        return _response(400, {"ok": False, "error": "honeypot_triggered"})

    # 3) Token de reCAPTCHA
    token = body.get("recaptchaToken")
    if not token or not isinstance(token, str):
        return _response(400, {"ok": False, "error": "missing recaptchaToken"})

    remote_ip = _get_remote_ip(event)
    valid, details = verify_recaptcha(token, remoteip=remote_ip)
    if not valid:
        return _response(400, {"ok": False, "error": "invalid_recaptcha", "details": details})

    # ---- Validación avanzada reCAPTCHA v3 ----
    expected_action = os.getenv("RECAPTCHA_EXPECTED_ACTION", "contact_form_submit")
    expected_host = os.getenv("RECAPTCHA_EXPECTED_HOSTNAME", "www.devaltra.com")
    min_score = float(os.getenv("RECAPTCHA_MIN_SCORE", "0.5"))  # valor recomendado 0.5

    # 1️⃣ Acción
    action = details.get("action")
    if expected_action and action != expected_action:
        return _response(400, {
            "ok": False,
            "error": "recaptcha_action_mismatch",
            "details": {"expected": expected_action, "got": action}
        })

    # 2️⃣ Score mínimo
    score = details.get("score")
    if score is None or score < min_score:
        return _response(400, {
            "ok": False,
            "error": "low_recaptcha_score",
            "details": {"score": score, "min_score": min_score}
        })

    # 3️⃣ Dominio esperado
    hostname = details.get("hostname")
    if expected_host and hostname != expected_host:
        return _response(400, {
            "ok": False,
            "error": "recaptcha_hostname_mismatch",
            "details": {"expected": expected_host, "got": hostname}
        })

    # 4️⃣ Token reciente (menos de 2 minutos)
    from datetime import datetime, timezone
    ts = details.get("challenge_ts")
    try:
        if ts:
            issued = datetime.fromisoformat(ts.replace("Z", "+00:00"))
            age = (datetime.now(timezone.utc) - issued).total_seconds()
            if age > 120:
                return _response(400, {
                    "ok": False,
                    "error": "recaptcha_token_expired",
                    "details": {"age_seconds": age}
                })
                
    except Exception as e:
        # Captura otros errores por seguridad — devuelve 400 y logea
        print("Unexpected error validating challenge_ts:", repr(e), "details:", details)
        return _response(400, {
            "ok": False,
            "error": "recaptcha_timestamp_validation_error",
            "details": {"exception": f"{e.__class__.__name__}: {e}"}
        })

    # 4) Preparar payloads para email-dispatcher
    name = body.get("name", "")
    email = body.get("email", "")
    phone = body.get("phone", "")
    subject = body.get("subject", "")
    message = body.get("message", "")

    # Payload para vendor (usa template VendorNotifyTemplate; dispatcher usará VENDOR_EMAIL desde env)
    vendor_payload = {
        "template": "VendorNotifyTemplate",
        "name": name,
        "email": email,
        "phone": phone,
        "subject": subject,
        "message": message
    }

    # Payload para cliente (ack)
    customer_payload = {
        "template": "ContactAckTemplate",
        "email": email
    }

    # 5) Invocar dispatcher - primero al vendedor (sync)
    print("Invoking email dispatcher (vendor) with:", vendor_payload)
    vendor_result = _invoke_email_dispatcher(vendor_payload, invocation_type="RequestResponse")
    print("Vendor result:", vendor_result)

    # Si el dispatcher devolvió un error grave, lo retornamos (puedes decidir seguir y enviar ack igual)
    if vendor_result.get("error"):
        # Registramos y devolvemos 500 (o 400 si prefieres clasificar)
        return _response(500, {"ok": False, "stage": "vendor_send_failed", "detail": vendor_result})

    # 6) Invocar dispatcher - ack al cliente
    print("Invoking email dispatcher (customer ack) with:", customer_payload)
    customer_result = _invoke_email_dispatcher(customer_payload, invocation_type="RequestResponse")
    print("Customer result:", customer_result)

    if customer_result.get("error"):
        # Intentamos devolver lo sucedido, pero ya notificamos al vendedor
        return _response(500, {"ok": False, "stage": "customer_send_failed", "detail": customer_result})

    # 7) Todo OK
    return _response(200, {
        "ok": True,
        "message": "validated_and_emails_sent",
        "vendor_result": vendor_result,
        "customer_result": customer_result
    })
