/**
 * Configuracion e identidad del sitio.
 *
 * Estructura preparada para multi-idioma: todo el copy vive bajo `content[locale]`.
 * Para agregar ingles: duplicar el bloque `es` como `en`, traducir, y sumar
 * el locale a `locales` en build.mjs. Las plantillas no necesitan cambios.
 */

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
    meta: {
      title: 'Julián Cardozo — Engineering Manager y product builder',
      description:
        'Engineering Manager y desarrollador con más de 15 años de experiencia en software, banca, fintech y plataformas. Convierto problemas reales en productos digitales: pagos, automotoras, salud animal, compliance e IA.',
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

    nav: [
      { href: '/blog/', label: 'Blog' },
      { href: '/newsletter/', label: 'Newsletter' },
      { href: '/blog/#pilares', label: 'Pilares' },
      { href: '#acerca', label: 'Acerca de mí' },
      { href: '#productos', label: 'Productos' },
      { href: '#origen', label: 'Cómo nacen' },
      { href: '#laboratorio', label: 'Laboratorio' },
      { href: '#recorrido', label: 'Recorrido' },
      { href: '#capacidades', label: 'Capacidades' },
      { href: '#contacto', label: 'Contacto' },
    ],

    hero: {
      eyebrow: 'Engineering Manager · Product builder · Montevideo, Uruguay',
      title: 'Convierto problemas reales en productos digitales.',
      lead: 'Soy Julián Cardozo. Hace más de 15 años que construyo software: sistemas empresariales en Java, plataformas de pagos en banca y fintech, y equipos de ingeniería. En el último año usé esa base para pasar de resolver problemas ajenos a construir producto propio: siete productos que nacieron de situaciones que viví de cerca, seis de ellos hoy en línea.',
      note: 'Cada tarjeta indica en qué estado real está el proyecto: en línea, MVP funcional, prototipo o exploración. Nada más que eso.',
      ctas: [
        { href: '#productos', label: 'Ver los productos', variant: 'primary' },
        { href: '#recorrido', label: 'Conocer mi recorrido', variant: 'ghost' },
      ],
      facts: [
        { value: '15+', label: 'años construyendo software' },
        { value: '7', label: 'productos propios en el último año' },
        { value: '6', label: 'con producto o sitio en línea hoy' },
        { value: '48', label: 'repositorios públicos' },
      ],
    },

    sections: {
      productos: {
        eyebrow: 'Productos',
        title: 'Siete productos, siete problemas que conocía de cerca',
        lead: 'No son ejercicios técnicos. Cada uno arrancó con una situación concreta —una mudanza, un perro, un auto, una ley nueva, una jam— y terminó en código que se puede leer. Entrá al caso de estudio para ver el problema, las decisiones y el estado real.',
      },
      pilares: {
        eyebrow: 'Pilares',
        title: 'Cinco áreas de experiencia, organizadas en tres rutas de lectura',
        lead: 'No son categorías arbitrarias. Son la forma más útil de conectar artículos, proyectos y conversaciones reales sobre liderazgo técnico, arquitectura y producto.',
      },
      newsletter: {
        eyebrow: 'Newsletter',
        title: 'Una newsletter para pensar mejor cómo construimos',
        lead: 'Notas desde el frente conecta liderazgo técnico, arquitectura, producto, IA aplicada y aprendizajes de proyectos propios en un formato más personal y conversable que el blog.',
        ctaPrimary: 'Ver archivo de la newsletter',
        ctaSecondary: 'Quiero recibir la primera edición',
        note: 'La suscripción se procesa con un endpoint seguro fuera de GitHub Pages para no exponer credenciales. El alta queda registrada con consentimiento e interés principal.',
      },
      acerca: {
        eyebrow: 'Acerca de mí',
        title: 'De construir sistemas a habilitar organizaciones de ingeniería',
        lead: 'Mi carrera evolucionó desde el desarrollo backend hacia una responsabilidad más amplia: crear las condiciones para que equipos, productos y plataformas entreguen valor de forma sostenible. No lo entiendo como una sucesión de títulos, sino como una ampliación progresiva del sistema bajo mi responsabilidad.',
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
          title: 'Próximo alcance: liderazgo ejecutivo',
          body: 'La dirección de mi desarrollo profesional está en roles donde tecnología, producto y negocio se alinean de forma explícita. CTO implica conectar arquitectura, seguridad y plataforma con la estrategia. VP Engineering o Head of Engineering, escalar talento, delivery y salud de la organización. Head of Product, integrar discovery, priorización y viabilidad técnica. Son trayectorias objetivo, no cargos actuales.',
        },
      },
      origen: {
        eyebrow: 'Método',
        title: 'Cómo nace un producto',
        lead: 'Todos siguieron el mismo recorrido. Lo que cambia es el dominio; el patrón se repite y es lo que mejor describe cómo trabajo.',
        steps: [
          {
            step: 'Experiencia',
            body: 'Vivo el problema en primera persona o lo veo de cerca en alguien. No parto de una idea de negocio abstracta.',
          },
          {
            step: 'Problema observado',
            body: 'Separo la molestia puntual del problema estructural. Casi siempre hay información dispersa, un proceso manual o una norma difícil de traducir a software.',
          },
          {
            step: 'Idea y validación',
            body: 'Escribo la especificación antes que el código: alcance, dominio, usuarios y qué significa "funciona". Es donde más ahorro tiempo.',
          },
          {
            step: 'Producto',
            body: 'Construyo el MVP end-to-end: modelo de datos, API, frontend, despliegue. Sin frameworks de más ni infraestructura que el problema no pida.',
          },
          {
            step: 'Nueva capacidad',
            body: 'Cada producto deja algo reutilizable: un motor de cobros, un patrón multi-tenant, una skill de compliance. Ese es el activo que queda.',
          },
        ],
        examples: [
          { from: 'Una mudanza', to: 'Casa Médanos', slug: 'casa-medanos' },
          { from: 'Cuidar a Milo', to: 'Milo Care', slug: 'milo-care' },
          { from: 'Vender mi auto', to: 'Patio', slug: 'patio' },
          { from: 'La ley 18.331', to: 'compliance-uy', slug: 'compliance-uy' },
          { from: 'Querer tocar en una jam', to: 'EscalaImprov', slug: 'escalaimprov' },
        ],
      },
      laboratorio: {
        eyebrow: 'Laboratorio',
        title: 'Experimentos, herramientas y fundamentos',
        lead: 'Proyectos secundarios, pruebas de concepto, trabajo para clientes y los trabajos académicos donde se formó la base. Filtrá por tipo para ver de qué está hecho el recorrido.',
        allLabel: 'Todo',
        emptyLabel: 'No hay proyectos en esta categoría.',
      },
      recorrido: {
        eyebrow: 'Recorrido',
        title: 'Cada etapa sumó una capacidad',
        lead: 'No es un currículum cronológico. Es la lista de lo que cada etapa me dejó y que sigo usando hoy.',
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
          },
        ],
      },
      capacidades: {
        eyebrow: 'Capacidades',
        title: 'Lo que puedo hacer, ordenado por etapa',
        lead: 'No es una nube de logos. Es el sistema con el que trabajo, de la primera conversación al día en que hay que operarlo.',
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
        lead: 'Si estás construyendo un producto, modernizando una plataforma, armando un equipo de ingeniería o explorando cómo aplicar inteligencia artificial a un problema concreto, escribime. Respondo todos los mensajes.',
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
      footerNote: 'Sitio construido sin frameworks ni dependencias: HTML, CSS y un generador estático de ~200 líneas.',
    },
  },
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
};
