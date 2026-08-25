# Mapa de enlaces internos y grafo de evidencia

## Estado implementado

```text
Home
├── Productos y casos de estudio (7)
│   ├── MiCuota → artículo de webhooks/pagos
│   ├── Patio → artículo de RLS/multi-tenancy
│   ├── Milo Care → artículos de onboarding y recordatorios
│   ├── Compliance UY → artículo de IA verificable
│   ├── WebSpec AI → artículo de especificaciones
│   ├── Casa Médanos → artículo de infraestructura proporcional
│   └── EscalaImprov → artículo de problema observado
└── Blog
    ├── Índice filtrable por tags
    ├── Cada artículo → proyecto de origen, cuando corresponde
    ├── Cada artículo → tres lecturas relacionadas
    └── Cada artículo → CTA de conversación con origen precargado
```

## Módulos reutilizables

| Módulo | Ubicación | Función |
|---|---|---|
| Lecturas relacionadas | Artículos | Continuar una línea temática por tags comunes |
| Lecturas que nacen de este proyecto | Casos de estudio | Mostrar evidencia editorial que surge del producto |
| Continuemos la conversación | Artículos | Llevar a email con asunto, artículo y contexto de origen |
| Tags y carga progresiva | Índice de blog | Facilitar exploración sin ocultar HTML a crawlers |

## Anchors recomendados

| Desde | Hacia | Anchor natural |
|---|---|---|
| Pagos | MiCuota | “el caso de MiCuota y su ledger de eventos” |
| Multi-tenancy | Patio | “la decisión de aislamiento aplicada en Patio” |
| IA/specs | WebSpec AI | “el flujo de especificación que inspiró WebSpec AI” |
| Compliance | Compliance UY | “la herramienta de análisis verificable para Uruguay” |
| Onboarding | Milo Care | “el onboarding clínico de Milo Care” |
| MVP | Casa Médanos | “la solución estática de Casa Médanos” |
| Producto | EscalaImprov | “el caso de EscalaImprov y dos contextos de uso” |

## Reglas de enlace

1. Enlazar por utilidad semántica, no por repetición de palabras.
2. Priorizar un caso real cuando un concepto abstracto pueda demostrarse.
3. Evitar más de un enlace al mismo destino en un bloque breve.
4. Preferir anchors descriptivos que expliquen el contenido del destino.
5. Para enlaces externos de actualidad, usar la fuente primaria y no sustituir la evidencia propia.

## Páginas sin relación directa de proyecto

Los análisis de Claude, Kiro, Spec Kit, AWS, Llama, Qwen y Pambú no deben forzar un enlace a un proyecto solo para aumentar enlaces. Deben mantener fuentes externas visibles y solo relacionarse con casos cuando el contenido explícitamente discuta una decisión compartida.
