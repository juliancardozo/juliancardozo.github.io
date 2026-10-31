/**
 * Configuracion e identidad del sitio.
 *
 * Multi-idioma: todo el copy de interfaz vive bajo `content[locale]`, con las rutas
 * de cada idioma (`prefix` + `routes`). El contenido largo (proyectos, artículos,
 * pilares, newsletter) se escribe en español en su archivo y se traduce en
 * `src/data/<locale>/`, ver src/data/i18n.js.
 */

import { en, statusLabelsEn } from './en/site.js';

export const site = {
  baseUrl: 'https://juliancardozo.github.io',
  defaultLocale: 'es',
  author: 'Julián Cardozo',
  // Enlaces verificados. Un enlace vacio no se renderiza (ver templates/components.mjs).
  links: {
    github: 'https://github.com/juliancardozo',
    linkedin: 'https://www.linkedin.com/in/juliancardozoviggiano/',
    email: 'julian.cardozo.viggiano@gmail.com',
  },
};

export const content = {
  es: {
    lang: 'es',
    prefix: '',
    routes: { blog: 'blog', project: 'proyectos', topic: 'temas', newsletter: 'newsletter', privacy: 'privacidad' },
    dateLocale: 'es-UY',
    ogLocale: 'es_UY',
    meta: {
      title: 'Julián Cardozo — Engineering Manager y product builder',
      description:
        'Engineering Manager y desarrollador con más de 15 años en software, banca, fintech y plataformas. Convierto problemas reales en productos: pagos, automotoras, salud animal, compliance, música, juegos e IA.',
      keywords: [
        'Engineering Manager',
        'Technical Leadership',
        'Software Engineering',
        'Product Builder',
        'Java',
        'Spring Boot',
        'Fintech',
        'Payment Platforms',
        'APIs',
        'Cloud',
        'DevSecOps',
        'AI-assisted development',
        'Spec-driven development',
        'Uruguay',
        'LATAM',
      ],
    },

    // Menú corto: una entrada por intención (ver trabajo, conocerme, leer, contactar).
    // El resto de las secciones del home se recorre con scroll. `cta` la destaca como botón.
    nav: [
      { href: '#productos', label: 'Productos' },
      { href: '#acerca', label: 'Sobre mí' },
      { href: '/blog/', label: 'Blog' },
      { href: '/newsletter/', label: 'Newsletter' },
      { href: '#contacto', label: 'Contacto', cta: true },
    ],

    hero: {
      eyebrow: 'Engineering Manager · Product builder · Montevideo, Uruguay',
      title: 'Hola, soy Julián.',
      lead: 'Llevo más de 15 años aprendiendo a construir software: backend en Java, pagos en banca y fintech, y equipos de ingeniería. El último año lo dediqué a proyectos propios que nacieron de situaciones cotidianas; algunos ya están en línea y otros siguen en camino. Si llegaste hasta acá, gracias: me encantaría saber qué estás construyendo vos.',
      note: 'Cada proyecto muestra su estado real: en línea, MVP, prototipo o herramienta.',
      ctas: [
        { href: '#productos', label: 'Ver los productos', variant: 'primary' },
        { href: '#acerca', label: 'Sobre mí', variant: 'ghost' },
      ],
      facts: [
        { value: '15+', label: 'años construyendo software' },
        { value: '10', label: 'productos propios en el último año' },
        { value: '7', label: 'en línea hoy' },
        { value: '50', label: 'repositorios públicos' },
      ],
    },

    sections: {
      productos: {
        eyebrow: 'Productos',
        title: 'Diez productos, diez problemas que conocía de cerca',
        lead: 'Cada uno empezó con una situación concreta —una mudanza, un perro, un auto, una ley, una jam, un viaje— y terminó en código público. En cada caso de estudio: el problema, las decisiones técnicas y el estado real.',
      },
      pilares: {
        eyebrow: 'Pilares',
        title: 'Tres rutas de lectura',
        lead: 'Artículos y proyectos agrupados por tema: liderazgo técnico, arquitectura y producto.',
      },
      newsletter: {
        eyebrow: 'Newsletter',
        title: 'Notas desde el frente',
        lead: 'Liderazgo técnico, arquitectura, producto e IA aplicada, con lo que aprendo en proyectos propios. Más personal que el blog.',
        ctaPrimary: 'Ver archivo de la newsletter',
        ctaSecondary: 'Quiero recibir la primera edición',
        note: 'La suscripción pasa por un endpoint propio fuera de GitHub Pages, para no exponer credenciales. Se registra el consentimiento y el tema de interés.',
        promiseLabel: 'Promesa editorial',
        cadenceLabel: 'Cadencia',
        formTitle: 'Sumate desde la home',
        formLead: 'Si te interesa liderazgo técnico, arquitectura, producto o IA aplicada, podés recibir la primera edición desde acá.',
      },
      acerca: {
        eyebrow: 'Sobre mí',
        title: 'De construir sistemas a habilitar equipos de ingeniería',
        scopeLabel: 'Alcance',
        lead: 'Empecé escribiendo backend. Hoy mi trabajo es que equipos, productos y plataformas entreguen valor de forma sostenible. Cada etapa amplió el sistema bajo mi responsabilidad.',
        stages: [
          {
            title: 'Desarrollador',
            body: 'Fundamentos de informática, Java, APIs REST, Spring, persistencia y mensajería empresarial. La calidad se volvió concreta: una falla podía ser una transacción que no ocurrió o una integración que nadie podía recuperar.',
            scope: 'Código, datos y consistencia.',
          },
          {
            title: 'Senior y technical leader',
            body: 'Banca, medios de pago y fintech ampliaron el problema: conciliación, auditoría, seguridad, normativa, webhooks e integraciones con terceros. La responsabilidad pasó a incluir estándares, decisiones de arquitectura y reducción de riesgos técnicos.',
            scope: 'Sistemas operables y decisiones técnicas.',
          },
          {
            title: 'Engineering Manager',
            body: 'El foco se trasladó a equipos multidisciplinarios, arquitectura, plataforma, prioridades, mentoring y comunicación con negocio. Menos código escrito directamente; más decisiones que habilitan entrega sostenida.',
            scope: 'Equipos, delivery y estrategia técnica.',
          },
        ],
        future: {
          label: 'Proyección profesional',
          title: 'Próximo alcance: liderazgo ejecutivo',
          body: 'Busco roles donde tecnología, producto y negocio se alinean. CTO: conectar arquitectura, seguridad y plataforma con la estrategia. VP o Head of Engineering: escalar talento, delivery y salud del equipo. Head of Product: unir discovery, priorización y viabilidad técnica. Son objetivos, no cargos actuales.',
        },
      },
      origen: {
        eyebrow: 'Método',
        title: 'Cómo nace un producto',
        lead: 'Todos siguen el mismo proceso. Cambia el dominio, no el método.',
        steps: [
          {
            step: 'Experiencia',
            body: 'Vivo el problema o lo veo de cerca. No parto de una idea de negocio abstracta.',
          },
          {
            step: 'Problema',
            body: 'Separo la molestia puntual del problema estructural: información dispersa, un proceso manual o una norma difícil de llevar a software.',
          },
          {
            step: 'Especificación',
            body: 'Escribo la spec antes que el código: alcance, dominio, usuarios y qué significa "funciona". Ahí se ahorra más tiempo.',
          },
          {
            step: 'Producto',
            body: 'MVP end-to-end: modelo de datos, API, frontend y deploy. Sin frameworks ni infraestructura que el problema no pida.',
          },
          {
            step: 'Capacidad',
            body: 'Cada producto deja algo reutilizable: un motor de cobros, un patrón multi-tenant, un pipeline de audio.',
          },
        ],
        examples: [
          { from: 'Una mudanza', to: 'Casa Médanos', slug: 'casa-medanos' },
          { from: 'Cuidar a Milo', to: 'Milo Care', slug: 'milo-care' },
          { from: 'Vender mi auto', to: 'Patio', slug: 'patio' },
          { from: 'La ley 18.331', to: 'compliance-uy', slug: 'compliance-uy' },
          { from: 'Querer tocar en una jam', to: 'EscalaImprov', slug: 'escalaimprov' },
          { from: 'Un viaje a Porto de Galinhas', to: 'Sombrilleros', slug: 'sombrilleros' },
          { from: 'No pagar Chordify', to: 'ChordLocal', slug: 'chordlocal' },
          { from: 'El candombe de Montevideo', to: 'Neuro-Candombe', slug: 'neuro-candombe' },
        ],
        examplesLabel: 'Ejemplos de problemas convertidos en productos',
      },
      laboratorio: {
        eyebrow: 'Laboratorio',
        title: 'Experimentos, herramientas y fundamentos',
        lead: 'Pruebas de concepto, trabajos para clientes y la base académica. Filtrá por tipo.',
        allLabel: 'Todo',
        emptyLabel: 'No hay proyectos en esta categoría.',
        filterLabel: 'Filtrar proyectos del laboratorio',
      },
      recorrido: {
        eyebrow: 'Recorrido',
        title: 'Cada etapa sumó una capacidad',
        lead: 'No es un CV cronológico: es lo que cada etapa me dejó y sigo usando.',
        gainedLabel: 'Capacidad que sumó',
        stages: [
          {
            period: 'Fundamentos',
            title: 'Informática e ingeniería de software',
            body: 'Algoritmos, estructuras de datos, bases de datos y patrones de diseño. La parte que no caduca: cuando un sistema se cae a las tres de la mañana, lo que sirve es entender qué está pasando por debajo.',
            gained: 'Criterio para razonar sobre sistemas, no solo para usarlos.',
          },
          {
            period: 'Primeros años',
            title: 'Desarrollador Java',
            body: 'Backend, APIs REST, Spring, persistencia, colas de mensajes. Sistemas empresariales donde un error no es un bug estético: es una transacción que no ocurrió.',
            gained: 'Solidez en backend y respeto por la consistencia de los datos.',
          },
          {
            period: 'Banca y medios de pago',
            title: 'Transacciones, seguridad y normativa',
            body: 'Trabajé donde el dinero se mueve de verdad: conciliación, estados de pago, auditoría, control de acceso y requisitos regulatorios que no son negociables.',
            gained: 'Entender un pago como una máquina de estados auditable, no como una llamada HTTP.',
          },
          {
            period: 'Fintech',
            title: 'Escala, integración y velocidad',
            body: 'Volumen, integraciones con terceros, webhooks, observabilidad y ciclos de entrega cortos sin bajar la vara de seguridad.',
            gained: 'Diseñar para la integración: todo sistema real convive con otros que no controlás.',
          },
          {
            period: 'Liderazgo',
            title: 'Engineering Manager',
            body: 'Equipos multidisciplinarios, arquitectura, plataforma, prioridades y la conversación con negocio. Menos código propio y más decisiones que habilitan el código de otros.',
            gained: 'Estrategia técnica, mentoring y traducción entre ingeniería y negocio.',
          },
          {
            period: 'Agencia y clientes',
            title: 'Producto, diseño y comunicación',
            body: 'Fundé y participé en una agencia de desarrollo y marketing digital: sitios, e-commerce, branding y entregas completas para clientes reales, con presupuesto y fecha.',
            gained: 'Vender, diseñar y comunicar una solución, no solo construirla.',
          },
          {
            period: 'Último año',
            title: 'Productos propios e inteligencia artificial',
            body: 'Spec-driven development, desarrollo asistido por IA, agentes y MCP aplicados al ciclo completo. La IA no reemplaza el criterio: comprime el tiempo entre entender un problema y tener algo funcionando.',
            gained: 'Ir de la necesidad al producto desplegado sin depender de un equipo entero.',
            // Lista los productos destacados que salieron de esta etapa.
            showProducts: 'Lo que salió de acá',
          },
        ],
      },
      capacidades: {
        eyebrow: 'Capacidades',
        title: 'Lo que puedo hacer, ordenado por etapa',
        lead: 'Cómo trabajo, de la primera conversación a la operación en producción.',
        groups: [
          {
            title: 'Descubrir',
            body: 'Encontrar el problema real antes de escribir código.',
            items: ['Investigación de usuarios', 'Product discovery', 'Validación de hipótesis', 'Análisis de mercado', 'Definición de alcance'],
          },
          {
            title: 'Diseñar',
            body: 'Traducir el problema a un modelo que se sostenga.',
            items: ['Modelado de dominio', 'Arquitectura de solución', 'Diseño de APIs', 'UX/UI', 'Especificaciones ejecutables'],
          },
          {
            title: 'Construir',
            body: 'Producto end-to-end, del esquema de datos al deploy.',
            items: ['Java / Spring Boot', 'Node.js / NestJS', 'React / Next.js / Angular', 'Webs corporativas de alto impacto', 'PostgreSQL / MongoDB', 'Integraciones y pagos'],
          },
          {
            title: 'Operar',
            body: 'Que siga funcionando cuando ya no lo estás mirando.',
            items: ['Docker / Kubernetes', 'CI/CD', 'AWS y cloud', 'Observabilidad', 'DevSecOps', 'Infrastructure as Code'],
          },
          {
            title: 'Liderar',
            body: 'Equipos que entregan sin depender de una sola persona.',
            items: ['Estrategia técnica', 'Gestión de equipos', 'Priorización', 'Mentoring', 'Cultura de ingeniería', 'Interlocución con negocio'],
          },
          {
            title: 'Acelerar con IA',
            body: 'Usar IA en el ciclo completo, con criterio y verificación.',
            items: ['Spec-driven development', 'AI-assisted development', 'Agentes y MCP', 'Prototipado rápido', 'Automatización del ciclo'],
          },
        ],
      },
      filosofia: {
        eyebrow: 'Cómo trabajo',
        title: 'Seis cosas que aprendí construyendo',
        items: [
          {
            title: 'La tecnología empieza por entender el problema',
            body: 'La pregunta útil no es qué stack usar, sino qué le pasa a la persona que va a usarlo. El stack se elige después y casi siempre es más aburrido de lo que uno quisiera.',
          },
          {
            title: 'Un producto útil vale más que una demo compleja',
            body: 'Una página que efectivamente vendió los muebles de una casa vale más que una arquitectura elegante sin nadie del otro lado.',
          },
          {
            title: 'La arquitectura acompaña al negocio',
            body: 'Multi-tenancy, doble moneda o un ledger de eventos no son decisiones técnicas: son decisiones de negocio que se escriben en código y se pagan caro si llegan tarde.',
          },
          {
            title: 'La IA amplifica, no sustituye el criterio',
            body: 'Acelera investigar, especificar y construir. Sigue siendo mío decidir qué se construye, revisar lo que produce y hacerme cargo del resultado.',
          },
          {
            title: 'Construir incluye medir, aprender e iterar',
            body: 'Por eso los proyectos llevan tests, eventos auditables y estado explícito. Si no puedo saber qué pasó, no terminé de construirlo.',
          },
          {
            title: 'Los problemas cotidianos esconden oportunidades',
            body: 'Mudarme, cuidar a mi perro o vender un auto me mostraron procesos rotos que nadie estaba mirando. La materia prima está más cerca de lo que parece.',
          },
        ],
      },
      contacto: {
        eyebrow: 'Contacto',
        title: 'Conversemos',
        lead: '¿Estás construyendo un producto, modernizando una plataforma, armando un equipo o aplicando IA a un problema concreto? Escribime. Respondo todos los mensajes.',
        items: [
          'Liderazgo técnico y gestión de equipos de ingeniería',
          'Plataformas de pagos, integraciones y arquitectura backend',
          'Construcción de MVPs y productos de cero a producción',
          'Adopción de IA en el ciclo de desarrollo',
        ],
        githubLabel: 'GitHub',
        linkedinLabel: 'LinkedIn',
        emailLabel: 'Escribime',
        newsletterLabel: 'Newsletter',
        privacyLabel: 'Privacidad',
      },
    },

    ui: {
      skipToContent: 'Ir al contenido',
      backHome: 'Volver al inicio',
      viewCase: 'Ver caso de estudio',
      viewRepo: 'Repositorio',
      viewDemo: 'Ver online',
      role: 'Mi rol',
      status: 'Estado',
      year: 'Período',
      stack: 'Stack',
      problem: 'El problema',
      origin: 'De dónde salió',
      solution: 'La solución',
      audience: 'Para quién',
      highlights: 'Qué tiene resuelto',
      challenges: 'Lo difícil',
      learnings: 'Qué aprendí',
      nextSteps: 'Próximos pasos',
      evidence: 'Evidencia',
      capabilities: 'Capacidades aplicadas',
      onThisPage: 'En esta página',
      moreProjects: 'Otros productos',
      noLinks: 'Repositorio privado',
      footerNote: 'Sitio estático sin frameworks ni dependencias: HTML, CSS y un generador propio en Node.',
      originLabel: 'Origen',
      coverLabel: 'Ilustración abstracta del proyecto',
      insightsEyebrow: 'Aprendizajes aplicados',
      insightsTitle: 'Lecturas que nacen de este proyecto',
      navLabel: 'Secciones del sitio',
      privacy: 'Privacidad',
      switchLanguage: { en: 'Read this page in English' },
    },

    pages: {
      blogTitle: 'Blog de tecnología y producto',
      blogDescription: 'Artículos sobre inteligencia artificial, arquitectura, infraestructura y emprendimiento a partir de proyectos propios.',
      blogName: 'Blog de',
      privacyTitle: 'Privacidad de la newsletter',
      privacyDescription: 'Política de privacidad y consentimiento para la newsletter personal de Julián Cardozo.',
    },

    blog: {
      eyebrow: 'Blog',
      title: 'Tecnología que sale de construir producto',
      lead: 'Notas sobre IA, arquitectura, infraestructura y emprendimiento a partir de decisiones tomadas en proyectos propios.',
      newsletterCta: 'Ver la newsletter',
      subscribeCta: 'Suscribirme',
      pillarsEyebrow: 'Pilares',
      pillarsTitle: 'Tres puertas de entrada para entender el recorrido',
      filterLabel: 'Filtrar artículos por tema',
      allLabel: 'Todo',
      tagsLabel: 'Temas',
      readArticle: 'Leer artículo',
      emptyLabel: 'No hay artículos con esta combinación de tags.',
      loadMore: 'Cargar más artículos',
      formTitle: '¿Querés recibir la primera edición?',
      formLead: 'Si el blog te resulta útil, la newsletter sirve para profundizar ideas y abrir conversaciones con menos ruido que una red social.',
    },

    article: {
      back: 'Volver al blog',
      pillarLabel: 'Pilar',
      bornFrom: 'Este artículo nace del proyecto',
      contextLabel: 'Contexto',
      defaultContext: 'Perfil profesional',
      viewRepo: 'Ver repositorio',
      architectureLabel: 'Arquitectura de referencia',
      relatedEyebrow: 'Seguir leyendo',
      relatedTitle: 'Artículos relacionados',
      conversation: {
        label: 'Continuemos la conversación',
        body: 'Si este tema se relaciona con tu producto, equipo o investigación, escribime. Respondo personalmente y sin compromiso comercial.',
        button: 'Escribirme sobre este tema',
        subjectPrefix: 'Conversación sobre: ',
        cameFrom: 'Llegué desde el artículo: ',
        fallback: '¿Estás trabajando en un desafío parecido? Me interesa conocer el contexto y comparar experiencias.',
        byTag: {
          Pagos: '¿Trabajás en fintech, pagos o suscripciones? Me interesa comparar decisiones de producto y arquitectura.',
          IA: '¿Tu equipo está evaluando IA aplicada? Me interesa conocer el problema que están intentando resolver.',
          Arquitectura: '¿Estás diseñando una arquitectura parecida? Podemos contrastar decisiones y trade-offs.',
          Producto: '¿Estás validando un producto? Me interesa conversar sobre la hipótesis y el camino técnico.',
          Cloud: '¿Tu equipo está ordenando una decisión de cloud u operación? Podemos intercambiar experiencias.',
          Liderazgo: '¿Estás liderando un equipo de ingeniería? Me interesa conversar sobre los desafíos que están atravesando.',
        },
      },
    },

    pillarPage: {
      back: 'Volver a los pilares',
      audienceLabel: 'Para quién',
      conversationLabel: 'Conversación',
      writeMe: 'Escribirme sobre este tema',
      questionsTitle: 'Preguntas que organiza este pilar',
      articlesTitle: 'Artículos para entrar en tema',
      projectsTitle: 'Proyectos que sirven como evidencia',
      viewCase: 'Ver caso',
      subjectPrefix: 'Conversación sobre ',
      cameFrom: 'Llegué desde el pilar: ',
    },

    newsletterPage: {
      eyebrow: 'Newsletter',
      archiveCta: 'Ver archivo público',
      formTitle: 'Recibí la primera edición',
      formLead: 'Dejá tu email, elegí tu interés principal y te sumo a la lista para las próximas ediciones.',
      cadenceLabel: 'Cadencia',
      cadenceTitle: 'Un ritmo sostenible',
      audienceLabel: 'Para quién',
      statusLabel: 'Estado operativo',
      pillarsEyebrow: 'Pilares editoriales',
      pillarsTitle: 'Seis temas, una sola voz',
      archiveEyebrow: 'Archivo público',
      archiveTitle: 'Ediciones disponibles',
      archiveLead: 'Cada edición conecta una experiencia real, una idea práctica y un puente hacia el resto del ecosistema: blog, proyectos y conversaciones.',
      segmentsLabel: 'Segmentos',
      readIssue: 'Leer edición',
      relatedArticle: 'Artículo relacionado',
      relatedProject: 'Proyecto relacionado',
      sequenceEyebrow: 'Secuencia de bienvenida',
      sequenceTitle: 'Cinco emails para convertir suscripción en relación',
      goalLabel: 'Objetivo:',
      back: 'Volver a la newsletter',
      primaryAudience: 'Audiencia principal',
      objective: 'Objetivo',
      toolLabel: 'Herramienta práctica',
      ecosystemLabel: 'Conexión con el ecosistema',
      psLabel: 'PD:',
    },

    form: {
      label: 'Suscripción',
      defaultTitle: 'Recibí la primera edición',
      defaultLead: 'Sumate para recibir la próxima edición y futuras notas sobre liderazgo, arquitectura, producto e IA aplicada.',
      defaultButton: 'Quiero recibir la newsletter',
      name: 'Nombre',
      email: 'Email',
      interest: 'Interés principal',
      choose: 'Elegí una opción',
      interests: [
        ['liderazgo', 'Liderazgo técnico'],
        ['arquitectura', 'Arquitectura y plataforma'],
        ['ia', 'IA aplicada'],
        ['producto', 'Producto y MVPs'],
        ['pagos', 'Fintech y pagos'],
      ],
      company: 'Empresa',
      consentBefore: 'Acepto recibir la newsletter y actualizaciones relacionadas. Leé la ',
      consentLink: 'política de privacidad',
      meta: 'Sin spam. Podés pedir la baja en cualquier momento.',
    },

    notFound: {
      title: 'Página no encontrada',
      description: 'La página que buscás no existe.',
      heading: 'Esta página no existe',
      lead: 'Puede que el enlace esté roto o que la página se haya movido.',
      productsCta: 'Ver los productos',
    },

    privacy: {
      eyebrow: 'Privacidad',
      title: 'Política de privacidad de la newsletter',
      lead:
        'Uso los datos de suscripción solo para enviar la newsletter y actualizaciones relacionadas con el contenido, los proyectos y las conversaciones profesionales que publico en este sitio.',
      sections: [
        {
          title: 'Qué datos se guardan',
          paragraphs: [
            'Cuando te suscribís, se registra tu email y el interés principal que marcaste en el formulario. Si completás tu nombre, también se guarda para personalizar futuras comunicaciones.',
            'Además se registran metadatos mínimos de contexto: página desde la que te suscribiste, tipo de formulario y momento del consentimiento.',
          ],
        },
        {
          title: 'Para qué se usan',
          paragraphs: [
            'Los datos se usan para enviarte la newsletter, entender qué temas despiertan más interés y ordenar futuras conversaciones o segmentaciones editoriales.',
            'No vendo ni cedo tu información a terceros. El procesamiento de la suscripción se apoya en Resend como proveedor de infraestructura de email.',
          ],
        },
        {
          title: 'Consentimiento y baja',
          paragraphs: [
            'La suscripción requiere consentimiento explícito en el formulario. Si más adelante no querés seguir recibiendo comunicaciones, vas a poder darte de baja desde el propio email o escribiéndome directamente.',
            'Hasta que el flujo automático de baja quede publicado en producción, también podés pedir la eliminación o actualización de tus datos respondiendo a cualquier mensaje o escribiendo a mi email profesional.',
          ],
        },
        {
          title: 'Seguridad y contacto',
          paragraphs: [
            'La API key de Resend no se expone en esta web. La suscripción se procesa a través de un endpoint seguro fuera de GitHub Pages.',
            'Si necesitás consultar, corregir o eliminar tus datos, podés escribirme desde la sección de contacto del sitio.',
          ],
          items: [
            'Proveedor de infraestructura de email: Resend',
            'Sitio: juliancardozo.github.io',
            'Responsable: Julián Cardozo',
          ],
        },
      ],
    },
  },

  en,
};

/** Etiquetas de estado. Deliberadamente honestas: nada se presenta como más maduro de lo que es. */
export const statusLabels = {
  es: {
    published: { label: 'En línea', tone: 'live' },
    mvp: { label: 'MVP funcional', tone: 'build' },
    tool: { label: 'Herramienta publicada', tone: 'live' },
    prototype: { label: 'Prototipo', tone: 'proto' },
    exploration: { label: 'Exploración', tone: 'proto' },
    client: { label: 'Entregado', tone: 'build' },
    academic: { label: 'Trabajo académico', tone: 'muted' },
    archived: { label: 'Histórico', tone: 'muted' },
  },
  en: statusLabelsEn,
};
