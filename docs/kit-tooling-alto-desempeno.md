# Kit editorial — Tooling para equipos de alto desempeño

Artículo: `/blog/tooling-equipos-alto-desempeno-sistemas-ingenieria-ia/` · Markdown: `docs/articulos/tooling-equipos-alto-desempeno-sistemas-ingenieria-ia.md`
Categoría: Liderazgo y producto · Pilar: Liderazgo técnico · Fecha: 2026-11-14 (Floci sigue como artículo principal)
Relacionados: DevEx y fricción de plataforma, Harness engineering, La IA no cambia solo la herramienta

## A. Investigación (verificada al commit `e91a134`, 2026-11-13)

Archivos leídos completos: `README.md`, `CONNECTORS.md`, `.mcp.json`, `.claude-plugin/plugin.json` y las diez `skills/*/SKILL.md`.

| Hallazgo | Fuente |
|---|---|
| Plugin `engineering` v1.2.0, autor Anthropic; repo con licencia Apache-2.0 | `plugin.json`, API de GitHub |
| "Primarily designed for Cowork", también funciona en Claude Code; instalación vía `claude plugin marketplace add` / `install` | README |
| 10 skills: 6 invocables (`standup`, `code-review`, `architecture`, `debug`, `deploy-checklist`, `incident-response`) y 4 de conocimiento (`system-design`, `tech-debt`, `testing-strategy`, `documentation`) | `skills/` |
| **Inconsistencia:** el README lista `/review` e `/incident`; las skills definen `/code-review` e `/incident-response` | README vs. SKILL.md |
| Marcadores `~~categoría` (source control, project tracker, chat, knowledge base, monitoring, incident management, CI/CD) mapeados a servidores en CONNECTORS.md | CONNECTORS.md |
| `.mcp.json`: servidores HTTP para Slack, Linear, Asana, Atlassian, Notion, GitHub, PagerDuty y Datadog; `google calendar` y `gmail` con URL vacía; **sin servidor de CI/CD** | `.mcp.json`, CONNECTORS.md |
| Modo standalone (pegar o describir) vs. supercharged (con conectores) en cada comando | README y skills |
| `incident-response`: modos `new`/`update`/`postmortem`, SEV1–4 con tiempos de respuesta, postmortem blameless con 5 porqués | SKILL.md |
| `tech-debt`: prioridad = (impacto + riesgo) × (6 − esfuerzo) | SKILL.md |
| `deploy-checklist`: checklist pre/durante/post y disparadores de rollback; con monitoreo, propone umbrales desde las líneas de base | SKILL.md |
| El plugin **no** ejecuta gates deterministas ni impone aprobaciones: la gobernanza depende del entorno y del CI/CD | Inferencia a partir de los archivos |

**Límites:** el plugin no se instaló ni se ejecutó; el análisis se basa en el contenido de los archivos. No hay datos de impacto publicados para el plugin. DORA, SPACE, Team Topologies, Backstage y MCP se citan como marcos, sin cifras.

## B. Artículo

En el sitio, desde `src/data/articles.js`. Unas 2.770 palabras sin tablas ni código (objetivo: 2.200–3.000).
Incluye: problema inicial, diagrama Mermaid de seis capas, diagrama de los dos ciclos de aprendizaje, tabla de workflows manuales vs. asistidos (problema, aporte, responsabilidad humana, riesgo, métrica), caso de extremo a extremo ficticio (Nexo Logística, `order-pricing`), matriz de métricas, hoja de ruta de 90 días con matriz de priorización y referencias.

## C. SEO

**Cinco títulos alternativos**
1. Tooling para equipos de alto desempeño: de herramientas aisladas a sistemas de ingeniería aumentados por IA (publicado)
2. Diseñar el sistema de trabajo de un equipo de ingeniería en la era de los agentes
3. Skills, MCP y golden paths: cómo convertir prácticas de ingeniería en capacidades
4. Más allá de las herramientas: costo de coordinación, IA y equipos de alto desempeño
5. Lo que enseña un plugin de ingeniería sobre el trabajo de un Engineering Manager

