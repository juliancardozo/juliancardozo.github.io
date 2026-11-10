# Escribimos código más rápido. ¿Desarrollamos mejor software? DevEx, IA y Platform Engineering

_2026-11-10 · 11 min de lectura_

El State of Developer Experience 2026 de Atlassian dejó un dato que vale la pena mirar despacio: el 87% de los desarrolladores dice que la IA le permite entregar trabajo más rápido, pero solo el 28% percibe una reducción notable de la fricción en su día a día. Escribimos código más rápido. Eso no significa que estemos desarrollando mejor software. Para quienes lideramos equipos de ingeniería, esa brecha es el problema interesante: la IA aceleró la parte del trabajo que casi nunca era el cuello de botella.

## Qué dice el reporte, y qué no

El reporte se publicó el 20 de octubre de 2026 y se basa en una encuesta a 1.155 desarrolladores y 405 líderes de ingeniería, según la cobertura de InfoQ. Los números que más se repiten:

- **87%** dice que la IA lo ayuda a entregar más rápido; **28%** reporta notablemente menos fricción que antes de la IA. Atlassian lo resume así: el **72%** vive la misma fricción o más.
- La proporción que dice ahorrar **10 horas o más por semana** con IA cayó del **68%** en 2025 a alrededor de un cuarto en 2026 (Atlassian publica 25%; InfoQ, 26%).
- **65%** pasa tiempo corrigiendo lo que produce la IA y **49%** dedica cuatro horas o más por semana a gestionar herramientas de IA.
- Las mayores fuentes de fricción no son de código: **encontrar información (51%)**, **reuniones (50%)**, **cambio de contexto entre herramientas (45%)** y **deuda técnica (44%)**.
- Solo **17%** de los desarrolladores y **23%** de los líderes dice que su organización tiene una estrategia de IA clara e implementada. Entre quienes sí la tienen, el **41%** reporta menos fricción, contra el **22%** donde la estrategia es inconsistente.

> **Con qué cuidado leerlo.** Es investigación de un proveedor, con datos autodeclarados y una muestra que cambió respecto de 2025: InfoQ lo señala explícitamente. Sirve como señal de dirección, no como benchmark para comparar tu equipo.

Aun con esa cautela, el patrón es consistente: la IA comprime el tiempo de escribir código, y la fricción se mueve hacia lo que rodea al código. Encontrar quién sabe algo, esperar una aprobación, entender una política de seguridad, revisar una salida generada. Ninguna de esas cosas se resuelve con un modelo más rápido.

## La fricción cambió de lugar

Un desarrollador no debería necesitar tres reuniones, dos tickets y conocer a la persona indicada para desplegar un servicio. Tampoco debería reconstruir un pipeline desde cero, configurar la observabilidad a mano o descubrir las políticas de seguridad recién cuando intenta llegar a producción.

Cuando la escritura de código se acelera, esas esperas pesan más, no menos. Si antes un cambio tardaba dos días en escribirse y uno en aprobarse, la espera era un tercio del ciclo. Si ahora se escribe en dos horas, la misma aprobación es casi todo el ciclo. Es la teoría de restricciones aplicada a la ingeniería: optimizar fuera del cuello de botella no mejora el sistema.

El Technology Radar Vol. 35 de Thoughtworks, publicado en noviembre de 2026, lo dice desde otro ángulo: pone en "Caution" usar el throughput de código como medida de productividad, y advierte que, con más agentes trabajando en paralelo, la capacidad de revisión se vuelve el cuello de botella y la supervisión puede degradarse en "human-in-the-loop theater".

## Mejorar DevEx no es sumar herramientas: es eliminar fricción

Ahí es donde Platform Engineering genera impacto. Una Internal Developer Platform (IDP) bien diseñada transforma dependencias entre personas en capacidades reutilizables, seguras y disponibles por autoservicio. Los Golden Paths hacen que el camino recomendado sea también el más sencillo. DevSecOps integra los controles desde el diseño, en lugar de descubrirlos en la última milla. Y la observabilidad permite que los equipos sigan siendo autónomos después del despliegue.

**De la fricción reportada a la capacidad de plataforma (propuesta, no receta)**

