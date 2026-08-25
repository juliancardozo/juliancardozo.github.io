# Resend + Cloudflare Worker para la newsletter

## Objetivo

Proteger la API key de Resend y permitir altas de newsletter desde la web estática sin exponer credenciales en GitHub Pages.

## Archivos preparados

- `workers/newsletter-api/index.mjs`
- `workers/newsletter-api/wrangler.toml`

## URL pública

- `https://email-worker.julian-cardozo-viggiano.workers.dev/subscribe`

## Secretos y variables

No guardes la API key en el repositorio.

Configurar en Cloudflare Worker:

- `RESEND_API_KEY` -> API key privada de Resend
- `ALLOWED_ORIGINS` -> `https://juliancardozo.github.io,http://localhost:4321,http://127.0.0.1:4321`

## Qué hace el Worker

1. Valida email, consentimiento, interés principal y honeypot.
2. Busca el contacto por email en Resend.
3. Si ya existe, actualiza propiedades y vuelve a dejarlo como suscripto.
4. Si no existe, crea el contacto en Resend.
5. Devuelve respuesta JSON para el formulario de la web.

## Propiedades guardadas en Resend

- `interest`
- `source`
- `page_path`
- `form_kind`
- `consent_source`
- `consented_at`

## Despliegue sugerido

1. Crear el Worker `newsletter-api` en Cloudflare.
2. Copiar `workers/newsletter-api/index.mjs`.
3. Copiar `workers/newsletter-api/wrangler.toml`.
4. Configurar `RESEND_API_KEY` como secret.
5. Publicar el Worker.
6. Probar `GET /health`.
7. Probar una suscripción real desde `/newsletter/`.

## Checklist antes del primer envío

- Verificar dominio o remitente en Resend para futuros envíos
- Definir política de privacidad publicada
- Confirmar texto de consentimiento
- Definir si habrá doble opt-in
- Crear segmentos en Resend usando `interest`, `source` y `page_path`
- Verificar eventos en GTM/GA4

## Limitación honesta

La web ya queda lista para captar altas. El envío de la primera newsletter desde Resend necesita además definir el remitente verificado y la operación de envío/baja dentro de Resend.
