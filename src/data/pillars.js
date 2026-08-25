export const pillars = [
  {
    slug: 'liderazgo-tecnico',
    title: 'Liderazgo técnico y equipos',
    eyebrow: 'Pilar',
    description:
      'Cómo pienso liderazgo técnico, autonomía, delivery sostenible y la relación entre ingeniería, producto y negocio.',
    lead:
      'Este pilar reúne la parte menos visible del trabajo técnico: crear contexto, tomar decisiones con otros, traducir trade-offs y sostener equipos que entregan sin depender de héroes. Aunque muchos aprendizajes aparecen dentro de artículos de arquitectura o producto, el punto en común es el liderazgo.',
    audiences: ['CTOs y Engineering Managers', 'Tech Leads', 'Recruiters y empresas que buscan liderazgo técnico'],
    questions: [
      '¿Cómo cambia el trabajo cuando un líder técnico deja de optimizar solo por código y empieza a optimizar por sistema?',
      '¿Qué decisiones de arquitectura también son decisiones de cultura y autonomía?',
      '¿Cómo conectar producto, delivery y criterio técnico sin microgestión?',
    ],
    articleSlugs: [
      'ia-especificacion-antes-codigo',
      'kiro-acp-interoperabilidad-agentes-ide',
      'aws-cloud-practitioner-conceptos-fundamentales',
      'spec-kit-1-especificaciones-agentes-adopcion',
    ],
    projectSlugs: ['webspec-ai', 'patio', 'micuota'],
    cta:
      'Si estás liderando un equipo de ingeniería o armando una función técnica, me interesa comparar prácticas y decisiones.',
  },
  {
    slug: 'plataforma-arquitectura',
    title: 'Platform Engineering y arquitectura',
    eyebrow: 'Pilar',
    description:
      'Arquitectura de software, multi-tenancy, pagos, cloud, experiencia de desarrollo y sistemas que deben explicarse y operarse.',
    lead:
      'La arquitectura aparece donde un sistema tiene que resistir complejidad real: pagos, aislamiento de datos, contexto largo, integraciones y operación diaria. Este pilar organiza ese conocimiento aplicado desde problemas concretos.',
    audiences: ['CTOs y Tech Leads', 'Equipos de plataforma e infraestructura', 'Startups SaaS y fintech'],
    questions: [
      '¿Dónde debería vivir una frontera crítica como el aislamiento por tenant?',
      '¿Qué hace confiable a una integración de pagos o a un webhook?',
      '¿Qué responsabilidades siguen siendo del equipo aunque la infraestructura esté en cloud?',
    ],
    articleSlugs: [
      'webhooks-pagos-maquinas-de-estado',
      'multi-tenancy-rls-frontera-datos',
      'aws-cloud-practitioner-conceptos-fundamentales',
      'agentes-ia-salidas-verificables',
      'claude-watermarking-gobernanza-contenido-ia',
      'llama-4-scout-open-weight-usa',
      'qwen3-235b-open-weight-china',
    ],
    projectSlugs: ['micuota', 'patio', 'compliance-uy'],
    cta:
      'Si tu equipo está evaluando una arquitectura, una integración o una plataforma interna, podemos contrastar decisiones y riesgos.',
  },
  {
    slug: 'producto-mvps',
    title: 'Productos, startups y MVPs',
    eyebrow: 'Pilar',
    description:
      'De la observación del problema al MVP: onboarding, experiencia de uso, hipótesis, validación y diseño de soluciones sostenibles.',
    lead:
      'Este pilar conecta discovery, producto y ejecución. Los proyectos nacen de problemas observados —cuidar a Milo, cobrar cuotas, vender una casa, entender una jam— y se convierten en decisiones de arquitectura y producto que pueden ser útiles para otros equipos.',
    audiences: ['Founders y venture builders', 'Product Managers', 'Equipos que validan nuevos productos'],
    questions: [
      '¿Qué debería recibir un usuario en la primera sesión para que un producto tenga sentido?',
      '¿Cómo definir el alcance técnico de un MVP sin construir una empresa imaginaria?',
      '¿Cómo convertir una experiencia concreta en una hipótesis validable?',
    ],
    articleSlugs: [
      'milo-care-onboarding-calendario-clinico',
      'milo-care-recordatorios-confiables',
      'infraestructura-proporcionada-problema',
      'emprender-desde-problemas-observados',
      'web-corporativa-2026-impacto-rendimiento',
    ],
    projectSlugs: ['milo-care', 'casa-medanos', 'escalaimprov', 'webspec-ai'],
    cta:
      'Si estás validando un producto o redefiniendo el alcance de un MVP, me interesa conocer el problema y la hipótesis detrás.',
  },
];
