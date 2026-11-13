# Kit editorial — Loop Engineering

Artículo: `/blog/loop-engineering-agentes-verificacion-parada/` · Markdown: `docs/articulos/loop-engineering-agentes-verificacion-parada.md`
Pilares: Ingeniería con IA y agentes · Liderazgo técnico y equipos · Publicación: 2026-11-13
Artículo relacionado: `/blog/orquestacion-multiagente-website-factory/`

## 1. Cinco alternativas de título

1. **Loop Engineering: cómo diseñar el ciclo de trabajo de los agentes de IA** (publicado)
2. **Más allá del prompt: verificación, estado y condiciones de parada en agentes de código**
3. **Loop Engineering en la práctica: componentes, riesgos y un caso multiagente**
4. **Orquestar agentes y diseñar sus ciclos: dos problemas distintos**
5. **Anatomía de un loop agéntico: del disparador al escalamiento humano**

## 2. Resumen SEO (≤ 160 caracteres)

- **Meta description** (152 car.): Qué es Loop Engineering, cómo se compone un loop agéntico con estado, verificadores y condiciones de parada, y cómo se aplica en un sistema multiagente.
- **Meta title** (57 car.): Loop Engineering: el ciclo de trabajo de los agentes de IA
- **Slug**: `loop-engineering-agentes-verificacion-parada`

## 3. Post de LinkedIn (≈ 230 palabras)

> **Loop Engineering: cómo diseñar el ciclo de trabajo de los agentes de IA**
>
> Quienes trabajan con agentes de código conocen la secuencia: el agente entrega un resultado, una persona lo revisa y responde "ejecutá los tests" o "intentá de nuevo". Ese intercambio es un ciclo de control, aunque lo sostenga una persona.
>
> Desde mediados de 2026, el término Loop Engineering describe el esfuerzo de llevar ese ciclo al diseño del sistema: qué lo inicia, dónde se conserva el estado, cómo se verifica cada resultado y cuándo se detiene o escala a una persona.
>
> No reemplaza a Prompt, Context ni Harness Engineering; se apoya en ellas. Cada práctica responde una pregunta distinta.
>
> En el artículo analizo sus componentes, las condiciones de parada y los riesgos, y los aplico a un sistema propio: un orquestador de Claude Code con seis subagentes. Distingo lo que ya está implementado —verificadores deterministas, un QA independiente con un máximo de dos iteraciones, escalamiento ante decisiones que no corresponden al agente— de lo que todavía falta, como presupuestos explícitos y detección de estancamiento.
>
> Una nota de cautela: el primer paper académico sobre el tema (arXiv:2608.21884) encontró acuerdo sobre los componentes de un loop, pero no evidencia sistemática de sus beneficios. Es una práctica prometedora y todavía poco estudiada.
>
> El artículo completo, con diagrama, pseudocódigo y referencias, está en el primer comentario.
>
> #LoopEngineering #AgenticAI #SoftwareEngineering

Primer comentario: `https://juliancardozo.github.io/blog/loop-engineering-agentes-verificacion-parada/?utm_source=linkedin&utm_medium=social&utm_campaign=loop-engineering&utm_content=post-principal`

## 4. Tres preguntas para la comunidad

1. ¿Qué condición de parada resulta más difícil de definir en la práctica: el éxito, la falta de avance o el momento de escalar a una persona?
2. ¿Cómo validan que el verificador no sea más acotado que la necesidad real: tests de los tests, revisión humana u otro agente?
3. ¿Dónde conservan el estado de un ciclo de larga duración: archivos en el repositorio, commits, un almacenamiento externo o el propio contexto del agente?

## 5. Fuentes verificadas (2026-11-13)

- [IBM: What is loop engineering?](https://www.ibm.com/think/topics/loop-engineering) — Ivan Belcic y Cole Stryker, 2026-07-17. Definición, ciclo goal/action/observation/adjustment, componentes y riesgos (comprehension debt). Sin datos medidos.
- [arXiv:2608.21884](https://arxiv.org/abs/2608.21884) — Lulla et al., v1 2026-08-22, v3 2026-10-22. Bloques de construcción, "no systematic evidence of the claimed benefits", minería de 36.710 repos con 217 loops autónomos; el experimento controlado está propuesto, no ejecutado.
- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Justin Young, 2025-11-26. Estado entre ventanas de contexto, lista de funcionalidades en JSON, progreso en archivo y git, éxito prematuro. Observaciones cualitativas.
- [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/) — Ryan Lopopolo, 2026-02-11. **No se pudo leer el original de forma automática (HTTP 403)**; el artículo solo usa dos afirmaciones confirmadas por varias fuentes: producto interno con código escrito por agentes y avance inicial lento por un entorno poco especificado. Conviene que lo revises antes de publicar.
- [OpenAI Cookbook: Agent Improvement Loop](https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop) — trazas → feedback → evals → cambios de harness → handoff a Codex; loop revisado como punto de partida. Datos sintéticos, sin resultados medidos.

Notas de rigor:
- Las métricas del artículo son **propuestas**, no mediciones.
- Del caso Website Factory solo se afirma lo que consta en el repo (`CLAUDE.md`, `.claude/agents/`, `docs/agent-runs.md`, `docs/qa-report.md`). Trigger automático, presupuestos, detección de estancamiento y feedback en JSON están marcados como mejoras posibles.

---

## Estrategia de distribución (2 semanas)

Encadenada con el artículo de orquestación multiagente: aquel explica quién hace qué; este, qué pasa cuando el resultado no alcanza.

| Día | Formato | Idea | `utm_content` |
|---|---|---|---|
| D0 | Post principal (el de arriba) | Qué es Loop Engineering y en qué se diferencia de orquestar | `post-principal` |
| D+3 | Imagen del diagrama | Anatomía del loop en nueve componentes | `diagrama-loop` |
| D+6 | Carrusel PDF (6 láminas) | Las cinco condiciones de parada y su riesgo | `carrusel-parada` |
| D+9 | Post corto | La ley de Goodhart aplicada a agentes: un ciclo optimiza contra su verificador | `goodhart` |
| D+13 | Encuesta + cierre | Pregunta 1 de la sección 4 como encuesta | `encuesta-parada` |
