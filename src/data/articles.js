/**
 * Artículos del blog. Cada texto nace de una decisión o aprendizaje documentado
 * en los casos de estudio, para mantener el mismo estándar de trazabilidad.
 */
const articleEntries = [
  {
    slug: 'loop-engineering-agentic-loops',
    previousSlugs: ['loop-engineering-agentes-verificacion-parada'],
    seoTitle: 'Loop Engineering: el ciclo de trabajo de los agentes de IA',
    seoDescription: 'Qué es Loop Engineering, cómo se compone un loop agéntico con estado, verificadores y condiciones de parada, y cómo se aplica en un sistema multiagente.',
    title: 'Loop Engineering: cómo diseñar el ciclo de trabajo de los agentes de IA',
    description: 'Prompt, context y harness engineering definen qué se le pide a un agente, qué información recibe y con qué herramientas opera. Loop Engineering se ocupa del ciclo: qué lo inicia, dónde se guarda el estado, quién verifica, qué información vuelve al agente y cuándo continuar, corregir, detenerse o escalar a una persona. Un recorrido por sus componentes, sus límites y su aplicación en un sistema multiagente construido con Claude Code.',
    category: 'IA y agentes',
    tags: ['IA', 'Agentes', 'Arquitectura', 'Liderazgo'],
    date: '2026-11-13',
    readingTime: '12 min de lectura',
    projectSlug: '',
    contextLabel: 'Ingeniería agéntica · IBM, OpenAI, Anthropic y arXiv:2608.21884',
    sourceUrl: 'https://arxiv.org/abs/2608.21884',
    sourceLabel: 'arXiv: Loop Engineering: Building Blocks, Adoption, and Impact',
    lead: 'Quien trabaja con agentes de código conoce la secuencia: el agente entrega un resultado, una persona lo revisa y responde con indicaciones como "ejecutá los tests", "el build falló" o "intentá de nuevo". Cada una de esas respuestas es, en los hechos, una iteración de un ciclo de control. El ciclo existe, pero lo sostiene una persona. Loop Engineering, un término que empezó a circular a mediados de 2026, describe el esfuerzo de llevar ese ciclo al diseño del sistema: definir qué lo inicia, dónde se conserva el progreso, cómo se verifica cada resultado, qué información recibe el agente en la siguiente vuelta y bajo qué condiciones se detiene o pide intervención humana.',
    sections: [
      {
        title: 'Un término reciente para un problema conocido',
        paragraphs: [
          'Conviene distinguir lo establecido de lo emergente. La idea de que un agente es un modelo de lenguaje que razona y actúa dentro de un ciclo, usando herramientas, está bien asentada. El nombre *Loop Engineering*, en cambio, es nuevo. El paper [Loop Engineering: Building Blocks, Adoption, and Impact](https://arxiv.org/abs/2608.21884), de Jai Lal Lulla, Vahram Nersesyan, Seyedmoein Mohsenimofidi, Christoph Treude y Sebastian Baltes, sitúa su aparición en junio de 2026, cuando distintos practicantes empezaron a describir un nivel de trabajo en el que, en lugar de interactuar con un agente mediante prompts, "los desarrolladores diseñan sistemas que promptean a los agentes por ellos".',
          'IBM, en [What is loop engineering?](https://www.ibm.com/think/topics/loop-engineering), publicado en julio de 2026, la define como la práctica de diseñar flujos agénticos que guían de forma iterativa a los agentes hacia objetivos definidos por el usuario, "con mínima intervención humana", y la presenta como una práctica emergente. Su modelo describe cuatro etapas —objetivo, acción, observación y ajuste— y subraya la necesidad de criterios de parada claros y verificables.',
          'El mismo paper aporta una advertencia que merece atención. Tras revisar la literatura gris sobre el tema, los autores encontraron un acuerdo amplio sobre los componentes de un loop, pero concluyen que esas fuentes "no aportan evidencia sistemática de los beneficios que afirman". Se trata, por lo tanto, de una práctica con fundamentos razonables y todavía poco estudiada. Este artículo la aborda con esa cautela.',
        ],
      },
      {
        title: 'Cuatro prácticas complementarias',
        paragraphs: [
          'Loop Engineering no sustituye a las prácticas anteriores; se apoya en ellas. Cada una responde a una pregunta distinta, y un ciclo bien diseñado no compensa instrucciones ambiguas, un contexto incompleto o un entorno mal delimitado: en esos casos, solo itera más rápido hacia un resultado deficiente.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'La pregunta que responde cada práctica',
            head: ['Práctica', 'Pregunta central', 'Ejemplo'],
            rows: [
              ['Prompt Engineering', '¿Qué se le pide al agente y de qué manera?', 'Una delegación con objetivo, entradas, salidas y criterios de aceptación'],
              ['Context Engineering', '¿Qué información necesita para decidir bien?', 'Indicar las rutas exactas de la especificación y del plan, en lugar de pedirle que explore el repositorio'],
              ['Harness Engineering', '¿Con qué herramientas, permisos y límites opera?', 'Un agente de análisis sin acceso a la terminal; un navegador habilitado solo para el entorno local'],
              ['Loop Engineering', '¿Qué inicia el ciclo, cómo se mide el avance, qué se hace ante un error y cuándo termina?', 'Un build fallido genera información estructurada para una nueva iteración, con un máximo de dos antes de escalar a una persona'],
            ],
          },
          {
            type: 'p',
            text: 'La frontera entre harness y loop no es nítida, y las fuentes no la trazan de la misma manera. El [cookbook de OpenAI sobre ciclos de mejora de agentes](https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop) define el harness como "el contrato completo alrededor del modelo", que incluye los controles de validación. Una distinción práctica es considerar el harness como el entorno en el que se ejecuta el agente, y el loop como la política de control que determina qué ocurre entre una ejecución y la siguiente.',
          },
        ],
      },
      {
        title: 'La anatomía de un loop agéntico',
        paragraphs: [
          'Al cruzar la definición de IBM, la revisión del paper y la experiencia que Anthropic documentó con agentes de larga duración, emergen nueve componentes. El paper resume los elementos comunes de la literatura: ciclos iniciados por un cronograma o por eventos del repositorio, acotados por condiciones de parada verificables por máquina, con archivos de estado persistentes, subagentes verificadores, presupuestos de tokens y puntos definidos de escalamiento a personas.',
        ],
        blocks: [
          {
            type: 'ul',
            items: [
              '**Trigger.** El evento que inicia la ejecución: un comando, un cambio en el repositorio, una tarea programada o el fallo de otro ciclo.',
              '**Objetivo y especificación.** Lo que debe lograrse, expresado de modo que un componente distinto del agente pueda determinar si se logró.',
              '**Estado.** El progreso, conservado fuera de la ventana de contexto del modelo. Anthropic describe el problema con precisión: cada sesión nueva "comienza sin memoria de lo anterior". Su propuesta combina un archivo de progreso, una lista de funcionalidades en JSON y el historial de git ([Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)).',
              '**Ejecución del agente.** El razonamiento y el uso de herramientas, dentro de los límites que fija el harness.',
              '**Verificador.** Tests, compilación, contratos, análisis estático o la revisión de otro agente. Cuanto más determinista sea la señal, más confiable es el ciclo.',
              '**Feedback.** La información del verificador que se incorpora a la siguiente iteración, y el formato en que se entrega.',
              '**Reintento y recuperación.** Los mecanismos para corregir sin repetir el mismo error, incluida la posibilidad de volver a un estado válido conocido, por ejemplo mediante un commit.',
              '**Condiciones de parada.** Éxito verificado, presupuesto agotado, falta de avance o error no recuperable.',
              '**Intervención humana.** Los casos en los que el ciclo no debe decidir por sí mismo y devuelve el control.',
            ],
          },
          {
            type: 'mermaid',
            caption: 'Arquitectura de un loop agéntico con verificación y escalamiento',
            description: 'Un trigger inicia el ciclo, que carga objetivo y estado. El agente ejecuta, el verificador evalúa y el estado se actualiza. Si la verificación es satisfactoria, el ciclo termina con éxito. Si no lo es, se evalúa si el error requiere una decisión humana y si quedan presupuesto y avance; en caso contrario se escala a una persona. Si el ciclo puede continuar, la información estructurada del verificador alimenta la siguiente iteración.',
            text: `flowchart TD
  T["Trigger · comando, evento o cronograma"] --> G["Objetivo + especificación + estado persistido"]
  G --> A["Ejecución del agente · razonamiento + herramientas"]
  A --> V{"Verificador · tests, build, contratos"}
  V --> S[("Estado · progreso, intentos, evidencia")]
  S --> D{"¿Verificado?"}
  D -- "sí" --> OK["Fin: éxito con evidencia"]
  D -- "no" --> R{"¿Requiere decisión humana?"}
  R -- "sí" --> H["Intervención humana"]
  R -- "no" --> B{"¿Hay presupuesto y avance?"}
  B -- "no" --> H
  B -- "sí" --> F["Feedback estructurado"]
  F --> A`,
          },
          {
            type: 'code',
            lang: 'python',
            caption: 'Pseudocódigo de un loop con verificadores, presupuesto y detección de estancamiento',
            text: `def run_loop(goal, spec, state, budget):
    while True:
        result = agent.execute(goal, spec, context=state.relevant(), feedback=state.last_feedback)
        report = verifiers.run(result)          # build, tests, contratos: señales deterministas
        state.record(result, report)            # persistido en archivos y commits, no en el contexto

        if report.passed and acceptance.met(spec, result):
            return Done(evidence=report)        # éxito = verificación + aceptación, no la palabra del agente

        if report.requires_human():             # dependencias nuevas, credenciales, ambigüedad de negocio
            return Escalate(reason=report.blocker, state=state)

        if state.iterations >= budget.max_iterations or state.cost >= budget.max_cost \\
           or state.elapsed >= budget.max_time:
            return Escalate(reason="presupuesto agotado", state=state)

        if state.no_progress(window=2):         # los mismos errores en dos iteraciones seguidas
            return Escalate(reason="sin avance", state=state)

        state.last_feedback = report.structured()   # archivo:línea, regla incumplida, salida del comando
        if report.regressed():
            state.restore_last_good()               # recuperación: volver al último estado verificado`,
          },
          {
            type: 'p',
            text: 'Dos aspectos del pseudocódigo concentran buena parte del diseño. El primero es que el éxito exige verificación y, además, aceptación contra la especificación: que los tests pasen es una condición necesaria, no suficiente. El segundo es que existen tres salidas distintas del éxito —decisión humana, presupuesto agotado y falta de avance— y en todas el estado queda preparado para que otra persona u otro agente retome el trabajo.',
          },
        ],
      },
      {
        title: 'Un caso de aplicación: loops dentro de un sistema multiagente',
        paragraphs: [
          'En [un artículo anterior](/blog/orquestacion-multiagente-website-factory/) describí [Website Factory](https://github.com/juliancardozo/website-factory-mvp), un sistema en el que un orquestador de Claude Code coordina seis subagentes especializados para convertir un brief en Markdown en un sitio Astro con Tailwind CSS 4, sobre el flujo de GitHub Spec Kit. Los agentes no se comunican entre sí: intercambian información a través de archivos. Aquel texto se centraba en la orquestación; este se ocupa de una cuestión diferente.',
          'Orquestar consiste en decidir quién hace cada tarea y en qué orden. Diseñar loops consiste en decidir qué ocurre cuando un resultado no cumple lo esperado. Un flujo bien orquestado pero sin ciclos de corrección se interrumpe ante el primer error; un sistema con ciclos pero sin orquestación reintenta sin saber a qué componente corresponde el problema. Ambos diseños se necesitan.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Distribución de responsabilidades en Website Factory',
            head: ['Responsabilidad', 'Responsable', 'Artefacto'],
            rows: [
              ['Planificación', 'Orquestador, mediante las skills de Spec Kit (specify, plan, tasks, analyze)', '`spec.md`, `plan.md`, `tasks.md`'],
              ['Ejecución', 'Subagentes especializados; el `frontend-engineer` implementa', '`docs/*.md`, `src/`'],
              ['Verificación', '`astro check`, `astro build`, `validate_content.py` y un `qa-reviewer` independiente', '`docs/qa-report.md`'],
              ['Control', 'Orquestador: prioridades, reintentos, parada y escalamiento', '`docs/agent-runs.md`'],
            ],
          },
          { type: 'h3', text: 'Lo que el sistema ya incorpora' },
          {
            type: 'ul',
            items: [
              '**Un ciclo interno de implementación.** El agente que implementa ejecuta la verificación de tipos y el build; un error de compilación vuelve como salida del comando y origina una nueva iteración dentro de su sesión.',
              '**Un ciclo de evaluación y corrección acotado.** El `qa-reviewer` registra hallazgos con severidad y referencia `archivo:línea`; el orquestador aplica correcciones con un máximo de dos iteraciones, y lo que queda sin resolver se documenta como pendiente.',
              '**Verificación antes y después de implementar.** `/speckit.analyze` revisa la consistencia entre especificación, plan y tareas antes de escribir código, y `/speckit.converge` compara especificación y código al final.',
              '**Estado fuera del contexto.** La especificación, las tareas, el reporte de QA y el registro de cada delegación quedan en archivos versionados. Es un punto relevante: en su análisis de repositorios, el paper identificó 217 proyectos con ciclos autónomos y observó que casi todos versionaban la configuración que inicia el ciclo, pero casi ninguno los archivos de estado.',
              '**Escalamiento según el tipo de error.** Cuando una tarea requería instalar una dependencia nueva, el sistema no la instaló: marcó la tarea como bloqueada y trasladó la decisión.',
            ],
          },
          {
            type: 'p',
            text: 'Un hallazgo de esa ejecución muestra por qué el verificador también necesita ser verificado. El `qa-reviewer` detectó que el validador escrito por el agente de frontend cubría menos casos que el contrato que debía controlar. Un ciclo que confía en un verificador incompleto converge rápido, pero hacia un resultado equivocado.',
          },
          { type: 'h3', text: 'Mejoras posibles, todavía no implementadas' },
          {
            type: 'ul',
            items: [
              '**Un trigger automático.** Hoy el ciclo se inicia manualmente con `/website-factory`; un pull request que modifique un brief sería un disparador natural.',
              '**Presupuestos explícitos** de tokens, tiempo y costo por ejecución, además del límite de iteraciones.',
              '**Detección de estancamiento**, comparando los errores de dos iteraciones consecutivas y escalando si se repiten.',
              '**Feedback con un esquema definido.** El reporte de QA es Markdown estructurado; un formato JSON con severidad, regla y ubicación sería más difícil de reinterpretar. Anthropic eligió JSON para su lista de funcionalidades precisamente porque el modelo tiende menos a modificarlo de forma indebida.',
              '**Verificación de punta a punta integrada al ciclo.** La revisión visual en tres anchos de pantalla se realizó con un navegador, pero no forma parte de los verificadores automáticos.',
            ],
          },
        ],
      },
      {
        title: 'Las condiciones de parada',
        paragraphs: [
          'La condición de parada es probablemente la decisión de diseño más importante de un loop, y también la que con más facilidad queda implícita. Cuando no está definida, el ciclo termina cuando el modelo considera que terminó. Anthropic documenta ese modo de falla: agentes que, al observar que hubo avances, dan el trabajo por concluido, o que marcan funcionalidades como completas antes de comprobarlas.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Tipos de condición de parada',
            head: ['Condición', 'Qué previene', 'Riesgo a considerar'],
            rows: [
              ['Máximo de iteraciones', 'Ciclos indefinidos y costos sin control', 'Un valor arbitrario; conviene basarlo en cuántas iteraciones suelen ser necesarias'],
              ['Presupuesto de tokens, tiempo y costo', 'Que una tarea simple consuma recursos desproporcionados', 'Interrumpir sin dejar el estado listo para retomar'],
              ['Aceptación verificable', 'Dar por exitoso un resultado sin evidencia', 'Criterios que el propio agente pueda reinterpretar'],
              ['Falta de avance', 'Reintentar el mismo error con otra formulación', 'Confundir cambio con avance: lo que importa son los errores resueltos, no el tamaño del diff'],
              ['Errores que requieren a una persona', 'Que el agente resuelva decisiones que no le corresponden', 'Clasificarlos de antemano: credenciales, dependencias, datos de negocio, despliegues'],
            ],
          },
          {
            type: 'p',
            text: 'El riesgo más difícil de advertir es aceptar un resultado incorrecto porque las pruebas pasan. Un ciclo optimiza contra su verificador; si el verificador mide algo más acotado que la necesidad real, el ciclo encontrará la manera de satisfacerlo sin resolver el problema. Es una forma de la ley de Goodhart aplicada a agentes. IBM aborda una cuestión cercana con el concepto de *comprehension debt*: la distancia entre la cantidad de código de un sistema y el grado en que las personas lo comprenden. Por eso resulta útil distinguir entre éxito técnico —el build pasa— y cumplimiento —el resultado responde a lo que el usuario necesitaba— y asegurar que este último incluya al menos un control que no haya escrito el mismo agente que produjo el código.',
          },
        ],
      },
      {
        title: 'Observabilidad y gobernanza',
        paragraphs: [
          'Desde la perspectiva de Platform Engineering, un loop agéntico es una carga de trabajo más, y requiere lo mismo que cualquier otra: trazas, logs, métricas, control de costos, permisos, aislamiento y auditoría. El cookbook de OpenAI ilustra un ciclo de mejora del propio agente en el que, según sus palabras, las trazas muestran qué ocurrió, el feedback explica qué importaba, los evals convierten esas expectativas en controles reutilizables y Codex implementa los cambios resultantes. Como punto de partida recomienda un ciclo revisado, en el que el sistema propone los cambios y una persona aprueba el diff antes del merge. Es un ejemplo construido con datos sintéticos, no una medición de resultados, pero su arquitectura es instructiva.',
          'En [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/), de febrero de 2026, OpenAI relató cómo un equipo construyó un producto interno cuyo código escribieron agentes, y señaló que el avance inicial fue más lento de lo previsto debido a un entorno insuficientemente especificado, no a las capacidades del modelo. La observación se extiende a los ciclos: la calidad del sistema depende en buena medida del entorno y de los verificadores.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Indicadores propuestos para evaluar un loop (propuesta; no son resultados medidos)',
            head: ['Indicador', 'Pregunta que responde'],
            rows: [
              ['Porcentaje de ejecuciones verificadas con éxito', '¿El ciclo resuelve lo que se le pide sin intervención?'],
              ['Reintentos por tarea aceptada', '¿Converge con pocas iteraciones o necesita muchas?'],
              ['Costo por tarea aceptada', '¿Cuánto cuesta un resultado útil, no una ejecución?'],
              ['Tasa de escalamiento humano, por motivo', '¿Escala por razones de riesgo o por fallas del propio ciclo?'],
              ['Tiempo hasta completar', '¿Cuánto transcurre desde el trigger hasta un resultado aceptado?'],
              ['Defectos detectados después de la aceptación', '¿El verificador es más débil que la necesidad?'],
            ],
          },
          {
            type: 'p',
            text: 'La gobernanza agrega dos requisitos que la Developer Experience no puede pasar por alto. Cada ejecución debe poder reconstruirse —qué recibió, qué herramientas usó, qué verificó y por qué se detuvo— y cada agente debe operar con identidad y permisos propios, aislado en un worktree o en un sandbox. Un ciclo que no puede auditarse difícilmente pueda adoptarse a escala en un equipo.',
          },
        ],
      },
      {
        title: 'Los límites de la autonomía',
        paragraphs: [
          'Los riesgos de un loop son los de cualquier sistema con realimentación, amplificados por un componente probabilístico:',
        ],
        blocks: [
          {
            type: 'ul',
            items: [
              '**Ciclos indefinidos**, que no fallan de manera visible: simplemente consumen recursos.',
              '**Verificadores insuficientes**, que convierten el ciclo en un mecanismo eficiente para producir resultados que superan controles equivocados.',
              '**Acumulación de errores.** Cada iteración parte del resultado anterior, de modo que un supuesto incorrecto temprano se convierte en la base de todo lo que sigue.',
              '**Contexto desactualizado.** El agente decide con una versión del estado que ya no es la vigente.',
              '**Éxito prematuro.** El agente declara terminado un trabajo que no verificó de punta a punta.',
            ],
          },
          {
            type: 'p',
            text: 'Por estas razones, la autonomía de un sistema agéntico no debería evaluarse por la cantidad de intervención humana que elimina, sino por la evidencia verificable que produce y por la claridad de sus límites operativos. Mayor autonomía sin mayor evidencia no reduce el riesgo: lo desplaza.',
          },
        ],
      },
      {
        title: 'Por dónde empezar',
        paragraphs: [
          'Para un equipo que quiera diseñar su primer loop, una secuencia razonable es la siguiente:',
        ],
        blocks: [
          {
            type: 'ol',
            items: [
              '**Elegir una tarea con un verificador confiable y de bajo costo**, como un build y una suite de tests, o el cumplimiento de un contrato. Sin verificador no hay un ciclo de control, sino reintentos.',
              '**Definir las condiciones de parada antes que el prompt**: éxito, presupuesto, falta de avance y casos de escalamiento.',
              '**Mantener el estado fuera del contexto**, con un archivo de progreso y un commit por iteración.',
              '**Estructurar el feedback** con archivo, línea, regla incumplida y salida del comando, en lugar de mensajes genéricos.',
              '**Comenzar con un ciclo revisado**, en el que el sistema propone y una persona aprueba, y reducir la revisión solo donde la evidencia lo justifique.',
              '**Medir resultados por tarea aceptada**, no por ejecución.',
            ],
          },
        ],
      },
      {
        title: 'El rol del ingeniero',
        paragraphs: [
          'Desde la gestión de equipos de ingeniería, el cambio que se observa no implica menos ingeniería, sino ingeniería ejercida en otro nivel. Diseñar un loop requiere las competencias de siempre —definir requisitos verificables, elegir buenos tests, anticipar modos de falla, gestionar el riesgo y cuidar la experiencia de quienes usan el sistema—, aplicadas ahora a un ejecutor que no es una persona.',
          'Para un Tech Lead, esto desplaza buena parte del trabajo de mayor impacto hacia el verificador y las condiciones de parada, más que hacia la redacción del prompt. Para un Engineering Manager, implica tratar la adopción de agentes como una decisión de plataforma y de gobernanza, con métricas de resultado y puntos de escalamiento definidos. La ingeniería no desaparece; cambia el nivel de abstracción en el que se ejerce.',
        ],
        blocks: [
          { type: 'h3', text: 'Referencias' },
          {
            type: 'ul',
            items: [
              '[What is loop engineering?](https://www.ibm.com/think/topics/loop-engineering) — Ivan Belcic y Cole Stryker, IBM Think, 17 de julio de 2026.',
              '[Loop Engineering: Building Blocks, Adoption, and Impact](https://arxiv.org/abs/2608.21884) — Lulla, Nersesyan, Mohsenimofidi, Treude y Baltes, arXiv:2608.21884, agosto de 2026 (v3, octubre de 2026; JAWs@ASE 2026).',
              '[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Justin Young, Anthropic, 26 de noviembre de 2025.',
              '[Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — Ryan Lopopolo, OpenAI, 11 de febrero de 2026.',
              '[Build an Agent Improvement Loop with Traces, Evals, and Codex](https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop) — OpenAI Cookbook, 2026.',
              '[Website Factory](https://github.com/juliancardozo/website-factory-mvp) — repositorio del caso, con la ejecución completa.',
            ],
          },
        ],
      },
    ],
    takeaway: 'En síntesis: un loop no es un agente que reintenta, sino un componente con disparador, estado persistido, verificador independiente, feedback estructurado, presupuesto y condiciones de parada definidas antes que el prompt. Poder explicar cuándo y por qué se detiene es la mejor prueba de que fue diseñado.',
  },
  {
    slug: 'orquestacion-multiagente-website-factory',
    seoTitle: 'Orquestación multiagente: 7 agentes que construyen un sitio',
    seoDescription: 'Un orquestador de Claude Code y seis subagentes con Spec Kit convierten un brief en un sitio Astro: topología, contratos, contexto y loops verificables.',
    title: 'Siete agentes, un objetivo: cómo se orquesta un sistema multiagente que construye un sitio web',
    description: 'Website Factory es un sistema multiagente: un orquestador de Claude Code descompone el problema, delega en seis subagentes especializados y cierra cada etapa con verificadores deterministas sobre el flujo de GitHub Spec Kit. Cómo se coordinan, cómo se programa un sistema para que los agentes ejecuten los prompts, y qué significan en la práctica prompt engineering, context engineering y loop engineering.',
    category: 'IA y agentes',
    tags: ['IA', 'Agentes', 'Arquitectura', 'Liderazgo'],
    date: '2026-11-12',
    readingTime: '16 min de lectura',
    projectSlug: '',
    contextLabel: 'Sistemas multiagente · repositorio público juliancardozo/website-factory-mvp',
    sourceUrl: 'https://github.com/juliancardozo/website-factory-mvp',
    sourceLabel: 'Repositorio: juliancardozo/website-factory-mvp',
    lead: 'Un modelo de lenguaje, por sí solo, es una función estocástica: recibe contexto y devuelve una muestra. Un agente es esa función dentro de un loop con herramientas, memoria y un criterio de parada. Y un sistema multiagente es otra cosa: una arquitectura distribuida donde varias de esas inferencias se reparten el trabajo, comparten estado y se controlan entre sí. Website Factory es un ejemplo completo y público: un orquestador de Claude Code descompone un objetivo, lo delega en seis subagentes especializados sobre el flujo Spec-Driven Development de GitHub Spec Kit y solo da una etapa por cerrada cuando un verificador determinista lo confirma. Entrada: un brief en Markdown. Salida: un sitio Astro + Tailwind CSS 4 que compila, pasa sus controles y deja la traza de cada decisión. Este artículo abre el sistema por dentro.',
    sections: [
      {
        title: 'De la inferencia al sistema',
        paragraphs: [
          'Para entender por qué hace falta orquestar, conviene separar tres niveles que en la conversación cotidiana se mezclan:',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Tres niveles de abstracción en IA generativa aplicada',
            head: ['Nivel', 'Qué es', 'Unidad de diseño', 'Modo de falla típico'],
            rows: [
              ['Modelo', 'Una inferencia: contexto → distribución → muestra', 'El prompt', 'Alucinación: una salida plausible y sin grounding'],
              ['Agente', 'Un loop de razonamiento y acción con tool use (patrón ReAct)', 'Herramientas, contexto y condición de parada', 'Deriva: el loop no converge o converge a algo incorrecto'],
              ['Sistema multiagente', 'Varios agentes con roles, estado compartido y control', 'Topología, contratos, verificadores y límites', 'Errores en cascada: la salida mala de uno es la entrada de otro'],
            ],
          },
          {
            type: 'p',
            text: 'Con un agente generalista las tres fallas se acumulan en un único contexto: el mismo loop decide posicionamiento, copy, SEO, accesibilidad y código, y además evalúa su propio trabajo. La ventana de contexto se llena de información irrelevante para cada subtarea, la atención del modelo se diluye y no hay ningún punto independiente que detecte el error antes de que se propague. La respuesta de ingeniería es la misma que en cualquier sistema distribuido: **descomponer, aislar, contratar interfaces y verificar en los bordes**.',
          },
          {
            type: 'p',
            text: 'En Website Factory el repositorio pasa a ser **el programa que ejecutan los agentes**: las reglas (`CLAUDE.md`), los roles (`.claude/agents/*.md`), los flujos (`.claude/skills/*/SKILL.md`), las especificaciones (`specs/`) y los verificadores (`scripts/`) son el código fuente del sistema, y el modelo es el runtime. Los prompts que recibe cada agente no se escriben a mano: los genera el orquestador a partir de ese programa.',
          },
        ],
      },
      {
        title: 'El problema y las restricciones de diseño',
        paragraphs: [
          'El objetivo es una **fábrica reproducible**: dado cualquier brief con el mismo formato, producir un sitio que compile, pase controles automáticos y deje evidencia de cada decisión. El caso de demostración del repositorio es *Supermercado Los Álamos*, un comercio ficticio. Antes de escribir una línea se fijaron cinco restricciones, que funcionan como la función objetivo del sistema:',
        ],
        blocks: [
          {
            type: 'ol',
            items: [
              '**Grounding estricto: el brief es la fuente de verdad.** Cada dato comercial se etiqueta como `VERIFIED`, `ASSUMPTION`, `PLACEHOLDER` o `BLOCKED`. Lo no confirmado no se publica como si fuera real: es la defensa estructural contra la alucinación.',
              '**Especialización con mínimo privilegio**: cada rol con sus herramientas y sus archivos de salida, y nada más.',
              '**Trazabilidad de punta a punta**: IDs que conecten brief → requisitos → spec → copy → tareas → código → QA.',
              '**Verificación determinista**: `astro check`, `astro build` y un validador de contenido tienen que pasar; no alcanza con que el agente diga que pasaron.',
              '**Personas en los puntos de riesgo**: nada de despliegues, dependencias nuevas ni servicios externos sin aprobación explícita.',
            ],
          },
          {
            type: 'note',
            label: 'Alcance',
            text: 'MVP de hasta cinco páginas, sin CMS, pagos, autenticación ni formularios con backend. Stack fijo: Astro con TypeScript y salida estática, Tailwind CSS 4 vía @tailwindcss/vite, JavaScript de cliente solo cuando una funcionalidad lo justifique.',
          },
        ],
      },
      {
        title: 'Topología: un orquestador, seis especialistas',
        paragraphs: [
          'La primera decisión de arquitectura fue la topología. El sistema usa **orquestador + especialistas** (hub-and-spoke), que en la taxonomía de Anthropic sobre sistemas agénticos corresponde al patrón *orchestrator-workers*. Hay una sola sesión principal de Claude Code que decide prioridades, permisos, reintentos y resultado final. Los subagentes no se hablan entre sí, y no pueden crear otros agentes ni modificar las reglas superiores.',
          'La coordinación no ocurre por mensajes sino **a través de archivos**, al estilo de una arquitectura *blackboard*: cada agente lee los artefactos que produjeron los anteriores y escribe solo los suyos. Esto tiene tres ventajas sobre un chat entre agentes: el estado es inspeccionable y versionable con git, el contexto de cada agente queda acotado a lo que necesita, y el orquestador puede auditar cualquier paso intermedio.',
        ],
        blocks: [
          {
            type: 'mermaid',
            caption: 'Topología orquestador-especialistas con coordinación por archivos',
            description: 'El brief entra al orquestador. El business-analyst produce requisitos e inventario. Brand-strategist y content-seo-specialist trabajan en paralelo. El ux-ui-designer produce el sistema de diseño. El frontend-engineer implementa y el qa-reviewer audita; sus hallazgos vuelven al orquestador con un máximo de dos iteraciones. Cada delegación queda registrada en agent-runs.md.',
            text: `flowchart TD
  B["briefs/*.md · fuente de verdad"] --> O
  subgraph O["Orquestador · CLAUDE.md + skill /website-factory"]
    direction TB
    K1["/speckit.constitution"] --> K2["/speckit.specify"]
    K2 --> K3["/speckit.plan · tasks · analyze"]
    K3 --> K4["/speckit.converge"]
  end
  O -- "1" --> BA["business-analyst"]
  BA --> D1[("requirements.md · content-inventory.md")]
  D1 --> O
  O -- "2 · paralelo" --> BS["brand-strategist"]
  O -- "2 · paralelo" --> CS["content-seo-specialist"]
  BS --> D2[("brand-strategy.md")]
  CS --> D3[("copy-deck.md · seo-plan.md")]
  D2 --> UX["ux-ui-designer"]
  D3 --> UX
  UX --> D4[("design-system.md · site-map.md")]
  D4 --> O
  O -- "3 · plan + tasks" --> FE["frontend-engineer"]
  FE --> SRC[("src/ · check · build")]
  SRC --> QA["qa-reviewer"]
  QA --> D5[("qa-report.md")]
  D5 -- "máx. 2 iteraciones" --> O
  O -.-> LOG[("agent-runs.md")]`,
          },
          { type: 'h3', text: 'Los seis especialistas y su superficie de herramientas' },
          {
            type: 'table',
            caption: 'Roles, herramientas y propiedad de archivos (definidos en .claude/agents/)',
            head: ['Agente', 'Responsabilidad', 'Herramientas', 'Es dueño de'],
            rows: [
              ['business-analyst', 'Brief → REQ-001..n con Given/When/Then, supuestos y bloqueos; clasifica cada dato', 'Read, Grep, Glob, Write', 'requirements.md, content-inventory.md'],
              ['brand-strategist', 'Posicionamiento, tono, mensajes por sección, dirección visual', 'Read, Grep, Glob, Write', 'brand-strategy.md'],
              ['content-seo-specialist', 'Copy con IDs estables (HOME-S1-SUB…), SEO local, JSON-LD estricto', 'Read, Grep, Glob, Write', 'copy-deck.md, seo-plan.md'],
              ['ux-ui-designer', 'Tokens @theme, componentes con props, responsive 360/768/1440, foco', 'Read, Grep, Glob, Write', 'design-system.md, site-map.md'],
              ['frontend-engineer', 'Implementa tasks.md en Astro + TS + Tailwind 4', 'Read, Grep, Glob, Write, Edit, **Bash**', 'src/, public/, astro.config.mjs'],
              ['qa-reviewer', 'Auditoría independiente brief ↔ spec ↔ diseño ↔ código', 'Read, Grep, Glob, **Bash**, Write', 'qa-report.md'],
            ],
          },
          {
            type: 'p',
            text: 'Dos principios de coordinación sostienen la tabla. **Propiedad exclusiva de archivos**: como `brand-strategist` y `content-seo-specialist` escriben archivos distintos, pueden correr en paralelo (*fan-out*) sin condiciones de carrera; las ediciones de un mismo archivo se serializan. **Mínimo privilegio**: los cuatro roles de análisis y diseño no tienen `Bash`, así que no pueden instalar paquetes, borrar archivos ni ejecutar nada. Solo compila quien implementa y solo verifica quien audita.',
          },
        ],
      },
      {
        title: 'Programar el sistema para que los agentes ejecuten los prompts',
        paragraphs: [
          'La tendencia más interesante de la ingeniería agéntica es esta: dejamos de escribir prompts y empezamos a **programar sistemas que generan y ejecutan prompts**. En Website Factory hay tres capas, cada una con un nivel de abstracción distinto:',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Las capas del programa agéntico',
            head: ['Capa', 'Archivo', 'Equivalente en software tradicional', 'Qué define'],
            rows: [
              ['Gobernanza', '`CLAUDE.md` + `.specify/memory/constitution.md`', 'Invariantes y políticas del sistema', 'Misión, regla de oro, secuencia obligatoria, política de subagentes, quality gates'],
              ['Flujo', '`.claude/skills/website-factory/SKILL.md`', 'Función principal / pipeline', 'Los nueve pasos, qué agente o skill corre en cada uno, qué se paraleliza'],
              ['Roles', '`.claude/agents/*.md`', 'Módulos con interfaz', 'Rol, inputs, outputs, restricciones y herramientas permitidas'],
              ['Contexto de trabajo', '`specs/001-…/` y `docs/`', 'Estado / memoria compartida', 'Spec, plan, contratos, tareas y artefactos intermedios'],
              ['Verificación', '`scripts/validate_content.py`, `npm run check/build`', 'Tests', 'Señales deterministas de aprobado o fallido'],
            ],
          },
          {
            type: 'p',
            text: 'Con esa estructura, `/website-factory briefs/cliente.md` se comporta como una llamada a función: la skill lee el brief, recorre la secuencia y, en cada paso, **compila un prompt** para el agente que corresponde. Ese prompt no es fijo; se construye con las rutas, los criterios de aceptación y las restricciones del paso actual.',
          },
          {
            type: 'p',
            text: 'Una distinción que el `CLAUDE.md` deja explícita, porque es fácil de confundir: las invocaciones `/speckit.*` son operaciones del orquestador dentro del chat de Claude Code, no comandos de terminal, y que un agente "escriba una spec" no equivale a ejecutar `/speckit.specify`. El sistema tiene dos runtimes —el shell y el agente— y cada instrucción tiene que dejar claro en cuál corre.',
          },
        ],
      },
      {
        title: 'Prompt engineering: cada delegación es un contrato',
        paragraphs: [
          'El prompt engineering cambia de naturaleza cuando quien escribe el prompt es otro agente. Ya no se trata de encontrar la frase mágica, sino de definir **una interfaz**: qué entra, qué sale, cómo se valida y cuándo se termina. Por cada delegación, el orquestador genera un prompt con seis secciones obligatorias y registra un resumen en `docs/agent-runs.md`.',
        ],
        blocks: [
          {
            type: 'code',
            lang: 'text',
            caption: 'Contrato de delegación (ejemplo reconstruido a partir del registro de la ejecución)',
            text: `MISSION:          Convertir el brief en requisitos verificables y clasificar
                  cada dato como VERIFIED / ASSUMPTION / PLACEHOLDER / BLOCKED.
INPUTS:           briefs/supermercado-los-alamos.md
                  .specify/memory/constitution.md · CLAUDE.md · docs/quality-gates.md
OUTPUT FILES:     docs/requirements.md · docs/content-inventory.md   (solo estos)
ACCEPTANCE:       REQ-001..n con criterios Given/When/Then; cada dato comercial
                  con estado y línea del brief; supuestos A-xx y bloqueos B-xx.
CONSTRAINTS:      No inventar cifras, reseñas, servicios ni canales de contacto.
                  Stack y alcance fijos. No editar archivos de otros agentes.
STOP CONDITIONS:  Si un dato es contradictorio, marcarlo BLOCKED y devolver el
                  control; no resolver la ambigüedad por cuenta propia.`,
          },
          {
            type: 'ul',
            items: [
              '**MISSION** acota el rol a una responsabilidad. Un agente con una misión difusa expande su alcance.',
              '**INPUTS** con rutas exactas es *context engineering*: el agente no explora el repo buscando qué leer, recibe exactamente lo necesario.',
              '**OUTPUT FILES** convierte la propiedad de archivos en parte del contrato y hace posible la paralelización.',
              '**ACCEPTANCE** con IDs medibles permite que otro agente (el QA) verifique sin interpretar.',
              '**CONSTRAINTS** repite las invariantes en el punto de uso: no se confía en que el agente "recuerde" la constitución.',
              '**STOP CONDITIONS** es la sección que más se olvida y la que más importa: define cuándo el agente tiene que dejar de intentar y devolver el control.',
            ],
          },
          {
            type: 'p',
            text: 'Los prompts de rol (`.claude/agents/*.md`) son estables y cortos; los prompts de tarea son dinámicos y específicos. Esa separación es la misma que entre la definición de una clase y la llamada a uno de sus métodos con argumentos.',
          },
        ],
      },
      {
        title: 'Context engineering: el contexto es un presupuesto',
        paragraphs: [
          'Si el prompt es la interfaz, el contexto es la memoria de trabajo, y es un recurso finito. Cuanto más ruido entra en la ventana de contexto, peor decide el modelo. El diseño del enjambre es, en buena medida, una estrategia de gestión de contexto:',
        ],
        blocks: [
          {
            type: 'ul',
            items: [
              '**Aislamiento por subagente.** Cada subagente arranca con su propia ventana de contexto. El `ux-ui-designer` no carga la conversación sobre JSON-LD; el orquestador solo recibe resúmenes, no la exploración completa de cada agente.',
              '**Memoria externa en archivos.** Los artefactos de `docs/` y `specs/` son memoria persistente: sobreviven a la sesión, se pueden leer por partes y cualquier agente posterior los consume sin reconstruirlos.',
              '**Contexto progresivo.** Las skills se cargan cuando se invocan; los roles exponen una `description` corta y el cuerpo completo entra solo cuando el agente se usa.',
              '**IDs estables como índice.** `REQ-007`, `FR-012`, `CONT-S2-MAP-TITLE`, `T024`: un agente puede citar y buscar un requisito sin copiar su texto, y el QA puede cruzar capas con `grep`.',
              '**Fuente única de datos.** Dirección, teléfono y horarios aparecen literalmente en un solo archivo, `src/content/site.ts` (contrato C-01). Menos duplicación también es menos contexto contradictorio.',
            ],
          },
          {
            type: 'code',
            lang: 'ts',
            caption: 'src/content/site.ts: cada dato comercial lleva su estado y su origen en el brief',
            text: `// --- Teléfono: BRIEF-VALIDAR (brief L148, B-03); formato E.164 = ASSUMPTION (A-09) ---
export const phone: Phone = {
  display: '0000 00-0000', // BRIEF-VALIDAR
  e164: phoneE164,          // ASSUMPTION (A-09)
  href: 'tel:' + phoneE164,
};

// --- Horarios: BRIEF-VALIDAR (brief L151-152). Sin feriados (PENDIENTE) ni "abierto ahora". ---
export const hours: OpeningHours[] = [
  { days: 'Lunes a sábado', value: '07:30 a 21:00', closed: false }, // BRIEF-VALIDAR
  { days: 'Domingo', value: 'Cerrado', closed: true },               // BRIEF-VALIDAR
];

export const offers: Offer[] = []; // sin ofertas confirmadas → estado vacío honesto`,
          },
        ],
      },
      {
        title: 'Loop engineering: iterar con señales deterministas',
        paragraphs: [
          'Todo agente es un loop: reunir contexto, actuar, observar el resultado y decidir si sigue. Un sistema multi-agente es un **loop de loops**. Llamo *loop engineering* a diseñar esos ciclos de forma explícita: qué señal cierra cada iteración, cuántas iteraciones se permiten y qué pasa cuando se agotan. Un loop sin señal de salida diverge; un loop con una señal blanda ("me parece que quedó bien") converge a cualquier cosa.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Los loops del sistema y sus condiciones de salida',
            head: ['Loop', 'Quién itera', 'Señal de feedback', 'Límite / salida'],
            rows: [
              ['Interno de implementación', 'frontend-engineer', '`astro check` y `astro build` (exit code)', '0 errores, 0 warnings; si no, corrige y reintenta'],
              ['Consistencia de especificación', 'Orquestador con `/speckit.analyze`', 'Hallazgos CRITICAL / MEDIUM / LOW entre spec, plan y tasks', 'No se implementa con CRITICAL abiertos'],
              ['Evaluador-optimizador', 'qa-reviewer → orquestador → corrección', 'Hallazgos BLOCKER / MAJOR / MINOR con evidencia `archivo:línea`', '**Máximo dos iteraciones**; lo no resuelto queda como pendiente documentado'],
              ['Convergencia', 'Orquestador con `/speckit.converge`', 'Brechas entre spec y código generado', 'Converged, o tarea bloqueada a la espera de una persona'],
              ['Aprobación humana', 'Persona', 'Decisión explícita', 'Dependencias nuevas, servicios externos y despliegue'],
            ],
          },
          {
            type: 'p',
            text: 'El patrón *evaluator-optimizer* (un agente produce, otro evalúa, el primero corrige) funciona solo si el evaluador es **independiente**: otro contexto, otro prompt, criterios escritos de antemano. Si el mismo agente que implementó se autoevalúa, tiende a confirmar lo que hizo: es el equivalente agéntico de evaluar un modelo con sus propios datos de entrenamiento. Por eso el `qa-reviewer` no recibe el razonamiento del implementador, solo los artefactos; no hay fuga de información entre quien produce y quien evalúa.',
          },
          {
            type: 'p',
            text: 'Y la parte que hace que los loops sean confiables: las señales de cierre son **deterministas** siempre que se pueda. El modelo muestrea de una distribución; el exit code de un build no. En términos de aprendizaje por refuerzo, el verificador es una función de recompensa verificable: binaria, barata de calcular e imposible de convencer con una buena redacción. El validador de contenido convierte reglas de negocio en una señal binaria:',
          },
          {
            type: 'code',
            lang: 'python',
            caption: 'scripts/validate_content.py (fragmento): invariante C-01 de fuente única',
            text: `single_source = src / 'content' / 'site.ts'
for f in src_files:
    if f == single_source:
        continue
    s = f.read_text(encoding='utf-8')
    for m in re.finditer(r'Ejemplo|B0000|00-0000|000000|07:30|21:00', s):
        errors.append(f'{f.relative_to(root)}: C-01 dato comercial literal fuera de site.ts ("{m.group(0)}")')`,
          },
        ],
      },
      {
        title: 'El arnés: guardrails que no dependen del modelo',
        paragraphs: [
          'Un enjambre sin límites diverge. Además de los loops, el sistema tiene frenos que no dependen de que el modelo "se porte bien":',
        ],
        blocks: [
          {
            type: 'ol',
            items: [
              '**Constitución versionada** con seis principios no negociables (brief como fuente de verdad, stack fijo, contenido separado del diseño, accesibilidad, SEO local honesto, verificabilidad). `/speckit.plan` incluye un *Constitution Check* que tiene que pasar.',
              '**Estados vacíos honestos**: canales sin confirmar con `value: null` no se renderizan; `offers: []` muestra "todavía no hay ofertas publicadas", nunca precios de ejemplo.',
              '**SEO sin inventar**: sin `canonical`, `og:url` ni `og:image` mientras no exista una URL pública confirmada; JSON-LD `GroceryStore` solo con `name` y `address`.',
              '**Permisos del proyecto mínimos**: `.claude/settings.json` solo habilita el navegador contra `127.0.0.1:4321` para la revisión visual local.',
              '**Sin acciones externas**: no se declaran pruebas de navegador ni puntuaciones Lighthouse que no se ejecutaron, y no se instala nada sin aprobación.',
              '**Registro de cada delegación** en `docs/agent-runs.md`: fecha, agente, misión, entradas, salidas, validación y estado. Es el *trace* del sistema.',
            ],
          },
        ],
      },
      {
        title: 'Qué produjo una ejecución completa',
        paragraphs: [
          'La ejecución completa quedó en el repositorio: specs, documentación intermedia, registro de agentes, reporte de QA y el sitio generado. Estos son los números, todos verificables en `docs/agent-runs.md` y `docs/qa-report.md`:',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Resultados de la ejecución sobre el brief de Supermercado Los Álamos',
            head: ['Etapa', 'Resultado'],
            rows: [
              ['Análisis de negocio', '18 requisitos, 11 supuestos y 8 bloqueos explícitos'],
              ['Especificación (`/speckit.specify`)', '4 historias de usuario, FR-001..019 trazados a REQ, SC-001..007; checklist 16/16, sin necesidad de `/speckit.clarify`'],
              ['Diseño', '34 componentes especificados, tokens `@theme`, ilustraciones SVG propias en lugar de fotos sin licencia'],
              ['Plan y tareas', 'Investigación R-01..08, contratos C-01..03, 41 tareas organizadas por historia'],
              ['`/speckit.analyze`', '0 CRITICAL, 2 MEDIUM, 4 LOW; los relevantes se corrigieron en `tasks.md` antes de implementar'],
              ['Implementación', '`astro check` 0 errores / 0 warnings / 0 hints; build de 5 páginas; validador PASS'],
              ['QA independiente', '0 BLOCKER, 0 MAJOR, 8 MINOR'],
              ['Revisión visual', '5 páginas × 3 anchos (360/768/1440): 15/15 sin scroll horizontal'],
              ['Convergencia', 'Converged; una tarea (cargar tipografías) bloqueada a la espera de aprobación'],
            ],
          },
          { type: 'h3', text: 'Lo que mostró el loop de QA' },
          {
            type: 'p',
            text: 'El hallazgo más revelador fue QA-008: el `qa-reviewer` detectó que **el validador escrito por el `frontend-engineer` era más estrecho que el contrato** que debía verificar. Buscaba algunos datos literales pero no todos, y su patrón no detectaba "compras online". El auditor no solo revisa el código: revisa los tests. Se corrigió en la primera iteración, con prueba positiva y negativa.',
          },
          {
            type: 'p',
            text: 'El otro momento clave fue una parada correcta. El brief pedía tipografías específicas; cargarlas requería instalar paquetes `@fontsource`. Como eso es una dependencia nueva, el sistema no la instaló: dejó la tarea T040 bloqueada, lo documentó como QA-001 y devolvió la decisión. Un agente que sabe detenerse vale más que uno que siempre termina.',
          },
          {
            type: 'note',
            label: 'Veredicto del propio sistema',
            text: 'Aprobado para preview local con observaciones; no apto para producción hasta validar teléfono y horarios con el comercio, confirmar categorías, sumar fotos con licencia y definir dominio. Que el sistema diga esto de sí mismo es parte del resultado.',
          },
          { type: 'h3', text: 'Límites honestos' },
          {
            type: 'ul',
            items: [
              'Es no determinista: otra ejecución con el mismo brief puede producir otro sitio que cumpla igualmente la spec. Lo reproducible es el proceso y los controles, no el HTML exacto.',
              '`validate_content.py` es heurístico: no reemplaza una revisión editorial ni una auditoría de seguridad.',
              'No incluye Playwright, Lighthouse ni despliegue automático. La prueba de teclado asistida quedó registrada como no ejecutada.',
              'Para varios clientes en paralelo conviene un repo o una rama por proyecto, para que no choquen `specs/` ni el estado de `.specify/`.',
            ],
          },
        ],
      },
      {
        title: 'Principios de diseño para sistemas multiagente',
        paragraphs: [
          'La conclusión no es que los agentes reemplacen a un equipo, sino que **el trabajo de ingeniería se mueve un nivel de abstracción hacia arriba**. En lugar de escribir el sitio, escribimos el sistema que escribe sitios: sus reglas, sus roles, sus contratos y sus loops. Ese sistema se revisa en pull requests, se versiona y mejora entre ejecuciones.',
        ],
        blocks: [
          {
            type: 'ol',
            items: [
              '**Diseñá la topología antes que los prompts.** Orquestador único, especialistas sin comunicación lateral y coordinación por archivos es un punto de partida que escala y se puede auditar.',
              '**Tratá cada delegación como una llamada a una API**: misión, entradas, salidas, aceptación, restricciones y condición de parada.',
              '**El contexto es un presupuesto.** Aislá contextos por agente, persistí en archivos y pasá rutas exactas, no "mirá el repo".',
              '**Todo loop necesita una señal determinista y un límite.** Dos iteraciones y después una persona.',
              '**El evaluador tiene que ser independiente**, y también tiene que auditar los tests.',
              '**Mínimo privilegio por rol**: si un agente no necesita ejecutar comandos, no le des `Bash`.',
              '**Escribí dónde se detiene la autonomía**: dependencias, servicios externos, datos personales y despliegues pasan por una persona.',
            ],
          },
          {
            type: 'p',
            text: 'El repositorio es público y tiene licencia MIT. Se puede clonar, completar `templates/brief-template.md` con datos reales y correr `/website-factory briefs/mi-empresa.md` desde Claude Code. Me interesa saber cómo están armando sus propios arneses: ¿qué loops cerraron con señales deterministas y cuáles siguen dependiendo de "me parece que está bien"?',
          },
          { type: 'h3', text: 'Referencias' },
          {
            type: 'ul',
            items: [
              '[juliancardozo/website-factory-mvp](https://github.com/juliancardozo/website-factory-mvp) — repositorio del caso, con la ejecución completa.',
              '[GitHub Spec Kit](https://github.com/github/spec-kit) — toolkit de Spec-Driven Development (en el repo, versión 1.4.1.dev0).',
              '[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic: patrones orchestrator-workers, parallelization y evaluator-optimizer.',
              '[Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic: el contexto como recurso finito.',
              '[Subagents en Claude Code](https://docs.claude.com/en/docs/claude-code/sub-agents) — documentación oficial de subagentes, herramientas y contexto aislado.',
            ],
          },
        ],
      },
    ],
    takeaway: 'Criterio práctico: en un sistema multiagente no se optimiza el prompt, se diseña la arquitectura. Topología clara, contratos de delegación, contexto acotado, loops con señales deterministas y límites, y personas en los puntos donde un error cuesta caro.',
  },
  {
    slug: 'developer-experience-ia-friccion-plataforma',
    seoTitle: 'Developer Experience con IA: más velocidad no es menos fricción',
    seoDescription: 'El 87% de los developers entrega más rápido con IA, pero solo el 28% siente menos fricción. Qué dice el dato y qué puede hacer Platform Engineering.',
    title: 'Escribimos código más rápido. ¿Desarrollamos mejor software? DevEx, IA y Platform Engineering',
    description: 'El State of Developer Experience 2026 de Atlassian muestra una brecha entre velocidad y fricción. Qué dicen los datos, qué no dicen, y cómo una plataforma interna gestionada como producto, ahora también para agentes, puede cerrarla. Con las novedades de noviembre de 2026.',
    category: 'Liderazgo y plataforma',
    tags: ['Liderazgo', 'IA', 'Arquitectura', 'Infraestructura'],
    date: '2026-11-10',
    readingTime: '11 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis · State of Developer Experience 2026 (Atlassian) y novedades de noviembre de 2026',
    sourceUrl: 'https://www.atlassian.com/blog/development/developer-experience-report-2026',
    sourceLabel: 'Atlassian: State of Developer Experience 2026',
    lead: 'El State of Developer Experience 2026 de Atlassian dejó un dato que vale la pena mirar despacio: el 87% de los desarrolladores dice que la IA le permite entregar trabajo más rápido, pero solo el 28% percibe una reducción notable de la fricción en su día a día. Escribimos código más rápido. Eso no significa que estemos desarrollando mejor software. Para quienes lideramos equipos de ingeniería, esa brecha es el problema interesante: la IA aceleró la parte del trabajo que casi nunca era el cuello de botella.',
    sections: [
      {
        title: 'Qué dice el reporte, y qué no',
        paragraphs: [
          'El reporte se publicó el 20 de octubre de 2026 y se basa en una encuesta a 1.155 desarrolladores y 405 líderes de ingeniería, según la cobertura de InfoQ. Los números que más se repiten:',
        ],
        blocks: [
          {
            type: 'ul',
            items: [
              '**87%** dice que la IA lo ayuda a entregar más rápido; **28%** reporta notablemente menos fricción que antes de la IA. Atlassian lo resume así: el **72%** vive la misma fricción o más.',
              'La proporción que dice ahorrar **10 horas o más por semana** con IA cayó del **68%** en 2025 a alrededor de un cuarto en 2026 (Atlassian publica 25%; InfoQ, 26%).',
              '**65%** pasa tiempo corrigiendo lo que produce la IA y **49%** dedica cuatro horas o más por semana a gestionar herramientas de IA.',
              'Las mayores fuentes de fricción no son de código: **encontrar información (51%)**, **reuniones (50%)**, **cambio de contexto entre herramientas (45%)** y **deuda técnica (44%)**.',
              'Solo **17%** de los desarrolladores y **23%** de los líderes dice que su organización tiene una estrategia de IA clara e implementada. Entre quienes sí la tienen, el **41%** reporta menos fricción, contra el **22%** donde la estrategia es inconsistente.',
            ],
          },
          {
            type: 'note',
            label: 'Con qué cuidado leerlo',
            text: 'Es investigación de un proveedor, con datos autodeclarados y una muestra que cambió respecto de 2025: InfoQ lo señala explícitamente. Sirve como señal de dirección, no como benchmark para comparar tu equipo.',
          },
          {
            type: 'p',
            text: 'Aun con esa cautela, el patrón es consistente: la IA comprime el tiempo de escribir código, y la fricción se mueve hacia lo que rodea al código. Encontrar quién sabe algo, esperar una aprobación, entender una política de seguridad, revisar una salida generada. Ninguna de esas cosas se resuelve con un modelo más rápido.',
          },
        ],
      },
      {
        title: 'La fricción cambió de lugar',
        paragraphs: [
          'Un desarrollador no debería necesitar tres reuniones, dos tickets y conocer a la persona indicada para desplegar un servicio. Tampoco debería reconstruir un pipeline desde cero, configurar la observabilidad a mano o descubrir las políticas de seguridad recién cuando intenta llegar a producción.',
          'Cuando la escritura de código se acelera, esas esperas pesan más, no menos. Si antes un cambio tardaba dos días en escribirse y uno en aprobarse, la espera era un tercio del ciclo. Si ahora se escribe en dos horas, la misma aprobación es casi todo el ciclo. Es la teoría de restricciones aplicada a la ingeniería: optimizar fuera del cuello de botella no mejora el sistema.',
          'El Technology Radar Vol. 35 de Thoughtworks, publicado en noviembre de 2026, lo dice desde otro ángulo: pone en "Caution" usar el throughput de código como medida de productividad, y advierte que, con más agentes trabajando en paralelo, la capacidad de revisión se vuelve el cuello de botella y la supervisión puede degradarse en "human-in-the-loop theater".',
        ],
      },
      {
        title: 'Mejorar DevEx no es sumar herramientas: es eliminar fricción',
        paragraphs: [
          'Ahí es donde Platform Engineering genera impacto. Una Internal Developer Platform (IDP) bien diseñada transforma dependencias entre personas en capacidades reutilizables, seguras y disponibles por autoservicio. Los Golden Paths hacen que el camino recomendado sea también el más sencillo. DevSecOps integra los controles desde el diseño, en lugar de descubrirlos en la última milla. Y la observabilidad permite que los equipos sigan siendo autónomos después del despliegue.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'De la fricción reportada a la capacidad de plataforma (propuesta, no receta)',
            head: ['Fricción', 'Cómo se ve en el día a día', 'Capacidad de plataforma', 'Señal de que mejora'],
            rows: [
              ['Encontrar información', '"¿Quién es dueño de este servicio?", documentación desactualizada', 'Catálogo de servicios con dueños, docs junto al código, scorecards', 'Menos preguntas repetidas en canales; tiempo de onboarding'],
              ['Esperas y aprobaciones', 'Tickets para crear un ambiente, una base o un permiso', 'Autoservicio con políticas como código y aprobación solo donde hay riesgo', 'Lead time de solicitudes internas'],
              ['Cambio de contexto', 'Cinco consolas para desplegar y diagnosticar', 'Golden Paths con pipeline, observabilidad y alertas incluidas', 'Tiempo hasta el primer deploy de un servicio nuevo'],
              ['Seguridad tardía', 'Hallazgos en la revisión final, retrabajo', 'Controles DevSecOps en el template y en el pipeline', 'Hallazgos encontrados antes del merge vs. después'],
              ['Corregir salida de IA', 'Revisiones largas de cambios generados sin contexto', 'Contexto del repositorio y reglas del equipo disponibles para agentes; checks automáticos', 'Tasa de cambios generados que pasan revisión sin retrabajo'],
            ],
          },
        ],
      },
      {
        title: 'La plataforma es un producto, no un proyecto de infraestructura',
        paragraphs: [
          'Lo más importante no es la herramienta, es el modelo de gestión. Una plataforma tratada como proyecto se entrega y se mantiene. Una plataforma tratada como producto tiene usuarios, discovery, un roadmap priorizado por valor y métricas de resultado.',
          'Eso implica escuchar a los desarrolladores, entender dónde pierden tiempo, priorizar lo que genera valor y medir resultados: no solo cuántos servicios se desplegaron, sino cuánto mejoró el onboarding, cuánto disminuyó el tiempo de espera y cuánta autonomía ganaron los equipos.',
          'El reporte deja una pista sobre qué no medir. Según el análisis de Network Perspective sobre los datos de Atlassian, el 60% de los desarrolladores dice que el uso de IA se trata como señal de productividad, y el 81% de los líderes reconoce que medir el uso puede crear incentivos equivocados. Medir cuánto se usa una herramienta es medir actividad, no resultado.',
        ],
        blocks: [
          { type: 'h3', text: 'Métricas que conectan plataforma y negocio' },
          {
            type: 'ul',
            items: [
              '**Onboarding**: tiempo hasta el primer deploy o hasta el décimo pull request de una persona nueva. Atlassian publicó, a partir de datos de su plataforma DX, que la mediana hasta el décimo PR bajó a 30 días en el segundo trimestre de 2026.',
              '**Tiempo de espera**: cuánto tarda una solicitud interna (ambiente, permiso, base) desde que se pide hasta que está disponible.',
              '**Autoservicio**: proporción de esas solicitudes que se resuelven sin intervención humana.',
              '**Entrega**: las métricas DORA (frecuencia de despliegue, lead time, tasa de fallas, tiempo de recuperación) como contexto, no como objetivo individual.',
              '**Percepción**: una encuesta breve y periódica sobre fricción. Si la plataforma es un producto, sus usuarios tienen que poder decir si les sirve.',
            ],
          },
        ],
      },
      {
        title: 'El segundo usuario de la plataforma: los agentes',
        paragraphs: [
          'La IA agrega una dimensión nueva: las plataformas ahora también tienen que ofrecer contexto, políticas y mecanismos de control a agentes que participan en el ciclo de desarrollo. Las novedades de noviembre de 2026 muestran que la industria se está moviendo en esa dirección.',
        ],
        blocks: [
          {
            type: 'ul',
            items: [
              '**Red Hat Developer Hub 2.1** (anunciado en KubeCon NA, cubierto por SD Times el 10 de noviembre): expone contexto y acciones de la organización por MCP, por ejemplo disparar un Golden Path o revisar un problema de despliegue en Kubernetes, y suma un catálogo de modelos, agentes y servidores MCP. El argumento del anuncio: un agente sin contexto organizacional duplica servicios existentes y elige tecnologías no aprobadas.',
              '**"Platform Engineering after the AI Hype: Why IDPs Must Become Intent-Driven"** (Daniel Bryant, KubeCon NA, 10 de noviembre): sostiene que "agregar MCP" no alcanza. Identifica tres modos de falla (demasiada superficie expuesta, agentes "confidently wrong" y nadie dueño del día 2) y propone APIs basadas en intención para consumidores humanos y agentes. Una de sus preguntas para equipos de plataforma: ¿podría un agente usar tu plataforma sin conocimiento institucional?',
              '**Platform Engineering Day** (9 de noviembre, co-located de KubeCon NA en Salt Lake City): incluyó entre sus ejes los patrones emergentes para integrar IA en los flujos de plataforma.',
              '**Technology Radar Vol. 35** (Thoughtworks, noviembre): "harness engineering at scale" como tema central. El entorno que rodea a un agente (contexto, memoria, feedback, guardrails) madura como disciplina y necesita dueño.',
            ],
          },
          {
            type: 'p',
            text: 'Un artículo de DevOpsCon de octubre resume bien el riesgo: los Golden Paths diseñados para personas pueden volverse "golden cages" si se aplican sin cambios a agentes. Un agente no navega un portal; necesita acceso programático a capacidades, contexto confiable y controles que no dependan de que "se porte bien": identidad no humana, permisos acotados, observabilidad y controles deterministas (CI, políticas, aprobaciones) entre una salida probabilística y una acción con consecuencias.',
          },
          {
            type: 'p',
            text: 'La buena noticia es que una plataforma pensada como producto ya tiene la mayoría de esas piezas: catálogo, políticas como código, templates y observabilidad. Lo que cambia es que pasa a tener dos tipos de usuario con necesidades distintas, y los dos merecen el mismo rigor.',
          },
        ],
      },
      {
        title: 'Por dónde empezar',
        paragraphs: [],
        blocks: [
          {
            type: 'ol',
            items: [
              '**Medir la fricción antes de comprar herramientas.** Una encuesta corta y entrevistas a personas nuevas en el equipo muestran dónde se pierde el tiempo con más precisión que cualquier dashboard de uso de IA.',
              '**Elegir un solo Golden Path de alto tráfico**, típicamente "crear un servicio y llevarlo a producción", y hacerlo completo: pipeline, observabilidad, seguridad y documentación incluidas.',
              '**Hacer que el camino sea legible para agentes**: el mismo template, el catálogo y las reglas del equipo accesibles de forma programática, con permisos acotados.',
              '**Medir resultado, no actividad**: tiempo de onboarding, tiempo de espera y proporción de autoservicio, revisados con los equipos que usan la plataforma.',
              '**Escribir la estrategia de IA.** El dato del reporte que más me interesa es la diferencia entre 41% y 22%: la claridad organizacional también es una capacidad de plataforma.',
            ],
          },
        ],
      },
      {
        title: 'Talento en el negocio, no en los obstáculos',
        paragraphs: [
          'Para mí, una buena Developer Experience se resume en una idea: que los equipos puedan concentrar su talento en resolver problemas de negocio, en lugar de invertirlo en superar obstáculos internos. La IA hace más visible esa diferencia, porque acelera todo lo que ya estaba bien resuelto y deja expuesto todo lo que no.',
          'Y una pregunta abierta: ¿dónde encuentran hoy la mayor fricción en sus equipos: onboarding, CI/CD, infraestructura, documentación o procesos?',
        ],
        blocks: [
          { type: 'h3', text: 'Novedades de noviembre de 2026' },
          {
            type: 'ul',
            items: [
              '[Red Hat Advances Red Hat Developer Hub as an Agent-Ready Enterprise Developer Portal](https://sdtimes.com/open-source/red-hat-advances-red-hat-developer-hub-as-an-agent-ready-enterprise-developer-portal/) — David Rubinstein, SD Times, 10 de noviembre de 2026.',
              '[Platform Engineering after the AI Hype: Why IDPs Must Become Intent-Driven](https://speakerdeck.com/danielbryantuk/kubecon-na-platform-engineering-after-the-ai-hype-why-idps-must-become-intent-driven-final-v1) — Daniel Bryant, KubeCon + CloudNativeCon NA, 10 de noviembre de 2026 (slides).',
              '[Platform Engineering Day North America](https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/co-located-events/platform-engineering-day/) — Linux Foundation / CNCF, 9 de noviembre de 2026, Salt Lake City.',
              '[Technology Radar Vol. 35](https://www.thoughtworks.com/radar) — Thoughtworks, noviembre de 2026.',
            ],
          },
          { type: 'h3', text: 'Referencias' },
          {
            type: 'ul',
            items: [
              '[AI is making developers faster. It’s also exposing what’s broken in software delivery](https://www.atlassian.com/blog/development/developer-experience-report-2026) — Andrew Boyagi, Atlassian, 20 de octubre de 2026.',
              '[Developers Reporting Double-Digit Weekly Time Savings from AI Fell from 68% to 26%](https://www.infoq.com/news/2026/10/atlassian-devex-2026/) — Steef-Jan Wiggers, InfoQ, 27 de octubre de 2026.',
              '[What Atlassian’s 2026 DevEx Report Confirms (and Misses) About AI and Developer Productivity](https://www.networkperspective.io/post/ai-developer-productivity-atlassian-2026-devex-report) — Anita Zbieg, Network Perspective, 22 de octubre de 2026.',
              '[What Happens to an Internal Developer Platform When AI Agents Start Using It?](https://devopscon.io/blog/internal-developer-platforms-ai-agents/) — Natalia Torres Behar, DevOpsCon, 22 de octubre de 2026.',
              '[Golden Paths for AI agents: What changes when platform users aren’t human?](https://www.datadoghq.com/blog/golden-paths-for-ai-agents/) — Candace Shamieh, Shlomo Benyaminov y James Eastham, Datadog, 25 de agosto de 2026.',
            ],
          },
        ],
      },
    ],
    takeaway: 'Criterio práctico: si la IA acelera la escritura de código pero la fricción no baja, el cuello de botella está en otro lado. Medí dónde se pierde el tiempo, construí la plataforma como producto para personas y agentes, y evaluá resultados, no uso de herramientas.',
  },
  {
    slug: 'saas-multitenant-iac-resiliencia',
    seoTitle: 'SaaS multitenant: aislamiento, IaC y disaster recovery',
    seoDescription: 'Cómo diseñar un SaaS multitenant resiliente: modelos pool, silo y bridge, Infrastructure as Code sin drift y RTO/RPO validados con ejercicios reales.',
    title: 'SaaS multitenant: diseñar para escalar, automatizar para operar y replicar para sobrevivir',
    description: 'Aislamiento entre tenants, Infrastructure as Code y recuperación ante desastres como un único problema de diseño: modelos pool, silo y bridge, IaC con drift detection, RTO/RPO validados y una arquitectura de referencia cloud-agnostic.',
    category: 'Cloud y arquitectura',
    tags: ['Cloud', 'Arquitectura', 'Infraestructura', 'Multi-tenancy'],
    date: '2026-11-10',
    readingTime: '14 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de arquitectura · fuentes públicas de AWS, Qovery y documentación oficial',
    sourceUrl: 'https://aws.amazon.com/blogs/architecture/three-business-decisions-that-define-your-dr-success/',
    sourceLabel: 'AWS: Three business decisions that define your DR success',
    lead: 'Son las 03:17. Una región cloud deja de responder. Tres clientes financieros comparten la misma plataforma SaaS. La infraestructura está replicada, pero nadie verificó si el sistema de autenticación también puede recuperarse. No es un incidente real: es un experimento mental. Pero obliga a hacerse tres preguntas incómodas. ¿Estamos realmente aislando a nuestros tenants? ¿Podemos reconstruir la plataforma desde código? ¿Sabemos cuánto tardaríamos en recuperar el servicio completo, no solo la base de datos? La tesis de este artículo es que la resiliencia de un SaaS multitenant no depende de cuántos recursos duplicamos, sino de qué tan bien diseñamos el aislamiento, automatizamos la infraestructura y validamos nuestra capacidad real de recuperación.',
    sections: [
      {
        title: 'Multitenancy: compartir infraestructura sin compartir riesgos',
        paragraphs: [
          'Multitenancy suele presentarse como una decisión de costos: compartir infraestructura entre clientes para no pagar N copias de lo mismo. Es eso, pero sobre todo es una decisión de riesgo. Cada recurso compartido es un lugar donde un tenant puede afectar a otro: por seguridad, por rendimiento o por una falla. El diseño consiste en elegir, componente por componente, qué se comparte y qué no.',
        ],
        blocks: [
          { type: 'h3', text: 'Pool, silo y bridge' },
          {
            type: 'ul',
            items: [
              '**Pool**: infraestructura y datos compartidos, con aislamiento lógico. Un único cluster, una única base y un `tenant_id` que atraviesa cada capa.',
              '**Silo**: recursos dedicados por tenant. Cuenta, cluster o base propios. Más caro y más lento de aprovisionar, pero con un blast radius acotado por diseño.',
              '**Bridge**: una combinación. Servicios sin estado compartidos y datos dedicados, o un pool por defecto con la opción de mover a un tenant grande a un silo.',
            ],
          },
          {
            type: 'p',
            text: 'Los casos documentados recientes muestran que la respuesta casi nunca es pura. Cognizant consolidó OrderServ, un SaaS de pedidos para cadenas de comida rápida, desde un cluster de Amazon ECS por marca hacia un cluster compartido: 21 servicios en lugar de 105 para cinco marcas, onboarding por configuración en minutos y la opción de que una marca de alto volumen vuelva a un cluster dedicado. El caso en sentido opuesto es una plataforma de ad-serving con estado en memoria, donde el ruido entre vecinos es contención de memoria: pasó de una cuenta por tenant a cuentas compartidas por tier, pero conservó un cluster ECS por tenant dentro de cada grupo. Las dos son arquitecturas bridge, con fronteras en lugares distintos porque sus riesgos son distintos.',
          },
          {
            type: 'table',
            caption: 'Modelos de aislamiento: trade-offs típicos (no absolutos)',
            head: ['Dimensión', 'Pool', 'Bridge', 'Silo'],
            rows: [
              ['Aislamiento de seguridad', 'Lógico: depende de identidad, código y políticas (RLS, IAM con contexto de tenant)', 'Mixto: dedicado donde está el dato o el riesgo, lógico en el resto', 'Físico o de cuenta: la frontera la impone la infraestructura'],
              ['Costo por tenant', 'El más bajo; se amortiza con densidad', 'Intermedio; depende de qué capas se dedican', 'El más alto; capacidad ociosa por tenant'],
              ['Complejidad operativa', 'Baja en cantidad de recursos, alta en disciplina de código', 'La más alta: dos modelos conviviendo y migraciones entre ellos', 'Alta en cantidad de recursos; exige automatización total'],
              ['Escalabilidad', 'Escala con el sistema; sensible a noisy neighbors', 'Permite escalar tenants grandes de forma independiente', 'Lineal con tenants; los límites de cuenta y cuotas aparecen pronto'],
              ['Blast radius', 'Toda la plataforma', 'Acotado por tier o por tenant', 'Un tenant'],
              ['Onboarding', 'Configuración (minutos)', 'Configuración o aprovisionamiento según tier', 'Aprovisionamiento completo (requiere IaC)'],
            ],
          },
          { type: 'h3', text: 'El aislamiento es una cadena, no una capa' },
          {
            type: 'p',
            text: 'En un modelo pool, la frontera del tenant tiene que existir en cada capa: identidad (el tenant se deriva del token, no de un parámetro), aplicación (la librería de acceso a datos no construye una consulta sin tenant), base de datos (Row-Level Security como barrera cuando la aplicación se equivoca) y permisos de infraestructura (credenciales con alcance de tenant). OrderServ lo describe con claridad: una librería de tenancy que se niega a construir identificadores de recursos sin prefijo de tenant, y credenciales temporales con el tenant como session tag como segunda barrera. Ya escribí sobre [por qué el aislamiento de datos no puede depender de un WHERE](/blog/multi-tenancy-rls-frontera-datos/); la idea se generaliza: cada capa asume que la anterior puede fallar.',
          },
          {
            type: 'p',
            text: 'El cómputo también es una frontera. Los contenedores comparten el kernel del host, y eso importa cuando un tenant ejecuta código propio o no confiable. AWS anunció el 9 de noviembre de 2026 Nitro Sandboxes para Amazon EKS, donde cada pod corre en su propia VM liviana sobre el sistema Nitro, con requisito de Kubernetes 1.36 o superior. Es demasiado nuevo para recomendarlo sin evaluar, pero marca una tendencia: el aislamiento fuerte deja de ser sinónimo de un cluster por cliente.',
          },
          { type: 'h3', text: 'Noisy neighbor, blast radius y observabilidad por tenant' },
          {
            type: 'p',
            text: 'Un vecino ruidoso no siempre es un tenant que abusa: puede ser un cliente con una campaña legítima. OrderServ documenta picos promocionales de 5 a 10 veces en minutos y responde con capas: escalado predictivo, escalado reactivo, margen de capacidad y rate limits por tenant en el API Gateway. Nada de eso es gestionable sin observabilidad tenant-aware: métricas, logs y trazas etiquetados con el tenant, para responder en minutos "¿a quién afecta esto?" y "¿cuánto cuesta este cliente?". Si el onboarding de un tenant no crea también sus dashboards, alertas y presupuestos, el tenant existe pero no se puede operar.',
          },
        ],
      },
      {
        title: 'Infrastructure as Code: la arquitectura tiene que ser reproducible',
        paragraphs: [
          'Un diagrama describe la arquitectura que queremos. El código describe la que efectivamente tenemos, o al menos debería. Infrastructure as Code convierte la infraestructura en un artefacto de ingeniería: se versiona, se revisa, se prueba y se puede reconstruir. Terraform y OpenTofu, su fork bajo la Linux Foundation, comparten el mismo modelo: estado, plan y apply. La herramienta importa menos que la disciplina alrededor.',
        ],
        blocks: [
          { type: 'h3', text: 'Separar por ciclo de vida, no por herramienta' },
          {
            type: 'ul',
            items: [
              '**Global**: organización de cuentas, DNS, identidad, políticas base. Cambia poco y su blast radius es total.',
              '**Regional**: red, clusters, bases compartidas del pool, réplicas hacia la región de recuperación.',
              '**Tenant**: namespaces, cuotas, identidad de workload, recursos dedicados para tenants silo, dashboards y alertas.',
            ],
          },
          {
            type: 'p',
            text: 'Cada capa con su propio estado remoto, con bloqueo y cifrado, y con permisos distintos para aplicarla. Un error en la capa de tenant no debería poder tocar el DNS global. Los secretos no viven en el código ni en el estado en texto plano: se referencian desde un gestor de secretos o un KMS.',
          },
          {
            type: 'code',
            lang: 'hcl',
            caption: 'Ejemplo ilustrativo (HCL, Terraform/OpenTofu). Los módulos ./modules/* son hipotéticos y encapsulan al proveedor',
            text: `# El catálogo de tenants es la fuente de verdad del onboarding:
# sumar un cliente es un cambio en este mapa, revisado en un Pull Request.
variable "tenants" {
  type = map(object({
    tier        = string # "pool" | "silo"
    rpo_minutes = number # acordado con negocio, no elegido por infraestructura
  }))

  validation {
    condition     = alltrue([for t in values(var.tenants) : contains(["pool", "silo"], t.tier)])
    error_message = "tier debe ser \\"pool\\" o \\"silo\\"."
  }
}

variable "region"          { type = string }
variable "recovery_region" { type = string }

locals {
  silo_tenants = { for id, t in var.tenants : id => t if t.tier == "silo" }
}

# Capa regional: una base compartida para el pool, con RLS y réplica.
module "pool_database" {
  source             = "./modules/database"
  name               = "pool-\${var.region}"
  row_level_security = true
  replica_region     = var.recovery_region
}

# Recursos dedicados solo para tenants silo.
module "silo_database" {
  source         = "./modules/database"
  for_each       = local.silo_tenants
  name           = "tenant-\${each.key}"
  replica_region = var.recovery_region
}

# Todos los tenants: namespace, cuotas, identidad de workload y alertas.
module "tenant_runtime" {
  source   = "./modules/tenant-runtime"
  for_each = var.tenants

  tenant_id      = each.key
  resource_quota = each.value.tier == "silo" ? "dedicated" : "shared-default"
  database_url   = try(module.silo_database[each.key].endpoint, module.pool_database.endpoint)
  labels         = { tenant = each.key, tier = each.value.tier }
}`,
          },
          {
            type: 'p',
            text: 'Lo importante del ejemplo no es la sintaxis, sino tres decisiones. El tier de un tenant es un dato, no una bifurcación del código. La validación rechaza configuraciones inválidas antes del plan. Y el RPO de cada tenant queda escrito junto a su definición, donde una política puede verificar que la estrategia de backup y réplica asignada es capaz de cumplirlo.',
          },
          { type: 'h3', text: 'Del Pull Request a la observabilidad' },
          {
            type: 'ol',
            items: [
              '**Pull Request**: el cambio, incluido el alta de un tenant, se propone como código.',
              '**Validaciones**: formato, `validate`, linters y escaneo de seguridad de la configuración.',
              '**Plan**: el diff real contra el estado, publicado en el PR.',
              '**Policy as Code**: reglas evaluadas sobre el plan (OPA/Rego, Sentinel o Kyverno en Kubernetes): cifrado obligatorio, sin recursos públicos, tags de tenant presentes.',
              '**Revisión**: una persona revisa el plan, no solo el código. Más aprobaciones cuanto mayor el blast radius de la capa.',
              '**Apply**: desde el pipeline, nunca desde una laptop, con credenciales de corta duración.',
              '**Verificación**: smoke tests y checks de salud del tenant o de la región.',
              '**Observabilidad**: el cambio queda asociado a métricas y eventos para correlacionar regresiones.',
            ],
          },
          {
            type: 'p',
            text: 'GitOps lleva la misma idea al runtime: un controlador en el cluster reconcilia continuamente lo declarado en Git con lo que corre. Ahí aparece el problema que la mayoría de los equipos subestima: el drift. El artículo de Qovery sobre provisión multi-cloud lo pone como línea divisoria entre herramientas: Crossplane revierte cambios fuera de banda de forma continua, plataformas como Spacelift o env0 corren chequeos de drift programados, y Terraform u OpenTofu solos lo muestran recién cuando alguien corre un plan. Vale leerlo sabiendo que es contenido de un proveedor, pero la clasificación es útil.',
          },
          {
            type: 'note',
            label: 'Límite',
            text: 'IaC no garantiza por sí sola consistencia de datos, seguridad ni recuperación. Reconstruye recursos; no restaura el contenido de una base, no corrige una política mal diseñada y no prueba que el runbook funcione. Un `apply` exitoso en la región de recuperación no dice nada sobre si los datos que llegaron son los correctos.',
          },
        ],
      },
      {
        title: 'Replicación y continuidad operativa',
        paragraphs: [
          'Los términos se usan como sinónimos y no lo son. Confundirlos lleva a pagar por una protección y creer que se tiene otra.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Conceptos que se confunden',
            head: ['Concepto', 'Qué resuelve', 'Qué no resuelve'],
            rows: [
              ['Alta disponibilidad (HA)', 'Fallas de componentes o de una zona, sin intervención humana (Multi-AZ, réplicas, balanceo)', 'La pérdida de una región o la corrupción lógica de datos'],
              ['Disaster Recovery (DR)', 'Recuperar una función de negocio ante un evento mayor, típicamente en otra región', 'Nada, si no fue probado bajo condiciones reales'],
              ['Backup y restore', 'Volver a un punto en el tiempo, incluso antes de un error humano o un ransomware', 'El tiempo de recuperación: restaurar suele ser lento'],
              ['Replicación síncrona', 'RPO cercano a cero: la escritura se confirma en ambos lados', 'La latencia: penaliza cada escritura y escala mal entre regiones lejanas'],
              ['Replicación asíncrona', 'Copias remotas sin penalizar la latencia', 'La pérdida de datos en vuelo: existe un RPO mayor que cero'],
              ['Active-active', 'RTO mínimo: las regiones ya sirven tráfico', 'La consistencia: exige resolver conflictos de escritura'],
              ['Active-passive', 'Diseño más simple: una región escribe', 'El RTO: la región pasiva tiene que promoverse y escalar'],
            ],
          },
          {
            type: 'p',
            text: '**RTO** es cuánto tiempo puede estar caída una función; **RPO**, cuántos datos se pueden perder, medido en tiempo. **Failover** es mover el servicio a la región de recuperación; **failback**, volver, y suele ser más difícil porque hay que reconciliar lo que se escribió en el medio.',
          },
          {
            type: 'p',
            text: 'La serie de AWS Architecture Blog publicada el 2 de noviembre de 2026 por Peter Garnepudi y Jay Desai propone empezar por tres decisiones de negocio antes que por el diagrama: definir el límite de recuperación alrededor de funciones de negocio y no de aplicaciones, anclar RTO y RPO a consecuencias de negocio, y contar la cadena de dependencias. Su ejemplo más claro: un objetivo de 1 hora para una aplicación quedaba limitado a 4 horas por un servicio de identidad compartido de otro equipo. Una aplicación se recupera tan rápido como su dependencia más lenta.',
          },
          { type: 'h3', text: 'Escenario hipotético: caída regional a las 03:17' },
          {
            type: 'ol',
            items: [
              '**Detección**: alertas por síntomas (tasa de error, latencia por tenant), no solo por recursos. Se declara incidente con un rol de comando definido.',
              '**Impacto por tenant**: ¿quiénes están afectados?, ¿qué tier tiene cada uno?, ¿qué RTO comprometimos con cada cliente? La observabilidad tenant-aware convierte esto en una consulta, no en una conversación.',
              '**Decisión de failover**: la toma quien estaba designado de antemano, con criterios escritos. Fallar hacia la otra región tiene costo: pérdida de datos en vuelo y un failback posterior.',
              '**Promoción de réplicas**: se verifica el lag de replicación de cada base antes de promoverla. Con replicación asíncrona, el último lag observado es la pérdida de datos real.',
              '**Redirección del tráfico**: DNS con health checks o un control de enrutamiento preparado. AWS advierte que crear o modificar registros DNS e IAM durante el evento depende de planos de control de una sola región: esos cambios se dejan resueltos antes.',
              '**Autenticación y dependencias**: el Identity Provider, los secretos, las integraciones de pago y los proveedores externos. En el caso que describe AWS, la plataforma de autenticación compartida quedó fuera del alcance de recuperación y los logins fallaron.',
              '**Consistencia de datos**: conteos, sumas de control y reconciliación de los últimos eventos. En un SaaS financiero, saber qué transacciones quedaron en duda es parte del servicio.',
              '**Comunicación y recuperación**: estado público por tenant, actualizaciones periódicas, y después un postmortem que vuelve a las tres decisiones.',
            ],
          },
          {
            type: 'note',
            label: 'Replicación no es backup',
            text: 'Una réplica copia fielmente lo que pasa en el primario, incluido un `DELETE` sin `WHERE`, una migración defectuosa o datos cifrados por un ransomware. La recuperación ante errores lógicos necesita backups con retención, idealmente inmutables y en una cuenta separada, y restauraciones probadas.',
          },
        ],
      },
      {
        title: 'Una arquitectura de referencia',
        paragraphs: [
          'La siguiente propuesta es una referencia hipotética, no la descripción de un sistema real. Usa un modelo bridge: servicios y datos en pool por defecto, con recursos dedicados para tenants que lo requieren por contrato, regulación o volumen, y un esquema active-passive con capacidad mínima pre-aprovisionada en la región de recuperación.',
        ],
        blocks: [
          {
            type: 'mermaid',
            caption: 'SaaS multitenant bridge con región de recuperación',
            description: 'El control plane global gestiona catálogo de tenants, IaC y observabilidad. Cada región tiene gateway, Kubernetes con servicios compartidos y namespaces dedicados, base pool con RLS y bases dedicadas. La región de recuperación está pre-aprovisionada; el Identity Provider y los secretos forman parte del alcance de recuperación.',
            text: `flowchart TB
  subgraph CP["Control plane"]
    direction LR
    GIT["IaC + GitOps"] --> PIPE["CI/CD con policy as code"]
    CAT["Catálogo de tenants"] --> PIPE
    OBS["Observabilidad por tenant"]
  end
  subgraph SEC["Seguridad en DR"]
    direction LR
    IDP["Identity Provider"]
    KMS["KMS y secretos"]
  end
  DNS["DNS global + health checks"]
  subgraph R1["Región primaria"]
    GW1["Gateway / Load Balancer"] --> SVC1["K8s: servicios pool"]
    GW1 --> DED1["K8s: namespace dedicado"]
    SVC1 --> DB1[("Base pool con RLS")]
    DED1 --> DBS1[("Base dedicada")]
    SVC1 --> MQ1["Mensajería + object storage"]
  end
  subgraph R2["Región de recuperación"]
    GW2["Gateway pre-aprovisionado"] --> K2["K8s con capacidad mínima"]
    K2 --> DB2[("Réplicas asíncronas")]
    K2 --> OS2["Object storage replicado"]
  end
  BK[("Backups inmutables en cuenta separada")]
  PIPE --> DNS
  SEC --> DNS
  DNS --> GW1
  DNS -. failover .-> GW2
  DB1 -. replicación .-> DB2
  DBS1 -. replicación .-> DB2
  MQ1 -. replicación .-> OS2
  DB1 --> BK
  DBS1 --> BK`,
          },
          {
            type: 'p',
            text: 'Las decisiones detrás del diagrama: el control plane vive fuera de las regiones de datos para poder operar durante una caída; el Identity Provider está dentro del alcance de DR; la mensajería se diseña para que los consumidores sean idempotentes, porque después de un failover se van a reprocesar mensajes; y los backups viven en una cuenta separada, para que una credencial comprometida en producción no pueda borrarlos.',
          },
          {
            type: 'table',
            caption: 'Servicios posibles en AWS y OCI (opciones, no equivalencias funcionales)',
            head: ['Capacidad', 'AWS', 'OCI'],
            rows: [
              ['DNS y tráfico global', 'Route 53 (health checks, failover), Application Recovery Controller', 'OCI DNS con Traffic Management Steering Policies'],
              ['Entrada', 'Application Load Balancer, Amazon API Gateway', 'OCI Load Balancer, OCI API Gateway'],
              ['Kubernetes', 'Amazon EKS', 'Container Engine for Kubernetes (OKE)'],
              ['Identidad', 'Amazon Cognito, IAM Identity Center', 'OCI IAM con Identity Domains'],
              ['Base relacional', 'Aurora PostgreSQL (Global Database)', 'OCI Database with PostgreSQL, Autonomous Database (Data Guard)'],
              ['Object storage', 'Amazon S3 con replicación entre regiones', 'OCI Object Storage con políticas de replicación'],
              ['Mensajería', 'Amazon SQS, SNS, EventBridge', 'OCI Queue, OCI Streaming'],
              ['Claves y secretos', 'AWS KMS, Secrets Manager', 'OCI Vault'],
              ['Orquestación de DR', 'Application Recovery Controller, AWS Resilience Hub', 'OCI Full Stack Disaster Recovery'],
            ],
          },
          {
            type: 'p',
            text: 'Cada fila esconde diferencias reales de semántica de replicación, límites, cuotas y comportamiento ante fallas. Por ejemplo, el modelo de failover de una base global administrada no es el mismo que el de Data Guard. La tabla sirve para saber dónde buscar, no para migrar de una nube a otra.',
          },
        ],
      },
      {
        title: 'Lo que hay que medir',
        paragraphs: [
          'Los indicadores conectan una decisión técnica con lo que siente el cliente y con el riesgo que asume el negocio. No hay benchmarks universales: el valor correcto de cada uno lo define el producto, el contrato y la regulación.',
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Indicadores y la pregunta que responde cada uno',
            head: ['Indicador', 'Pregunta que responde'],
            rows: [
              ['Availability / SLO por tenant', '¿El servicio cumple lo que prometimos, también para el cliente más chico?'],
              ['Error budget', '¿Podemos seguir cambiando a esta velocidad o hay que frenar y estabilizar?'],
              ['RTO objetivo vs. RTO observado', '¿Cuánto tardamos de verdad la última vez que lo probamos?'],
              ['RPO objetivo vs. pérdida observada', '¿Cuántos datos perdimos en el último ejercicio, medido y no estimado?'],
              ['MTTR', '¿Cuánto tardamos en restaurar el servicio ante un incidente cualquiera?'],
              ['Change failure rate', '¿Qué proporción de cambios termina en incidente o rollback?'],
              ['% de recursos gestionados por IaC', '¿Qué parte de la plataforma no podríamos reconstruir desde código?'],
              ['Configuration drift', '¿Cuántas diferencias hay entre lo declarado y lo que corre, y cuánto duran?'],
              ['Costo por tenant', '¿Cada tier es rentable? ¿Cuánto cuesta la resiliencia que vendemos?'],
              ['Incidentes multi-tenant', '¿Nuestro aislamiento contiene las fallas o las propaga?'],
            ],
          },
          {
            type: 'p',
            text: 'Los pares objetivo/observado son los más reveladores. En el caso que documenta AWS, una organización tenía un compromiso contractual de recuperación de 5 horas y su primer ejercicio tardó entre 9 y 11. El número del contrato era una aspiración; el del ejercicio era la realidad.',
          },
        ],
      },
      {
        title: 'Los errores que conviene evitar',
        paragraphs: [],
        blocks: [
          {
            type: 'ul',
            items: [
              '**Confundir backup con replicación.** Consecuencia: la corrupción se replica en segundos. Mitigación: backups con retención e inmutabilidad, y restauraciones periódicas medidas.',
              '**Compartir recursos sin analizar aislamiento.** Consecuencia: un tenant degrada o expone a otro. Mitigación: decidir pool o silo por componente y por riesgo, con defensa en profundidad.',
              '**Automatizar despliegues sin automatizar recuperación.** Consecuencia: el día del incidente, el runbook es un documento que nadie ejecutó. Mitigación: runbooks como código y probados.',
              '**Tener IaC sin detectar drift.** Consecuencia: la región de recuperación se construye desde un código que ya no describe producción. Mitigación: drift checks programados y cambios manuales prohibidos o reconciliados.',
              '**Diseñar multi-region sin validar dependencias.** Consecuencia: la aplicación vuelve y el IdP, un secreto o un proveedor externo no. Mitigación: mapear la cadena completa y pedir compromisos de recuperación por escrito a cada dueño.',
              '**No probar la recuperación de datos.** Consecuencia: un backup que nunca se restauró es una hipótesis. Mitigación: restores automatizados con verificación de integridad.',
              '**Ignorar los costos de resiliencia.** Consecuencia: una arquitectura que el negocio no puede sostener y que se recorta en silencio. Mitigación: costo por tier visible y elegido.',
              '**Definir RTO/RPO sin el negocio.** Consecuencia: objetivos que nadie financió. Mitigación: cada objetivo nace de una consecuencia de negocio confirmada por alguien responsable de ella.',
              '**Dejar el Identity Provider fuera de los ejercicios.** Consecuencia: la plataforma está arriba y nadie puede iniciar sesión. Mitigación: el IdP es parte del alcance de cada prueba.',
            ],
          },
          {
            type: 'p',
            text: 'La segunda parte de la serie de AWS propone validar de forma progresiva: ejercicio de mesa, failover planificado, simulacro sin aviso y game day con inyección de fallas. Los autores aclaran que es un modelo de madurez propio, no una taxonomía formal, pero su síntesis es precisa: la mesa encuentra el paso sin dueño, el failover planificado la mala configuración, el simulacro la falla de coordinación y el game day la dependencia no modelada. Quedarse en el failover planificado deja ocultas las fallas de equipo y de proceso.',
          },
        ],
      },
      {
        title: 'El rol de Platform Engineering',
        paragraphs: [
          'Todo lo anterior se puede hacer con un equipo de infraestructura que recibe tickets. No escala. La alternativa es tratar la infraestructura como un producto interno: una plataforma que permite a los equipos crear ambientes de forma autónoma, desplegar bajo estándares definidos, heredar controles de seguridad, consultar métricas y costos por tenant, ejecutar procedimientos reproducibles y correr ejercicios de recuperación sin coordinar cinco equipos por mail.',
          'Los **Golden Paths** son el camino recomendado y mantenido: un template de servicio que ya viene con observabilidad por tenant, policies y pipeline. Una **Internal Developer Platform** es la superficie donde ese camino se consume. **DevSecOps** es la condición para que la seguridad esté en el camino y no en una revisión al final. El objetivo no es prohibir desvíos, sino que el camino correcto sea el más fácil.',
          'La resiliencia, además, es un problema de colaboración. Product define qué funciones importan y cuánto vale una hora sin ellas. Security define qué no puede compartirse. Infrastructure construye la capacidad. Engineering diseña servicios que toleran reintentos y failovers. Si cualquiera de los cuatro falta en la conversación, el RTO es un número que nadie puede defender.',
        ],
      },
      {
        title: 'Diseñar para fallar, operar para recuperarse',
        paragraphs: [
          'Volvamos a las 03:17. La infraestructura replicada no era el problema; el problema era una dependencia que nadie había incluido en el límite de recuperación, un objetivo que nadie había validado y un ejercicio que nunca se corrió con el IdP adentro. Ninguna de esas fallas se resuelve comprando más regiones.',
          'La disponibilidad no es una propiedad que se compra en la nube. Es una capacidad que los equipos construyen, automatizan y ponen a prueba: con fronteras de aislamiento elegidas por riesgo, infraestructura que se puede reconstruir desde código sin drift, y objetivos de recuperación que el negocio firmó y que un ejercicio confirmó.',
          'Y una pregunta para el debate: en tu plataforma, ¿cuál es la dependencia más lenta de recuperar, y quién es su dueño?',
        ],
        blocks: [
          { type: 'h3', text: 'Referencias' },
          {
            type: 'ul',
            items: [
              '[Three business decisions that define your DR success](https://aws.amazon.com/blogs/architecture/three-business-decisions-that-define-your-dr-success/) — Peter Garnepudi y Jay Desai, AWS Architecture Blog, 2 de noviembre de 2026.',
              '[Validating your DR commitment: From controlled test to real-world readiness](https://aws.amazon.com/blogs/architecture/validating-your-dr-commitment-from-controlled-test-to-real-world-readiness/) — Peter Garnepudi y Jay Desai, AWS Architecture Blog, 2 de noviembre de 2026.',
              '[How to Automate Multi-Cloud Provisioning and Governance Without Hand-Syncing Four Copies of the Same Environment](https://www.qovery.com/blog/automate-multi-cloud-provisioning-governance-without-hand-syncing) — Alessandro Carrano, Qovery Blog, 2 de noviembre de 2026 (contenido de proveedor).',
              '[How OrderServ achieved up to 64% cost savings with multi-tenant ECS](https://aws.amazon.com/blogs/architecture/how-orderserv-achieved-up-to-64-cost-savings-with-multi-tenant-ecs/) — Chetan Yewale, Ashwini Kumar, Asit Singh, Rama Krishna Sanjeeva, Suddhasattwa Mukherjee y Urvashi Sharma, AWS Architecture Blog, 5 de noviembre de 2026.',
              '[AWS Nitro Sandboxes: Hardware-enforced workload isolation on Amazon EKS](https://aws.amazon.com/blogs/containers/aws-nitro-sandboxes-hardware-enforced-workload-isolation-on-amazon-eks/) — Carlos Santana y Trishi Mehta, AWS Containers Blog, 9 de noviembre de 2026.',
              '[Building hybrid multi-tenant architecture for stateful services on AWS](https://aws.amazon.com/blogs/architecture/building-hybrid-multi-tenant-architecture-for-stateful-services-on-aws/) — Vasu Raj, AWS Architecture Blog, 12 de mayo de 2026.',
              '[AWS Well-Architected SaaS Lens](https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html) — AWS.',
              '[Disaster Recovery of Workloads on AWS](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html) — whitepaper de AWS.',
              '[OpenTofu](https://opentofu.org/docs/) y [Terraform](https://developer.hashicorp.com/terraform/docs) — documentación oficial.',
              '[Kubernetes: Multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/) — documentación oficial.',
              '[OCI Full Stack Disaster Recovery](https://docs.oracle.com/en-us/iaas/disaster-recovery/index.html) — documentación de Oracle Cloud Infrastructure.',
            ],
          },
        ],
      },
    ],
    takeaway: 'Criterio práctico: elegí la frontera de aislamiento por riesgo y no por costo, reconstruí la plataforma desde código y vigilá el drift, y no creas en un RTO que no viste cumplirse en un ejercicio con el Identity Provider adentro.',
  },
  {
    slug: 'rea-ingenieria-inversa-chordify-chordlocal',
    title: 'Ingeniería inversa con agentes: de Chordify a ChordLocal con REA',
    description: 'Corrimos REA (Reverse Engineer Anything) contra las páginas públicas de Chordify: qué stack usa, dónde viven sus funciones pagas y qué confirma eso sobre la arquitectura de ChordLocal, una alternativa local y libre.',
    category: 'IA y producto',
    tags: ['IA', 'Agentes', 'Ingeniería inversa', 'Producto', 'Música'],
    date: '2026-10-19',
    readingTime: '9 min de lectura',
    projectSlug: 'chordlocal',
    projectName: 'ChordLocal',
    sourceUrl: 'https://github.com/morluto/rea',
    sourceLabel: 'Repositorio oficial de REA: morluto/rea',
    lead: 'REA (Reverse Engineer Anything) es un servidor MCP y un CLI que le da a un agente de código herramientas para inspeccionar software sin su código fuente: binarios, apps JavaScript y Electron, ensamblados .NET, APKs y sitios web. Lo usamos para estudiar Chordify, la app que detecta los acordes de una canción, y contrastarlo con ChordLocal, la versión local y libre que construimos. La pregunta era concreta: ¿las funciones pagas de Chordify son difíciles de construir, o son lógica simple sobre datos que ya están en el navegador?',
    architecture: {
      caption: 'De un producto de referencia a una app propia, con evidencia',
      description: 'Primero se listan las funciones del producto y su plan. Después REA observa las páginas públicas en un navegador real y devuelve evidencia: scripts, recursos, endpoints y estado del cliente. Con eso se valida el modelo de datos propio antes de construir.',
      layers: [
        { label: 'Hipótesis', items: ['Matriz de features', 'Gratis vs. pago'] },
        { label: 'REA', items: ['inspect-web-page', 'analyze-web-bundle'] },
        { label: 'Evidencia', items: ['Scripts y recursos', 'Estado en el cliente'] },
        { label: 'ChordLocal', items: ['analysis.json', 'Funciones derivadas al instante'] },
      ],
    },
    sections: [
      {
        title: 'Qué es REA',
        paragraphs: [
          'REA se instala con `npx rea-agents setup` y se registra como servidor MCP en agentes como Claude Code, Codex o Cursor; también se usa como CLI con el comando `rea`. Para sitios web se conecta por Chrome DevTools Protocol a un navegador local y devuelve evidencia: estructura de la página, scripts cargados, recursos, endpoints detectados en el código y forma de los datos, sin guardar valores, cookies ni cuerpos de respuesta.',
          'Cada resultado trae un identificador de evidencia, su nivel de confianza y sus límites. Esa es la diferencia con "mirar el DevTools un rato": las conclusiones quedan respaldadas y se pueden volver a verificar.',
        ],
      },
      {
        title: 'Primera iteración: la hipótesis',
        paragraphs: [
          'El pedido inicial fue "analizar con REA la aplicación Chordify para tenerla local, con todos sus features, pero gratis". En esa primera sesión REA estaba instalado pero no conectado al agente, así que el punto de partida fue una matriz armada con la información pública: cada función, su plan, el equivalente libre y la dificultad real de construirla.',
          'La hipótesis que salió de ahí: casi todas las funciones pagas son transformaciones simples sobre el resultado del análisis. Transponer es sumar semitonos a la raíz de cada acorde, `(root + n) % 12`. Lo único difícil de verdad es detectar bien los acordes y el compás a partir del audio. ChordLocal se construyó sobre esa idea.',
        ],
      },
      {
        title: 'Segunda iteración: REA contra Chordify',
        paragraphs: [
          'Para validar la hipótesis corrimos REA 6.5.0 contra dos páginas públicas: la home y la página de una canción. Chrome se abrió con un perfil limpio, sin sesión ni cuenta, y con el puerto de depuración solo en loopback. Usamos `inspect-web-page` para la estructura, los recursos y el almacenamiento, `analyze-web-bundle` para el análisis estático de los scripts y `export-web-scripts` para revisar el contexto exacto de cada hallazgo.',
          'Hubo un tropiezo útil. En modo headless, Chordify mostró el desafío de Cloudflare ("Un momento…") y REA lo reportó tal cual: la página observada era el desafío, no la app. No se intentó evadirlo. Con un Chrome visible normal, la verificación pasó sola. Tampoco se descargaron los source maps, aunque los bundles los declaran públicamente, ni se extrajeron datos de canciones.',
        ],
      },
      {
        title: 'Qué encontró',
        paragraphs: [
          'Stack: React empaquetado con webpack, en ocho scripts que suman 1,9 MB en la página de una canción. Los datos de la canción vienen dentro del HTML y no por una llamada aparte. Los diagramas de acordes salen de una API que devuelve SVG por instrumento y por acorde, con nombres como `D:maj` o `B:min`: la notación de Harte, el estándar de la investigación en reconocimiento de acordes.',
          'La transposición es un entero en el estado del cliente. Cada movimiento suma o resta semitonos, el reset lo vuelve a 0 y el objeto de la canción se construye con ese valor antes de dibujar los acordes en el navegador. El cambio de tempo ajusta la velocidad de reproducción del player. Cuando cambian la cejilla o la transposición, un evento hace que el player vuelva a dibujar el acorde actual. El bundle también trae tablas para escribir cada acorde con sostenidos o bemoles según la tonalidad mayor o menor.',
          'El mismo código lista las funciones que el producto ofrece como pagas: cejilla, transposición, loop, tempo, volumen, cuenta regresiva, setlists, subir audio, MIDI, impresión y letras con IA. Ninguna de las que se pudieron rastrear necesita volver al servidor para recalcular el análisis.',
        ],
      },
      {
        title: 'Qué confirma para ChordLocal',
        paragraphs: [
          'La hipótesis se sostiene con evidencia: las funciones pagas operan en el cliente sobre datos que ya están en la página. La diferencia entre el plan gratis y el pago no es de cómputo, es de producto. El valor de Chordify está en su catálogo de análisis y en la experiencia, no en la dificultad de transponer.',
          'ChordLocal ya tiene esa misma forma: un `analysis.json` como fuente única de verdad y funciones derivadas al instante. El análisis también deja dos ideas concretas para adoptar. La primera es exportar los acordes en notación de Harte, para poder compararlos con datasets de investigación. La segunda ya está hecha: escribir cada acorde según la tonalidad (Eb y no D# en Eb mayor), algo que ChordLocal resolvió en su versión 0.2.',
        ],
      },
      {
        title: 'Límites y potencial',
        paragraphs: [
          'Entender cómo funciona un producto no habilita a copiarlo. La base de acordes de Chordify es su producto: ChordLocal no la usa, no la scrapea y genera sus propios análisis. El código observado sirvió para validar decisiones, no para reutilizarlo. Tampoco se publican detalles sobre cómo se controla el acceso a las funciones pagas: no aportan nada a la arquitectura y solo servirían para evadirlo.',
          'Con esos límites, el potencial es grande. El mismo método sirve para auditar una herramienta interna sin documentación, entender una integración legada antes de migrarla, evaluar a un competidor con evidencia en lugar de suposiciones o mantener compatibilidad con un formato cerrado. Lo que cambia con un agente y REA es la velocidad: pasar de "creo que funciona así" a "esta es la evidencia" toma minutos.',
        ],
      },
    ],
    takeaway: 'Criterio práctico: la ingeniería inversa útil empieza con una hipótesis de producto y termina con evidencia. Primero se lista qué hace una app y qué cobra; después una herramienta como REA confirma dónde vive cada función. Todo dentro de los límites de licencias, términos de servicio y propiedad de los datos.',
  },
  {
    slug: 'gpt-6-astra-openai-superinteligencia-especulaciones',
    title: 'OpenAI lanza GPT-6 Astra: capacidad de frontera, presión competitiva y debate sobre superinteligencia',
    description: 'Análisis técnico y estratégico del lanzamiento de GPT-6 Astra: capacidades declaradas, arquitectura de producto y qué sí (y qué no) significa hablar de superinteligencia.',
    category: 'Noticias de IA',
    tags: ['IA', 'Open-weight', 'Arquitectura'],
    date: '2026-09-04',
    readingTime: '8 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de actualidad en IA',
    sourceUrl: 'https://openai.com/news/',
    sourceLabel: 'Fuentes oficiales: OpenAI Newsroom',
    lead: 'El anuncio de GPT-6 Astra volvió a mover la frontera de expectativas en IA: más capacidad de razonamiento, mayor integración multimodal y señales de una estrategia clara para cerrar el ciclo entre modelo, producto y operación empresarial. La discusión importante para equipos técnicos y de negocio no es si “ya llegó” la superinteligencia, sino qué evidencia existe, qué riesgos crecen y qué decisiones conviene tomar ahora.',
    architecture: {
      caption: 'Patrón de adopción de un modelo de frontera en producto real',
      description: 'Un modelo fundacional de alta capacidad no crea valor por sí solo: necesita orquestación, evaluación, controles y una capa de producto que transforme respuestas en resultados de negocio.',
      layers: [
        { label: 'Entrada', items: ['Prompts y contexto de negocio', 'Datos internos y externos'] },
        { label: 'Modelo de frontera', items: ['GPT-6 Astra', 'Razonamiento y multimodalidad'] },
        { label: 'Orquestación', items: ['Herramientas, RAG y políticas', 'Control de costos y latencia'] },
        { label: 'Gobernanza', items: ['Evaluación, seguridad y auditoría', 'Revisión humana en decisiones críticas'] },
        { label: 'Resultado', items: ['Automatización útil', 'Decisiones más rápidas y trazables'] },
      ],
    },
    sections: [
      {
        title: 'Qué cambia de verdad con GPT-6 Astra',
        paragraphs: [
          'Cada salto de modelo trae dos lecturas: la tecnológica y la operativa. En la primera, GPT-6 Astra eleva el estándar de lo que se espera en razonamiento, manejo de contexto y tareas multimodales. En la segunda, obliga a repensar dónde conviene automatizar, qué tareas requieren validación humana y cómo se mide valor más allá de benchmarks públicos.',
          'Para líderes técnicos, la ventaja no está en “usar el modelo más nuevo” por inercia. Está en identificar fricciones concretas: tiempos de especificación, cuellos de documentación, análisis repetitivos o flujos de soporte interno donde una mejora incremental ya paga el costo de adopción.',
        ],
      },
      {
        title: 'Superinteligencia: señal de marketing, hipótesis científica o riesgo de interpretación',
        paragraphs: [
          'Las especulaciones sobre superinteligencia aparecen cada vez que un actor líder anuncia un modelo de frontera. El problema es semántico y práctico: no existe un umbral operativo universalmente aceptado que permita afirmar que un sistema ya alcanzó “superinteligencia” en sentido fuerte.',
          'En términos de negocio, esa etiqueta aporta poco a la toma de decisiones. Lo que sí importa es evidencia verificable: desempeño por dominio, tasa de error en tareas críticas, robustez ante inputs adversarios, costo por caso de uso y cumplimiento de requisitos de seguridad y trazabilidad.',
        ],
      },
      {
        title: 'Marco de adopción para equipos ejecutivos y de ingeniería',
        paragraphs: [
          'Si GPT-6 Astra entra en el roadmap, conviene tratarlo como una iniciativa de plataforma y no como una simple integración de API. Eso implica definir casos de uso por impacto, diseñar guardrails desde el primer día y establecer métricas conjuntas de calidad, riesgo y eficiencia.',
          'El patrón que mejor funciona en organizaciones técnicas es progresivo: pilotos acotados, evaluación continua, revisión humana en puntos de alto riesgo y escalado solo cuando hay evidencia de mejora sostenida. Sin ese marco, el costo de coordinar expectativas suele superar el beneficio inicial.',
        ],
      },
    ],
    takeaway: 'Conclusión ejecutiva: más allá del titular sobre superinteligencia, GPT-6 Astra debe evaluarse como un multiplicador de capacidad bajo gobernanza estricta. La ventaja competitiva no vendrá del hype, sino de convertir capacidad del modelo en flujos confiables de producto y operación.',
  },
  {
    slug: 'hardware-modelos-redifinen-arquitectura-ia',
    title: 'El hardware ya no es un detalle: cómo el nuevo estándar de modelos redefine la arquitectura IA',
    description: 'Análisis de la nueva discusión sobre hardware para modelos de frontera y por qué la infraestructura se volvió parte central de la estrategia de IA.',
    category: 'Noticias de IA',
    tags: ['IA', 'Arquitectura', 'Infraestructura'],
    date: '2026-09-07',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de actualidad en IA',
    sourceUrl: 'https://www.anthropic.com/news/model-hardware-standard-research-preview',
    sourceLabel: 'Fuente oficial: Anthropic News',
    lead: 'Cada salto de capacidad del modelo llega acompañado de una conversación nueva: no solo de inteligencia, sino de infraestructura. Cuando un proveedor define un estándar de hardware para modelos de frontera, la discusión deja de ser técnica de laboratorio y se vuelve operativa: costo, latencia, gobernanza y trazabilidad. Lo importante ya no es cerrar el mejor benchmark, sino diseñar una arquitectura capaz de sostener valor real.',
    architecture: {
      caption: 'Arquitectura IA con infraestructura como decisión de producto',
      description: 'La capacidad del modelo ya no es el único eje de decisión; lo que rodea al modelo define si la solución escala con control o se vuelve frágil',
      layers: [
        { label: 'Entrada', items: ['Prompts y contexto', 'Datos internos y externos'] },
        { label: 'Modelo', items: ['Modelo de frontera', 'Razonamiento y multimodalidad'] },
        { label: 'Infraestructura', items: ['GPU, latencia y throughput', 'Servidores y caché'] },
        { label: 'Gobernanza', items: ['Monitoreo', 'Revisión humana', 'Cost control'] },
        { label: 'Resultado', items: ['Automatización útil', 'Decisiones operativas con trazabilidad'] },
      ],
    },
    sections: [
      {
        title: 'La IA deja de ser solo una capa de modelo',
        paragraphs: [
          'La industria de IA está dejando de hablar solo de modelos y empezando a hablar de infraestructura como parte de la decisión de producto. La razón es simple: un modelo poderoso puede generar una experiencia mediocre si la ejecución no está pensada para el contexto real del negocio.',
          'Cuando un proveedor define un estándar de hardware orientado a modelos de frontera, deja en claro que la frontera no es solo la calidad del modelo, sino también la forma en que se sirve, se evalúa y se opera. Eso cambia la conversación en dos niveles.',
        ],
      },
      {
        title: 'Costos, latencia y gobernanza ya no son secundarios',
        paragraphs: [
          'Antes se discutía si un modelo era “mejor” en benchmarks genéricos. Ahora se requiere medir rendimiento sobre tareas reales del negocio: tasa de resolución de casos, tiempo de respuesta, costo por caso, materialidad de los errores y capacidad de supervisión humana.',
          'La diferencia entre un modelo fuerte y un sistema útil es enorme. La mejor decisión técnica ya no es la más potente, sino la que permite sostener la operación con control, previsibilidad y costo razonable.',
        ],
      },
      {
        title: 'La arquitectura IA necesita trazabilidad y revisión humana',
        paragraphs: [
          'Si la IA se usa en procesos con decisiones materiales, hay que definir zonas donde la automatización es útil y zonas donde la revisión humana es obligatoria. La arquitectura de IA ya no puede ser una caja negra; debe ser trazable, evaluable y operable.',
          'La prioridad para equipos técnicos no es “adoptar la última tecnología”, sino construir una base sobre la cual la inteligencia pueda crecer sin destruir la confiabilidad del sistema.',
        ],
      },
    ],
    takeaway: 'La capacidad del modelo es indispensable, pero no suficiente. Cuando el hardware entra en la conversación de diseño, la IA deja de ser una capa experimental y pasa a ser una decisión de infraestructura, producto y riesgo.',
  },
  {
    slug: 'puffin-world-modelos-multimodales-open-weight',
    title: 'Puffin-World y la nueva oleada de modelos multimodales: menos hype, más arquitectura real',
    description: 'Un vistazo a la nueva generación de modelos multimodales y a lo que realmente importa cuando se evalúan repositorios open y arquitectura de producto.',
    category: 'Noticias de IA',
    tags: ['IA', 'Arquitectura', 'Infraestructura'],
    date: '2026-09-07',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de nuevos modelos y repositorios',
    sourceUrl: 'https://huggingface.co/blog/KangLiao/puffin-world',
    sourceLabel: 'Fuente oficial: Hugging Face Blog',
    lead: 'La evolución del ecosistema open-model ya no se parece a una carrera de benchmarks aislados. La nueva ola está marcada por modelos multimodales más integrados, mejor capacidad de razonamiento visual y una presión real por resolver problemas de uso productivo. En ese marco, repositorios como Puffin-World son más que un experimento: son una señal de que la arquitectura y la ejecución van a definir la próxima generación de valor.',
    architecture: {
      caption: 'Multimodalidad como capa operativa del producto',
      description: 'La cuestión ya no es solo qué ve el modelo, sino qué decisiones puede tomar con lo que ve, cómo validarlo y cómo operarlo en contexto real.',
      layers: [
        { label: 'Entradas', items: ['Texto', 'Imágenes', 'Señales visuales e interacciones'] },
        { label: 'Representación', items: ['Contexto multimodal', 'Integración con herramientas'] },
        { label: 'Razonamiento', items: ['Flujos de inferencia', 'Modelos adaptados a tareas'] },
        { label: 'Operación', items: ['Validación humana', 'Monitoreo y evaluación', 'Costos y latencia'] },
      ],
    },
    sections: [
      {
        title: 'El centro de gravitación ya no está solo en el texto',
        paragraphs: [
          'Cuando el mercado empezó a hablar de LLMs, el foco se puso en velocidad de respuesta, calidad del texto y capacidad de razonamiento. Hoy la conversación avanzó. El centro de gravedad ya no está solo en el texto; está en la capacidad de entender contexto multimodal, interactuar con el entorno e integrar señales visuales en un flujo completo.',
          'El caso de Puffin-World es útil porque muestra que la innovación no está solamente en la cantidad de parámetros ni en el valor de marketing de una carta de especificaciones. Está en una pregunta más útil: ¿qué tipo de sistema se puede construir encima de este modelo?',
        ],
      },
      {
        title: 'La multimodalidad necesita orquestación y validación',
        paragraphs: [
          'La parte más interesante ya no es “qué ve el modelo”, sino “qué decisiones puede tomar con lo que ve”, “cómo se valida la salida” y “qué rol juega la revisión humana”. Eso es lo que transforma una capacidad técnica en un producto.',
          'Un modelo multimodal solo es valioso cuando resulta útil en un flujo concreto. Un sistema que analiza documentos, imágenes, interfaces o secuencias de interacción tiene una ventaja enorme sobre un modelo que simplemente responde a prompts bien escritos. Pero esa ventaja solo aparece si la capa de orquestación está diseñada para el dominio real.',
        ],
      },
      {
        title: 'La nueva ola de open models exige arquitectura real',
        paragraphs: [
          'La nueva generación de modelos no implica necesariamente una nueva generación de software, pero sí exige una revisión profunda de la capa de integración. La diferencia entre un detalle técnico y una ventaja competitiva está en contexto, herramientas, evaluación y operación.',
          'La innovación no depende solo del modelo, sino de la forma en que se integra a los flujos de decisión. Es ahí donde aparece la diferencia entre un “demo” y una solución operativa.',
        ],
      },
    ],
    takeaway: 'La nueva oleada multimodal no es una simple mejora estética del ecosistema. Es una señal de que el valor real ya no vive solo en la firma del modelo, sino en la capacidad del sistema para entender mundo, contexto y decisiones.',
  },
  {
    slug: 'ia-no-cambia-solo-herramienta-liderazgo-operacion',
    title: 'La IA no cambia solo una herramienta: cambia la estructura del liderazgo y la operación',
    description: 'Análisis de por qué la IA redefine liderazgo, coordinación, métricas y responsabilidad operativa, no solo el stack técnico.',
    category: 'Liderazgo y producto',
    tags: ['IA', 'Liderazgo', 'Producto'],
    date: '2026-09-07',
    readingTime: '8 min de lectura',
    projectSlug: '',
    contextLabel: 'Liderazgo y transformación digital',
    sourceUrl: 'https://hbr.org/ai',
    sourceLabel: 'Fuente: Harvard Business Review — AI',
    lead: 'La mayor promesa de la IA no es reemplazar trabajo humano por una herramienta más inteligente. La mayor promesa es cambiar la forma en que se decide, se organiza el trabajo y se mide la ejecución. Esa es la razón por la que la conversación de liderazgo no puede seguir reduciéndose a “qué herramienta usar”, porque el verdadero cambio está en la operación.',
    architecture: {
      caption: 'IA como parte del operating model, no como feature aislado',
      description: 'Cuando se integra IA en la operación, la estructura del trabajo y la responsabilidad humana cambian junto con la tecnología.',
      layers: [
        { label: 'Decisión', items: ['Objetivos y prioridades', 'Definición de caso de uso'] },
        { label: 'Sistema', items: ['IA', 'Flujos y reglas'] },
        { label: 'Operación', items: ['Validación humana', 'Políticas y guardrails'] },
        { label: 'Liderazgo', items: ['Ownership', 'Métricas y revisión'] },
      ],
    },
    sections: [
      {
        title: 'La IA modifica estructura, no solo tareas',
        paragraphs: [
          'La historia más repetida sobre IA en el negocio suele ser simple: una empresa compra una herramienta, prueba un caso de uso y espera que “la productividad suba”. Ese relato funciona como narrativa de ventas, pero rara vez refleja la realidad de la operación.',
          'La verdad es que la IA modifica no solo tareas, sino también responsabilidad, estructura, decisiones y posición del liderazgo. Cuando una herramienta automatiza parte del análisis o la producción, la organización necesita redefinir quién valida, quién decide, qué se automatiza y qué se mantiene humano.',
        ],
      },
      {
        title: 'El desafío real es diseñar un sistema de decisión',
        paragraphs: [
          'Hay dos errores clásicos: el primero es confundir IA con productividad. El segundo es tratarla como un reemplazo total de juicio humano. La realidad está en el medio. La IA puede acelerar análisis, síntesis y ejecución, pero no reemplaza la capacidad de priorizar con criterio, interpretar contexto y asumir riesgos reales.',
          'Esto implica que el liderazgo técnico debe pensar en IA como parte de un operating model, no como un módulo aislado. Un equipo que quiere integrar IA de forma útil debe definir casos de uso con impacto, políticas de seguridad y revisión, mecanismos de evaluación y un grado claro de automatización.',
        ],
      },
      {
        title: 'El liderazgo se vuelve más crítico, no menos',
        paragraphs: [
          'La IA puede generar velocidad, pero también puede multiplicar errores si la organización no tiene claridad sobre dónde se usa, cómo se valida y quién tiene autoridad para intervenir. Ahí aparece el verdadero desafío del liderazgo.',
          'La organización que gana con IA no es la que tiene la herramienta más avanzada, sino la que sabe convertirla en un sistema de decisión con criterio, métricas y responsabilidad clara.',
        ],
      },
    ],
    takeaway: 'El futuro no se define por la herramienta más avanzada, sino por la capacidad de la organización para convertir IA en un sistema de decisión con criterio. Ese es el punto en el que el liderazgo técnico deja de ser una función lateral y pasa a ser central.',
  },
  {
    slug: 'llama-4-scout-open-weight-usa',
    title: 'Llama 4 Scout: qué aporta el open-weight multimodal de Meta a equipos de producto',
    description: 'Análisis de Llama 4 Scout: arquitectura MoE multimodal, contexto de 10 millones de tokens, licencia comercial específica y requisitos reales de despliegue.',
    category: 'LLM open-weight',
    tags: ['IA', 'Open-weight', 'Arquitectura'],
    date: '2026-08-25',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de modelos open-weight',
    sourceUrl: 'https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct',
    sourceLabel: 'Fuente oficial: Meta Llama en Hugging Face',
    lead: 'Llama 4 Scout es el modelo open-weight multimodal de Meta que conviene mirar al evaluar capacidades de visión, texto y contexto largo bajo una estrategia de despliegue propia. Su propuesta combina una arquitectura Mixture-of-Experts, 17 mil millones de parámetros activados por inferencia y una ventana de contexto declarada de hasta 10 millones de tokens. El punto crítico para negocio no es solo su capacidad: es entender qué implica operar 109 mil millones de parámetros totales bajo una licencia comunitaria específica.',
    architecture: {
      caption: 'Llama 4 Scout: entrada multimodal y ejecución MoE',
      description: 'Texto e imágenes se integran temprano en la representación del modelo. Los bloques transformer enrutan cada token hacia expertos seleccionados antes de producir texto o código multilingüe.',
      layers: [
        { label: 'Entradas', items: ['Texto multilingüe', 'Imágenes'] },
        { label: 'Fusión temprana', items: ['Representación multimodal', 'Embeddings compartidos'] },
        { label: 'Cómputo MoE', items: ['16 expertos', '17B activos / 109B totales'] },
        { label: 'Salida', items: ['Texto y código', 'Contexto de hasta 10M tokens'] },
      ],
    },
    sections: [
      {
        title: 'La capacidad distintiva: multimodalidad y contexto largo',
        paragraphs: [
          'Meta posiciona a Scout como un modelo con fusión temprana de texto e imágenes: la información visual no se agrega como una capa posterior, sino que participa de la representación desde el procesamiento del modelo. Para productos que trabajan con documentos, interfaces, imágenes o evidencia visual, esta arquitectura habilita flujos que un modelo solo textual no resuelve por sí mismo.',
          'La ventana de contexto de hasta 10 millones de tokens es otra capacidad relevante, aunque debe tratarse como una restricción de ingeniería y no como un argumento de marketing. Contexto disponible no equivale automáticamente a recuperación precisa: el equipo debe medir calidad, latencia, costo y comportamiento con el tipo de corpus que realmente usará.',
        ],
      },
      {
        title: 'MoE reduce cómputo activo, no elimina el costo de operación',
        paragraphs: [
          'Scout usa Mixture-of-Experts con 16 expertos: activa 17B parámetros por paso, pero distribuye 109B de pesos totales. El patrón permite aumentar capacidad sin ejecutar todos los parámetros para cada token, una ventaja para inferencia frente a un modelo denso de tamaño equivalente.',
          'Sin embargo, los pesos siguen necesitando memoria. La ficha del modelo y la operación práctica obligan a evaluar cuantización, distribución en varias GPU, throughput requerido y límites de latencia. Elegir un modelo open-weight significa asumir la responsabilidad de esa plataforma, no solo descargar un checkpoint.',
        ],
      },
      {
        title: 'Open-weight no es sinónimo de open source',
        paragraphs: [
          'Los pesos de Scout se descargan públicamente después de aceptar la Llama 4 Community License, pero esa licencia no es Apache 2.0 ni una licencia OSI. Incluye condiciones de uso para organizaciones que superen los 700 millones de usuarios activos mensuales.',
          'Para una startup o una empresa, la revisión de licencia debe formar parte del diseño de adopción junto con seguridad, evaluación y privacidad. El modelo puede ser técnicamente adecuado y aun así no ser compatible con la distribución, el producto o la escala proyectada.',
        ],
      },
    ],
    takeaway: 'Criterio de adopción: Llama 4 Scout es una alternativa open-weight potente para casos multimodales y de contexto largo, siempre que el equipo valide calidad en su dominio, planifique infraestructura y revise las obligaciones de su licencia comunitaria.',
  },
  {
    slug: 'qwen3-235b-open-weight-china',
    title: 'Qwen3-235B-A22B: el caso de China para inferencia open-weight a gran escala',
    description: 'Análisis del flagship open-weight de Qwen: MoE de 235B/22B activos, 119 idiomas, hasta 1M de contexto y licencia Apache 2.0.',
    category: 'LLM open-weight',
    tags: ['IA', 'Open-weight', 'Arquitectura'],
    date: '2026-08-25',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de modelos open-weight',
    sourceUrl: 'https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507',
    sourceLabel: 'Fuente oficial: Qwen en Hugging Face',
    lead: 'Qwen3-235B-A22B-Instruct-2507 condensa una tendencia que está redefiniendo el mercado open-weight: modelos de gran capacidad que activan una fracción de sus parámetros por token. El modelo de Qwen, desarrollado por el equipo de Alibaba, declara 235B de parámetros totales, 22B activos, soporte para 119 idiomas y hasta un millón de tokens de contexto extendido. Su licencia Apache 2.0 lo vuelve especialmente relevante para equipos que necesitan libertad comercial y de redistribución.',
    architecture: {
      caption: 'Qwen3-235B-A22B: MoE y atención agrupada',
      description: 'El texto multilingüe recorre 94 bloques transformer con Grouped Query Attention. El router MoE selecciona ocho de 128 expertos por token para producir una respuesta de instrucción directa.',
      layers: [
        { label: 'Entrada', items: ['Texto en 119 idiomas', 'Ventana nativa de 262K tokens'] },
        { label: 'Atención', items: ['94 capas transformer', 'Grouped Query Attention'] },
        { label: 'Cómputo MoE', items: ['128 expertos', '8 activos por token'] },
        { label: 'Salida', items: ['22B activos / 235B totales', 'Instruct no-thinking'] },
      ],
    },
    sections: [
      {
        title: 'Capacidad global con una licencia simple de evaluar',
        paragraphs: [
          'La familia Qwen3 publica modelos densos y MoE bajo Apache 2.0. Para organizaciones que evalúan modelos open-weight, esta licencia reduce fricción en uso comercial, modificación y redistribución frente a licencias comunitarias con condiciones específicas.',
          'El soporte declarado para 119 idiomas y dialectos es especialmente relevante para productos regionales o multilingües. Aun así, un listado de idiomas no sustituye una evaluación: español rioplatense, vocabulario de dominio, seguridad y calidad de herramientas deben medirse con un conjunto de pruebas propio antes de incorporar el modelo a un flujo de negocio.',
        ],
      },
      {
        title: 'La economía del MoE a escala de 235B parámetros',
        paragraphs: [
          'La arquitectura tiene 235B de parámetros totales, pero activa 22B mediante un router que selecciona ocho de 128 expertos por token. Esa sparsity busca concentrar cómputo en una porción del modelo y mejorar la relación entre capacidad y costo de inferencia.',
          'El dato no debe interpretarse como que el modelo se ejecuta igual que uno de 22B. El checkpoint, el sistema de serving, el caché KV y el contexto largo siguen definiendo una huella de infraestructura significativa. La operación de precisión completa requiere recursos empresariales; cuantización y servidores como vLLM o SGLang son decisiones de plataforma que deben validarse por carga real.',
        ],
      },
      {
        title: 'Contexto extendido necesita una política de recuperación',
        paragraphs: [
          'Qwen declara 262.144 tokens de contexto nativo y extensión a aproximadamente un millón mediante YaRN. Este alcance abre casos de análisis de repositorios, documentación extensa y conversaciones largas, pero también amplifica los problemas de selección de información y costo por solicitud.',
          'La arquitectura de producto debe decidir qué documentos entran, cómo se recuperan, cuándo se resumen y qué evidencia acompaña a la respuesta. Darle más contexto a un modelo no corrige una fuente incompleta, una política ambigua o una evaluación inexistente.',
        ],
      },
    ],
    takeaway: 'Criterio de adopción: Qwen3-235B-A22B combina capacidad MoE, alcance multilingüe y Apache 2.0; su valor práctico depende de medir calidad local y diseñar la infraestructura, recuperación y gobierno necesarios para operarlo a escala.',
  },
  {
    slug: 'claude-watermarking-gobernanza-contenido-ia',
    title: 'Claude incorporará watermarking de texto: qué cambia para la gobernanza de IA',
    description: 'Anthropic anunció que futuros modelos de Claude generarán texto con watermarking: implicancias para trazabilidad, compliance y controles de contenido generado por IA.',
    category: 'Noticias de IA',
    date: '2026-08-25',
    readingTime: '6 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de actualidad',
    sourceUrl: 'https://www.anthropic.com/news/claude-text-watermark',
    sourceLabel: 'Fuente oficial: Anthropic',
    lead: 'Anthropic anunció que los futuros modelos de Claude generarán texto con watermarking para permitir estimar la probabilidad de intervención del modelo. La noticia importa menos por el mecanismo aislado que por el cambio de conversación que habilita: equipos de producto, legal y compliance empiezan a contar con una señal técnica adicional para gobernar contenido generado por IA.',
    architecture: {
      caption: 'Watermarking como señal de procedencia',
      description: 'Claude selecciona alternativas lingüísticas de baja relevancia semántica mediante una clave de watermarking. Un verificador con esa clave puede estimar si un texto largo probablemente contiene contenido generado por Claude.',
      layers: [
        { label: 'Generación', items: ['Modelo Claude', 'Alternativas lingüísticas'] },
        { label: 'Marca estadística', items: ['Selección con clave', 'Sin caracteres ocultos'] },
        { label: 'Verificación', items: ['Muestra suficiente', 'Estimación probabilística'] },
        { label: 'Gobernanza', items: ['Trazabilidad de contenido', 'Políticas y revisión humana'] },
      ],
    },
    sections: [
      {
        title: 'La novedad: una señal, no un identificador personal',
        paragraphs: [
          'Según Anthropic, el watermark no agrega caracteres ocultos ni información que permita asociar el texto a una persona, organización o conversación. El mecanismo usa elecciones alternativas de palabras que preservan el significado para dejar un patrón estadístico verificable con una clave.',
          'La distinción es importante para negocio. No es un registro de auditoría completo ni una etiqueta visible para el lector. Es una señal que permite responder una pregunta acotada: cuál es la probabilidad de que un texto haya sido generado, al menos en parte, por Claude.',
        ],
      },
      {
        title: 'El impacto está en el ciclo de gobernanza',
        paragraphs: [
          'Las organizaciones que usan IA para documentación, atención, marketing o procesos internos necesitan separar tres problemas: procedencia, calidad y responsabilidad. El watermarking aporta evidencia sobre procedencia; no valida que el contenido sea correcto, permitido o adecuado para un contexto regulado.',
          'Por eso debe integrarse a controles existentes: políticas de uso aceptable, revisión por riesgo, trazabilidad de prompts y outputs cuando corresponda, y procesos de aprobación antes de publicar contenido sensible. Una señal técnica no reemplaza el criterio editorial, legal o profesional.',
        ],
      },
      {
        title: 'Limitaciones que el diseño debe respetar',
        paragraphs: [
          'El propio anuncio aclara que la detección necesita muestras suficientes y que el watermark es menos efectivo cuando hay pocas decisiones lingüísticas, como en pasajes factuales o correcciones ligeras. Tampoco identifica texto producido por otros modelos ni prueba que un texto no haya tenido intervención humana.',
          'Para equipos técnicos, la consecuencia es evitar automatismos binarios. Un resultado de detección debe alimentar una evaluación de riesgo, no disparar por sí solo una decisión punitiva o de cumplimiento. La arquitectura correcta conserva contexto, umbrales y revisión humana.',
        ],
      },
    ],
    takeaway: 'Impacto operativo: el watermarking puede mejorar la trazabilidad de contenido generado por IA, pero solo produce gobernanza real cuando se combina con políticas, contexto de uso y responsabilidad humana.',
  },
  {
    slug: 'kiro-acp-interoperabilidad-agentes-ide',
    title: 'Kiro adopta ACP: la interoperabilidad de agentes llega al IDE especializado',
    description: 'Kiro CLI incorporó Agent Client Protocol para operar agentes en IDEs compatibles: impacto en herramientas especializadas, estandarización y control de ejecución.',
    category: 'Noticias de IA',
    date: '2026-08-25',
    readingTime: '6 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de actualidad',
    sourceUrl: 'https://kiro.dev/blog/kiro-adopts-acp/',
    sourceLabel: 'Fuente oficial: Kiro',
    lead: 'Kiro anunció soporte de Agent Client Protocol (ACP) en su CLI. La novedad permite usar las capacidades del agente desde IDEs y herramientas compatibles, en lugar de atarlas a un único editor. Para equipos técnicos, el cambio relevante es arquitectónico: un protocolo común reduce integraciones ad hoc y permite aplicar el agente donde el contexto especializado ya existe.',
    architecture: {
      caption: 'Interoperabilidad entre herramienta especializada y agente',
      description: 'Un IDE o herramienta compatible implementa ACP y se comunica con Kiro CLI. El agente recibe contexto de la herramienta, propone o ejecuta acciones autorizadas y devuelve resultados al entorno especializado.',
      layers: [
        { label: 'Herramienta', items: ['IDE especializado', 'Esquema, índices y contexto'] },
        { label: 'Protocolo', items: ['Agent Client Protocol', 'Contrato interoperable'] },
        { label: 'Agente', items: ['Kiro CLI', 'Razonamiento y planificación'] },
        { label: 'Ejecución', items: ['Comandos y herramientas', 'Aprobación y resultados'] },
      ],
    },
    sections: [
      {
        title: 'De integraciones uno a uno a un contrato común',
        paragraphs: [
          'Antes de un protocolo compartido, cada combinación de agente y editor requiere una integración específica. ACP propone estandarizar la comunicación entre clientes —editores o herramientas— y agentes de código. Kiro compara esa función con el impacto que Language Server Protocol tuvo sobre las capacidades de lenguajes en los IDEs.',
          'La consecuencia para una organización es menor dependencia de una interfaz única. Un equipo puede mantener su entorno especializado para bases de datos, ciencia de datos o desarrollo móvil y acceder al agente a través del mismo contrato, en vez de sacrificar contexto de trabajo para adoptar una herramienta de IA.',
        ],
      },
      {
        title: 'El caso de uso importante es el contexto especializado',
        paragraphs: [
          'El anuncio ilustra la integración con DataGrip: la herramienta aporta visualización de esquemas, planes de ejecución, autocompletado y gestión de conexiones; el agente puede asistir con consultas, migraciones, datos de prueba o explicación de condiciones complejas. Ninguna capa reemplaza a la otra.',
          'Este patrón es aplicable a otros dominios. La herramienta especializada conserva el modelo, la telemetría o los controles propios del área. El agente aporta razonamiento y automatización sobre ese contexto. El valor no está en poner chat en todas partes, sino en reducir la distancia entre intención, contexto y acción verificable.',
        ],
      },
      {
        title: 'Interoperabilidad exige controles de ejecución',
        paragraphs: [
          'Un agente que puede ejecutar comandos desde una herramienta conectada a datos reales amplía la superficie de riesgo. El protocolo no elimina la necesidad de identidad, autorización, secreto seguro, entornos aislados y revisión de acciones con impacto.',
          'Para adoptar esta capacidad de forma profesional, conviene definir qué entornos puede tocar el agente, qué acciones requieren aprobación, cómo se registra la actividad y quién es responsable de revisar un cambio. La interoperabilidad acelera el flujo; la gobernanza evita que acelere el error.',
        ],
      },
    ],
    takeaway: 'Impacto operativo: ACP permite ubicar agentes donde está el contexto de trabajo. El siguiente desafío para los equipos es combinar esa flexibilidad con permisos, trazabilidad y controles de ejecución proporcionados al riesgo.',
  },
  {
    slug: 'spec-kit-1-especificaciones-agentes-adopcion',
    title: 'Spec Kit 1.0: la especificación se consolida como interfaz para agentes',
    description: 'GitHub publicó Spec Kit 1.0 y 1.0.1, con guías de adopción, quickstarts y extensiones: impacto en desarrollo spec-driven y automatización con agentes.',
    category: 'Noticias de IA',
    date: '2026-08-25',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Análisis de actualidad',
    sourceUrl: 'https://github.com/github/spec-kit/releases/tag/v1.0.1',
    sourceLabel: 'Fuente oficial: GitHub Spec Kit',
    lead: 'GitHub publicó Spec Kit 1.0 y la versión 1.0.1 el 21 de agosto de 2026. La actualización incorpora guías de adopción para proyectos existentes, quickstarts de workflows y evoluciones en el catálogo de extensiones. El impacto no es una herramienta más para generar código: es la maduración de la especificación como contrato de trabajo entre producto, ingeniería y agentes.',
    architecture: {
      caption: 'Flujo spec-driven con agentes de código',
      description: 'El equipo define principios y especificaciones versionadas. A partir de ellas se derivan plan y tareas que un agente implementa con validaciones y revisiones en el repositorio.',
      layers: [
        { label: 'Intención', items: ['Principios de proyecto', 'Especificación versionada'] },
        { label: 'Planificación', items: ['Plan técnico', 'Tareas y dependencias'] },
        { label: 'Ejecución', items: ['Agente de código', 'Cambios en repositorio'] },
        { label: 'Control', items: ['Tests y revisión', 'Evidencia y entrega'] },
      ],
    },
    sections: [
      {
        title: 'La novedad: 1.0 con adopción y extensibilidad',
        paragraphs: [
          'La release 1.0.1 incluye documentación de adopción para proyectos existentes, historial de proyecto, quickstarts de workflows y actualizaciones del catálogo comunitario. La versión 1.0.0 incorpora además extensiones y presets orientados a seguridad, arquitectura, inventario y aseguramiento de calidad.',
          'Esto mueve a Spec Kit desde un flujo experimental hacia una base más preparada para equipos que no empiezan desde un repositorio vacío. El problema real no es iniciar una demo con agentes; es introducirlos en sistemas donde ya existen convenciones, deuda, dependencias y responsabilidades de entrega.',
        ],
      },
      {
        title: 'La especificación es contexto ejecutable',
        paragraphs: [
          'En un flujo spec-driven, la especificación no reemplaza el diseño técnico ni la conversación de producto. Ordena ambos para que las decisiones de alcance, restricciones y aceptación estén disponibles antes de que el agente genere código. Después, plan y tareas convierten esa intención en un camino verificable.',
          'Este enfoque coincide con una práctica que aplico en productos propios: la ambigüedad es el principal costo oculto de la entrega asistida por IA. Si el equipo no define el problema, los límites y los criterios de validación, el agente solo automatiza una interpretación que puede ser incorrecta.',
        ],
      },
      {
        title: 'Adaptabilidad no reemplaza control de cambios',
        paragraphs: [
          'La nota de lanzamiento de 1.0 plantea que los agentes reducen el costo de adaptar un repositorio frente a cambios. Es una observación valiosa: migraciones y refactors pueden acelerarse cuando el agente tiene contexto del diff y de los contratos afectados.',
          'Sin embargo, una modificación más fácil de ejecutar no es automáticamente una modificación segura de desplegar. Los equipos siguen necesitando revisión, pruebas, controles de seguridad, observabilidad y una definición clara de qué evidencia demuestra que el cambio cumple la especificación.',
        ],
      },
    ],
    takeaway: 'Impacto operativo: Spec Kit 1.0 refuerza la especificación como interfaz de coordinación para agentes. Su valor aparece cuando el equipo versiona intención, valida resultados y conserva control sobre el cambio.',
  },
  {
    slug: 'aws-cloud-practitioner-conceptos-fundamentales',
    title: 'Lo que estoy aprendiendo al estudiar AWS Cloud Practitioner',
    description: 'Conceptos de cloud que cambian decisiones de ingeniería y negocio: responsabilidad compartida, elasticidad, seguridad, arquitectura y costos.',
    category: 'Cloud y arquitectura',
    date: '2026-08-25',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Aprendizaje profesional en curso',
    lead: 'Estudiar AWS Cloud Practitioner está ordenando conceptos que aparecen en cada producto que construyo: dónde termina la responsabilidad del proveedor, cómo se diseña para fallar menos, por qué el costo es una decisión de arquitectura y qué significa operar un sistema sin administrar el hardware. Más que memorizar servicios, el valor está en incorporar un modelo para tomar mejores decisiones técnicas y de negocio.',
    architecture: {
      caption: 'Modelo de responsabilidad compartida en cloud',
      description: 'AWS opera la infraestructura física y los servicios base. El equipo cliente define identidad, acceso, configuración, datos, aplicaciones y controles operativos según el servicio utilizado.',
      layers: [
        { label: 'Negocio', items: ['Requisitos y riesgo', 'Costo y cumplimiento'] },
        { label: 'Aplicación', items: ['Código y datos', 'Configuración y secretos'] },
        { label: 'Controles compartidos', items: ['Identidad y acceso', 'Monitoreo y respuesta'] },
        { label: 'AWS', items: ['Regiones y hardware', 'Red y servicios administrados'] },
      ],
    },
    sections: [
      {
        title: 'Cloud no elimina responsabilidades: las redistribuye',
        paragraphs: [
          'El concepto que más ordena el resto es el modelo de responsabilidad compartida. AWS se ocupa de la seguridad de la infraestructura cloud: centros de datos, hardware, red y servicios base. El cliente sigue siendo responsable de la seguridad en la cloud: identidad, permisos, datos, configuración, aplicaciones y uso correcto de los servicios.',
          'La frontera cambia según el servicio elegido. Al usar una máquina virtual, el equipo administra más capas que al usar un servicio administrado. Para un responsable de negocio, esto significa que contratar cloud no transfiere automáticamente el riesgo; cambia qué controles se deben diseñar, operar y auditar.',
        ],
      },
      {
        title: 'Elasticidad es una capacidad de producto',
        paragraphs: [
          'La elasticidad permite ajustar recursos frente a cambios de demanda. No se trata solo de soportar un pico de tráfico: permite evitar pagar capacidad ociosa cuando un producto todavía está validando su mercado y responder cuando una campaña, una integración o un evento aumenta el uso.',
          'La distinción entre escalabilidad y elasticidad ayuda a tomar decisiones más precisas. Escalar es aumentar capacidad; ser elástico es adaptarla. La arquitectura debe separar componentes, evitar estados difíciles de mover y usar métricas que indiquen cuándo el sistema necesita reaccionar.',
        ],
      },
      {
        title: 'Alta disponibilidad requiere pensar en fallas esperables',
        paragraphs: [
          'Una región de AWS se compone de zonas de disponibilidad aisladas. Ese diseño permite construir sistemas que no dependan de un único punto físico de falla. El aprendizaje no es que todos los productos deban ser globales desde el primer día; es que cada requisito de disponibilidad tiene un costo y una arquitectura asociada.',
          'Para un MVP, una solución simple puede ser correcta. Para un flujo de pagos, salud o datos críticos, la conversación debe incluir recuperación, respaldos, observabilidad y objetivos de disponibilidad. La cloud ofrece bloques para resolverlo; no decide por el equipo cuál es el nivel de riesgo aceptable.',
        ],
      },
      {
        title: 'IAM y mínimo privilegio son parte del diseño',
        paragraphs: [
          'Identity and Access Management convierte accesos en políticas explícitas: quién puede hacer qué sobre qué recurso y en qué condiciones. El principio de mínimo privilegio reduce el impacto de una credencial expuesta, un error de configuración o una acción involuntaria.',
          'En la práctica, esto conecta con decisiones que ya aplico en productos multi-tenant y plataformas de pago: no confiar en permisos implícitos, separar responsabilidades y dejar trazabilidad. Una cuenta root, credenciales estáticas en código o permisos amplios son deudas de seguridad, aunque el sistema todavía sea pequeño.',
        ],
      },
      {
        title: 'FinOps empieza en la arquitectura',
        paragraphs: [
          'El modelo de pago por uso es una ventaja cuando se entiende qué genera consumo y qué se puede apagar, reservar, automatizar o medir. El costo cloud no es solo una factura de infraestructura: refleja decisiones sobre cómputo, almacenamiento, transferencia, retención, disponibilidad y observabilidad.',
          'Por eso, el costo debe entrar temprano en el diseño. Etiquetar recursos, establecer presupuestos y alertas, elegir servicios administrados cuando reducen operación y revisar recursos sin uso son prácticas que permiten que ingeniería y negocio hablen con los mismos datos.',
        ],
      },
    ],
    takeaway: 'Principio de cloud: la infraestructura bajo demanda acelera la entrega, pero el valor aparece cuando seguridad, disponibilidad y costo se diseñan como responsabilidades explícitas del producto.',
  },
  {
    slug: 'web-corporativa-2026-impacto-rendimiento',
    title: 'Web corporativa en 2026: diseñar impacto sin sacrificar rendimiento ni control',
    description: 'Arquitectura para experiencias corporativas de alto impacto: narrativa scroll-driven, WebGL progresivo, animación con propósito y una base mantenible.',
    category: 'Experiencias web',
    date: '2026-08-25',
    readingTime: '7 min de lectura',
    projectSlug: '',
    contextLabel: 'Pambú 2026',
    sourceUrl: 'https://github.com/juliancardozo/pambu2026',
    sourceLabel: 'Ver repositorio de Pambú 2026',
    lead: 'Una web corporativa ya no compite solo por informar qué hace una empresa. Compite por comunicar criterio, diferenciar una propuesta y conducir una conversación comercial. El reto técnico es lograr una experiencia memorable sin convertir la página en una SPA frágil, lenta o difícil de evolucionar. Pambú 2026 fue construido desde ese equilibrio.',
    architecture: {
      caption: 'Arquitectura de una experiencia corporativa scroll-driven',
      description: 'Una capa semántica de HTML organiza el contenido comercial. CSS define la identidad visual y JavaScript vanilla coordina una capa WebGL de Three.js y transiciones GSAP activadas por el scroll.',
      layers: [
        { label: 'Narrativa de negocio', items: ['Propuesta de valor', 'Servicios y contacto'] },
        { label: 'Base semántica', items: ['HTML5 por secciones', 'Navegación y contenido'] },
        { label: 'Experiencia visual', items: ['CSS3', 'Identidad y responsive'] },
        { label: 'Movimiento y profundidad', items: ['GSAP + ScrollTrigger', 'Three.js + WebGL'] },
      ],
    },
    sections: [
      {
        title: 'La web corporativa es un sistema de comunicación',
        paragraphs: [
          'Una visita institucional dura poco. En ese tiempo, la persona tiene que poder entender qué hace la organización, por qué debería prestarle atención y cuál es el siguiente paso. La arquitectura de información no puede ser una lista de secciones intercambiables: necesita una narrativa que ordene propuesta de valor, enfoque, identidad, servicios y contacto.',
          'En Pambú 2026, la estructura se organiza como una experiencia de una página con navegación a secciones. El scroll deja de ser solo una forma de desplazarse y se convierte en el ritmo de la presentación. Para negocio, esto permite guiar el mensaje; para ingeniería, mantiene un modelo de contenido directo y comprensible.',
        ],
      },
      {
        title: 'WebGL debe reforzar el mensaje, no ocultarlo',
        paragraphs: [
          'El fondo animado con WebGL y Three.js incorpora profundidad y movimiento a una propuesta centrada en creatividad, tecnología e innovación. Pero el componente visual no puede cargar con el significado de la página. El contenido comercial, la navegación y el contacto deben permanecer disponibles como HTML semántico y legible sin depender de la capa gráfica.',
          'Esta separación es un control de resiliencia. La experiencia enriquecida puede evolucionar, degradar de forma aceptable en hardware limitado o fallar sin bloquear el mensaje. El impacto visual es una capa de mejora progresiva, no una condición para que el sitio funcione.',
        ],
      },
      {
        title: 'Animación con intención y presupuesto de rendimiento',
        paragraphs: [
          'GSAP y ScrollTrigger permiten sincronizar transiciones con la lectura de cada sección. Usarlos bien no significa animar todo: significa dirigir atención hacia un cambio de contexto, una jerarquía visual o una llamada a la acción. Cada animación debe justificar qué comprensión o conversión mejora.',
          'En una página de alto impacto, el rendimiento es parte de la marca. El equipo debe tratar el peso de assets, el trabajo de renderizado y la ejecución en dispositivos de menor capacidad como restricciones de diseño. La elección de JavaScript vanilla para la capa de interacción reduce superficie de runtime y facilita que la experiencia se mantenga enfocada.',
        ],
      },
      {
        title: 'Una base simple mejora la evolución',
        paragraphs: [
          'Pambú 2026 se implementa con HTML5, CSS3 y JavaScript vanilla, con Three.js y GSAP cargados desde CDN. Esta decisión no niega el valor de un framework; responde a un caso donde la página es una experiencia editorial acotada, no una aplicación con estados de negocio complejos.',
          'La consecuencia es operativa: menos capas para desplegar, inspeccionar y modificar. El equipo puede concentrar su esfuerzo en narrativa, contenido, performance y calidad visual. Si el producto necesita luego CMS, personalización o funcionalidades transaccionales, la arquitectura puede crecer sobre una necesidad comprobada, no una hipótesis.',
        ],
      },
    ],
    takeaway: 'Principio de experiencia corporativa: el alto impacto surge cuando la narrativa, la identidad visual y el rendimiento trabajan como un sistema. La tecnología debe intensificar el mensaje, no convertirse en el mensaje.',
  },
  {
    slug: 'milo-care-onboarding-calendario-clinico',
    title: 'Onboarding clínico: cómo evitar que un producto de salud empiece vacío',
    description: 'La arquitectura de onboarding de Milo Care: reglas por país, calendario vacunal precargado y una primera sesión con valor operativo.',
    category: 'Producto y arquitectura',
    date: '2026-08-25',
    readingTime: '6 min de lectura',
    projectSlug: 'milo-care',
    projectName: 'Milo Care',
    lead: 'Milo Care nació de un problema de gestión de información: vacunas, medicación y controles repartidos entre una foto, un chat, una nota y la memoria. La primera decisión de producto fue evitar trasladar ese trabajo al usuario. Un onboarding útil no pide datos para llenar una base: transforma datos mínimos en un plan de cuidado accionable.',
    architecture: {
      caption: 'Onboarding asistido por reglas clínicas y país',
      description: 'La persona registra los datos básicos del perro y su país. Milo Care aplica reglas de calendario basadas en fuentes veterinarias, crea eventos iniciales y entrega un historial clínico preparado para seguimiento.',
      layers: [
        { label: 'Entrada', items: ['Perfil del cuidador', 'Datos del perro y país'] },
        { label: 'Reglas de dominio', items: ['SENASA y WSAVA', 'Calendario por AR/UY'] },
        { label: 'Historial clínico', items: ['Vacunas y vencimientos', 'Medicamentos y citas'] },
        { label: 'Experiencia', items: ['Dashboard útil', 'Próximas acciones'] },
      ],
    },
    sections: [
      {
        title: 'El empty state es un problema de activación',
        paragraphs: [
          'Un registro clínico que abre vacío le pide al usuario que reconstruya meses o años de información antes de obtener algo a cambio. Para un producto de cuidado, ese costo inicial compite directamente con el papel, el chat o la nota que ya usan. No es un detalle de UX: es un problema de activación y retención.',
          'En Milo Care, el alta del perro captura país y datos relevantes para iniciar un calendario vacunal. El resultado esperado no es una ficha más completa; es una primera sesión que ya muestra próximas acciones, fechas y un historial sobre el que se puede operar.',
        ],
      },
      {
        title: 'Convertir guías clínicas en reglas de dominio',
        paragraphs: [
          'El calendario no podía ser una lista genérica de vacunas. Las recomendaciones cambian por país, fuente y contexto clínico. La solución fue modelar reglas de negocio que distinguen el calendario de Argentina y Uruguay, con SENASA y las guías WSAVA como referencias, sin presentar la plataforma como sustituto de una indicación veterinaria.',
          'Ese límite es parte de la arquitectura de dominio. El sistema puede organizar, recordar y mostrar el plan; la evaluación clínica y la decisión profesional siguen fuera del automatismo. Separar ambas responsabilidades evita que una recomendación de software se presente como diagnóstico.',
        ],
      },
      {
        title: 'Un modelo preparado para el ciclo completo',
        paragraphs: [
          'El calendario inicial se integra con módulos de vacunas, medicamentos, citas y síntomas. Cada módulo maneja su propio estado y vencimiento, pero alimenta un único historial por animal. Esa consolidación permite que el dashboard priorice el trabajo pendiente y que los recordatorios operen sobre datos estructurados.',
          'Para negocio, la decisión tiene un efecto claro: el producto entrega valor antes de pedir hábitos complejos. Para ingeniería, deja un dominio extensible para nuevas especies, clínicas veterinarias y planes premium sin convertir el onboarding en una colección de excepciones.',
        ],
      },
    ],
    takeaway: 'Principio de producto: el onboarding debe convertir la información mínima en una primera acción valiosa. En dominios de salud, las reglas automatizadas organizan el seguimiento, pero no reemplazan el criterio profesional.',
  },
  {
    slug: 'milo-care-recordatorios-confiables',
    title: 'Recordatorios confiables: diseñar notificaciones como una responsabilidad de producto',
    description: 'Cómo Milo Care modela vencimientos y jobs programados para que las notificaciones ayuden a cuidar, sin degradar la confianza del usuario.',
    category: 'Operación y confiabilidad',
    date: '2026-08-25',
    readingTime: '5 min de lectura',
    projectSlug: 'milo-care',
    projectName: 'Milo Care',
    lead: 'Un recordatorio de vacuna o medicación parece una funcionalidad pequeña hasta que llega tarde, llega dos veces o llega para un tratamiento que ya cambió. En un producto de cuidado, cada notificación es una promesa operativa. Milo Care trata esa promesa como parte del dominio, no como un correo enviado al final de un flujo.',
    architecture: {
      caption: 'Pipeline de recordatorios basado en vencimientos',
      description: 'Los módulos clínicos registran eventos y fechas. Un job programado identifica recordatorios aplicables, aplica reglas de envío y entrega el correo mediante Resend. El historial conserva el contexto para el cuidador.',
      layers: [
        { label: 'Dominio clínico', items: ['Vacunas y medicación', 'Citas y síntomas'] },
        { label: 'Planificación', items: ['Fechas de vencimiento', 'Reglas de recordatorio'] },
        { label: 'Ejecución', items: ['node-cron', 'Jobs conservadores'] },
        { label: 'Entrega', items: ['Resend', 'Correo al cuidador'] },
      ],
    },
    sections: [
      {
        title: 'Una notificación incorrecta es deuda de confianza',
        paragraphs: [
          'En plataformas transaccionales, una notificación incorrecta puede generar un ticket. En una plataforma vinculada al cuidado de un animal, puede llevar a que el usuario ignore el próximo mensaje. Por eso la calidad del recordatorio no se mide solo por la entrega del email: depende de que la fecha, el estado y el contexto clínico sean correctos.',
          'Milo Care parte de eventos estructurados —vacunas, medicamentos y citas— con su propia lógica de vencimiento. El recordatorio se deriva de ese estado; no de una lista aislada de correos pendientes. De esta forma, el sistema conserva la relación entre el mensaje y la información que lo justifica.',
        ],
      },
      {
        title: 'Jobs programados con reglas explícitas',
        paragraphs: [
          'La ejecución usa node-cron para recorrer los vencimientos y Resend para la entrega. El componente técnico es sencillo; el diseño operativo no lo es. Las reglas deben definir cuándo un evento es elegible, cuándo deja de serlo y qué comportamiento corresponde cuando el usuario modifica o completa una tarea.',
          'La estrategia es conservadora: en un recordatorio, enviar de más o demasiado tarde degrada el producto tan rápido como no enviar. La programación debe privilegiar condiciones visibles y auditables por sobre automatismos opacos que maximicen volumen de emails.',
        ],
      },
      {
        title: 'La operación empieza antes del envío',
        paragraphs: [
          'Un pipeline de notificaciones necesita observabilidad sobre ejecuciones, eventos elegibles y entregas. Aunque el MVP no requiere una plataforma de mensajería compleja, sí necesita que el equipo pueda responder preguntas básicas: qué tarea originó el correo, cuándo se evaluó y por qué se envió.',
          'Esta base permite evolucionar sin reescribir el producto: preferencias de canal, ventanas horarias, métricas de interacción y reglas premium pueden incorporarse sobre el mismo modelo de vencimientos. La extensibilidad nace del dominio, no de anticipar infraestructura innecesaria.',
        ],
      },
    ],
    takeaway: 'Principio de confiabilidad: una notificación es parte de la experiencia de producto. Debe derivarse de un estado de dominio correcto, operar con reglas explícitas y poder explicarse cuando el usuario pregunta por qué la recibió.',
  },
  {
    slug: 'webhooks-pagos-maquinas-de-estado',
    title: 'Arquitectura de pagos: por qué un cobro no es una llamada HTTP',
    description: 'Patrones de integración, idempotencia y trazabilidad para modelar pagos como procesos de negocio auditables.',
    category: 'Pagos e infraestructura',
    date: '2026-08-24',
    readingTime: '6 min de lectura',
    projectSlug: 'micuota',
    projectName: 'MiCuota',
    lead: 'La experiencia en banca y fintech deja una regla operativa: crear un link no completa un cobro. Un proveedor responde de forma asíncrona, reintenta notificaciones y puede entregar información parcial. En MiCuota, esa realidad se tradujo en un modelo de estados, controles de idempotencia y un ledger auditable.',
    architecture: {
      caption: 'Procesamiento de una operación de cobro',
      description: 'El prestador inicia un cobro en MiCuota. La plataforma registra la operación y delega la ejecución a un proveedor. Los webhooks actualizan el ledger mediante transiciones validadas e idempotentes.',
      layers: [
        { label: 'Canales', items: ['Backoffice del prestador', 'Página de pago'] },
        { label: 'Dominio MiCuota', items: ['Operación de cobro', 'Máquina de estados'] },
        { label: 'Integración', items: ['PaymentProviderGateway', 'Webhooks validados'] },
        { label: 'Trazabilidad', items: ['payment_events', 'Conciliación y soporte'] },
      ],
    },
    sections: [
      {
        title: 'El cobro es un proceso asíncrono',
        paragraphs: [
          'Para quien cobra una cuota, el flujo parece lineal: comparte un link, la persona paga y el dinero aparece. Del lado del sistema, en cambio, el proveedor puede avisar unos segundos después, volver a avisar si no recibió respuesta o mandar una notificación con menos datos de los que uno esperaba. Es una realidad conocida en pagos, pero se vuelve muy concreta cuando el negocio depende de saber con certeza quién pagó y quién no.',
          'En MiCuota decidí tratar cada cobro como una máquina de estados. La operación nace, se envía, recibe novedades y cambia de estado con un origen y una fecha. El proveedor participa de esa historia, pero no la escribe por completo. La aplicación necesita su propia versión confiable de los hechos.',
        ],
      },
      {
        title: 'Idempotencia como control de negocio',
        paragraphs: [
          'El problema de un webhook repetido no es elegante ni académico. Puede ser una suscripción duplicada, una persona cobrada dos veces o un vendedor que pierde confianza en la herramienta. Por eso, procesar una notificación dos veces debe producir exactamente el mismo resultado que procesarla una sola.',
          'Eso exige identificar la notificación, validar si la transición tiene sentido y volver a consultar al proveedor cuando el aviso llega incompleto. El external reference cumple una función humilde pero crucial: permite volver desde una señal parcial a la operación exacta que la originó.',
        ],
      },
      {
        title: 'Ledger de eventos para soporte y conciliación',
        paragraphs: [
          'Los logs son indispensables para entender qué hizo un servicio. Pero cuando alguien pregunta por qué un pago no impactó, necesita una respuesta de negocio, no una excursión por cinco paneles de observabilidad. Por eso guardé en un ledger la creación del cobro, el envío del link, cada webhook y cada transición.',
          'La diferencia se siente en el primer incidente. En vez de reconstruir una versión probable de lo ocurrido, se puede leer la timeline de la operación. Y esa misma historia, que hoy sirve para soporte, mañana permite conciliación, recupero y reportes de mora.',
        ],
      },
    ],
    takeaway: 'Principio operativo: un pago confiable exige transiciones válidas, procesamiento idempotente y una trazabilidad que permita explicar cada estado sin depender de logs dispersos.',
  },
  {
    slug: 'multi-tenancy-rls-frontera-datos',
    title: 'Multi-tenancy seguro: el aislamiento de datos no puede depender de un WHERE',
    description: 'Cómo combinar identidad, RBAC y Row Level Security para proteger los datos de cada organización por diseño.',
    category: 'Arquitectura y seguridad',
    date: '2026-08-21',
    readingTime: '5 min de lectura',
    projectSlug: 'patio',
    projectName: 'Patio',
    lead: 'Patio administra vehículos, márgenes, documentación, reservas y oportunidades de múltiples automotoras. En ese contexto, un filtro omitido no es un defecto de interfaz: es un incidente de aislamiento. La arquitectura combina contexto autenticado, RBAC y políticas RLS en PostgreSQL para que una consulta incorrecta no cruce la frontera de una organización.',
    architecture: {
      caption: 'Defensa en profundidad para multi-tenancy',
      description: 'La identidad autenticada resuelve la organización y el rol. La aplicación aplica permisos de negocio y la base de datos restringe las filas disponibles mediante Row Level Security.',
      layers: [
        { label: 'Identidad', items: ['Usuario autenticado', 'Organización y rol'] },
        { label: 'Aplicación', items: ['RBAC por rol', 'Permisos por sucursal'] },
        { label: 'Transacción', items: ['Contexto de tenant', 'Acceso con mínimo privilegio'] },
        { label: 'PostgreSQL', items: ['Row Level Security', 'Filas aisladas por organización'] },
      ],
    },
    sections: [
      {
        title: 'El riesgo de delegar aislamiento en la aplicación',
        paragraphs: [
          'Una automotora guarda datos que importan: el costo real de una unidad, sus documentos, la reserva de un cliente y el margen de una venta. En un producto compartido por varias organizaciones, esos datos deben estar separados siempre, incluso cuando el equipo suma un reporte, una consulta administrativa o una relación nueva.',
          'Confiar esa separación a que cada endpoint recuerde agregar organization_id parece razonable hasta que deja de serlo. No hace falta una mala intención; alcanza con una consulta escrita a las apuradas. El defecto no es humano: es arquitectónico, porque permite que un olvido tenga consecuencias demasiado grandes.',
        ],
      },
      {
        title: 'Row Level Security como control de datos',
        paragraphs: [
          'Por eso Patio usa Row Level Security de PostgreSQL. Las políticas de la base expresan qué filas puede leer o modificar una organización, mientras la aplicación conserva la responsabilidad de autenticar personas y administrar sus roles. Una capa no reemplaza a la otra: se acompañan.',
          'El RBAC responde qué puede hacer alguien dentro de su automotora. RLS responde una pregunta anterior: si esa fila siquiera pertenece a su automotora. Es defensa en profundidad aplicada a un riesgo cotidiano.',
        ],
      },
      {
        title: 'Contexto de organización y mínimo privilegio',
        paragraphs: [
          'La decisión importante no es solo activar una política; es evitar que el tenant viaje como un parámetro opcional por toda la aplicación. El contexto se deriva de la identidad autenticada y se establece para la transacción antes de tocar los datos. Así, una consulta que olvidó el filtro sigue encontrando una barrera.',
          'Las excepciones de soporte existen, pero deben ser explícitas, auditadas y mínimas. Una excepción invisible no es flexibilidad: es una puerta que nadie está mirando.',
        ],
      },
    ],
    takeaway: 'Principio de arquitectura: el aislamiento multi-tenant debe ser verificable en cada capa y, especialmente, seguir activo cuando el código de aplicación comete un error.',
  },
  {
    slug: 'ia-especificacion-antes-codigo',
    title: 'IA asistida: la especificación es el sistema de control de la ambigüedad',
    description: 'Cómo una secuencia de artefactos de producto transforma una idea en contexto operativo para equipos y agentes de código.',
    category: 'IA y producto',
    date: '2026-08-18',
    readingTime: '6 min de lectura',
    projectSlug: 'webspec-ai',
    projectName: 'WebSpec AI',
    lead: 'Los agentes reducen el tiempo de implementación, pero no resuelven decisiones de producto incompletas. De hecho, convierten una instrucción ambigua en más código incorrecto, en menos tiempo. WebSpec AI formaliza el contexto antes de la construcción: define alcance, usuarios, restricciones y backlog como una cadena trazable de artefactos.',
    architecture: {
      caption: 'Cadena de contexto para desarrollo asistido por IA',
      description: 'La idea inicial se transforma en artefactos de producto vinculados. Los equipos y agentes consumen la especificación actualizada en lugar de trabajar desde una instrucción aislada.',
      layers: [
        { label: 'Descubrimiento', items: ['Idea', 'Brief y usuarios'] },
        { label: 'Producto', items: ['PRD', 'Métricas y alcance'] },
        { label: 'Diseño técnico', items: ['RFC', 'UX/UI y backlog'] },
        { label: 'Ejecución', items: ['Specs versionadas', 'Equipo y agentes de código'] },
      ],
    },
    sections: [
      {
        title: 'La ambigüedad como deuda de producto',
        paragraphs: [
          'Trabajando en productos propios y con clientes comprobé una y otra vez que el atraso casi nunca empieza cuando alguien abre el editor. Empieza antes: en una idea que todavía no define a quién sirve, qué queda afuera o cómo sabremos que funcionó.',
          'Antes de los agentes, esa ambigüedad se traducía en reuniones, interpretaciones y correcciones lentas. Ahora puede traducirse en pantallas, APIs y tests generados en minutos. La velocidad no elimina el costo de una decisión ausente; solo hace que el desperdicio llegue antes.',
        ],
      },
      {
        title: 'Especificaciones encadenadas como contexto operativo',
        paragraphs: [
          'WebSpec AI nació para ordenar ese momento previo. En vez de saltar de una frase vaga al código, guía un recorrido por brief, PRD, RFC, UX/UI, backlog y especificaciones. Cada documento aprovecha las decisiones del anterior y deja visibles las que todavía faltan.',
          'El valor no está en producir un PDF prolijo. Está en hacer la pregunta correcta en el momento correcto: quién es el usuario, qué problema se intenta resolver, qué restricción no es negociable, qué métrica justificaría seguir. Una respuesta clara a cualquiera de ellas ahorra más que un prompt brillante.',
        ],
      },
      {
        title: 'Trazabilidad para gestionar el cambio',
        paragraphs: [
          'Una especificación no es una promesa de que nada va a cambiar. Es el registro de por qué se tomó una decisión, para que el cambio tenga contexto cuando inevitablemente llegue. Si el PRD se mueve, el backlog y las specs que dependen de él tienen que enterarse.',
          'Esa trazabilidad es especialmente importante con IA. Le permite a un agente construir sobre la versión actual del producto, y le permite al equipo discutir una decisión antes de convertirla en cientos de líneas difíciles de desaprender.',
        ],
      },
    ],
    takeaway: 'Principio de entrega: la IA amplifica la calidad del contexto disponible. Una especificación trazable reduce retrabajo, mejora las decisiones y evita automatizar la ambigüedad.',
  },
  {
    slug: 'agentes-ia-salidas-verificables',
    title: 'IA para compliance: una respuesta sin evidencia es un riesgo operativo',
    description: 'Diseño de agentes verificables para privacidad: evidencia rastreable, incertidumbre explícita y revisión humana.',
    category: 'IA y compliance',
    date: '2026-08-15',
    readingTime: '5 min de lectura',
    projectSlug: 'compliance-uy',
    projectName: 'Compliance UY',
    lead: 'En privacidad y regulación, una salida plausible pero no verificable puede generar una decisión incorrecta con impacto legal y reputacional. Compliance UY usa IA para acelerar el relevamiento técnico, no para simular certeza: cada hallazgo se vincula con evidencia, nivel de riesgo, remediación y el punto donde debe intervenir una revisión humana.',
    architecture: {
      caption: 'Flujo de análisis técnico verificable',
      description: 'La herramienta inspecciona el repositorio, identifica señales de datos y proveedores, y produce hallazgos con evidencia. La revisión humana valida las conclusiones antes de cualquier decisión de compliance.',
      layers: [
        { label: 'Repositorio', items: ['Código y configuración', 'Dependencias y servicios'] },
        { label: 'Análisis', items: ['Detección de datos', 'Mapeo de proveedores'] },
        { label: 'Evidencia', items: ['archivo:línea', 'Riesgo y remediación'] },
        { label: 'Decisión', items: ['Revisión técnica', 'Validación legal'] },
      ],
    },
    sections: [
      {
        title: 'Detección técnica: señales, no conclusiones',
        paragraphs: [
          'Un repositorio puede revelar campos de email, teléfono, dirección, pagos o salud. Eso es una señal valiosa, pero no alcanza para conocer el propósito del tratamiento, quién accede a esa información o qué base legal lo sostiene. El nombre de una columna no cuenta toda la historia.',
          'Ahí aparece el límite saludable de un agente. Puede recorrer, señalar, reunir contexto y formular preguntas que de otro modo quedarían escondidas. Lo que no debe hacer es transformar una inferencia en una conclusión definitiva porque suena bien escrita.',
        ],
      },
      {
        title: 'Evidencia rastreable para revisión interdisciplinaria',
        paragraphs: [
          'En Compliance UY, un hallazgo no llega solo con una etiqueta. Llega con evidencia archivo:línea, estado, nivel de riesgo y una remediación sugerida. Cuando falta certeza, se marca para verificar contra la fuente oficial en vez de rellenar el vacío con una respuesta probable.',
          'Eso cambia la conversación. Ingeniería, legal y seguridad pueden mirar la misma evidencia, discutir el mismo caso y decidir qué hacer después. El informe deja de ser una caja negra y se vuelve una pieza de trabajo revisable.',
        ],
      },
      {
        title: 'Límites explícitos y gobernanza de la salida',
        paragraphs: [
          'La herramienta declara que produce diagnósticos técnicos y borradores, no asesoramiento legal. Decirlo no reduce su utilidad; la vuelve más honesta sobre el papel que puede cumplir y el que necesita una persona responsable.',
          'Citar fuentes, separar jurisdicciones y pedir confirmación ante contexto insuficiente no son detalles de redacción. Son decisiones de producto. Una IA confiable no pretende saberlo todo: ayuda a que el usuario sepa qué revisar.',
        ],
      },
    ],
    takeaway: 'Principio de gobernanza: en dominios regulados, la IA debe mejorar la calidad y velocidad de la revisión, no ocultar la evidencia ni sustituir la responsabilidad profesional.',
  },
  {
    slug: 'infraestructura-proporcionada-problema',
    title: 'Arquitectura proporcional: no construyas un e-commerce para resolver una mudanza',
    description: 'Cómo elegir una solución estática, mantenible y orientada al flujo real en lugar de sobredimensionar un MVP.',
    category: 'Infraestructura y producto',
    date: '2026-08-12',
    readingTime: '4 min de lectura',
    projectSlug: 'casa-medanos',
    projectName: 'Casa Médanos',
    lead: 'Casa Médanos resolvía una necesidad acotada en tiempo: publicar, compartir y mantener disponible un inventario de muebles y electrodomésticos antes de una mudanza. El criterio de arquitectura fue operativo: eliminar trabajo manual y costo de mantenimiento, no anticipar capacidades de una plataforma de e-commerce que el caso no requería.',
    architecture: {
      caption: 'Solución estática con automatización focalizada',
      description: 'Los visitantes consumen un catálogo publicado en GitHub Pages. Un panel actualiza disponibilidad y un workflow de n8n asiste las consultas repetitivas sin introducir un backend transaccional.',
      layers: [
        { label: 'Adquisición', items: ['Redes sociales', 'Link compartible'] },
        { label: 'Experiencia web', items: ['Catálogo y buscador', 'Filtros y precios'] },
        { label: 'Publicación', items: ['Sitio estático', 'GitHub Pages'] },
        { label: 'Operación', items: ['Disponibilidad', 'Automatización n8n'] },
      ],
    },
    sections: [
      {
        title: 'La vida útil del problema define la solución',
        paragraphs: [
          'La tentación técnica era conocida: cuentas, pagos, carrito, backend, inventario. Pero el problema tenía una fecha concreta. Cada semana que pasaba importaba más publicar el catálogo que diseñar una plataforma capaz de sobrevivir diez años.',
          'Esa restricción ordenó la decisión. Casa Médanos se convirtió en un catálogo rápido y compartible: fotos, precios visibles, filtros por ambiente, buscador y un estado claro para lo vendido. Un único link reemplazó una cantidad absurda de mensajes repetidos.',
        ],
      },
      {
        title: 'Arquitectura estática con valor de producto',
        paragraphs: [
          'Elegir un sitio estático en GitHub Pages no fue recortar funcionalidad por deporte. Fue sacar de escena servidores que monitorear, bases que respaldar y costos que no ayudaban a vender un sillón. Para quien llega desde una red social, además, una página que carga rápido resuelve más que una arquitectura sofisticada.',
          'La complejidad quedó donde sí había trabajo real: actualizar disponibilidad, encontrar un artículo y mostrar que algo ya se vendió sin hacerlo desaparecer. La tecnología siguió al flujo, no al revés.',
        ],
      },
      {
        title: 'Automatización focalizada y costo operativo',
        paragraphs: [
          'Las preguntas repetidas justificaban una automatización puntual. Un flujo de n8n, versionado junto al código, ayuda a responder sin inventar una aplicación de mensajería ni convertir una venta temporal en una operación permanente.',
          'Desde entonces uso una prueba sencilla: si una pieza de infraestructura no reduce una tarea repetitiva, un riesgo real o un costo presente, todavía no pertenece al MVP. Puede llegar después. Hoy solo distrae.',
        ],
      },
    ],
    takeaway: 'Principio de arquitectura: la solución debe responder a la vida útil, el riesgo y el volumen del problema actual. Toda capacidad extra también agrega costo operativo.',
  },
  {
    slug: 'emprender-desde-problemas-observados',
    title: 'Del problema observado al MVP: diseñar producto desde el trabajo real del usuario',
    description: 'EscalaImprov muestra cómo una fricción concreta puede convertirse en hipótesis, flujos diferenciados y capacidades reutilizables.',
    category: 'Startups y emprendimiento',
    date: '2026-08-09',
    readingTime: '5 min de lectura',
    projectSlug: 'escalaimprov',
    projectName: 'EscalaImprov',
    lead: 'EscalaImprov comenzó con una necesidad observable: transformar teoría musical en decisiones inmediatas durante una jam. El caso ilustra una práctica de producto aplicable a cualquier negocio: partir de una fricción concreta, validarla como patrón y diseñar flujos distintos para los trabajos que el usuario realmente necesita resolver.',
    architecture: {
      caption: 'Motor de teoría musical con flujos por contexto de uso',
      description: 'Un motor común de escalas alimenta dos experiencias. Estudio prioriza comprensión y feedback; Jam prioriza decisiones rápidas, navegación por teclado y acompañamiento rítmico.',
      layers: [
        { label: 'Motor de dominio', items: ['Escalas y tonalidades', 'Armonía e intervalos'] },
        { label: 'Modo Estudio', items: ['Entrenador', 'Visualización y feedback'] },
        { label: 'Modo Jam', items: ['Notas de reposo', 'Guía y click BPM'] },
        { label: 'Interacción', items: ['Web Audio', 'SVG y teclado'] },
      ],
    },
    sections: [
      {
        title: 'Una fricción observada como hipótesis inicial',
        paragraphs: [
          'Tener un problema propio no lo convierte automáticamente en una oportunidad de mercado. Lo que sí aporta es una ventaja inicial: uno conoce el momento exacto en que aparece la frustración, los atajos que intenta y el lenguaje con el que la gente lo explica.',
          'En este caso, no hacía falta una enciclopedia de teoría musical. Hacía falta feedback inmediato mientras se practica y una guía breve cuando se toca. Esa diferencia entre “aprender sobre algo” y “necesitar hacer algo” terminó definiendo el producto.',
        ],
      },
      {
        title: 'De la experiencia individual al patrón validable',
        paragraphs: [
          'La experiencia propia es el comienzo de la investigación, no su reemplazo. Después hay que preguntar quién más vive esa fricción, cuándo aparece, qué alternativa usa y qué precio paga por no resolverla. Ahí se separa una historia interesante de un problema que merece producto.',
          'Para EscalaImprov, esa observación llevó a separar dos momentos que parecían iguales: Estudio, para entender escalas, acordes e intervalos; y Jam, para tocar con una guía corta, notas de reposo y un click. No era una decisión estética: eran dos trabajos distintos.',
        ],
      },
      {
        title: 'Capacidades reutilizables como activo de producto',
        paragraphs: [
          'Construir algo propio no deja solo una aplicación publicada. Deja una forma de mirar el siguiente problema. En este caso, diseñar una herramienta de estudio obligó a entender de verdad el círculo de quintas, el feedback instantáneo y por qué tocar con mouse es incómodo.',
          'El mismo patrón se repite entre dominios muy distintos. MiCuota dejó una base de pagos auditables; Patio, decisiones de multi-tenancy; WebSpec AI, un flujo para especificar. El activo más interesante no siempre es el producto: a veces es la capacidad reutilizable que quedó detrás.',
        ],
      },
    ],
    takeaway: 'Principio de producto: una experiencia propia no reemplaza la validación, pero produce mejores hipótesis iniciales y ayuda a separar funcionalidades de trabajos reales del usuario.',
  },
  {
    slug: 'aws-cloud-practitioner-field-notes',
    title: 'AWS Cloud Practitioner — Field Notes: 6 conceptos para entender, no memorizar',
    description: 'Mis notas de estudio para el CLF-C02: regiones y AZs, VPC, responsabilidad compartida, cómputo, almacenamiento y costos. Con ejemplos, errores frecuentes y PDF descargable.',
    category: 'Cloud y arquitectura',
    tags: ['Cloud', 'Arquitectura', 'Infraestructura'],
    date: '2026-11-08',
    readingTime: '9 min de lectura',
    projectSlug: '',
    contextLabel: 'Notas de preparación · AWS Certified Cloud Practitioner (CLF-C02)',
    sourceUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    sourceLabel: 'Guía oficial del examen CLF-C02',
    lead: 'Estas son mis notas de preparación para AWS Certified Cloud Practitioner. No reemplazan la documentación de AWS: la resumen con la intención de entender cuándo y por qué usar cada cosa, no solo cómo se llama. Cada concepto se explica, se ejemplifica, se compara con lo que suele confundirse y se cierra con el error más frecuente y una pregunta para comprobar si realmente quedó claro.',
    download: {
      href: '/assets/notes/AWS-Cloud-Practitioner-Field-Notes.pdf',
      filename: 'AWS-Cloud-Practitioner-Field-Notes.pdf',
      label: 'Descargar las notas en PDF',
      meta: 'PDF · 3 páginas · 6 conceptos',
      title: 'Llevate las Field Notes',
      body: 'El mismo material en una hoja imprimible, para repasar antes del examen o compartir con tu equipo. Learning is better when shared.',
      disclaimer: 'No es material oficial de AWS. Es un resumen de estudio propio, contrastado con la documentación pública de AWS, y no reproduce preguntas de examen reales.',
      companion: 'aws-cloud-practitioner-conceptos-fundamentales',
      companionLabel: 'Leé también qué me está dejando estudiar AWS como Engineering Manager',
      credentialLabel: 'Ya aprobé el examen: ver mi certificado AWS Certified Cloud Practitioner',
    },
    infographic: {
      src: '/assets/img/notes/aws-cloud-practitioner-infografia.jpg',
      full: '/assets/notes/AWS-Cloud-Practitioner-Infografia.png',
      width: 1122,
      height: 1402,
      alt: 'Infografía AWS Cloud Practitioner: 6 conceptos para entender, no memorizar. 1) Infraestructura global: Región, Availability Zones y Edge Locations; resiliencia no es cercanía al usuario. 2) Networking: VPC con subred privada y pública, NAT Gateway e Internet Gateway; NAT permite salida, no entrada. 3) Responsabilidad compartida: AWS protege centros de datos, hardware y red global; el cliente configura IAM, servicios, datos y sistema operativo. 4) EC2, Lambda y contenedores: control total, ejecución por evento, portabilidad con ECS/EKS sobre EC2 o Fargate. 5) Almacenamiento: S3 objetos, EBS bloque, EFS compartido, RDS relacional, DynamoDB NoSQL. 6) Costos, observabilidad y seguridad: Cost Explorer, Budgets, CloudWatch e IAM.',
      caption: 'Los seis conceptos en una sola imagen, para repasar de un vistazo.',
      downloadLabel: 'Descargar la infografía (PNG)',
    },
    sections: [
      {
        kicker: 'Concepto 01',
        title: 'Infraestructura global: Regiones, Availability Zones y Edge Locations',
        fields: [
          { label: 'Explicación simple', text: 'Una Región es un área geográfica con varios centros de datos independientes. Cada Availability Zone (AZ) es uno o más centros de datos con energía, refrigeración y red propias, aislados de fallas en otras AZs pero unidos por redes de baja latencia. Una Edge Location es un punto de presencia más chico y más cercano al usuario final, usado para entregar contenido o resolver DNS — no para alojar tu infraestructura.' },
          { label: 'Ejemplo práctico', text: 'Distribuís instancias EC2 entre `us-east-1a` y `us-east-1b` para que un corte eléctrico en una AZ no tire abajo la aplicación. Amazon CloudFront, en cambio, usa Edge Locations en todo el mundo para servir contenido estático cerca del usuario, sin mover tu infraestructura de lugar.' },
          { label: 'Comparación útil', text: 'Región: dónde viven tus recursos. AZ: cómo los repartís para tolerar fallas. Edge Location: cómo acercás contenido al usuario, sin relocalizar nada.' },
          { label: 'Error frecuente', tone: 'warn', text: 'Confundir una Edge Location con "una AZ más chica". Resuelven problemas distintos: resiliencia (AZ) contra latencia de entrega de contenido (Edge Location).' },
        ],
        check: '¿Qué diferencia hay entre desplegar en varias AZs y usar una Edge Location vía CloudFront?',
      },
      {
        kicker: 'Concepto 02',
        title: 'Networking: VPC, subred pública/privada, Internet Gateway y NAT Gateway',
        fields: [
          { label: 'Explicación simple', text: 'Una VPC es una red privada y aislada dentro de AWS. Dentro de ella, una subred pública tiene una ruta directa a un Internet Gateway (IGW). Una subred privada no tiene esa ruta. Si un recurso privado necesita salir a internet, lo hace a través de un NAT Gateway, que vive en una subred pública.' },
        ],
        architecture: {
          caption: 'VPC 10.0.0.0/16: salida a internet desde una subred privada',
          description: 'Pública: ruta directa a un Internet Gateway. Privada: sale a internet vía el NAT Gateway que vive en la subred pública — nunca al revés.',
          layers: [
            { label: 'Subred privada · 10.0.2.0/24', items: ['EC2 / RDS (datos)', 'Ruta 0.0.0.0/0 → NAT Gateway'] },
            { label: 'Subred pública · 10.0.1.0/24', items: ['EC2 (web) y NAT Gateway', 'Ruta 0.0.0.0/0 → Internet Gateway'] },
            { label: 'Internet Gateway', items: ['Puerta de la VPC', 'Entrada y salida para IPs públicas'] },
            { label: 'Internet', items: ['Usuarios', 'Parches y APIs externas'] },
          ],
        },
        fieldsAfter: [
          { label: 'Ejemplo práctico', text: 'El servidor web que recibe tráfico de usuarios va en la subred pública. La base de datos que ese servidor consulta va en la subred privada, sin IP pública, protegida de accesos directos desde internet.' },
          { label: 'Comparación útil', text: 'El Internet Gateway habilita tráfico entrante y saliente para recursos con IP pública. El NAT Gateway solo habilita tráfico saliente iniciado desde adentro — nunca conexiones iniciadas desde internet hacia la subred privada.' },
          { label: 'Error frecuente', tone: 'warn', text: 'Creer que el NAT Gateway "agrega seguridad". Su función es habilitar salida a internet sin exponer la subred privada a tráfico entrante; el control de acceso corre por cuenta de los Security Groups y las Network ACLs.' },
        ],
        check: '¿Por qué una base de datos en una subred privada puede descargar un parche de seguridad, pero nadie desde internet puede conectarse directamente a ella?',
      },
      {
        kicker: 'Concepto 03',
        title: 'Modelo de responsabilidad compartida',
        fields: [
          { label: 'Explicación simple', text: 'AWS es responsable de la seguridad de la nube: infraestructura física, hardware, virtualización y red global. El cliente es responsable de la seguridad en la nube: cómo configura sus recursos, cómo gestiona identidades y permisos (IAM), cómo cifra sus datos y, cuando aplica, cómo mantiene el sistema operativo.' },
          { label: 'Ejemplo práctico', text: 'AWS garantiza que el hardware del datacenter esté físicamente protegido. El cliente es quien decide si un bucket de S3 es público o privado, y quién tiene permiso para leerlo.' },
          { label: 'Comparación útil', text: 'En servicios administrados (Lambda, RDS) AWS asume más responsabilidad operativa — por ejemplo, los parches del motor de base de datos. En EC2, el cliente administra el sistema operativo, así que su porción de responsabilidad es mayor.' },
          { label: 'Error frecuente', tone: 'warn', text: 'Asumir que "está en AWS" significa que todo riesgo de seguridad es de AWS. Una mala configuración de permisos siempre es responsabilidad del cliente.' },
        ],
        check: 'Si un bucket de S3 queda expuesto públicamente por una configuración incorrecta, ¿de quién es la responsabilidad según el modelo?',
      },
      {
        kicker: 'Concepto 04',
        title: 'EC2, Lambda y contenedores: cómo elegir',
        fields: [
          { label: 'Explicación simple', text: 'EC2 son servidores virtuales que el cliente administra (sistema operativo, parches, escalado). AWS Lambda ejecuta código sin administrar servidores, cobra por invocación y duración, y escala automáticamente. Los contenedores (Amazon ECS o EKS) empaquetan una aplicación con sus dependencias; corren sobre EC2 (el cliente administra los servidores) o sobre Fargate (AWS administra la infraestructura de cómputo).' },
          { label: 'Ejemplo práctico', text: 'Procesar una imagen apenas se sube a S3: buen caso para Lambda. Varios microservicios corriendo todo el tiempo: suele encajar mejor en contenedores. Una aplicación con requerimientos específicos de sistema operativo: puede necesitar EC2.' },
          { label: 'Comparación útil', text: 'Control total del servidor → EC2. Cero administración, eventos puntuales → Lambda. Empaquetado consistente de la app, con o sin administrar el servidor → contenedores, con EC2 o con Fargate.' },
          { label: 'Error frecuente', tone: 'warn', text: 'Asumir que Lambda siempre es más barato. Para cargas constantes y predecibles, EC2 o contenedores pueden salir más económicos que pagar por cada invocación.' },
        ],
        check: '¿Qué elegirías para un proceso que corre de forma continua las 24 horas, y por qué probablemente no sea Lambda?',
      },
      {
        kicker: 'Concepto 05',
        title: 'S3, EBS, EFS y las principales bases de datos',
        fields: [
          { label: 'Explicación simple', text: 'Amazon S3 es almacenamiento de objetos accesible por red, sin estructura de sistema de archivos. Amazon EBS es un volumen de bloques que se adjunta a una sola instancia EC2 a la vez, como un disco virtual. Amazon EFS es un sistema de archivos compartido que varias instancias EC2 pueden montar al mismo tiempo. Para datos estructurados: RDS ofrece bases relacionales administradas, y DynamoDB una base NoSQL totalmente administrada y de alta escala.' },
          { label: 'Ejemplo práctico', text: 'Fotos de perfil de usuarios → S3. El disco del sistema operativo de una instancia → EBS. Una carpeta que varias instancias web leen y escriben a la vez → EFS. El catálogo de un e-commerce con relaciones entre tablas → RDS. Datos de sesión con lecturas y escrituras masivas y baja latencia → DynamoDB.' },
          { label: 'Comparación útil', text: '¿Un solo servidor necesita un disco? EBS. ¿Varios servidores necesitan compartir archivos? EFS. ¿Es un archivo que se accede por URL o API, no un disco? S3.' },
          { label: 'Error frecuente', tone: 'warn', text: 'Intentar montar un mismo volumen EBS en varias instancias EC2 a la vez. EBS está pensado para una sola instancia; para compartir archivos entre varias, la herramienta correcta es EFS.' },
        ],
        check: '¿Por qué EBS no es la opción correcta si tres instancias EC2 necesitan leer y escribir sobre los mismos archivos al mismo tiempo?',
      },
      {
        kicker: 'Concepto 06',
        title: 'Costos, observabilidad y seguridad',
        fields: [
          { label: 'Explicación simple', text: 'AWS Cost Explorer visualiza y analiza el gasto histórico. AWS Budgets define límites y alertas antes de que el gasto se salga de control. Amazon CloudWatch centraliza métricas, logs y alarmas para observar el comportamiento de los recursos. AWS IAM controla quién puede hacer qué, mediante usuarios, grupos, roles y políticas, siguiendo el principio de menor privilegio.' },
          { label: 'Ejemplo práctico', text: 'Una alarma en Budgets avisa si el gasto mensual supera un monto definido. CloudWatch indica si una instancia EC2 tiene uso de CPU anormalmente alto. Un rol de IAM específico le da a una aplicación acceso solo al bucket de S3 que necesita, nada más.' },
          { label: 'Comparación útil', text: 'Cost Explorer mira hacia atrás (qué gasté y por qué). Budgets mira hacia adelante (qué no quiero superar). CloudWatch observa el comportamiento técnico. IAM decide quién puede actuar sobre qué recurso.' },
          { label: 'Error frecuente', tone: 'warn', text: 'Usar las credenciales de la cuenta raíz (root) para el trabajo diario, en vez de crear usuarios o roles de IAM con permisos acotados a lo que realmente necesitan.' },
        ],
        check: '¿Qué herramienta usarías para que te avisen antes de gastar de más, y cuál para entender por qué una instancia está lenta?',
      },
    ],
    takeaway: 'Learning is better when shared: si estas notas te sirven para el CLF-C02, descargá el PDF, compartilo con quien esté estudiando y contame qué concepto te costó más.',
  },
];

