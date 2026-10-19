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
      title: 'Convierto problemas reales en software que funciona.',
      lead: 'Soy Julián Cardozo. Hace más de 15 años que construyo software: backend en Java, plataformas de pagos en banca y fintech, y equipos de ingeniería. En el último año apliqué esa base a productos propios: diez proyectos que salieron de situaciones concretas, siete de ellos en línea.',
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
      },
      acerca: {
        eyebrow: 'Sobre mí',
        title: 'De construir sistemas a habilitar equipos de ingeniería',
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
      },
      laboratorio: {
        eyebrow: 'Laboratorio',
        title: 'Experimentos, herramientas y fundamentos',
        lead: 'Pruebas de concepto, trabajos para clientes y la base académica. Filtrá por tipo.',
        allLabel: 'Todo',
        emptyLabel: 'No hay proyectos en esta categoría.',
      },
      recorrido: {
        eyebrow: 'Recorrido',
        title: 'Cada etapa sumó una capacidad',
        lead: 'No es un CV cronológico: es lo que cada etapa me dejó y sigo usando.',
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
