export const newsletter = {
  slug: 'newsletter',
  title: 'Notas desde el frente',
  fullTitle: 'Notas desde el frente: liderazgo en tech LATAM',
  subscribeUrl: 'https://email-worker.julian-cardozo-viggiano.workers.dev/subscribe',
  description:
    'Una newsletter personal sobre liderazgo técnico, decisiones de arquitectura, producto, IA aplicada y aprendizajes reales de construir en Latinoamérica.',
  promise:
    'En cada edición hay una idea práctica, una experiencia real y una pregunta concreta para pensar mejor cómo construimos tecnología, productos, equipos y negocios.',
  cadence: 'Una edición principal cada dos semanas, con notas breves cuando aparece un aprendizaje que merece salir rápido.',
  statusNote:
    'La página pública, el archivo y la secuencia editorial ya están definidos. La suscripción real quedó conectada a un Worker seguro con consentimiento y primer flujo de bienvenida listo para activar en el envío.',
  primaryAudiences: [
    'Engineering Managers y Tech Leads',
    'CTOs y responsables de tecnología',
    'Founders y product builders',
    'Equipos de plataforma, cloud, fintech e IA aplicada',
  ],
  pillars: [
    {
      slug: 'liderazgo-tecnico-humano',
      title: 'Liderazgo técnico y humano',
      description: 'Autonomía, crecimiento de Tech Leads, conversaciones difíciles, métricas de ingeniería y equipos sostenibles.',
    },
    {
      slug: 'ingenieria-plataformas',
      title: 'Ingeniería y plataformas',
      description: 'Arquitectura, APIs, Platform Engineering, observabilidad, seguridad y decisiones con impacto operativo real.',
    },
    {
      slug: 'ia-aplicada',
      title: 'IA aplicada',
      description: 'Spec Driven Development, agentes, MCP, automatización y límites prácticos de la IA en equipos de software.',
    },
    {
      slug: 'productos-emprendimientos',
      title: 'Productos y emprendimientos',
      description: 'Discovery, MVPs, hipótesis, pricing, aprendizaje público y cómo decidir qué vale la pena construir.',
    },
    {
      slug: 'fintech-pagos-negocios',
      title: 'Fintech, pagos y negocios',
      description: 'Suscripciones, webhooks, APIs financieras, seguridad, compliance y trade-offs del ecosistema regional.',
    },
    {
      slug: 'tecnologia-vida',
      title: 'Tecnología y vida',
      description: 'Música, mascotas, creatividad y experiencias personales que desembocan en aprendizajes útiles para construir mejor.',
    },
  ],
  launchCta: {
    label: 'Quiero recibir la primera edición',
    subject: 'Quiero sumarme a la newsletter',
    body:
      'Hola Julián,\n\nQuiero enterarme cuando actives la suscripción de la newsletter.\n\nMi principal interés es:\n',
  },
  welcomeSequence: [
    {
      step: 'Email 1',
      title: 'Bienvenida',
      goal: 'Explicar la promesa editorial y pedir una respuesta simple sobre el interés principal del suscriptor.',
      summary:
        'Presentación breve, qué tipo de ideas va a recibir, cadencia esperada y una pregunta para etiquetar el interés inicial: liderazgo, arquitectura, IA, producto o pagos.',
      cta: 'Responder con el tema que más le importa hoy.',
    },
    {
      step: 'Email 2',
      title: 'Historia y propósito',
      goal: 'Conectar trayectoria, criterio y curiosidad sin sonar a bio corporativa.',
      summary:
        'Cómo se cruza banca, fintech, liderazgo, producto propio e IA aplicada en una sola práctica profesional: traducir problemas reales en decisiones sostenibles.',
      cta: 'Responder con el problema más difícil que hoy no logra explicarse bien en su equipo.',
    },
    {
      step: 'Email 3',
      title: 'Mejor contenido',
      goal: 'Ofrecer tres puertas de entrada según el interés declarado del lector.',
      summary:
        'Selección de artículos y casos por tema: liderazgo, plataforma, IA aplicada, producto o pagos. Cada enlace explica por qué vale la pena abrirlo.',
      cta: 'Elegir un tema para profundizar en próximas ediciones.',
    },
    {
      step: 'Email 4',
      title: 'Proyectos como evidencia',
      goal: 'Mostrar proyectos reales como fuente de aprendizaje, no como publicidad.',
      summary:
        'Presentación breve de Milo Care, MiCuota.online, WebspecAI y Pambú Tech con una pregunta sobre qué hipótesis o producto del lector merece una conversación.',
      cta: 'Compartir feedback o pedir contexto sobre uno de los proyectos.',
    },
    {
      step: 'Email 5',
      title: 'Conversación',
      goal: 'Abrir una relación directa y clasificar el tipo de conversación que puede nacer.',
      summary:
        'Invitación explícita a responder si el interés viene por liderazgo, arquitectura, producto, colaboración, prensa, evento, inversión u oportunidad profesional.',
      cta: 'Responder con el tipo de conversación que quiere abrir.',
    },
  ],
  welcomeEmails: [
    {
      step: 1,
      title: 'Bienvenida',
      subject: 'Bienvenida a Notas desde el frente',
      preheader: 'Liderazgo, arquitectura, IA y producto desde la práctica, no desde la teoría.',
      ctaLabel: 'Responder con tu tema principal',
      body:
        'Hola,\n\nGracias por sumarte. Esta newsletter nace para compartir lo que aprendí liderando equipos, construyendo productos y tomando decisiones técnicas con contexto real.\n\nNo va a ser un resumen de tendencias ni una lista de consejos genéricos. Va a ser una nota útil: una idea práctica, un ejemplo concreto y una pregunta que nos ayude a pensar mejor cómo construimos tecnología, equipos y negocios.\n\nEn cada edición voy a escribir desde la experiencia: liderazgo técnico, arquitectura, plataforma, IA aplicada, producto y emprendimientos en LATAM. Si te interesa alguno de estos temas, te pido que me respondas con una sola línea: ¿qué te interesa más hoy?\n\nLiderazgo técnico\nArquitectura y plataforma\nIA aplicada\nProducto y MVPs\nFintech y pagos\n\nSi te parece, también podés responder con un problema real que estés viendo en tu equipo o empresa.\n\nGracias por estar acá.\n\nJulián',
    },
    {
      step: 2,
      title: 'Historia y propósito',
      subject: '¿Por qué existe esta newsletter?',
      preheader: 'Porque hay decisiones difíciles que no se resuelven solo con código.',
      ctaLabel: 'Responder con tu caso más difícil',
      body:
        'Hola,\n\nCuando empecé a combinar liderazgo, arquitectura, producto y proyectos propios, me di cuenta de que muchas decisiones que parecen técnicas terminan siendo decisiones sobre personas, contexto y riesgo.\n\nLa newsletter nació para registrar ese punto de vista: no como una bio ni como un discurso, sino como una manera de compartir aprendizajes útiles en voz directa.\n\nTrabajo en ingeniería, liderazgo, platform y product, y además he construido proyectos propios en fintech, salud preventiva, IA y herramientas para equipos. Eso me dio una perspectiva muy concreta: los mejores resultados raramente vienen de “la mejor tecnología”, sino de decisiones claras, métricas honestas y un equipo que entiende el problema.\n\nEn estas notas voy a escribir sobre lo que aprendí en ese trayecto y sobre los temas que me siguen interesando: cómo liderar bien, cómo decidir arquitectura sin caer en el dogma, cómo usar IA para ayudar al equipo y cómo construir productos con sentido.\n\nSi te interesa, respondé con el problema más difícil que estuviste viendo en tu equipo en este último tiempo.\n\nJulián',
    },
    {
      step: 3,
      title: 'Lo que más te puede interesar',
      subject: 'Tres caminos para empezar',
      preheader: 'Elegí el hilo que más te sirve para empezar a leer.',
      ctaLabel: 'Elegir tema',
      body:
        'Hola,\n\nSi esto es tu primer paso, te dejo tres maneras de entrar: \n\n1. Liderazgo técnico: cómo pasar de desarrollador a líder, construir equipos, dar feedback y sostener decisiones difíciles.\n2. Arquitectura y plataforma: APIs, cloud, observabilidad, seguridad, sistemas distribuidos y decisiones con impacto de negocio.\n3. IA aplicada: cómo usar la IA para acelerar trabajo, mejorar especificación, automatizar tareas y reforzar el criterio humano.\n\nTambién hay contenido sobre producto, finanzas, pagos y proyectos propios. Si querés, te puedo recomendar un camino concreto según tu interés.\n\nRespondé con el tema que más te interesa ahora y te paso una guía de lectura.\n\nJulián',
    },
    {
      step: 4,
      title: 'Proyectos como evidencia',
      subject: 'Aprender desde proyectos reales',
      preheader: 'No hay mejor criterio que un problema que se vive en la práctica.',
      ctaLabel: 'Hablar de un proyecto',
      body:
        'Hola,\n\nLa mayor parte de lo que escribo nace de proyectos reales: MiCuota.online, Milo Care, WebspecAI y otros experimentos en productos, pagos y automatización.\n\nNo los veo como “casos de éxito” para exhibir, sino como laboratorios donde se prueba qué funciona, qué no y qué se vuelve más claro cuando la presión existe. Hay errores, decisiones poco elegantes, mejoras de arquitectura y también aprendizajes pequeños que terminan importando mucho.\n\nEso es lo que quiero compartir: no la versión final del producto, sino la decisión detrás del producto.\n\nSi tenés un proyecto en curso, una duda de producto o un problema de equipo en el que quieras pensar en voz alta, respondé este email. Estoy abierto a conversaciones muy concretas.\n\nJulián',
    },
    {
      step: 5,
      title: 'Conversación abierta',
      subject: '¿Qué te gustaría discutir?',
      preheader: 'La newsletter funciona mejor cuando abre una conversación real.',
      ctaLabel: 'Responder al email',
      body:
        'Hola,\n\nLa idea de esta comunidad no es recibir contenido pasivamente. Es que haya una conversación útil detrás de cada nota.\n\nQuiero seguir aprendiendo de personas que lideran equipos, construyen productos, toman decisiones difíciles y están resolviendo problemas reales con tecnología.\n\nSi te interesa conversar, me podés responder con una de estas opciones:\n\n- Liderazgo y equipos\n- Arquitectura y plataforma\n- IA aplicada\n- Producto y MVPs\n- Fintech y pagos\n- Colaboración o proyecto\n- Eventual charla / podcast / media\n\nSi te sirve, también puedo escuchar una idea, un caso o una duda que te esté molestando en este momento.\n\nJulián',
    },
  ],
  issues: [
    {
      slug: 'lo-dificil-de-un-webhook-no-es-recibirlo',
      edition: 'Edición 001',
      date: '2026-08-11',
      title: 'Lo difícil de un webhook no es recibirlo',
      format: 'Caso técnico',
      objective: 'Autoridad y conversación',
      audiencePrimary: 'CTOs, Tech Leads y equipos fintech',
      audienceSecondary: 'Founders que están diseñando cobros o integraciones',
      projectSlug: 'micuota',
      projectName: 'MiCuota.online',
      articleSlug: 'webhooks-pagos-maquinas-de-estado',
      articleTitle: 'Webhooks de pago y máquinas de estado auditables',
      idea:
        'Una integración de pagos se rompe menos por fallar al recibir eventos que por no saber qué hacer con eventos repetidos, desordenados o ambiguos.',
      excerpt:
        'El webhook no es una notificación simpática: es un borde operativo donde se decide si un sistema de pagos conserva consistencia o empieza a perder confianza.',
      titleSeo: 'Lo difícil de un webhook no es recibirlo | Newsletter de Julián Cardozo',
      metaDescription:
        'Una nota sobre webhooks, pagos y consistencia operativa: por qué el problema real no es recibir eventos sino gobernar estados, idempotencia y auditoría.',
      subjectLines: [
        'Lo difícil de un webhook no es recibirlo',
        'El error no estaba en el endpoint, estaba en la interpretación',
        'Si tu integración de pagos depende del orden ideal, ya está rota',
        'Una decisión técnica que aprendí a respetar en fintech',
        'Los webhooks no avisan: comprometen a tu operación',
      ],
      preheaders: [
        'Idempotencia, estados y auditoría antes de pensar en el endpoint.',
        'Una experiencia real de pagos que termina en un criterio práctico.',
        'La parte cara de la integración aparece después del HTTP 200.',
      ],
      opening: [
        'Hay una escena que se repite en muchos equipos: el webhook llega, devuelve 200 y alguien respira tranquilo como si lo difícil ya hubiera pasado.',
        'En pagos, ese momento recién marca el comienzo. El evento puede venir repetido, fuera de orden o con información parcial. Si el sistema no sabe leerlo dentro de una máquina de estados explícita, el costo no aparece como error técnico elegante: aparece como un cobro dudoso, una notificación incorrecta o una reconciliación manual al final del día.',
      ],
      sections: [
        {
          title: 'Dónde se rompe de verdad',
          paragraphs: [
            'El problema no es recibir JSON. El problema es traducir una señal externa a una transición válida dentro de tu modelo. Si el proveedor dice "pagado" y vos no distinguís entre autorizado, capturado, conciliado o reversado, la integración se vuelve optimista donde debería ser estricta.',
            'En MiCuota.online esto importa porque el usuario no está mirando la belleza del código. Está esperando saber si su cuota quedó registrada, si la cobranza fue exitosa y si puede confiar en que el sistema no le va a duplicar una acción por un reintento tardío.',
          ],
        },
        {
          title: 'La decisión que reduce daño',
          paragraphs: [
            'La decisión útil es tratar el webhook como entrada a una máquina de estados auditable. Cada evento se registra, se valida contra el estado actual y solo entonces produce efectos: marcar un pago, emitir una notificación o actualizar una vista para el usuario.',
            'Eso obliga a modelar idempotencia, correlación y trazabilidad. También obliga a aceptar que algunos eventos deben quedar en cuarentena hasta que el contexto sea suficiente. No todo se resuelve "en línea" ni todo error debe esconderse detrás de un retry ciego.',
          ],
        },
        {
          title: 'Qué se puede aplicar mañana',
          paragraphs: [
            'Si hoy tu integración mezcla recepción de eventos, reglas de negocio y notificaciones en el mismo bloque, probablemente estás pagando deuda operativa disfrazada de velocidad.',
            'Separar ingestión, validación y efectos no vuelve al sistema más lento: vuelve más claro quién decidió qué, con qué evidencia y sobre qué estado.',
          ],
        },
      ],
      practicalTool: {
        title: 'Checklist mínimo para revisar un webhook de pagos',
        items: [
          '¿Existe una máquina de estados explícita para el dominio del pago?',
          '¿Cada evento tiene clave de idempotencia o una forma robusta de deduplicación?',
          '¿Las transiciones inválidas se registran y quedan visibles para revisar?',
          '¿Las notificaciones salen después de confirmar el estado, no antes?',
          '¿Hay trazabilidad suficiente para volver del evento a la operación afectada?',
        ],
      },
      ecosystem: {
        articleSlug: 'webhooks-pagos-maquinas-de-estado',
        articleLabel: 'Ir al artículo técnico completo',
        projectSlug: 'micuota',
        projectLabel: 'Ver el caso de MiCuota.online',
      },
      cta: {
        label: 'Responder este tema',
        subject: 'Conversación sobre webhooks y pagos',
        body:
          'Hola Julián,\n\nQuiero conversar sobre webhooks, pagos o consistencia operativa.\n\nLlegué desde la edición "Lo difícil de un webhook no es recibirlo".\n',
      },
      finalQuestion:
        '¿Cuál es la transición de estado más delicada de tu sistema y por qué hoy sigue dependiendo más de suerte que de diseño?',
      signature: 'Julián\nEngineering Manager, product builder y fundador de Pambú Tech\njuliancardozo.github.io · LinkedIn',
      ps:
        'Si estás diseñando suscripciones, cobros o conciliación para Latinoamérica, contame dónde aparece la parte más frágil de la operación.',
      metricPrimary: 'Respuestas cualificadas y clics hacia el artículo técnico.',
      segment: ['Fintech', 'Pagos', 'Arquitectura'],
      utm: 'utm_source=newsletter&utm_medium=email&utm_campaign=edicion-001-webhooks',
      distribution: {
        webExtract:
          'Una nota sobre por qué la parte difícil de un webhook no es el endpoint sino la gobernanza del estado que ese evento intenta modificar.',
        linkedin:
          'En integraciones de pago, el problema rara vez es "recibir el webhook". El problema es qué hace tu sistema con un evento repetido, tardío o ambiguo. Si no existe una máquina de estados auditable, el costo no aparece como error elegante: aparece como pérdida de confianza. Lo desarrollé en la primera edición de mi newsletter y lo conecté con aprendizajes concretos de MiCuota.online.',
        shortPosts: [
          'Un webhook no es una notificación. Es una decisión operativa que entra desde afuera.',
          'Si tu modelo no distingue estados reales de pago, la integración es optimista donde debería ser estricta.',
          'La velocidad en pagos no viene de mezclar todo en un endpoint. Viene de separar ingestión, validación y efectos.',
        ],
        community:
          'Comparto una nota breve sobre webhooks de pagos: no enfocada en el endpoint, sino en idempotencia, transiciones válidas y auditoría. Puede servir si están diseñando integraciones o suscripciones.',
        nextIdea: 'Cómo decidir qué merece consistencia estricta y qué puede quedar eventual en un producto financiero.',
      },
    },
    {
      slug: 'especificar-antes-de-construir-tambien-es-liderazgo',
      edition: 'Edición 002',
      date: '2026-08-25',
      title: 'Especificar antes de construir también es liderazgo',
      format: 'Nota desde el frente',
      objective: 'Autoridad y conversación',
      audiencePrimary: 'Engineering Managers, Tech Leads y Product Leaders',
      audienceSecondary: 'Founders que necesitan alinear idea, alcance y ejecución',
      projectSlug: 'webspec-ai',
      projectName: 'WebspecAI',
      articleSlug: 'ia-especificacion-antes-codigo',
      articleTitle: 'La IA aporta más valor en la especificación que en el código',
      idea:
        'Especificar bien no enlentece a un equipo: evita que la velocidad inicial se pague después en interpretaciones incompatibles, retrabajo y decisiones técnicas sin contexto.',
      excerpt:
        'Cuando una idea todavía está borrosa, acelerar directo hacia el código suele parecer progreso. Muchas veces es solo una forma cara de posponer la conversación que faltaba.',
      titleSeo: 'Especificar antes de construir también es liderazgo | Newsletter de Julián Cardozo',
      metaDescription:
        'Una edición sobre liderazgo técnico, especificación e IA aplicada: por qué escribir mejor antes de construir reduce retrabajo y mejora decisiones de producto e ingeniería.',
      subjectLines: [
        'Especificar antes de construir también es liderazgo',
        'La velocidad que más caro pagué empezó con "ya entendimos"',
        'Si la idea está borrosa, el código no la aclara',
        'Una escena que se repite antes del retrabajo',
        'Construir rápido sin contexto puede ser la opción lenta',
      ],
      preheaders: [
        'Alinear antes del código no es burocracia si evita interpretaciones incompatibles.',
        'Una experiencia práctica sobre especificación, IA y criterio de equipo.',
        'Menos ambigüedad al principio, menos costo político y técnico después.',
      ],
      opening: [
        'Una de las frases más caras en un equipo de producto e ingeniería es: "ya entendimos, arranquemos".',
        'No porque siempre esté equivocada, sino porque muchas veces aparece justo antes de que cada persona complete los huecos con su propio modelo mental. Producto imagina una experiencia, diseño otra, backend una tercera y la conversación real recién aparece cuando el código ya existe y cambiarlo cuesta prestigio, tiempo y foco.',
      ],
      sections: [
        {
          title: 'Por qué esto también es liderazgo',
          paragraphs: [
            'Especificar no es un trámite documental. Es una intervención de liderazgo: ordenar contexto, exponer supuestos, dejar visibles los trade-offs y darle al equipo una base compartida para decidir.',
            'Cuando esa base no existe, el problema no es solo técnico. También se vuelve político. Nadie quiere frenar una iniciativa que "ya empezó", aunque todos sospechen que se está construyendo sobre interpretaciones diferentes.',
          ],
        },
        {
          title: 'Dónde la IA sí suma',
          paragraphs: [
            'La IA me resulta más útil antes del código que durante el código cuando la idea todavía es inestable. Sirve para estructurar PRDs, RFCs, user stories y preguntas incómodas que un equipo ocupado suele patear para después.',
            'Eso no reemplaza criterio. Al contrario: obliga a revisar mejor qué está diciendo cada documento, qué quedó asumido y qué todavía no merece automatizarse. WebspecAI nace exactamente de esa necesidad: comprimir el tiempo entre una hipótesis difusa y una especificación que permita trabajar con menos ruido.',
          ],
        },
        {
          title: 'Qué cambia en la práctica',
          paragraphs: [
            'Un equipo no necesita especificaciones eternas. Necesita claridad suficiente para entender el problema, el alcance, las restricciones y la señal que diría "esto funcionó".',
            'Cuando esa claridad aparece temprano, el código gana velocidad real: menos discusiones reactivas, menos retrabajo lateral y menos decisiones de arquitectura tomadas para sostener ambigüedades de producto.',
          ],
        },
      ],
      practicalTool: {
        title: 'Cinco preguntas antes de escribir la primera línea',
        items: [
          '¿Qué problema concreto estamos resolviendo y para quién?',
          '¿Qué partes de la experiencia todavía son hipótesis y cuáles ya son restricciones?',
          '¿Qué decisión técnica quedaría condicionada por una definición de producto todavía ambigua?',
          '¿Cómo sabremos que esto funcionó sin discutirlo después del lanzamiento?',
          '¿Qué pregunta incómoda conviene responder hoy para no pagarla dentro del sprint?',
        ],
      },
      ecosystem: {
        articleSlug: 'ia-especificacion-antes-codigo',
        articleLabel: 'Leer el artículo de fondo sobre especificación e IA',
        projectSlug: 'webspec-ai',
        projectLabel: 'Ver cómo nace WebspecAI',
      },
      cta: {
        label: 'Responder esta edición',
        subject: 'Conversación sobre especificación y liderazgo técnico',
        body:
          'Hola Julián,\n\nQuiero conversar sobre especificación, liderazgo técnico o IA aplicada al ciclo de producto.\n\nLlegué desde la edición "Especificar antes de construir también es liderazgo".\n',
      },
      finalQuestion:
        '¿Qué conversación de producto o arquitectura está evitando hoy tu equipo y cuánto retrabajo podría ahorrar si la hicieran esta semana?',
      signature: 'Julián\nEngineering Manager, product builder y fundador de Pambú Tech\njuliancardozo.github.io · LinkedIn',
      ps:
        'Si estás ordenando una iniciativa nueva, puedo compartirte el esquema mínimo que uso para bajar una idea borrosa a una especificación trabajable.',
      metricPrimary: 'Respuestas de líderes y clics hacia WebspecAI o el artículo relacionado.',
      segment: ['Liderazgo', 'IA', 'Producto', 'WebspecAI'],
      utm: 'utm_source=newsletter&utm_medium=email&utm_campaign=edicion-002-especificacion',
      distribution: {
        webExtract:
          'Una nota sobre por qué especificar antes de construir no frena a un equipo: le evita pagar después la ambigüedad en forma de retrabajo y decisiones técnicas sin contexto.',
        linkedin:
          'Una de las frases más caras en producto e ingeniería es "ya entendimos, arranquemos". No porque siempre sea falsa, sino porque muchas veces aparece antes de que exista un modelo compartido del problema. La especificación útil no es burocracia: es liderazgo. En la nueva edición de mi newsletter conecté esa idea con IA aplicada y con lo que vengo aprendiendo construyendo WebspecAI.',
        shortPosts: [
          'Especificar no retrasa. Retrasa más descubrir la discusión correcta después de escribir el código.',
          'La IA ayuda menos cuando reemplaza criterio y más cuando obliga a hacer visibles los supuestos.',
          'Alinear problema, alcance y señal de éxito antes del sprint suele ser una mejora de liderazgo, no de documentación.',
        ],
        community:
          'Publiqué una nota breve sobre especificación y liderazgo técnico: menos enfocada en herramientas y más en cómo evitar que la ambigüedad llegue demasiado lejos dentro del equipo.',
        nextIdea: 'Cómo usar una secuencia corta de preguntas para pasar de una idea de founder a una RFC trabajable.',
      },
    },
  ],
};
