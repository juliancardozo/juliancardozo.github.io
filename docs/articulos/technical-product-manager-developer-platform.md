# De ingeniería a producto: por qué las plataformas internas necesitan Technical Product Managers

_2026-11-13 · 7 min de lectura_

El equipo de ingeniería de The New York Times publica en NYT Open una serie dedicada a los recorridos de sus Product Managers. Una de sus entregas, de febrero de 2026, presenta a Danny Cassidy, que llegó al diario en 2015 como ingeniero backend y hoy es Senior Technical Product Manager en el área que provee infraestructura y herramientas a los equipos de ingeniería de producto. Es un texto breve, con formato de perfil, pero plantea una cuestión que cualquier organización que construye una plataforma interna termina enfrentando: quién debe gestionar como producto algo cuyos usuarios son ingenieros.

## Un recorrido que empieza en el código

Según el artículo, Cassidy aprendió a programar por su cuenta en la escuela secundaria, estudió tecnologías de la información y trabajó como ingeniero en APIs backend y sistemas de gestión de contenidos para empresas de medios. En The Times se incorporó al equipo de las APIs que llevan el contenido del CMS a las aplicaciones de escritorio y móviles.

El cambio de rol no surgió de un plan de carrera. A medida que participaba en proyectos más complejos y transversales, observó que los mejores líderes de ingeniería volvían una y otra vez a las mismas preguntas: por qué se construye algo, a quién sirve y cómo contribuye al negocio. Fue su responsable de entonces quien, al notar que su trabajo se inclinaba en esa dirección, le propuso considerar Product Management. Cassidy relata que hasta ese momento no sabía que existía el rol de Technical Product Manager.

Ese detalle merece atención desde la gestión de equipos. La transición no la inició un proceso formal, sino un líder que reconoció un cambio en el tipo de trabajo en el que una persona estaba destacándose y abrió la conversación. Muchas trayectorias valiosas dependen de que alguien haga esa pregunta a tiempo.

## Cuando los usuarios del producto son ingenieros

En su rol actual, Cassidy es responsable de proveer infraestructura y herramientas centralizadas para que los equipos de ingeniería de producto de The Times trabajen con mayor eficiencia. Describe una plataforma muy técnica, con usuarios que tienen distintos niveles de experiencia y necesidades, y explica que recurre a su formación técnica casi a diario para moverse entre dominios técnicos y perfiles de usuario.

La tesis central del artículo es que, en este tipo de producto, resulta difícil ejercer buen criterio de producto sin comprender cómo las decisiones técnicas afectan a los usuarios y a los resultados de negocio. En una plataforma interna, la distancia entre una decisión técnica y la experiencia del usuario es mínima: elegir un sistema de CI, una forma de gestionar secretos o un modelo de despliegue es, al mismo tiempo, decidir cómo trabajarán cientos de ingenieros.

_Qué cambia cuando el producto es una plataforma interna (lectura propia, no del artículo original)_

| Dimensión | Producto para clientes externos | Plataforma para ingenieros |
|---|---|---|
| Usuarios | Personas que eligen si usar el producto | Equipos internos que con frecuencia no tienen alternativa |
| Señal de valor | Adopción, retención, ingresos | Tiempo de espera, autoservicio, fricción percibida, incidentes evitados |
| Discovery | Entrevistas, analítica de uso | Lo anterior, más leer pipelines, tickets y post-mortems |
| Costo de una mala decisión | Una funcionalidad que no se usa | Fricción multiplicada en todos los equipos durante años |
| Conocimiento técnico requerido | Útil | Necesario para evaluar alternativas y sus consecuencias |

## El caso del reemplazo de CI/CD

El ejemplo concreto del artículo es el que mejor ilustra el argumento. Un proveedor discontinuó la herramienta de CI/CD que usaban varios equipos, y eso generó bloqueos para los desarrolladores. Cassidy, que conocía esos bloqueos de primera mano, condujo una evaluación centrada en los usuarios y basada en datos, que abarcó a The New York Times y a Wirecutter.

De acuerdo con el texto, esa evaluación permitió sintetizar los puntos de dolor de la plataforma, analizar alternativas con proyección a futuro y alinear a la organización en torno a una estrategia de CI/CD de largo plazo que equilibrara impacto de negocio, experiencia de desarrollo y factibilidad técnica. El artículo incluye una captura de la matriz de evaluación, en la que las necesidades de los equipos se priorizan y se comparan entre proveedores. No detalla los criterios completos ni cuál fue la herramienta elegida.

Lo instructivo del caso es su encuadre. La discontinuación de un proveedor suele tratarse como un problema de infraestructura: encontrar un reemplazo equivalente y migrar. Abordarlo como una decisión de producto cambia las preguntas: qué necesitan hoy los equipos que la herramienta anterior no resolvía, qué necesidades son comunes y cuáles particulares, y qué alternativa sostiene mejor la evolución de la organización.