const canonicalTags = {
  IA: 'IA',
  ARQUITECTURA: 'Arquitectura',
  INFRAESTRUCTURA: 'Infraestructura',
  LIDERAZGO: 'Liderazgo',
  PRODUCTO: 'Producto',
  OPEN_WEIGHT: 'Open-weight',
  DATOS: 'Datos',
  STARTUPS: 'Startups',
};

const tagsByCategory = {
  'Noticias de IA': [canonicalTags.IA, canonicalTags.OPEN_WEIGHT],
  'Cloud y arquitectura': [canonicalTags.ARQUITECTURA, canonicalTags.INFRAESTRUCTURA],
  'Experiencias web': [canonicalTags.PRODUCTO, canonicalTags.ARQUITECTURA],
  'Producto y arquitectura': [canonicalTags.PRODUCTO, canonicalTags.ARQUITECTURA],
  'Operación y confiabilidad': [canonicalTags.INFRAESTRUCTURA, canonicalTags.LIDERAZGO],
  'Pagos e infraestructura': [canonicalTags.INFRAESTRUCTURA, canonicalTags.PRODUCTO],
  'Arquitectura y seguridad': [canonicalTags.ARQUITECTURA, canonicalTags.INFRAESTRUCTURA],
  'IA y producto': [canonicalTags.IA, canonicalTags.PRODUCTO],
  'IA y compliance': [canonicalTags.IA, canonicalTags.LIDERAZGO],
  'Infraestructura y producto': [canonicalTags.INFRAESTRUCTURA, canonicalTags.PRODUCTO],
  'Startups y emprendimiento': [canonicalTags.STARTUPS, canonicalTags.PRODUCTO],
};

export const articles = articleEntries.map((article) => ({
  ...article,
  tags: article.tags || tagsByCategory[article.category] || [article.category],
}));
