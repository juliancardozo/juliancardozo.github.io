# Mapa de conversión por audiencia y contenido

## Ruta de conversión

```text
Búsqueda / distribución
        ↓
Artículo o caso relevante
        ↓
Proyecto aplicado o lecturas relacionadas
        ↓
CTA contextual por email / LinkedIn
        ↓
Conversación profesional
        ↓
Colaboración, oportunidad laboral, proyecto, charla o aprendizaje compartido
```

## CTA por tipo de contenido

| Contexto | Audiencia | CTA implementado / recomendado | Conversión esperada |
|---|---|---|---|
| Pagos, fintech, suscripciones | Founders fintech, SaaS, pagos | Comparar decisiones de producto y arquitectura | Email de exploración |
| IA, agentes, specs | PMs, founders, líderes técnicos | Compartir el problema que intentan resolver | Email o LinkedIn |
| Arquitectura / cloud | CTOs, tech leads | Contrastar trade-offs técnicos | Conversación técnica |
| MVP y producto | Founders, venture builders | Conversar sobre hipótesis y camino técnico | Discovery informal |
| Liderazgo | EMs, CTOs, recruiters | Intercambiar desafíos de equipos | Relación profesional |
| Caso de estudio | Prospectos, partners, inversores | Explorar proyecto, demo o repositorio | Evaluación de evidencia |

## Datos de origen disponibles

La CTA por email implementada incluye:

- Asunto con título del artículo.
- Cuerpo con el mensaje contextual.
- URL del artículo de origen.

Esto permite identificar el origen sin implementar un formulario. Si se incorpora formulario en el futuro, debe mantener como campos opcionales: artículo de origen, clúster, tipo de conversación y consentimiento.

## Medición propuesta

| Evento | Estado | Propósito |
|---|---|---|
| `page_view` | Configuración GTM/GA4 | Tráfico y páginas de entrada |
| `contact_email_click` | Plantilla GTM | Lead de alta intención |
| `contact_linkedin_click` | Plantilla GTM | Relación profesional |
| `github_profile_click` | Plantilla GTM | Validación de experiencia técnica |
| `project_repository_click` | Plantilla GTM | Interés técnico por evidencia |
| `project_demo_click` | Plantilla GTM | Interés por producto |

## Mejoras futuras condicionadas

1. Añadir evento de clic en artículos relacionados y de proyecto desde artículo.
2. Añadir formulario solo si se define una bandeja, SLA de respuesta y texto de privacidad.
3. Añadir calendario solo si se habilitan bloques reales de disponibilidad.
4. Usar UTMs en distribución externa y guardar campaña, referrer y clúster en analítica.
5. Marcar `contact_email_click` como Key Event en GA4; evaluar LinkedIn como conversión secundaria.
