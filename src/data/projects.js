/**
 * Fuente unica de verdad de los proyectos.
 *
 * Agregar un proyecto = agregar un objeto aca y correr `npm run build`.
 * No hay que tocar ninguna plantilla ni componente.
 *
 * `featured: true`  -> tarjeta destacada en el home + pagina propia en /proyectos/<slug>/
 * `featured: false` -> tarjeta compacta y filtrable en el Laboratorio.
 *
 * Regla de contenido: todo lo que se afirma aca tiene que poder verificarse en el
 * repositorio, en el sitio publicado o en la documentacion del proyecto. El campo
 * `evidence` existe justamente para dejar esa trazabilidad a la vista.
 */

export const projects = [
  // ─────────────────────────────────────────────────────────────── Destacados
  {
    slug: 'micuota',
    featured: true,
    order: 1,
    title: 'MiCuota',
    tagline: 'Cobrar cuotas sin perseguir a nadie por WhatsApp.',
    category: 'fintech',
    categoryLabel: 'Fintech y pagos',
    status: 'published',
    year: '2025 – 2026',
    motif: 'ledger',
    image: {
      src: '/assets/img/shots/micuota.jpg',
      alt: 'Sitio de MiCuota.online: titular "Cobrá por link, QR o suscripción sin perseguir pagos" junto a un panel de ejemplo con ingresos, links activos y suscripciones.',
    },
    audience: 'Profesores, profesionales independientes y pequeños prestadores que cobran de forma recurrente.',
    role: 'Producto, arquitectura, backend, frontend e integraciones. Proyecto propio.',
    originStory:
      'Trabajé años en banca y fintech, donde un pago es una máquina de estados con conciliación y auditoría detrás. Del otro lado veía a profesores y profesionales llevando las cuotas en una planilla y persiguiendo transferencias por WhatsApp. La distancia entre esos dos mundos era el producto.',
    problem:
      'Quien cobra de forma recurrente y no es una empresa grande queda en tierra de nadie: los proveedores de pago resuelven el cobro puntual, pero nadie resuelve la cartera. No saber quién pagó, quién está en mora ni por qué falló un cobro es un trabajo administrativo silencioso que se come las horas facturables.',
    solution:
      'Una plataforma multi-tenant donde cada prestador conecta sus propias credenciales de cobro y opera su cartera: links de pago puntuales, suscripciones, estados y conciliación. Por debajo, una capa de abstracción de proveedores para que cambiar o sumar uno no obligue a reescribir la lógica de negocio, y un ledger de eventos que deja cada cobro auditable de punta a punta.',
    highlights: [
      'Capa `PaymentProviderGateway` con seis implementaciones: Mercado Pago, Stripe, Square, Plexo, Prometeo y WooCommerce.',
      'Flujos `ONE_TIME` y `SUBSCRIPTION` sobre el mismo modelo de operación.',
      'Cada tenant conecta su propio access token: los cobros quedan asociados al vendedor real, sin una cuenta global intermediaria.',
      'Webhooks de Mercado Pago con validación de secreto y resolución por `externalReference` cuando la notificación solo trae el id.',
      'Ledger `payment_events`: creación del cobro, envío del link, webhook recibido y cada cambio de estado, consultable como timeline por operación.',
      'Backoffice del prestador, panel de administración del SaaS y página de pago del cliente final, como páginas separadas.',
      'Modo sandbox interno para probar Stripe, Square y Plexo sin credenciales externas.',
    ],
    stack: ['Java 25', 'Spring Boot 3.5', 'Spring Data JPA', 'Flyway', 'PostgreSQL', 'H2', 'Docker Compose', 'MkDocs', 'Netlify'],
    capabilities: ['Diseñar', 'Construir', 'Operar'],
    evidence: [
      'Backend Maven con controladores de pagos, callbacks, webhooks, backoffice, conciliación y administración.',
      '18 clases de test entre unitarios e integración, más una suite de smoke tests contra el backend levantado.',
      'Documentación navegable propia generada con MkDocs Material, con build en modo `--strict`.',
      'Migraciones versionadas con Flyway y perfiles separados para desarrollo (H2) y producción (PostgreSQL).',
    ],
    challenges: [
      'Cada proveedor de pago modela distinto lo mismo. Mercado Pago separa `checkout/preferences` de `preapproval` para suscripciones, y en Uruguay las suscripciones exigen `preapproval_plan`. La abstracción tenía que absorber esas diferencias sin volverse un común denominador inútil.',
      'Los webhooks llegan incompletos, repetidos y fuera de orden. Resolver la operación cuando la notificación solo trae `data.id` obligó a apoyarse en el `externalReference` de la URL y volver a consultar la API del proveedor.',
      'Que cada tenant use sus propias credenciales complica todo —hay que resolver el token correcto en cada llamada— pero es la única forma de que el dinero llegue a la cuenta del prestador y no a una cuenta puente.',
    ],
    learnings: [
      'Sin un registro de eventos inmutable, la conciliación es arqueología. Guardar la respuesta cruda del proveedor en cada operación resolvió más incidentes que cualquier log.',
      'La deduplicación no es un detalle de implementación: un webhook reintentado que genera una suscripción duplicada es un problema de negocio.',
      'El modo sandbox interno fue la decisión que más velocidad dio: permite recorrer el flujo completo sin depender de credenciales de terceros.',
    ],
    nextSteps: [
      'Sobre el ledger de eventos se pueden construir reportes de mora, recupero y conciliación automática.',
      'La misma base habilita capas de split de pagos y payouts a terceros.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/micuota-online-2026-MVP',
    demoUrl: 'https://micuota.netlify.app/',
    demoLabel: 'Ver MiCuota.online',
  },

  {
    slug: 'patio',
    featured: true,
    order: 2,
    title: 'Patio',
    tagline: 'El stock de una automotora, sin la planilla compartida.',
    category: 'plataforma',
    categoryLabel: 'Movilidad y plataformas',
    status: 'mvp',
    year: '2026',
    motif: 'grid',
    image: {
      src: '/assets/img/shots/patio.jpg',
      alt: 'Sitio de Patio: titular "Sabé qué autos tenés, cuánto te costaron y cuál necesitás vender primero" junto a un dashboard de ejemplo con stock, reservados, vendidos y margen.',
    },
    audience: 'Automotoras y compraventas de vehículos de Uruguay y Argentina, con una o varias sucursales.',
    role: 'Producto, especificaciones, arquitectura multi-tenant y desarrollo del backend. Proyecto propio.',
    originStory:
      'Empecé a vender mi auto y terminé recorriendo automotoras. Vi el proceso desde adentro: fichas en papel, fotos en el celular de alguien, precios en dólares y pesos que no cerraban entre sí, y un vehículo que podía estar reservado y publicado al mismo tiempo. El problema no era la venta: era que nadie sabía con certeza qué había en el patio.',
    problem:
      'Una automotora mediana maneja stock, costos de reacondicionamiento, documentación con vencimientos, permutas, reservas y oportunidades comerciales. Casi siempre lo hace con planillas compartidas y grupos de WhatsApp. El costo no se ve en un solo lugar: aparece en el auto que lleva noventa días parado, en el margen que nadie calculó y en la unidad que se vendió dos veces.',
    solution:
      'Un DMS multi-tenant construido con spec-driven development: las especificaciones son la fuente de verdad y el código las implementa. Cubre el ciclo completo —alta de vehículo, fotos y documentos, costos y margen, CRM, reserva, permuta, venta y entrega— con aislamiento por organización a nivel de base de datos y auditoría inmutable de cada movimiento.',
    highlights: [
      'Multi-tenancy con Row Level Security en PostgreSQL: el aislamiento vive en la base, no solo en el código de la aplicación.',
      'Doble moneda USD/UYU con tipos de cambio versionados, tal como opera el mercado uruguayo.',
      'RBAC por rol y por sucursal.',
      'Máquina de estados del vehículo con historial y transiciones explícitas.',
      'Costos por unidad y cálculo de margen real, no estimado.',
      'CRM de oportunidades con actividades y generación de link de WhatsApp.',
      'Reserva con bloqueo, permuta, venta, entrega y cancelación.',
      'Dashboard con reporte de vehículos estancados, import/export CSV y visor de auditoría.',
    ],
    stack: ['NestJS', 'TypeScript', 'PostgreSQL + RLS', 'Redis', 'Next.js (App Router)', 'Docker', 'pnpm monorepo'],
    capabilities: ['Descubrir', 'Diseñar', 'Construir'],
    evidence: [
      'Diez verticales funcionales (F01–F10) implementadas y documentadas endpoint por endpoint.',
      '50 tests e2e en verde, incluyendo un caso de no-doble-venta bajo concurrencia.',
      'Migraciones de producción verificadas corriendo la API sin `synchronize`, con el esquema completo y RLS aplicado.',
      'Cinco fases previas de especificación —research, producto, UX y prototipo, arquitectura y plan— versionadas en `specs/` antes de la primera línea de código de producción.',
    ],
    challenges: [
      'La doble venta bajo concurrencia es el bug que no se puede permitir: dos vendedores reservando la misma unidad al mismo tiempo. Se resolvió con bloqueo explícito y quedó cubierto por un test e2e concurrente.',
      'Row Level Security da un aislamiento mucho más fuerte que filtrar por `tenant_id` en cada consulta, pero obliga a repensar migraciones, conexiones y roles de base de datos.',
      'La doble moneda no es formateo: atraviesa el costo, el margen, el reporte y el precio publicado, y cada uno puede estar fijado en una moneda distinta.',
    ],
    learnings: [
      'Escribir cinco fases de especificación antes de codear parecía lento y fue exactamente lo contrario: el backend completo salió sin refactors estructurales.',
      'Con IA asistiendo el desarrollo, la especificación pasa a ser el cuello de botella real. Cuanto más precisa, más útil es la asistencia.',
      'Un test que reproduce una condición de carrera vale más que veinte tests de camino feliz.',
    ],
    nextSteps: [
      'Frontend Next.js conectado a la totalidad de la API.',
      'Integraciones con portales de publicación y WhatsApp Cloud API.',
      'Hardening de RLS con rol restringido y `SET app.tenant_id` por conexión.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/AutoStock-mvp',
    demoUrl: 'https://patio-uy.netlify.app/',
    demoLabel: 'Sitio del producto',
  },

  {
    slug: 'milo-care',
    featured: true,
    order: 3,
    title: 'Milo Care',
    tagline: 'La salud de tu perro dejó de vivir en capturas de pantalla.',
    category: 'producto',
    categoryLabel: 'Salud y bienestar animal',
    status: 'published',
    year: '2026',
    motif: 'pulse',
    image: {
      src: '/assets/img/shots/milo-care.jpg',
      alt: 'Sitio de Milo Care: titular "El cuidado de tu perro, sin que dependa de tu memoria", con acceso gratuito y disponibilidad para Argentina y Uruguay.',
    },
    audience: 'Personas que cuidan perros en Uruguay y Argentina, y que hoy manejan esa información entre chats y papeles.',
    role: 'Producto, diseño, backend, frontend e infraestructura. Proyecto propio.',
    originStory:
      'Milo es mi perro. Cuando me tocó ordenar sus vacunas, su medicación y sus controles me di cuenta de que la información estaba en cuatro lugares distintos: una foto del carnet, un chat con la veterinaria, una nota en el celular y mi memoria. Ninguno de los cuatro me iba a avisar cuando venciera la próxima dosis.',
    problem:
      'La historia clínica de una mascota está fragmentada por diseño: cada visita genera un papel distinto y cada recordatorio depende de que alguien se acuerde. El resultado son vacunas vencidas, tratamientos interrumpidos y consultas donde nadie puede reconstruir qué pasó los últimos seis meses.',
    solution:
      'Una plataforma donde la persona que cuida registra vacunas, medicamentos, citas y síntomas en un solo lugar, con recordatorios por correo que se disparan solos. El onboarding arma el calendario vacunal según el país, apoyado en la normativa de SENASA y las guías WSAVA, para que el registro empiece con contenido útil en vez de una pantalla vacía.',
    highlights: [
      'Perfiles de perros con historial clínico completo por animal.',
      'Módulos de vacunas, medicamentos, citas veterinarias y síntomas, cada uno con su lógica de vencimiento y estado.',
      'Recordatorios por correo con jobs programados (`node-cron`) y envío vía Resend.',
      'Calendario vacunal por país (AR/UY) basado en normativa SENASA y guías WSAVA.',
      'Autenticación con JWT, recuperación de contraseña y borrado total de cuenta al estilo GDPR.',
      'Panel de administración con gestión de usuarios y roles.',
      'Interfaz bilingüe español/inglés con selector de idioma.',
      'Modelo freemium: un perro en el plan gratuito, ilimitado en premium.',
    ],
    stack: ['Node.js 20', 'Express 4', 'MongoDB + Mongoose 8', 'React 18', 'Vite 5', 'Redux Toolkit', 'JWT', 'Resend', 'Docker Compose'],
    capabilities: ['Descubrir', 'Diseñar', 'Construir'],
    evidence: [
      'MVP funcional con dashboard, onboarding de perros y panel de administración implementados.',
      'Entorno completo levantable con Docker Compose (API + SPA + MongoDB 7).',
      'Borrado total de cuenta implementado como requisito de privacidad, no como funcionalidad opcional.',
    ],
    challenges: [
      'El calendario vacunal cambia según el país y la fuente. Convertir normativa y guías clínicas en reglas de software —sin quedar en un checklist genérico ni pretender reemplazar al veterinario— fue la parte más delicada.',
      'Un recordatorio que llega tarde o de más rompe la confianza de inmediato. Los jobs programados tuvieron que ser conservadores y explícitos.',
      'El límite del plan gratuito tenía que ser generoso para que el producto se pueda probar de verdad, y a la vez sostenible.',
    ],
    learnings: [
      'El onboarding es el producto: si después de registrar el perro la pantalla queda vacía, no vuelve nadie. Precargar el calendario vacunal cambió por completo la primera sesión.',
      'Diseñar con la privacidad de entrada —incluido el borrado total— es mucho más barato que agregarla cuando ya hay usuarios.',
      'Un producto que nace de una necesidad propia tiene una ventaja concreta: puedo probar cada decisión en el uso real de todos los días.',
    ],
    nextSteps: [
      'Cobros y suscripciones del plan premium resueltos con el motor de [MiCuota](/proyectos/micuota/).',
      'Ampliar el modelo a otras especies y a clínicas veterinarias.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/milo-care',
    demoUrl: 'https://milocare.org/',
    demoLabel: 'Ir a Milo Care',
  },

  {
    slug: 'compliance-uy',
    featured: true,
    order: 4,
    title: 'compliance-uy',
    tagline: 'La ley de protección de datos, convertida en una auditoría de tu repositorio.',
    category: 'ia',
    categoryLabel: 'Compliance e IA',
    status: 'tool',
    year: '2026',
    motif: 'audit',
    audience: 'Equipos de desarrollo y startups uruguayas que necesitan ordenar su cumplimiento de protección de datos personales.',
    role: 'Diseño, investigación normativa e implementación. Open source.',
    originStory:
      'En cada proyecto donde toqué datos personales me encontré con la misma escena: la normativa existe, es pública, y aun así nadie del equipo técnico sabe qué implica para el código que está escribiendo. La distancia entre la ley y la implementación es donde el cumplimiento se pierde.',
    problem:
      'Cumplir con la Ley 18.331 exige saber qué datos personales trata tu sistema, con qué proveedores los compartís y hacia dónde salen del país. Esa información está en el código, dispersa en integraciones y modelos de datos, pero el diagnóstico se hace en reuniones y termina en un documento que no se parece al sistema real.',
    solution:
      'Una skill open source para Claude Code que lee el repositorio y genera un paquete inicial de cumplimiento para Uruguay. Detecta datos personales y proveedores en el código, mapea transferencias internacionales, evalúa catorce controles y produce documentos y un estado auditable donde cada hallazgo apunta a un archivo y una línea concretos.',
    highlights: [
      'Fundada en fuentes oficiales: Ley 18.331, Decreto 414/009, arts. 37-40 de la Ley 19.670, Decreto 64/020 y guías de la URCDP.',
      'Toda afirmación normativa cita norma, artículo y archivo fuente en `/sources`.',
      'Lo que no se puede verificar se marca explícitamente como `[verificar contra fuente oficial]` en vez de completarse a ojo.',
      'Detecta datos personales: email, teléfono, cédula, RUT, dirección, IP, ubicación, mensajes, archivos, pagos, salud, menores y biométricos.',
      'Detecta más de veinte proveedores (AWS, GCP, Azure, Supabase, Stripe, Mercado Pago, OpenAI, Anthropic, Twilio, Datadog y otros) y mapea transferencias internacionales.',
      'Evalúa catorce controles y genera `state.json` con estado, evidencia `archivo:línea`, nivel de riesgo y remediación sugerida.',
    ],
    stack: ['Claude Code Skill', 'Markdown', 'Grep / Glob', 'JSON'],
    capabilities: ['Descubrir', 'Diseñar', 'Acelerar con IA'],
    evidence: [
      'Reescrita desde cero para Uruguay: no contiene texto legal de otras jurisdicciones.',
      'Advertencia explícita en el README: genera borradores y diagnósticos técnicos, no asesoramiento legal.',
      'Publicada como open source, instalable en cualquier repositorio.',
    ],
    challenges: [
      'Una herramienta que habla de derecho puede hacer daño si suena más segura de lo que está. El diseño se fue casi entero en decidir qué afirma, qué marca como pendiente de verificación y cómo lo cita.',
      'Detectar datos personales en código real es ruidoso: un campo `email` puede ser de un usuario o de un log interno. El criterio quedó en señalar y pedir confirmación, nunca en concluir solo.',
    ],
    learnings: [
      'Un agente es más útil cuando su salida es verificable. La regla de citar norma, artículo y `archivo:línea` es lo que hace revisable el resultado.',
      'Traducir normativa a controles concretos es diseño de producto: lo difícil no es leer la ley, es decidir qué pregunta hacerle al código.',
    ],
    nextSteps: [
      'Ampliar la cobertura a otras jurisdicciones de la región manteniendo la separación estricta por país.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/compliance-uy',
    demoUrl: '',
  },

  {
    slug: 'webspec-ai',
    featured: true,
    order: 5,
    title: 'WebSpec AI',
    tagline: 'De una idea vaga a una especificación que un equipo puede ejecutar.',
    category: 'ia',
    categoryLabel: 'Inteligencia artificial',
    status: 'published',
    year: '2026',
    motif: 'spec',
    image: {
      src: '/assets/img/shots/webspec-ai.jpg',
      alt: 'Pantalla de creación de proyecto en WebSpec AI: un formulario con nombre e idea del proyecto y plantillas de flujo (Full Spec, Landing Page, MVP SaaS, Desktop App, API Backend).',
    },
    audience: 'Fundadores, product managers y equipos que necesitan bajar una idea a documentos antes de contratar o construir.',
    role: 'Producto, diseño de flujo, desarrollo e integración con modelos. Proyecto propio.',
    originStory:
      'Trabajando con IA en mis propios productos confirmé algo que ya sabía por los proyectos con clientes: el cuello de botella nunca fue escribir código. Es la ambigüedad. Un agente que recibe una instrucción vaga produce mucho código equivocado, más rápido que antes.',
    problem:
      'Entre "tengo una idea de app" y "esto se puede construir" hay un trabajo que casi nadie hace: brief, PRD, RFC, definición de UX y backlog. Sin eso, el proyecto arranca igual, pero las decisiones se toman de a una, tarde y sin contexto.',
    solution:
      'Una aplicación conversacional que guía al usuario por ese flujo de documentos, en orden, generando cada artefacto sobre la base del anterior hasta llegar a una especificación exportable. En lugar de saltar directo al código, produce el paquete de producto que hace que el código sea la parte fácil.',
    highlights: [
      'Flujo guiado: brief, PRD, RFC, UX/UI, backlog, specs y exportación final.',
      'Cada documento se construye sobre los anteriores en vez de generarse aislado.',
      'Interfaz conversacional: el usuario responde preguntas, no completa formularios.',
      'Sitio informativo público con la presentación del producto.',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Netlify'],
    capabilities: ['Descubrir', 'Diseñar', 'Acelerar con IA'],
    evidence: [
      'Sitio informativo del producto publicado y accesible.',
      'Aplicación desplegable en Netlify con configuración incluida.',
      'Sin secretos en el repositorio: la clave de API se define por variable de entorno.',
    ],
    challenges: [
      'Un flujo demasiado rígido se siente como un formulario y uno demasiado libre no llega a ninguna especificación. Encontrar ese punto medio fue casi todo el trabajo de producto.',
      'Los documentos tienen que ser coherentes entre sí: si el PRD cambia, el backlog que salió antes queda mintiendo.',
    ],
    learnings: [
      'Es el mismo método que aplico en mis productos —especificar antes de construir— convertido en herramienta.',
      'La calidad de la salida depende mucho más del diseño del flujo de preguntas que del modelo que esté detrás.',
    ],
    nextSteps: [
      'Exportación directa a formatos que consuman agentes de código.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/webgpt',
    demoUrl: 'https://webspecai.netlify.app/',
    demoLabel: 'Probar WebSpec AI',
  },

  {
    slug: 'casa-medanos',
    featured: true,
    order: 6,
    title: 'Casa Médanos',
    tagline: 'Vender la casa entera antes de mudarme.',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    status: 'published',
    year: '2026',
    motif: 'catalog',
    image: {
      src: '/assets/img/shots/casa-medanos.jpg',
      alt: 'Catálogo de Casa Médanos: "Me mudo y vendo de todo", con filtros por categoría y ambiente, buscador, artículos marcados como vendidos y un asistente de venta por WhatsApp.',
    },
    audience: 'Compradores de muebles y electrodomésticos usados, llegando por redes y WhatsApp.',
    role: 'Todo: catálogo, diseño, desarrollo, automatización y publicación. Proyecto propio.',
    originStory:
      'Me mudaba y tenía que vender los muebles y electrodomésticos de una casa entera. La alternativa era publicar cincuenta veces en marketplaces, repetir el mismo precio en cada conversación y perder el rastro de qué seguía disponible.',
    problem:
      'Vender muchos objetos a la vez rompe cualquier herramienta pensada para vender uno. Sin un catálogo compartible, cada interesado obliga a repetir fotos, precios y disponibilidad, y el vendedor termina siendo un índice humano de su propia casa.',
    solution:
      'Un catálogo estático, rápido y compartible por un solo link, organizado por ambientes y categorías, con precios visibles y un panel de administración para actualizar disponibilidad. Sumé un flujo de atención automatizado con n8n para responder las consultas repetidas sin estar mirando el teléfono.',
    highlights: [
      'Catálogo navegable por ambiente y categoría, con buscador y precios explícitos.',
      'Un único link compartible, que reemplaza la publicación repetida en marketplaces.',
      'Estado por ítem: lo vendido queda marcado como vendido en vez de desaparecer.',
      'Panel de administración para gestionar los ítems y su disponibilidad.',
      'Flujo de chat de ventas automatizado con n8n, versionado junto al código.',
      'Sitio estático: carga inmediata, sin backend que mantener ni costo de operación.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'n8n', 'GitHub Pages'],
    capabilities: ['Descubrir', 'Construir', 'Acelerar con IA'],
    evidence: [
      'Publicado y online en GitHub Pages.',
      'Workflows de n8n exportados y versionados en el repositorio.',
      'Metadatos y descripción orientados a compartir el link en redes.',
    ],
    challenges: [
      'La tentación era montar un e-commerce completo. El problema tenía fecha de vencimiento —la mudanza— así que la decisión correcta fue un sitio estático sin backend.',
      'Mantener la disponibilidad al día mientras las cosas se venden de verdad, sin que el mantenimiento cueste más que la venta.',
    ],
    learnings: [
      'El producto correcto es el que se ajusta a la duración del problema. Este tenía que durar unas semanas y estar listo en días.',
      'Automatizar la conversación repetida fue más valioso que cualquier funcionalidad del catálogo.',
    ],
    nextSteps: [
      'El catálogo quedó como plantilla reutilizable para cualquier venta puntual con muchos ítems.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/vendo.uy',
    demoUrl: 'https://juliancardozo.github.io/vendo.uy/',
    demoLabel: 'Ver el sitio publicado',
  },

  {
    slug: 'escalaimprov',
    featured: true,
    order: 7,
    title: 'EscalaImprov',
    tagline: 'Lo que necesitaba entender para animarme a tocar en una jam.',
    category: 'musica',
    categoryLabel: 'Música y creatividad',
    status: 'published',
    year: '2026',
    motif: 'wave',
    image: {
      src: '/assets/img/shots/escalaimprov.jpg',
      alt: 'La app de EscalaImprov en vista Estudio: selector de tónica y escala, pestañas de teclado, guitarra, quintas, entrenador y armonía, con una guía de tres pasos para improvisar y un click con BPM.',
    },
    audience: 'Músicos que estudian improvisación y necesitan ver la teoría, no solo leerla.',
    role: 'Producto, diseño de la experiencia de estudio y desarrollo. Proyecto propio.',
    originStory:
      'Quería tocar en una jam y me faltaba lo mismo que a mucha gente: reconocer intervalos rápido y saber qué escala entra sobre qué acorde, sin pensarlo. Los libros lo explican bien, pero no te corrigen cuando te equivocás, y ninguno te dice qué hacer cuando te quedás en blanco arriba del escenario.',
    problem:
      'La teoría musical se estudia leyendo y se aprende practicando. Entre las dos cosas falta la herramienta que da feedback inmediato —la que te dice, en el momento, si esa sexta menor era la que pensabas— y que además traduzca la teoría en una instrucción accionable mientras estás tocando.',
    solution:
      'Empezó como una app de escritorio en Electron y hoy es una aplicación web con dos modos: Estudio, para entender la escala, los grados, los acordes y el círculo de quintas; y Jam, para tocar con una guía corta al lado. Cada tonalidad viene con notas de reposo, ideas de fraseo y un click con BPM, para que el salto de la teoría al instrumento no dependa de la memoria.',
    highlights: [
      'Dos modos: Estudio (entender) y Jam (tocar), sobre el mismo motor de escalas.',
      'Vistas de teclado, guitarra, círculo de quintas, entrenador, constructor, menores, armonía y escucha.',
      'Guía de tres pasos por tonalidad: dónde aterrizar, cómo abrir el fraseo y cómo cerrarlo.',
      'Entrenador de intervalos con tres tipos de ejercicio —identificar, construir y encontrar la raíz—, modo examen con cuenta regresiva y score de sesión.',
      '14 escalas y modos —mayor, menores natural, armónica y melódica, modos griegos, pentatónicas, blues, tonos enteros, disminuida y cromática— en 12 tónicas.',
      'Mapa rápido que separa las notas de la escala de las que quedan afuera.',
      'Click con BPM ajustable y presets de sesión que se guardan y se cargan.',
      'Navegación completa por teclado: flechas para cambiar tónica y escala.',
    ],
    stack: ['JavaScript', 'HTML', 'SVG', 'Web Audio', 'Electron (versión de escritorio)'],
    capabilities: ['Diseñar', 'Construir'],
    evidence: [
      'App publicada y accesible en línea, además de la landing del producto.',
      'Círculo de quintas implementado en SVG responsive, sincronizado en ambos sentidos con el resto de la aplicación.',
      'La versión de escritorio en Electron, de la que salió el proyecto, sigue en el repositorio con su empaquetado para Windows, macOS y Linux.',
    ],
    challenges: [
      'Mostrar teoría musical sin abrumar: cada elemento visible tenía que responder una pregunta que el músico realmente se hace mientras toca.',
      'El feedback tiene que ser instantáneo. Cualquier demora entre responder y saber si estaba bien rompe el ejercicio.',
      'Pasar de escritorio a web obligó a rehacer la interfaz alrededor de dos intenciones distintas —estudiar y tocar— en vez de replicar la misma pantalla.',
    ],
    learnings: [
      'Construir la herramienta que necesitaba enseñó más teoría que estudiarla: para modelar el círculo de quintas hay que entenderlo de verdad.',
      'La navegación por teclado no fue una mejora de accesibilidad agregada al final: practicar con el mouse es directamente incómodo.',
      'Separar Estudio de Jam fue la decisión de producto que más cambió el uso: son dos momentos distintos y necesitaban dos interfaces distintas.',
    ],
    nextSteps: [
      'Ejercicios sobre progresiones completas, no solo intervalos aislados.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/escalas-app',
    demoUrl: 'https://jam-uy.netlify.app/app',
    demoLabel: 'Abrir la app',
  },

  {
    slug: 'neuro-candombe',
    featured: true,
    order: 8,
    title: 'Neuro-Candombe',
    tagline: 'Un Transformer que toca chico, repique y piano.',
    category: 'ia',
    categoryLabel: 'IA y música',
    status: 'prototype',
    year: '2026',
    motif: 'pulse',
    audience: 'Músicos, docentes e investigadores que quieren escuchar, estudiar o reutilizar patrones de candombe.',
    role: 'Modelo, representación de datos, API, frontend y evaluación. Proyecto propio.',
    originStory:
      'El candombe de Montevideo tiene reglas muy precisas —el chico casi no cambia, el piano marca el barrio, el repique improvisa— y a la vez un groove que no entra en una grilla. Quería saber si un modelo podía aprender esas dos cosas juntas: la regla y el desfase.',
    problem:
      'Los generadores de ritmo cuantizan todo a la grilla. En candombe eso borra lo esencial: el microtiming del chico, la articulación de cada golpe y la forma de la llamada. Un modelo genérico, además, no sabe que hay cosas que no se negocian, como el patrón del chico.',
    solution:
      'Un Transformer bidireccional enmascarado sobre una grilla de semicorcheas para los tres tambores. Cada celda guarda intensidad, desfase de microtiming y articulación. Las reglas del toque no se aplican después: entran como celdas fijas y máscaras de clases permitidas durante la decodificación. Una API FastAPI genera, completa un tambor sobre otros fijos o rehace compases, y un frontend web reproduce la llamada y exporta WAV y MIDI.',
    highlights: [
      'Representación por celda: intensidad (silencio + 4 niveles), microtiming en 13 bins y articulación por tambor (mano, palo, madera, abierto, masa).',
      'Decodificación iterativa por confianza, con las reglas del toque como restricciones duras y no como filtro posterior.',
      'Tres toques madre —Cuareim, Ansina y Gaboto— cargados desde transcripciones publicadas, con la fuente al lado de cada patrón.',
      'Microtiming tomado de mediciones publicadas (Jure y Rocamora, 2022) y forma de llamada con "subir la llamada".',
      '`POST /regenerate`: rehace compases o tambores puntuales y deja fijo el resto; la semilla hace reproducible cada resultado.',
      'Evaluación objetiva con `copy_rate` para detectar si el modelo memoriza compases del corpus, más un flujo de pruebas de escucha a ciegas.',
      'Frontend "desfile de llamadas": tamaño de cuerda, paneo por tamborilero, programación con lookahead y exportación WAV/MIDI.',
    ],
    stack: ['Python', 'PyTorch', 'FastAPI', 'NumPy', 'Web Audio', 'Netlify', 'Render'],
    capabilities: ['Diseñar', 'Construir', 'Acelerar con IA'],
    evidence: [
      '31 tests con pytest sobre representación, generación, entrenamiento, análisis de audio, toques y API.',
      'Importador del dataset de candombe de la UdelaR (Zenodo 6533068: 35 interpretaciones, ~2 h anotadas por un experto).',
      'Análisis de grabaciones propias por stems o por mezcla, con refinamiento de onsets a nivel de muestra.',
      'Deploy separado: frontend estático en Netlify y API en Render, con fallback a un motor por reglas si no hay checkpoint.',
    ],
    challenges: [
      'La primera versión no aprendía: el objetivo estaba visible en la entrada. Pasar a un Transformer enmascarado, que solo puntúa celdas ocultas, fue el cambio que lo destrabó.',
      'El microtiming del candombe no es ruido. Hubo que representarlo como una clase propia por celda en vez de cuantizarlo y "humanizar" al final.',
      'Separar tambores de una grabación mezclada es una heurística por bandas: los golpes fantasma suaves se pierden. Con stems por tambor el problema desaparece.',
    ],
    learnings: [
      'Las reglas de dominio funcionan mejor como restricciones de decodificación que como corrección posterior: el modelo genera dentro del espacio válido.',
      'Medir la tasa de copia evita engañarse: un modelo que suena bien puede estar repitiendo el corpus.',
      'Citar la fuente de cada patrón hace que el sistema se pueda discutir con músicos, no solo con ingenieros.',
    ],
    nextSteps: [
      'Entrenar con el dataset real y grabaciones multipista propias: el checkpoint incluido solo vio el corpus sintético.',
      'Reemplazar los golpes sintetizados por un banco de muestras grabadas.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/Neuro-Candombe-engine',
    demoUrl: '',
  },

  {
    slug: 'sombrilleros',
    featured: true,
    order: 9,
    title: 'Sombrilleros: Escape de Porto',
    tagline: 'Cruzar la playa sin que te vendan una sombrilla.',
    category: 'juegos',
    categoryLabel: 'Juegos',
    status: 'published',
    year: '2026',
    motif: 'grid',
    image: {
      src: '/assets/img/shots/sombrilleros.jpg',
      alt: 'Pantalla de inicio de Sombrilleros: Escape de Porto, con la playa en 3D llena de sombrillas y vendedores, los modos individual, en pareja e historia, y los tres niveles hasta el mar.',
    },
    audience: 'Cualquiera que haya caminado por una playa de Porto de Galinhas. Se juega en el navegador, solo o en pareja.',
    role: 'Diseño del juego, lógica, 3D, audio y despliegue. Proyecto propio.',
    originStory:
      'En Porto de Galinhas, llegar del hotel al agua es una negociación: cada pocos metros aparece alguien ofreciendo una sombrilla, un paseo o "mas tem WiFi!". La situación ya tenía mecánica de juego —distancia, línea de visión, cansancio— solo faltaba programarla.',
    problem:
      'Convertir una anécdota de viaje en un juego que se entienda en diez segundos y siga siendo justo: vendedores que te ven, te recuerdan y te persiguen, sin que la dificultad dependa del azar.',
    solution:
      'Un juego 3D en el navegador con Three.js y TypeScript. Tres niveles hasta el mar, las piscinas naturales y el embarque. Los vendedores tienen línea de visión, sospecha y memoria; el jugador tiene sprint y energía, y puede esconderse detrás de coberturas. Hay modo individual, cooperativo local en pareja y una historia de tres capítulos con los reales del paseo.',
    highlights: [
      'IA de vendedores con línea de visión, coberturas que bloquean la vista, sospecha y memoria configurables por dificultad.',
      'Dos perfiles de dificultad versionados ("sin emoción" y "con emoción") con récords separados y medición de tasa de victoria observada.',
      'Cooperativo local: cámara compartida, billetera común y una distancia máxima entre los dos jugadores.',
      'Modo historia de tres capítulos que arrastra el dinero ganado y recuerda los nombres de la pareja.',
      'Voces por proximidad con Web Audio: volumen por distancia, paneo estéreo según la cámara y como máximo dos voces a la vez.',
      'Defensa verbal por doble toque ("Ya tenemos sombrilla, gracias") con cooldown y efecto distinto por dificultad.',
      'Ranking arcade global opcional; el juego funciona igual si el servicio no responde.',
    ],
    stack: ['TypeScript', 'Three.js', 'Vite', 'Web Audio', 'GitHub Actions', 'GitHub Pages'],
    capabilities: ['Diseñar', 'Construir'],
    evidence: [
      'Juego publicado en GitHub Pages con deploy automático por GitHub Actions.',
      '14 tests con el runner nativo de Node sobre la lógica pura: visión, conversación, energía, dificultad, pareja e historia.',
      'La lógica del juego vive en módulos sin DOM (`core`, `difficulty`, `couple`, `story`, `verbal`), separada del render en Three.js.',
    ],
    challenges: [
      'Que perder se sienta justo: la dificultad sale de parámetros explícitos (velocidad, radio de visión, memoria) y no de eventos aleatorios.',
      'En cooperativo, dos jugadores comparten una cámara. Hubo que limitar la distancia entre ambos y resolver qué vendedor atiende a quién.',
      'El audio no puede romper el juego: si falta Web Audio o un clip no decodifica, quedan los globos de texto y la partida sigue.',
    ],
    learnings: [
      'Separar la lógica en funciones puras permitió testear la jugabilidad sin abrir un navegador.',
      'Versionar los perfiles de dificultad hace comparables los récords y la tasa de victoria entre cambios.',
      'Un juego chico es un buen banco de pruebas para IA de agentes, audio espacial y estado compartido.',
    ],
    nextSteps: [
      'Reemplazar las voces sintéticas provisorias por grabaciones reales.',
      'Ajustar mezcla y ritmo con pruebas en los navegadores de los jugadores.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/galinhas-game',
    demoUrl: 'https://juliancardozo.github.io/galinhas-game/',
    demoLabel: 'Jugar',
  },

  {
    slug: 'chordlocal',
    featured: true,
    order: 10,
    title: 'ChordLocal',
    tagline: 'Lo que cobra Chordify, en tu computadora y sin suscripción.',
    category: 'musica',
    categoryLabel: 'Música e IA',
    status: 'tool',
    year: '2026',
    motif: 'wave',
    audience: 'Músicos que quieren sacar una canción de oído con acordes, letra y análisis, sin pagar una suscripción.',
    role: 'Análisis del producto de referencia, arquitectura, pipeline de audio y app local. Proyecto propio.',
    originStory:
      'Quería aprender a tocar cualquier canción y la herramienta que lo resolvía, Chordify, cobra por transponer, poner cejilla o exportar MIDI. Antes de pagar, hice el ejercicio inverso: listar qué hace, qué cobra y cuánto cuesta de verdad construir cada cosa.',
    problem:
      'Las apps de acordes cobran por funciones que, técnicamente, son transformaciones simples sobre un análisis ya hecho. Lo difícil es una sola cosa: detectar bien los acordes y el compás a partir del audio, en una máquina común y sin GPU.',
    solution:
      'Un pipeline en Python que corre una vez por canción: beats y compás con `beat_this`, acordes con croma sincronizado al beat, plantillas armónicas y Viterbi, y notas con `basic-pitch`. Todo queda en un `analysis.json`; transponer, cejilla, simplificar o exportar se derivan de ese archivo al instante. Después busca la transcripción en LaCuerda y la letra en LRCLIB, y se queda con la que más concuerda con el audio.',
    highlights: [
      'Separación entre análisis (lento, una vez) y uso (instantáneo): `analysis.json` es la única fuente de verdad.',
      'Reconocedor de acordes propio: croma por beat, plantillas ponderadas y decodificación Viterbi en dos pasadas con prior de tonalidad.',
      'Elección de fuente por concordancia con el audio, no por parecido del título; detecta transcripciones escritas en otro tono.',
      'Hoja sincronizada: reproductor, acorde actual y siguiente, letra que sigue al audio, velocidad 0,5×–1,5× sin cambiar el tono.',
      'Análisis armónico: tonalidad, ciclo en grados, cadencias, acordes fuera de escala y cejilla sugerida.',
      'Salidas en HTML, ChordPro, MusicXML, MIDI y tablatura ASCII.',
      'Respeta `robots.txt` (Crawl-delay de LaCuerda) y no se disfraza de navegador para sortear un 403.',
    ],
    stack: ['Python 3.11', 'PyTorch 2.2', 'beat_this', 'librosa', 'basic-pitch', 'yt-dlp', 'MusicXML'],
    capabilities: ['Descubrir', 'Diseñar', 'Construir', 'Acelerar con IA'],
    evidence: [
      'Documento de análisis del producto de referencia con matriz de features, plan gratuito/pago y dificultad de cada uno (`docs/analisis-chordify.md`).',
      '99,8 % de acorde exacto ponderado por tiempo en la validación con audio sintético G–Em–C–D.',
      'Contra cuatro transcripciones humanas, la precisión de transiciones pasó de 0,44 a 0,74 entre la versión 0.1 y la 0.2.',
      'Una canción de 4 minutos se analiza en ~80 s en un MacBook Pro Intel de 2016, sin GPU.',
      'Análisis con REA de las páginas públicas de Chordify: la transposición y el tempo se resuelven en el cliente, sobre datos que ya vienen en la página.',
    ],
    challenges: [
      'El hardware definió la arquitectura: un Mac Intel sin GPU obliga a fijar `torch==2.2.2` y Python 3.11, y a hacer el análisis offline, no en tiempo real.',
      'Una tríada con la quinta débil pierde contra la tríada una tercera arriba (E → G#m). Subir el peso de la quinta en las plantillas fue el cambio de mayor impacto.',
      'Las transcripciones online vienen en otro tono, con otro nombre o en una versión distinta. Elegir por concordancia con el audio resolvió la mayoría de los casos.',
    ],
    learnings: [
      'Seis de las siete funciones pagas del producto de referencia son transformaciones sobre un JSON. El valor está en el análisis, no en las funciones premium.',
      'Un reconocedor clásico bien calibrado puede rendir más que un modelo grande que no se puede instalar en la máquina disponible.',
      'Medir contra transcripciones humanas cambió las prioridades: lo que más importaba era cuándo cambia el acorde, no el nombre exacto.',
    ],
    nextSteps: [
      'Loop A-B, afinador y separación de pistas con Demucs para tocar encima.',
    ],
    repositoryUrl: 'https://github.com/juliancardozo/chordyfree',
    demoUrl: '',
  },

  // ───────────────────────────────────────────────────────────── Laboratorio
  {
    slug: 'chefgpt',
    featured: false,
    title: 'ChefGPT',
    tagline: 'Recetas a partir de lo que ya tenés en la heladera, con un modelo local.',
    summary:
      'Aplicación web que genera recetas según los ingredientes disponibles, ejecutando el modelo en local con Ollama en vez de depender de una API externa. Incluye un sistema de diseño propio documentado, con paleta, tipografías y criterios de accesibilidad AA.',
    category: 'ia',
    categoryLabel: 'IA aplicada',
    status: 'prototype',
    year: '2025',
    stack: ['Spring Boot', 'Java 17', 'Angular 17', 'PostgreSQL', 'Ollama', 'Docker'],
    repositoryUrl: 'https://github.com/juliancardozo/chefgpt',
  },
  {
    slug: 'datos-sensores',
    featured: false,
    title: 'Datos Sensores',
    tagline: 'Dos servicios Spring Boot para monitoreo industrial.',
    summary:
      'API de lecturas de sensores y servicio de monitoreo de recolección de residuos industriales, con almacenamiento intercambiable entre SQL y MongoDB, especificación OpenAPI y colección Postman. Incluye documentación de propuesta de servicio y guía de simulación de casos de uso.',
    category: 'herramientas',
    categoryLabel: 'Backend',
    status: 'prototype',
    year: '2025',
    stack: ['Java', 'Spring Boot', 'MongoDB', 'OpenAPI', 'Maven'],
    repositoryUrl: 'https://github.com/juliancardozo/datos-sensores',
  },
  {
    slug: 'automotora-fase-1',
    featured: false,
    title: 'Gestión de stock para una automotora',
    tagline: 'El encargo de un cliente que terminó siendo el origen de Patio.',
    summary:
      'Primera fase para una automotora uruguaya: alta de vehículos por compra, registro de ventas y métricas de negocio en tiempo real, con formato bimonetario USD/UYU y cálculo de días en stock. La experiencia de este proyecto derivó en el producto multi-tenant que hoy es Patio. Repositorio privado por acuerdo con el cliente.',
    category: 'clientes',
    categoryLabel: 'Clientes',
    status: 'client',
    year: '2026',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
    repositoryUrl: '',
    relatedSlug: 'patio',
  },
  {
    slug: 'landing-estudio-creativo',
    featured: false,
    title: 'Landing para un estudio creativo',
    tagline: 'Narrativa scroll-driven con WebGL, sin framework.',
    summary:
      'Experiencia de una sola página con narrativa por secciones, fondo animado en WebGL y transiciones con GSAP y ScrollTrigger, construida en JavaScript vanilla. Un ejercicio de que el impacto visual no requiere una SPA detrás. Repositorio privado por acuerdo con el cliente.',
    category: 'clientes',
    categoryLabel: 'Clientes',
    status: 'client',
    year: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'GSAP'],
    repositoryUrl: '',
  },
  {
    slug: 'cursor-idp-mvp',
    featured: false,
    title: 'IDP experiment',
    tagline: 'Exploración de una Internal Developer Platform mínima.',
    summary:
      'Prueba de concepto sobre cómo sería una plataforma interna de desarrollo asistida por IA: qué automatiza, qué expone al desarrollador y dónde conviene poner los límites. Exploración temprana, sin implementación completa.',
    category: 'herramientas',
    categoryLabel: 'Plataforma',
    status: 'exploration',
    year: '2025',
    stack: ['Platform engineering'],
    repositoryUrl: 'https://github.com/juliancardozo/cursor-idp-mvp',
  },
  {
    slug: 'lacuerda-txt',
    featured: false,
    title: 'lacuerda a txt',
    tagline: 'Descargar el cancionero de una banda a archivos de texto.',
    summary:
      'Utilidad en Python que baja las canciones de una banda desde lacuerda y las guarda en una carpeta como texto plano, para poder leerlas y anotarlas sin depender de la conexión. Resuelto en una tarde, usado muchas veces.',
    category: 'musica',
    categoryLabel: 'Música',
    status: 'tool',
    year: '2024',
    stack: ['Python'],
    repositoryUrl: 'https://github.com/juliancardozo/lacuerda-canciones-a-txt',
  },
  {
    slug: 'wildfly-mdb',
    featured: false,
    title: 'WildFly MDB + SQL Server',
    tagline: 'Prueba de concepto de mensajería empresarial.',
    summary:
      'POC de Message Driven Beans en WildFly consumiendo colas contra SQL Server. El tipo de integración que sostiene los sistemas empresariales que casi nadie ve, y que hay que saber depurar cuando falla.',
    category: 'herramientas',
    categoryLabel: 'Empresarial',
    status: 'prototype',
    year: '2025',
    stack: ['Java', 'WildFly', 'JMS', 'SQL Server'],
    repositoryUrl: 'https://github.com/juliancardozo/WildFly-MDB-SQL-Server',
  },
  {
    slug: 'patrones-java',
    featured: false,
    title: 'Patrones de diseño en Java',
    tagline: 'Repaso sistemático de patrones, escrito para entenderlos.',
    summary:
      'Implementación de patrones de diseño en Java junto con pruebas de anotaciones de Spring y configuración por variables de entorno. Material de estudio propio que después se volvió referencia rápida en proyectos reales.',
    category: 'academico',
    categoryLabel: 'Fundamentos',
    status: 'academic',
    year: '2022',
    stack: ['Java', 'Spring'],
    repositoryUrl: 'https://github.com/juliancardozo/patrones',
  },
  {
    slug: 'ucubooks',
    featured: false,
    title: 'UcuBooks',
    tagline: 'Sistema de gestión de biblioteca en Java.',
    summary:
      'Proyecto académico de sistema de gestión de biblioteca: modelado de dominio, persistencia y capas separadas. Uno de los primeros lugares donde ordenar el dominio antes de codear dejó de ser un consejo y pasó a ser evidente.',
    category: 'academico',
    categoryLabel: 'Trabajo académico',
    status: 'academic',
    year: '2018',
    stack: ['Java'],
    repositoryUrl: 'https://github.com/juliancardozo/UcubooksV2',
  },
  {
    slug: 'algoritmos-estructuras',
    featured: false,
    title: 'Algoritmos y estructuras de datos',
    tagline: 'La base que sigue apareciendo quince años después.',
    summary:
      'Trabajos de algoritmos y estructuras de datos en Java, incluido el proyecto de preparación de examen de AED II. Complejidad, estructuras y análisis: exactamente lo que se necesita el día que una consulta tarda ocho segundos y hay que explicar por qué.',
    category: 'academico',
    categoryLabel: 'Trabajo académico',
    status: 'academic',
    year: '2018',
    stack: ['Java'],
    repositoryUrl: 'https://github.com/juliancardozo/ExamenAED2',
  },
  {
    slug: 'data-science-python',
    featured: false,
    title: 'Estadística y ciencia de datos',
    tagline: 'Probabilidad, estadística aplicada y proyecto final en Python.',
    summary:
      'Trabajos de probabilidad y estadística aplicada, más el proyecto final desarrollado en equipo. La base cuantitativa que después permite discutir métricas de producto sin adivinar.',
    category: 'academico',
    categoryLabel: 'Trabajo académico',
    status: 'academic',
    year: '2023',
    stack: ['Python', 'Jupyter'],
    repositoryUrl: 'https://github.com/juliancardozo/proyecto-final',
  },
  {
    slug: 'recursos-educativos',
    featured: false,
    title: 'Recursos educativos interactivos',
    tagline: 'Material didáctico web sobre cambio climático y aprendizaje interactivo.',
    summary:
      'Recursos educativos publicados como sitios web: material interactivo sobre cambio climático y un recurso didáctico basado en mandalas. Trabajo de contenido y experiencia más que de complejidad técnica.',
    category: 'ecommerce',
    categoryLabel: 'Web',
    status: 'published',
    year: '2022',
    stack: ['HTML', 'CSS', 'JavaScript'],
    repositoryUrl: 'https://github.com/juliancardozo/mandala-renea-fiapp',
  },
  {
    slug: 'programacion-csharp',
    featured: false,
    title: 'Programación II en C#',
    tagline: 'Windows Forms, manejo de archivos y un clon de Clash of Clans.',
    summary:
      'Laboratorios de programación orientada a objetos en C#: interfaces gráficas con Windows Forms, manejo de archivos y un proyecto de simulación de juego. El punto de partida, en 2017.',
    category: 'academico',
    categoryLabel: 'Trabajo académico',
    status: 'archived',
    year: '2017',
    stack: ['C#', '.NET', 'Windows Forms'],
    repositoryUrl: 'https://github.com/juliancardozo/PROGRAMACIONII-ClashOfClans',
  },
];

/** Filtros del Laboratorio. `key` se cruza contra `project.category`. */
export const labFilters = {
  es: [
    { key: 'all', label: 'Todo' },
    { key: 'ia', label: 'IA' },
    { key: 'herramientas', label: 'Backend y herramientas' },
    { key: 'clientes', label: 'Clientes' },
    { key: 'musica', label: 'Música' },
    { key: 'ecommerce', label: 'Web' },
    { key: 'academico', label: 'Académicos' },
  ],
};
