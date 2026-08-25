# Mapa de autoridad temática y búsquedas

## Criterio de priorización

Las consultas se agrupan por intención equivalente para evitar páginas doorway. La dificultad es una hipótesis cualitativa sin datos de herramientas; debe recalibrarse con Search Console, Google Keyword Planner y resultados orgánicos de Uruguay/LATAM.

| Pilar | Clúster y consultas semánticas | Intención | Página actual / propuesta | Embudo | Prioridad |
|---|---|---|---|---|---|
| Liderazgo de ingeniería | Engineering Manager Uruguay, liderazgo técnico, estrategia de ingeniería, technical leadership | Comercial / profesional | `/`, `/#acerca`, casos y futuro artículo pilar | Consideración | Alta |
| Construcción de producto | product builder, desarrollo de producto digital, MVP SaaS, spec-driven development | Comercial / investigativa | `/`, WebSpec AI, artículos de especificación y emprendimiento | Consideración | Alta |
| Arquitectura de software | arquitectura multi-tenant, Row Level Security PostgreSQL, arquitectura de pagos, sistemas auditables | Informativa profesional | Patio, MiCuota y artículos relacionados | Consideración | Alta |
| IA aplicada | IA para desarrollo, agentes de código, gobernanza de IA, especificaciones para agentes | Informativa / comercial | WebSpec AI, Compliance UY, blog de Claude, Kiro y Spec Kit | Descubrimiento | Alta |
| Cloud y operación | AWS Cloud Practitioner, responsabilidad compartida, FinOps, confiabilidad de recordatorios | Informativa profesional | Artículo de AWS y Milo Care | Descubrimiento | Media |
| Pagos y fintech | webhooks de pagos, idempotencia, conciliación, plataformas de cobro recurrente | Informativa / comercial | MiCuota y artículo de webhooks | Consideración | Alta |
| Web corporativa | desarrollo web corporativo, experiencias web de alto impacto, WebGL corporativo | Comercial / investigativa | Artículo de Pambú y capacidad en home | Consideración | Media |
| Modelos open-weight | Llama 4 Scout, Qwen3, LLM open-weight, evaluación de LLM | Informativa profesional | Dos artículos de análisis de modelos | Descubrimiento | Media |

## Arquitectura de enlaces internos

```text
Home
├── Casos de estudio
│   ├── MiCuota → pagos, webhooks, conciliación
│   ├── Patio → multi-tenancy y RLS
│   ├── Milo Care → onboarding y confiabilidad
│   ├── WebSpec AI → IA y especificaciones
│   └── Compliance UY → IA y gobernanza
└── Blog
    ├── IA y agentes → Claude, Kiro, Spec Kit, WebSpec AI
    ├── Arquitectura → pagos, RLS, cloud y LLMs
    ├── Producto → MVP, onboarding y emprendimiento
    └── Cada artículo → tres artículos relacionados
```

## Páginas pilar recomendadas, no implementadas

Estas páginas requieren validación de oferta y posicionamiento comercial antes de publicarse:

1. **Servicios de arquitectura y construcción de producto para LATAM**: intención comercial; enlaza a home, casos y contacto.
2. **Método de trabajo: de discovery a producto operable**: intención investigativa/comercial; explica la metodología ya visible en el sitio con ejemplos verificables.
3. **Guía pilar de arquitectura SaaS multi-tenant**: intención informativa profesional; consolida Patio, RLS, RBAC, auditoría y operación.
4. **Guía pilar de pagos recurrentes para productos SaaS**: intención informativa/comercial; consolida MiCuota, webhooks, idempotencia y conciliación.

No deben publicarse hasta definir con precisión si se ofrecerán como servicios, contenidos de autoridad o ambos.