### Cómo podría estructurarse una matriz de ese tipo

El artículo no publica la matriz completa. A modo de ejemplo, una evaluación de proveedores de CI/CD que combine las tres dimensiones que menciona podría organizarse así:

_Ejemplo ilustrativo de matriz de evaluación (propuesta propia, no la utilizada por The New York Times)_

| Dimensión | Criterio | Cómo se evidencia |
|---|---|---|
| Experiencia de desarrollo | Tiempo de feedback de un pipeline típico | Prueba piloto con repositorios representativos de cada equipo |
| Experiencia de desarrollo | Esfuerzo de migración por repositorio | Migración de muestra y estimación por tipo de proyecto |
| Factibilidad técnica | Integración con el entorno actual (nube, secretos, artefactos) | Prueba de concepto y revisión de arquitectura |
| Factibilidad técnica | Seguridad y cumplimiento | Revisión con el equipo de seguridad |
| Impacto de negocio | Costo total en tres años | Licencias, cómputo y horas de mantenimiento |
| Impacto de negocio | Riesgo de proveedor | Hoja de ruta pública, portabilidad de la configuración, salida posible |

> **Una lección del propio caso:** El punto de partida fue la discontinuación de un proveedor. Incluir el riesgo de proveedor y la portabilidad de la configuración como criterios explícitos reduce la probabilidad de repetir la misma situación con la herramienta elegida.

## Por qué el perfil técnico es una ventaja en Platform Engineering

El argumento conecta con una idea que ya había desarrollado en [un análisis sobre Developer Experience y plataformas internas](/blog/developer-experience-ia-friccion-plataforma/): una plataforma tratada como proyecto se entrega y se mantiene; una plataforma tratada como producto tiene usuarios, discovery, una hoja de ruta priorizada por valor y métricas de resultado. El perfil de Cassidy muestra quién puede sostener ese enfoque.

En la práctica, un Technical Product Manager de plataforma aporta tres capacidades que difícilmente se encuentren juntas por separado:

- **Empatía con el usuario basada en experiencia propia.** Haber sufrido un pipeline lento o una migración mal planificada permite reconocer el problema real detrás de un pedido.
- **Capacidad para evaluar alternativas técnicas.** Sin reemplazar a los ingenieros en las decisiones de arquitectura, puede discutir consecuencias, costos de migración y riesgos con el mismo vocabulario.
- **Traducción hacia el negocio.** Puede explicar a la dirección por qué una inversión en infraestructura interna se traduce en velocidad de entrega, menos incidentes o menor costo operativo.

El riesgo opuesto también existe y conviene nombrarlo. Un perfil muy técnico puede caer en la tentación de decidir la arquitectura en lugar de facilitar la decisión, o de priorizar lo técnicamente interesante sobre lo que más fricción elimina. El valor del rol está en mantener las preguntas de producto —por qué, para quién, con qué impacto— aun cuando el conocimiento técnico permitiría saltearlas.

## Qué pueden tomar los líderes de ingeniería

Para quienes gestionan equipos, el artículo deja algunas lecciones prácticas, más allá del recorrido individual:

1. **Gestionar la plataforma interna como un producto**, con una persona responsable de su estrategia, sus usuarios y sus resultados, y no solo de su operación.
2. **Buscar ese perfil dentro de la organización.** Los ingenieros que preguntan sistemáticamente por qué y para quién se construye algo suelen ser los mejores candidatos, aunque nunca hayan considerado el rol.
3. **Tratar los cambios forzados de proveedor como decisiones de producto**, con discovery, criterios explícitos y participación de los equipos afectados.
4. **Documentar la evaluación.** Una matriz compartida no solo ayuda a decidir: permite que la organización entienda y acepte la decisión.
5. **Equilibrar explícitamente tres dimensiones**: impacto de negocio, experiencia de desarrollo y factibilidad técnica. Optimizar una sola suele trasladar el costo a las otras dos.

El texto de NYT Open cierra invitando a quienes tienen formación técnica a considerar Product Management como próximo paso. Desde la perspectiva de una organización, la lectura complementaria es igual de relevante: las plataformas internas se benefician especialmente de que alguien con ese recorrido las gestione como un producto.

### Referencias

- [The Right Team for the Job: From Engineering to Product: A Superpower for Developer Platform Strategy](https://open.nytimes.com/the-right-team-for-the-job-from-engineering-to-product-a-superpower-for-developer-platform-a290e65970ea) — Geethu Jacob, Daniel Cassidy, Nikki Larson y Erica Vendetti, NYT Open, 11 de febrero de 2026.

---

**En síntesis: cuando los usuarios de un producto son ingenieros, el criterio de producto depende de comprender las consecuencias técnicas de cada decisión. Un Technical Product Manager con experiencia en ingeniería puede sostener esa doble mirada y convertir decisiones de infraestructura en decisiones de producto.**