| Fricción | Cómo se ve en el día a día | Capacidad de plataforma | Señal de que mejora |
|---|---|---|---|
| Encontrar información | "¿Quién es dueño de este servicio?", documentación desactualizada | Catálogo de servicios con dueños, docs junto al código, scorecards | Menos preguntas repetidas en canales; tiempo de onboarding |
| Esperas y aprobaciones | Tickets para crear un ambiente, una base o un permiso | Autoservicio con políticas como código y aprobación solo donde hay riesgo | Lead time de solicitudes internas |
| Cambio de contexto | Cinco consolas para desplegar y diagnosticar | Golden Paths con pipeline, observabilidad y alertas incluidas | Tiempo hasta el primer deploy de un servicio nuevo |
| Seguridad tardía | Hallazgos en la revisión final, retrabajo | Controles DevSecOps en el template y en el pipeline | Hallazgos encontrados antes del merge vs. después |
| Corregir salida de IA | Revisiones largas de cambios generados sin contexto | Contexto del repositorio y reglas del equipo disponibles para agentes; checks automáticos | Tasa de cambios generados que pasan revisión sin retrabajo |

## La plataforma es un producto, no un proyecto de infraestructura

Lo más importante no es la herramienta, es el modelo de gestión. Una plataforma tratada como proyecto se entrega y se mantiene. Una plataforma tratada como producto tiene usuarios, discovery, un roadmap priorizado por valor y métricas de resultado.

Eso implica escuchar a los desarrolladores, entender dónde pierden tiempo, priorizar lo que genera valor y medir resultados: no solo cuántos servicios se desplegaron, sino cuánto mejoró el onboarding, cuánto disminuyó el tiempo de espera y cuánta autonomía ganaron los equipos.

El reporte deja una pista sobre qué no medir. Según el análisis de Network Perspective sobre los datos de Atlassian, el 60% de los desarrolladores dice que el uso de IA se trata como señal de productividad, y el 81% de los líderes reconoce que medir el uso puede crear incentivos equivocados. Medir cuánto se usa una herramienta es medir actividad, no resultado.

### Métricas que conectan plataforma y negocio

- **Onboarding**: tiempo hasta el primer deploy o hasta el décimo pull request de una persona nueva. Atlassian publicó, a partir de datos de su plataforma DX, que la mediana hasta el décimo PR bajó a 30 días en el segundo trimestre de 2026.
- **Tiempo de espera**: cuánto tarda una solicitud interna (ambiente, permiso, base) desde que se pide hasta que está disponible.
- **Autoservicio**: proporción de esas solicitudes que se resuelven sin intervención humana.
- **Entrega**: las métricas DORA (frecuencia de despliegue, lead time, tasa de fallas, tiempo de recuperación) como contexto, no como objetivo individual.
- **Percepción**: una encuesta breve y periódica sobre fricción. Si la plataforma es un producto, sus usuarios tienen que poder decir si les sirve.

## El segundo usuario de la plataforma: los agentes

La IA agrega una dimensión nueva: las plataformas ahora también tienen que ofrecer contexto, políticas y mecanismos de control a agentes que participan en el ciclo de desarrollo. Las novedades de noviembre de 2026 muestran que la industria se está moviendo en esa dirección.

- **Red Hat Developer Hub 2.1** (anunciado en KubeCon NA, cubierto por SD Times el 10 de noviembre): expone contexto y acciones de la organización por MCP, por ejemplo disparar un Golden Path o revisar un problema de despliegue en Kubernetes, y suma un catálogo de modelos, agentes y servidores MCP. El argumento del anuncio: un agente sin contexto organizacional duplica servicios existentes y elige tecnologías no aprobadas.
- **"Platform Engineering after the AI Hype: Why IDPs Must Become Intent-Driven"** (Daniel Bryant, KubeCon NA, 10 de noviembre): sostiene que "agregar MCP" no alcanza. Identifica tres modos de falla (demasiada superficie expuesta, agentes "confidently wrong" y nadie dueño del día 2) y propone APIs basadas en intención para consumidores humanos y agentes. Una de sus preguntas para equipos de plataforma: ¿podría un agente usar tu plataforma sin conocimiento institucional?
- **Platform Engineering Day** (9 de noviembre, co-located de KubeCon NA en Salt Lake City): incluyó entre sus ejes los patrones emergentes para integrar IA en los flujos de plataforma.
- **Technology Radar Vol. 35** (Thoughtworks, noviembre): "harness engineering at scale" como tema central. El entorno que rodea a un agente (contexto, memoria, feedback, guardrails) madura como disciplina y necesita dueño.

