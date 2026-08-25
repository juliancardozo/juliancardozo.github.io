# Roadmap SEO y crecimiento orgánico

## Cambios implementados

| Cambio | Archivos principales | KPI afectado |
|---|---|---|
| 404 `noindex, follow` | `build.mjs`, `layout.mjs` | Cobertura e higiene de índice |
| Entidad de marca personal | `build.mjs` | Comprensión de entidad y autoría |
| Schema `Blog` y `BlogPosting` conectado al autor | `build.mjs` | Comprensión editorial |
| `og:type="article"` | `layout.mjs`, `build.mjs` | Distribución social |
| Enlaces entre artículos relacionados | `blog.mjs`, `build.mjs`, `main.css` | Profundidad de rastreo y autoridad temática |
| Filtro por tags / carga progresiva accesible | `blog.mjs`, `main.js`, `main.css`, `articles.js` | Descubrimiento y UX |

## Backlog priorizado

| Impacto | Esfuerzo | Riesgo | Acción | Dependencia | KPI |
|---|---|---|---|---|---|
| Alto | Bajo | Bajo | Verificar dominio en Google Search Console y Bing Webmaster Tools; enviar sitemap | Propiedad del dominio | Cobertura, impresiones, clics |
| Alto | Medio | Bajo | Configurar en GTM eventos de clic en email, LinkedIn, GitHub, demo y repositorio | Consentimiento y etiqueta de analítica | Leads, CTR de CTA |
| Alto | Medio | Medio | Publicar una página de servicios / metodología solo tras definir la oferta | Confirmación comercial | Tráfico no-branded, leads |
| Medio | Medio | Bajo | Crear OG por caso y artículo con contenido real | Diseño/activos aprobados | CTR social y compartidos |
| Medio | Medio | Bajo | Agregar fecha de actualización editorial con proceso de revisión | Política editorial | Frescura y confianza |
| Medio | Alto | Bajo | Generar versión inglesa equivalente de páginas prioritarias | Traducción y mantenimiento | Alcance internacional |
| Bajo | Medio | Bajo | Evaluar IndexNow si Bing gana relevancia en datos reales | Bing Webmaster Tools | Velocidad de descubrimiento |

## Calendario editorial de 12 semanas

| Semana | Contenido | Intención / formato | Enlaces internos |
|---:|---|---|---|
| 1 | Cómo evaluar un LLM open-weight para un producto LATAM | Informativa profesional / guía | Llama, Qwen, AWS |
| 2 | Diseño de webhooks idempotentes en pagos recurrentes | Informativa / guía técnica | MiCuota, pagos |
| 3 | RLS en PostgreSQL: checklist de aislamiento multi-tenant | Informativa / checklist | Patio, multi-tenancy |
| 4 | De idea a RFC: un flujo de especificación para equipos con IA | Informativa / método | WebSpec AI, Spec Kit |
| 5 | Qué evaluar antes de integrar IA en un proceso regulado | Informativa / marco de decisión | Compliance UY, Claude |
| 6 | Costos cloud de un MVP: qué medir antes de escalar | Informativa / guía | AWS, Casa Médanos |
| 7 | Recordatorios confiables: estados, vencimientos y trazabilidad | Informativa / arquitectura | Milo Care |
| 8 | Arquitectura de pagos multi-proveedor: patrones y límites | Informativa comercial / guía | MiCuota |
| 9 | Diseño de un MVP de marketplace con operación mínima | Informativa / caso | Casa Médanos |
| 10 | Agentes en herramientas especializadas: permisos y trazabilidad | Informativa / análisis | Kiro, Spec Kit |
| 11 | Qué debe tener una web corporativa que convierte en 2026 | Comercial-investigativa / guía | Pambú, contacto |
| 12 | Retrospectiva: decisiones reutilizables entre proyectos propios | Autoridad / síntesis | Home y todos los casos |

Cada publicación debe responder una necesidad concreta en el primer bloque, incluir fuentes primarias si hace afirmaciones externas, enlazar a un caso relevante y usar un CTA proporcional: leer caso, contactar o ver repositorio.

## Plan de autoridad y enlaces

1. Publicar los repositorios y casos existentes con README que enlace a su caso de estudio.
2. Compartir aprendizajes técnicos originales en GitHub, LinkedIn y comunidades de Java, IA, fintech, PostgreSQL y producto de Uruguay/LATAM.
3. Proponer colaboraciones editoriales donde exista aporte propio: pagos, RLS, IA verificable o productos construidos desde experiencia real.
4. Crear activos citables: checklists de idempotencia, RLS y evaluación de LLMs, siempre con ejemplos propios y fuentes.
5. Recuperar menciones reales sin enlace desde perfiles o publicaciones propias; no comprar enlaces, PBNs ni intercambios artificiales.

## Plan de 30, 60 y 90 días

### 0–30 días

- Verificar Search Console y Bing Webmaster Tools; enviar sitemap.
- Configurar en GTM una etiqueta de analítica compatible con privacidad y los eventos de conversión.
- Revisar cobertura, URLs excluidas, consultas de marca y Core Web Vitals.
- Publicar las primeras cuatro piezas del calendario y enlazarlas desde casos.

### 31–60 días

- Medir consultas no-branded, CTR por página de entrada y clics de contacto.
- Actualizar títulos/descripciones solo en páginas con impresión suficiente y CTR bajo.
- Publicar cuatro contenidos adicionales y comenzar distribución profesional.
- Evaluar una página de metodología/servicios si la propuesta comercial está validada.

### 61–90 días

- Consolidar el clúster que muestre mejor combinación de impresiones, calidad de tráfico y conversiones.
- Actualizar artículos de actualidad y enlaces internos según datos de Search Console.
- Publicar los cuatro contenidos restantes y un activo enlazable.
- Revisar dominios que enlazan, menciones, páginas con mayor caída y oportunidades de refresh.

## KPIs y método de seguimiento

| KPI | Fuente | Cadencia | Decisión que informa |
|---|---|---|---|
| Impresiones, clics, CTR y posición por clúster | Search Console | Semanal / mensual | Prioridad de contenidos y snippets |
| Páginas indexadas y errores | Search Console / Bing | Quincenal | Higiene de rastreo |
| Core Web Vitals | Search Console / PageSpeed | Mensual y tras cambios visuales | Prioridad técnica |
| Tráfico no-branded y páginas de entrada | Analítica | Mensual | Ajuste del mapa temático |
| Clics en contacto, demo y repositorio | Analítica de eventos | Semanal / mensual | Calidad comercial |
| Dominios referentes y menciones | Herramienta de enlaces o revisión manual | Mensual | Estrategia de reputación |

No se fija una promesa de ranking. Los objetivos deben establecerse tras 4–8 semanas de línea base real; se medirá crecimiento sostenible por clúster, no una única keyword.
