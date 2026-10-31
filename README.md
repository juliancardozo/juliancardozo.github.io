# juliancardozo.github.io

Portfolio personal de Julián Cardozo — Engineering Manager, desarrollador y product builder.

**En vivo:** https://juliancardozo.github.io/

## Cómo funciona

Sitio estático generado por un script propio de Node, **sin dependencias ni frameworks**.
GitHub Pages sirve los archivos tal cual (hay un `.nojekyll` en la raíz): no hay build del
lado del servidor que pueda fallar, y las rutas directas y los refresh funcionan porque cada
página es un `index.html` real, no una SPA.

```bash
npm run build     # genera index.html, /proyectos/<slug>/, sitemap.xml, robots.txt y assets
npm run serve     # build + servidor local en http://localhost:4321
npm run check     # enlaces rotos, anclas, alt/width/height en imágenes, metadatos, secretos
node tools/audit.mjs   # Chrome headless: capturas, desbordes, contraste y errores de consola
```

Requiere Node 18+ (el audit necesita Node 22+ por el WebSocket nativo, y Google Chrome).

## Estructura

```
src/data/projects.js      Fuente única de verdad de los proyectos ← se edita esto
src/data/site.js          Identidad, contacto y todo el copy de las secciones (español)
src/data/en/              Traducción al inglés: copy de interfaz y textos de proyectos, artículos, pilares y newsletter
src/data/i18n.js          Mezcla el contenido en español con cada traducción
src/templates/            layout, home, caso de estudio y componentes compartidos
src/assets/               CSS, JS e imágenes (se copian a /assets en el build)
build.mjs                 Generador
tools/                    serve, check, audit y plantilla de la imagen Open Graph

index.html                ← generado
proyectos/<slug>/         ← generado
en/                       ← generado (versión en inglés: /en/projects/, /en/blog/, /en/topics/…)
404.html sitemap.xml robots.txt assets/   ← generados
```

Los archivos generados se commitean porque son los que GitHub Pages publica.

## Agregar un proyecto

Un objeto nuevo en `src/data/projects.js`, sus textos en inglés en `src/data/en/projects.js`
y `npm run build`. Si falta la traducción, el build avisa y publica el texto en español.

- `featured: true` → tarjeta destacada en el home **y** página propia en `/proyectos/<slug>/`.
- `featured: false` → tarjeta compacta y filtrable en el Laboratorio.

Los filtros del Laboratorio se declaran en `labFilters` (mismo archivo) y se cruzan contra
`project.category`. Un filtro sin proyectos detrás se oculta solo.

Regla de contenido: todo lo que se afirma tiene que poder verificarse en el repositorio, en el
sitio publicado o en la documentación del proyecto. Para eso está el campo `evidence`.

## Multi-idioma

El sitio se publica en español (raíz) e inglés (`/en/`). Cada página enlaza su equivalente con
`hreflang`, el header muestra un selector ES/EN y el sitemap lista ambas versiones.

- Copy de interfaz y home: `content.es` en `src/data/site.js` y `src/data/en/site.js`, con la
  misma forma. Las rutas de cada idioma se declaran ahí (`prefix` + `routes`).
- Contenido largo: el español es la fuente (estructura, slugs, URLs, fechas). En `src/data/en/`
  van solo los textos traducidos, indexados por slug; `src/data/i18n.js` los mezcla sobre la base.
- Enlaces internos dentro del contenido (`[MiCuota](/proyectos/micuota/)`) se escriben con la ruta
  del idioma correspondiente (`/en/projects/micuota/`).
- La newsletter se envía en español; en inglés se traduce la página y el archivo público.

## Imagen Open Graph

Se genera desde `tools/og-template.html`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot=src/assets/img/og-cover.png "file://$PWD/tools/og-template.html"
npm run build
```
