# Clústeres temáticos, intención y evidencia

## Matriz semántica priorizada

| Pilar | Consulta / necesidad | Audiencia | Intención | Evidencia | Página responsable | CTA | Riesgo de canibalización |
|---|---|---|---|---|---|---|---|
| Liderazgo | Engineering Manager, liderazgo técnico, equipos de ingeniería | CTOs, EMs, recruiters | Profesional | Trayectoria visible | Nueva guía pilar | Conversar sobre equipos | Bajo: no hay guía actual |
| Plataforma | Arquitectura multi-tenant, RLS PostgreSQL | CTOs, tech leads, SaaS | Informativa profesional | Patio | Caso Patio + artículo RLS | Comparar decisiones | Bajo |
| Plataforma | AWS, responsabilidad compartida, FinOps | Tech leads, founders | Informativa | Estudio Cloud Practitioner | Artículo AWS | Intercambiar experiencias | Medio: evitar duplicar cloud genérico |
| Pagos | Webhooks, idempotencia, conciliación | Fintech, SaaS, profesionales | Profesional/comercial | MiCuota | Caso MiCuota + artículo | Conversar sobre pagos | Bajo |
| IA | Spec-driven development, PRD, RFC, agentes | Founders, PMs, equipos | Informativa/comercial | WebSpec AI | Caso WebSpec + artículos | Revisar estrategia técnica | Bajo |
| IA | Compliance de IA, evidencia y trazabilidad | Startups, legal-tech, seguridad | Informativa profesional | Compliance UY | Caso + artículo | Debatir controles | Bajo |
| Producto | Onboarding en health/pet tech | Founders, healthtech, pet tech | Informativa | Milo Care | Caso + dos artículos | Compartir problema | Bajo |
| Producto | MVP proporcional, operación mínima | Founders, marketplaces | Informativa | Casa Médanos | Caso + artículo | Conversar sobre MVP | Bajo |
| Producto | Vertical SaaS para automotoras | Founders, movilidad, SaaS | Comercial/investigativa | Patio | Caso Patio | Explorar colaboración | Medio: mantener Patio como marca vigente |
| Web | Web corporativa de alto impacto | Estudios, founders, marketing | Comercial/investigativa | Pambú 2026 | Artículo Pambú | Revisar experiencia web | Bajo |

## Páginas pilar propuestas

No están implementadas. Cada una debe existir solo si se confirma que corresponde a una oferta o línea editorial sostenible.

| Pilar | Página propuesta | Contenido satélite | Evidencia | Conversión |
|---|---|---|---|---|
| Liderazgo | `/liderazgo-tecnico/` | autonomía, feedback, métricas, hiring | trayectoria | conversación con líderes |
| Plataforma | `/arquitectura-plataforma/` | RLS, AWS, pagos, observabilidad | Patio, MiCuota | revisión de arquitectura |
| Pagos | `/pagos-suscripciones-latam/` | webhooks, idempotencia, conciliación | MiCuota | conversación fintech |
| IA | `/ia-aplicada-producto/` | WebSpec, compliance, agentes, MCP | WebSpec AI, Compliance UY | discovery técnico |
| Producto | `/mvp-productos-digitales/` | onboarding, MVP, discovery, SaaS vertical | Milo, Casa Médanos, Patio | conversación de producto |

## Preguntas reales a cubrir

- ¿Cómo decidir si una arquitectura multi-tenant necesita RLS?
- ¿Qué hace confiable a un webhook de pagos?
- ¿Cómo usar IA para especificar sin automatizar ambigüedad?
- ¿Qué debería medir un Engineering Manager para mejorar delivery sin microgestión?
- ¿Cómo decidir el alcance técnico de un MVP?
- ¿Qué controles necesita un agente que analiza código o ejecuta acciones?

## Reglas editoriales

- Una página es responsable de una intención principal.
- Los artículos de actualidad no compiten con los casos: explican una novedad y enlazan a experiencia propia solo si existe relación real.
- “Argentina”, “Uruguay” y “LATAM” se usan para explicar contexto operativo, regulación, idioma o pagos; no para crear duplicados geográficos.
- Cada afirmación técnica externa debe conservar fuente primaria visible.
