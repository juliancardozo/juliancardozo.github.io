# Importación de conversiones en Google Tag Manager

Archivo a importar: `gtm-conversion-events.json`.

## Antes de importar

1. Crear una propiedad web en Google Analytics 4 para `https://juliancardozo.github.io/`.
2. Confirmar el Measurement ID de la propiedad: `G-2X95HY29R8`.
3. En Google Tag Manager, abrir el contenedor `GTM-KJ49CP7L`.

## Importación

1. Abrir **Admin > Import Container**.
2. Elegir `gtm-conversion-events.json`.
3. Elegir un workspace nuevo o existente.
4. Elegir **Merge** y **Rename conflicting tags, triggers, and variables**.
5. Completar la importación.
6. Confirmar que la variable **GA4 Measurement ID** contiene `G-2X95HY29R8`.
7. Confirmar que las variables integradas **Click URL** y **Click Classes** estén habilitadas.

## Eventos incluidos

| Evento GA4 | Acción medida |
|---|---|
| `contact_email_click` | Click en el enlace de email |
| `contact_linkedin_click` | Click al perfil de LinkedIn |
| `github_profile_click` | Click al perfil de GitHub |
| `project_repository_click` | Click a un repositorio de proyecto |
| `project_demo_click` | Click a una demo de proyecto |
| `conversation_cta_click` | Click en el CTA contextual para iniciar conversación |
| `related_article_click` | Click en un artículo relacionado desde un post |
| `article_to_project_click` | Click desde un artículo hacia su proyecto relacionado |
| `project_to_article_click` | Click desde un proyecto hacia una lectura relacionada |
| `pillar_hub_click` | Click hacia una página pilar temática |
| `newsletter_interest_click` | Click en CTA de interés por la newsletter |
| `newsletter_issue_click` | Click hacia una edición pública de la newsletter |

Además, el formulario de newsletter empuja estos eventos a `dataLayer` desde el frontend:

- `newsletter_subscribe_submit`
- `newsletter_subscribe_success`
- `newsletter_subscribe_error`

## Validación y publicación

1. Usar **Preview** en GTM sobre el sitio publicado.
2. Confirmar que cada click dispara únicamente el evento esperado.
3. Comprobar los eventos en **GA4 DebugView**.
4. Marcar como conversiones en GA4 solamente los eventos que representen una oportunidad comercial real; normalmente `contact_email_click` y, según la estrategia, `contact_linkedin_click`.
5. Revisar consentimiento, política de privacidad y configuración regional antes de publicar etiquetas de analítica.

No agregues el snippet `gtag.js` directamente al sitio: el contenedor GTM ya se carga globalmente y esta plantilla configura GA4 desde GTM. Usar ambos mecanismos puede duplicar el evento automático `page_view`.
