# Kit editorial — Orquestación multiagente (Website Factory)

Artículo: `/blog/orquestacion-multiagente-website-factory/` · Markdown: `docs/articulos/orquestacion-multiagente-website-factory.md`
Pilares: Ingeniería con IA y agentes · Liderazgo técnico y equipos · Publicación: 2026-11-12
Repositorio del caso: https://github.com/juliancardozo/website-factory-mvp

## 1. Títulos

1. **Siete agentes, un objetivo: cómo se orquesta un sistema multiagente que construye un sitio web** (publicado)
2. **Dejamos de escribir prompts: ahora programamos sistemas que los escriben**
3. **Prompt, contexto y loop engineering: anatomía de un sistema multiagente real**

## 2. Subtítulo (≤ 25 palabras)

Un orquestador de Claude Code y seis subagentes convierten un brief en un sitio verificado. Topología, contratos, contexto acotado y loops con señales deterministas.

## 3. Cinco aprendizajes para equipos que construyen con agentes

1. **Un modelo es una inferencia; un agente es un loop; un sistema multiagente es una arquitectura.** Cada nivel falla distinto (alucinación, deriva, errores en cascada) y se diseña distinto.
2. **Cada delegación es un contrato**: MISSION, INPUTS, OUTPUT FILES, ACCEPTANCE, CONSTRAINTS y STOP CONDITIONS. La condición de parada es la sección que más se olvida.
3. **El contexto es un presupuesto**: contextos aislados por agente, memoria en archivos, rutas exactas e IDs estables.
4. **Todo loop necesita una señal determinista y un límite.** El exit code de un build funciona como una recompensa verificable; después de dos iteraciones decide una persona.
5. **El evaluador tiene que ser independiente** —sin acceso al razonamiento del implementador— y también tiene que auditar los tests.

## 4. Resumen ejecutivo (≈ 110 palabras)

Website Factory es un sistema multiagente público: un orquestador de Claude Code descompone un objetivo, lo delega en seis subagentes especializados sobre el flujo Spec-Driven Development de GitHub Spec Kit y cierra cada etapa con verificadores deterministas. El artículo explica la topología orquestador-especialistas con coordinación por archivos, cómo el repositorio se vuelve el programa que ejecutan los agentes, y tres disciplinas en la práctica: prompt engineering como contrato, context engineering como gestión de un recurso finito y loop engineering con señales verificables y límites. Cierra con los resultados de una ejecución completa —0 BLOCKER y 0 MAJOR en QA, un validador corregido por el auditor— y siete principios de diseño.

## 5. Post de LinkedIn

> **Dejamos de escribir prompts. Ahora programamos sistemas que los escriben.**
>
> Armé un sistema multiagente y lo dejé público: un orquestador de Claude Code coordina 6 subagentes especializados y convierte un brief en Markdown en un sitio Astro + Tailwind que compila, pasa sus controles y deja la traza de cada decisión.
>
> Lo interesante no es el sitio. Es la arquitectura:
>
> 🧭 **Topología**: un orquestador, seis especialistas, sin comunicación lateral. Se coordinan a través de archivos, no de mensajes.
> 📝 **Prompt engineering como contrato**: cada delegación lleva misión, entradas, salidas, criterios de aceptación, restricciones y condición de parada.
> 🧠 **Context engineering**: cada agente con su propia ventana de contexto y solo lo que necesita leer.
> 🔁 **Loop engineering**: cada ciclo cierra con una señal determinista (check, build, validador) y un máximo de dos iteraciones.
> 🔒 **Mínimo privilegio**: cuatro de los seis agentes no pueden ejecutar comandos.
>
> El momento que más me enseñó: el agente de QA descubrió que el validador escrito por el agente de frontend era más estrecho que el contrato que debía verificar. El auditor no solo revisó el código; revisó los tests.
>
> Y el segundo: cuando cargar las tipografías exigía instalar una dependencia, el sistema se detuvo y pidió aprobación. Un agente que sabe detenerse vale más que uno que siempre termina.
>
> El análisis completo y el repo, en el primer comentario 👇
>
> 💬 ¿Qué loops de sus agentes cierran con una señal determinista, y cuáles siguen dependiendo de "me parece que está bien"?
>
> #AIEngineering #AgenticAI #ClaudeCode

Primer comentario: `https://juliancardozo.github.io/blog/orquestacion-multiagente-website-factory/?utm_source=linkedin&utm_medium=social&utm_campaign=orquestacion-multiagente&utm_content=post-principal` · Repo: https://github.com/juliancardozo/website-factory-mvp

## 6. SEO

- **Meta title** (59 car.): Orquestación multiagente: 7 agentes que construyen un sitio
- **Meta description** (152 car.): Un orquestador de Claude Code y seis subagentes con Spec Kit convierten un brief en un sitio Astro: topología, contratos, contexto y loops verificables.
- **Slug**: `orquestacion-multiagente-website-factory`
- Ya aplicados en `src/data/articles.js`.

## 7. Fuentes verificadas (2026-11-12)

- Datos de la ejecución: `docs/agent-runs.md` y `docs/qa-report.md` del repositorio (18 REQ, 41 tareas, `/speckit.analyze` 0 CRITICAL, `astro check` 0/0/0, QA 0 BLOCKER / 0 MAJOR / 8 MINOR, 15/15 vistas sin scroll horizontal).
- [GitHub Spec Kit](https://github.com/github/spec-kit) — versión 1.4.1.dev0 en el repo.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic.
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic.
- [Subagents en Claude Code](https://docs.claude.com/en/docs/claude-code/sub-agents) — documentación oficial.

Notas: el caso del repo (Supermercado Los Álamos) es ficticio; "loop engineering" es un término propio del artículo, no una disciplina citada de una fuente.

---

## Estrategia de distribución (2 semanas)

Alternar con los artículos de DevEx y SaaS multitenant para no publicar dos piezas principales el mismo día.

| Día | Formato | Idea | `utm_content` |
|---|---|---|---|
| D0 | Post principal (el de arriba) | Dejamos de escribir prompts: la arquitectura del sistema | `post-principal` |
| D+3 | Post corto + imagen del diagrama | La topología orquestador-especialistas y la coordinación por archivos | `topologia` |
| D+6 | Carrusel PDF (6 láminas) | El contrato de delegación sección por sección | `carrusel-contrato` |
| D+9 | Post corto | Loop engineering: la tabla de loops y por qué el evaluador tiene que ser independiente (QA-008) | `loops-qa` |
| D+13 | Encuesta + cierre | "¿Cómo cierran los loops de sus agentes?": tests / revisión humana / LLM-as-judge / no los cierran | `encuesta-loops` |

Prácticas:
- Responder comentarios en las primeras horas; la pregunta final es la invitación.
- Invitar a clonar el repo y probar `/website-factory` con un brief propio; las estrellas y forks son una señal adicional a medir.
- Medir a los 7 y 14 días: sesiones por `utm_content`, visitas al repo, clics en el CTA de conversación y altas a la newsletter.
