# Auditoría SEO técnica y de autoridad

Fecha de línea base: 25 de agosto de 2026.  
Sitio: `https://juliancardozo.github.io/`  
Alcance: auditoría de repositorio y HTML estático generado; no incluye datos privados de Search Console, Bing Webmaster Tools, GA4 ni herramientas de keywords.

## Resumen ejecutivo

El sitio es un portfolio personal estático generado con Node.js. Posiciona a Julián Cardozo como Engineering Manager y product builder con experiencia en software, pagos, fintech, arquitectura, IA, cloud y construcción end-to-end de producto. Su público más alineado son responsables de producto, founders y líderes de ingeniería en Uruguay y LATAM que necesitan diseñar, construir u operar productos digitales.

La base técnica es sólida: el contenido está presente en HTML, hay URLs estables con barra final, canonicales autorreferenciales, `robots.txt`, sitemap y un control de enlaces. La mayor oportunidad era convertir el portfolio y el blog en una red editorial coherente y hacer más explícita la entidad personal para buscadores. Se implementaron mejoras seguras sin cambiar URLs consolidadas ni hacer afirmaciones comerciales no verificadas.

## Supuestos documentados

- Idioma principal: español; mercado inicial: Uruguay y LATAM.
- Objetivo de conversión: contacto por email o LinkedIn para conversaciones profesionales, proyectos y liderazgo técnico.
- No hay acceso confirmado a Google Search Console, Bing Webmaster Tools, GA4, datos de clientes, resultados comerciales, testimonios ni volúmenes de búsqueda.
- La prioridad de keywords es cualitativa: ajuste con experiencia demostrable, intención profesional y competencia razonable. Debe validarse con datos reales antes de invertir en contenido de alto esfuerzo.

## Línea base del repositorio

| Dimensión | Estado inicial |
|---|---|
| Renderizado | SSG: Node.js renderiza HTML estático; contenido principal disponible sin JavaScript |
| URLs HTML | 25: home, índice de blog, 15 artículos, 7 casos de estudio y 404 |
| Enlaces | 328 internos y 96 externos; control existente sin problemas |
| Rastreo | `robots.txt` permite rastreo y declara sitemap |
| Indexación | Sitemap con home, blog, artículos y casos publicados |
| Canonical | Autorreferencial en las páginas HTML |
| Datos estructurados | `Person`, `CreativeWork` y `BlogPosting` parciales |
| Analítica | Google Tag Manager (`GTM-KJ49CP7L`) instalado globalmente; etiquetas y eventos pendientes de configurar |

## Hallazgos y acciones

| Prioridad | Hallazgo | Riesgo / impacto | Acción implementada |
|---|---|---|---|
| Crítico | La página 404 podía indexarse | Bajo riesgo, evita URL de bajo valor en el índice | `meta robots="noindex, follow"` para 404 |
| Alto | La identidad personal no estaba conectada como entidad `WebSite` y `ProfilePage` | Menor claridad de autoría | JSON-LD `WebSite`, `ProfilePage` y `Person` con IDs estables y `sameAs` reales |
| Alto | Los artículos estaban conectados solo desde el índice | Autoridad temática y descubrimiento interno limitados | Tres enlaces a artículos relacionados por publicación, calculados por tags compartidos |
| Medio | Open Graph de artículos usaba `website` | Menor semántica en distribución social | `og:type="article"` en publicaciones |
| Medio | El blog no facilitaba explorar temas | Menor reutilización editorial | Filtro de tags y carga progresiva sin ocultar contenido a usuarios sin JavaScript |
| Medio | Falta medición de adquisición y conversión | No se puede medir impacto orgánico | Backlog de Search Console, Bing y analítica en el roadmap |

## Estado técnico posterior

- `robots.txt`: permite rastreo y declara `sitemap.xml`.
- Sitemap: contiene las páginas indexables relevantes; el 404 no aparece.
- Páginas indexables: `index, follow`; 404: `noindex, follow`.
- Canonical: consistente, HTTPS, dominio sin `www` y barra final.
- Artículos: `BlogPosting`, fecha visible, autor identificado, fuente primaria cuando el contenido analiza actualidad externa.
- Home: `WebSite`, `ProfilePage` y `Person`; los perfiles GitHub y LinkedIn publicados se declaran en `sameAs`.
- Accesibilidad: contenido principal y enlaces relacionados están en HTML; filtros degradan a contenido completo sin JavaScript.

## Inventario de URLs e intención

| Grupo | URLs | Intención | Destino de conversión | Estado esperado |
|---|---:|---|---|---|
| Home | `/` | Comercial / autoridad: Engineering Manager, product builder, software en Uruguay/LATAM | Contacto, GitHub, LinkedIn y casos | Indexable |
| Casos de estudio | `/proyectos/{slug}/` (7) | Comercial-investigativa: evaluar experiencia y decisiones de implementación | Demo, repositorio o contacto | Indexable |
| Blog | `/blog/` | Informativa / exploración temática | Artículos, proyectos y contacto | Indexable |
| Artículos | `/blog/{slug}/` (15) | Informativa profesional y autoridad de tema | Casos relacionados, blog y contacto | Indexable |
| Error | `/404.html` y rutas inexistentes | Navegación | Volver a home / productos | Noindex, follow |

## Riesgos y decisiones pendientes

1. No se debe modificar la estructura de URLs sin consultar tráfico, backlinks y cobertura en Search Console.
2. No se deben declarar servicios, clientes, certificaciones, precios, reseñas o resultados no visibles y comprobables.
3. Antes de activar GA4 u otras etiquetas dentro de GTM, debe definirse la base legal, consentimiento y política de privacidad aplicable.
4. Las imágenes sociales siguen usando una portada general. Crear imágenes OG específicas por caso y artículo es una mejora de alto valor editorial, pero requiere activos aprobados.
5. No se implementó `hreflang`: solo existe una versión en español. Debe añadirse únicamente al publicar equivalentes reales en otros idiomas.
