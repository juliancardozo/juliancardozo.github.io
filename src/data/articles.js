/**
 * Artículos del blog. Cada texto nace de una decisión o aprendizaje documentado
 * en los casos de estudio, para mantener el mismo estándar de trazabilidad.
 */
const articleEntries = [
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