- **Slug:** `tooling-equipos-alto-desempeno-sistemas-ingenieria-ia`
- **Meta title (55):** Tooling para equipos de alto desempeño: sistemas con IA
- **Meta description (150):** Cómo pasar de herramientas aisladas a un sistema de trabajo integrado con IA: capas, skills y MCP, gobernanza, métricas y una hoja de ruta de 90 días.
- **Extracto:** Un equipo de alto desempeño no es el que tiene más herramientas, sino el que reduce su costo de coordinación y aprende de cada ciclo. Un modelo de seis capas, el plugin de ingeniería de Anthropic como caso de estudio y una hoja de ruta de 90 días.
- **Tags del sitio:** Liderazgo, IA, Platform Engineering. **Keywords:** Engineering Management, Developer Experience, MCP, agent skills, golden paths, DORA, SPACE, Platform as a Product.

## D. Diseño visual

1. **Hero:** a la izquierda, íconos de herramientas sueltos y desordenados (repositorio, tickets, chat, dashboards); a la derecha, los mismos íconos encastrados como capas de un sistema, unidos por líneas finas que convergen en un pequeño núcleo. Transición de izquierda a derecha, tonos neutros con un acento de color.
2. **Arquitectura de un Engineering Tooling Platform con IA:** las seis capas del artículo como bloques apilados; la gobernanza como un marco lateral que envuelve a los workflows, y una flecha de retorno desde aprendizaje hacia capacidades. (Versión Mermaid incluida en el artículo.)
3. **Ciclo de aprendizaje continuo:** un anillo con cuatro actores (personas, herramientas, agentes, resultados); en cada tramo, la acción que los conecta (decide, registra, ejecuta, mide) y en el centro: "cada ciclo actualiza el estándar".

## E. LinkedIn (≈ 180 palabras)

> **Un equipo con diez herramientas puede ser más lento que uno con cuatro.**
>
> No por las herramientas, sino por lo que pasa entre ellas: decisiones dispersas en hilos de chat, standups que reconstruyen de memoria lo que pasó ayer, revisiones que dependen de dos personas y postmortems que nunca se escriben. Ese costo de coordinación rara vez aparece en un dashboard.
>
> Analicé el plugin de ingeniería que Anthropic publicó en knowledge-work-plugins: diez skills en Markdown que convierten prácticas como el code review, los ADR o la respuesta a incidentes en capacidades explícitas, independientes de la herramienta concreta. Es un buen caso de estudio, también por sus límites: una skill orienta, pero no controla. El checklist de despliegue no reemplaza a un gate del pipeline.
>
> En el artículo propongo un modelo de seis capas, un caso de extremo a extremo con una alerta de latencia, métricas que van más allá de los tokens y una hoja de ruta de 90 días.
>
> ¿Qué práctica de su equipo depende hoy de una persona y debería estar escrita como capacidad?
>
> #EngineeringManagement #DeveloperExperience #PlatformEngineering

Primer comentario: `https://juliancardozo.github.io/blog/tooling-equipos-alto-desempeno-sistemas-ingenieria-ia/?utm_source=linkedin&utm_medium=social&utm_campaign=tooling-alto-desempeno&utm_content=post-principal`

## F. Quality gate editorial

- [x] Capacidades del plugin verificadas archivo por archivo al commit indicado; la inconsistencia de nombres se menciona.
- [x] Capacidades actuales separadas de propuestas: beneficios, métricas, hoja de ruta y modelo de capas están marcados como propios.
- [x] Automatización, asistencia y autonomía diferenciadas (tabla del caso práctico: asistido / verificación automática / responsabilidad humana).
- [x] Seguridad y gobernanza: sección de riesgos con controles; se aclara que el plugin no impone gates.
- [x] Caso práctico declarado como ficticio.
- [x] Sin cifras de productividad sin respaldo.
- [x] Sin frases promocionales ni experiencias personales inventadas.
- [x] Tesis propia en la introducción y en el cierre.
- [x] `npm run check` sin problemas.
