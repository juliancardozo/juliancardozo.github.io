# Newsletter de autoridad — base editorial y operativa

## Concepto editorial

- **Nombre de trabajo:** Notas desde el frente: liderazgo en tech LATAM
- **Promesa:** una idea práctica, una experiencia real y una pregunta concreta en cada edición
- **Rol dentro del sitio:** puente entre artículos, proyectos y conversaciones profesionales

## Qué ya quedó implementado en el sitio

- Página pública en `/newsletter/`
- Archivo indexable de ediciones
- Dos ediciones iniciales conectadas con artículos y proyectos
- Navegación desde home, blog y footer
- Formulario real de suscripción conectado a un Worker seguro
- CTA con consentimiento y enlace a privacidad

## Audiencias prioritarias

1. Engineering Managers y Tech Leads
2. CTOs y responsables de tecnología
3. Product Leaders y founders
4. Equipos de plataforma, cloud, fintech e IA aplicada

## Pilares editoriales

1. Liderazgo técnico y humano
2. Ingeniería y plataformas
3. IA aplicada
4. Productos y emprendimientos
5. Fintech, pagos y negocios
6. Tecnología y vida

## Cadencia recomendada

- 1 edición principal cada dos semanas
- 1 nota breve opcional entre ediciones
- 1 edición especial para lanzamientos o aprendizajes fuertes

Si la producción se tensiona, bajar a frecuencia mensual antes que degradar la calidad.

## Flywheel propuesto

Experiencia o proyecto -> artículo profundo -> newsletter personal -> post en LinkedIn -> respuestas -> feedback -> nueva idea -> colaboración o lead -> nuevo caso

## Secuencia de bienvenida

### Email 1 — Bienvenida
- Asunto: "Bienvenida a Notas desde el frente"
- Preheader: "Liderazgo, arquitectura, IA y producto desde la práctica, no desde la teoría."
- Texto: presentarse con tono cercano, explicar la promesa editorial y pedir al suscriptor que responda con el tema que más le importa hoy.

### Email 2 — Historia y propósito
- Asunto: "¿Por qué existe esta newsletter?"
- Preheader: "Porque hay decisiones difíciles que no se resuelven solo con código."
- Texto: sintetizar la trayectoria, el criterio y la razón de la newsletter sin caer en una bio corporativa.

### Email 3 — Mejor contenido
- Asunto: "Tres caminos para empezar"
- Preheader: "Elegí el hilo que más te sirve para empezar a leer."
- Texto: ofrecer tres rutas de entrada y pedir que responda con el interés principal.

### Email 4 — Proyectos como evidencia
- Asunto: "Aprender desde proyectos reales"
- Preheader: "No hay mejor criterio que un problema que se vive en la práctica."
- Texto: presentar proyectos reales como laboratorios y abrir una conversación con feedback o contexto.

### Email 5 — Conversación abierta
- Asunto: "¿Qué te gustaría discutir?"
- Preheader: "La newsletter funciona mejor cuando abre una conversación real."
- Texto: invitar al lector a responder con su tema de interés o un problema concreto para hablarlo.

El primer email ya quedó redactado en formato reutilizable dentro del modelo de datos de la newsletter para facilitar la activación del envío en Resend.

## Métricas principales

Priorizar:

- Respuestas calificadas
- Clics hacia artículos y proyectos
- Conversaciones iniciadas
- Leads y colaboraciones
- Retención por tema

Usar apertura solo como señal secundaria.

## Segmentación inicial

- Liderazgo
- Arquitectura
- Platform Engineering
- IA
- Producto
- Fintech
- Pagos
- WebspecAI
- MiCuota
- Milo Care
- Oportunidades y colaboraciones

## Gaps operativos pendientes

Todavía requieren una decisión operativa explícita o una publicación en infraestructura:

1. Publicar el Worker en Cloudflare
2. Cargar `RESEND_API_KEY` como secret
3. Definir remitente o dominio verificado para futuros envíos
4. SPF / DKIM / DMARC
5. Decidir si habrá doble opt-in
6. Baja automática visible en los envíos
7. Limpieza de inactivos y rebotes

## Recomendación de siguiente paso

Publicar el Worker, probar una alta real y recién después abrir la captación de forma más visible. El sitio ya quedó listo para captar suscripciones sin exponer la API key.