Un artículo de DevOpsCon de octubre resume bien el riesgo: los Golden Paths diseñados para personas pueden volverse "golden cages" si se aplican sin cambios a agentes. Un agente no navega un portal; necesita acceso programático a capacidades, contexto confiable y controles que no dependan de que "se porte bien": identidad no humana, permisos acotados, observabilidad y controles deterministas (CI, políticas, aprobaciones) entre una salida probabilística y una acción con consecuencias.

La buena noticia es que una plataforma pensada como producto ya tiene la mayoría de esas piezas: catálogo, políticas como código, templates y observabilidad. Lo que cambia es que pasa a tener dos tipos de usuario con necesidades distintas, y los dos merecen el mismo rigor.

## Por dónde empezar

1. **Medir la fricción antes de comprar herramientas.** Una encuesta corta y entrevistas a personas nuevas en el equipo muestran dónde se pierde el tiempo con más precisión que cualquier dashboard de uso de IA.
2. **Elegir un solo Golden Path de alto tráfico**, típicamente "crear un servicio y llevarlo a producción", y hacerlo completo: pipeline, observabilidad, seguridad y documentación incluidas.
3. **Hacer que el camino sea legible para agentes**: el mismo template, el catálogo y las reglas del equipo accesibles de forma programática, con permisos acotados.
4. **Medir resultado, no actividad**: tiempo de onboarding, tiempo de espera y proporción de autoservicio, revisados con los equipos que usan la plataforma.
5. **Escribir la estrategia de IA.** El dato del reporte que más me interesa es la diferencia entre 41% y 22%: la claridad organizacional también es una capacidad de plataforma.

## Talento en el negocio, no en los obstáculos

Para mí, una buena Developer Experience se resume en una idea: que los equipos puedan concentrar su talento en resolver problemas de negocio, en lugar de invertirlo en superar obstáculos internos. La IA hace más visible esa diferencia, porque acelera todo lo que ya estaba bien resuelto y deja expuesto todo lo que no.

Y una pregunta abierta: ¿dónde encuentran hoy la mayor fricción en sus equipos: onboarding, CI/CD, infraestructura, documentación o procesos?

### Novedades de noviembre de 2026

- [Red Hat Advances Red Hat Developer Hub as an Agent-Ready Enterprise Developer Portal](https://sdtimes.com/open-source/red-hat-advances-red-hat-developer-hub-as-an-agent-ready-enterprise-developer-portal/) — David Rubinstein, SD Times, 10 de noviembre de 2026.
- [Platform Engineering after the AI Hype: Why IDPs Must Become Intent-Driven](https://speakerdeck.com/danielbryantuk/kubecon-na-platform-engineering-after-the-ai-hype-why-idps-must-become-intent-driven-final-v1) — Daniel Bryant, KubeCon + CloudNativeCon NA, 10 de noviembre de 2026 (slides).
- [Platform Engineering Day North America](https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/co-located-events/platform-engineering-day/) — Linux Foundation / CNCF, 9 de noviembre de 2026, Salt Lake City.
- [Technology Radar Vol. 35](https://www.thoughtworks.com/radar) — Thoughtworks, noviembre de 2026.

### Referencias

- [AI is making developers faster. It’s also exposing what’s broken in software delivery](https://www.atlassian.com/blog/development/developer-experience-report-2026) — Andrew Boyagi, Atlassian, 20 de octubre de 2026.
- [Developers Reporting Double-Digit Weekly Time Savings from AI Fell from 68% to 26%](https://www.infoq.com/news/2026/10/atlassian-devex-2026/) — Steef-Jan Wiggers, InfoQ, 27 de octubre de 2026.
- [What Atlassian’s 2026 DevEx Report Confirms (and Misses) About AI and Developer Productivity](https://www.networkperspective.io/post/ai-developer-productivity-atlassian-2026-devex-report) — Anita Zbieg, Network Perspective, 22 de octubre de 2026.
- [What Happens to an Internal Developer Platform When AI Agents Start Using It?](https://devopscon.io/blog/internal-developer-platforms-ai-agents/) — Natalia Torres Behar, DevOpsCon, 22 de octubre de 2026.
- [Golden Paths for AI agents: What changes when platform users aren’t human?](https://www.datadoghq.com/blog/golden-paths-for-ai-agents/) — Candace Shamieh, Shlomo Benyaminov y James Eastham, Datadog, 25 de agosto de 2026.

**Criterio práctico: si la IA acelera la escritura de código pero la fricción no baja, el cuello de botella está en otro lado. Medí dónde se pierde el tiempo, construí la plataforma como producto para personas y agentes, y evaluá resultados, no uso de herramientas.**

