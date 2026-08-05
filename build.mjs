/**
 * Generador estatico del portfolio.
 *
 * Sin dependencias: lee `src/data`, renderiza con las plantillas de `src/templates`
 * y escribe HTML plano en la raiz del repositorio, que es lo que sirve GitHub Pages
 * (hay un `.nojekyll` para que no intente construir nada del lado del servidor).
 *
 *   node build.mjs
 */

import { mkdir, writeFile, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, content } from './src/data/site.js';
import { projects } from './src/data/projects.js';
import { layout } from './src/templates/layout.mjs';
import { home } from './src/templates/home.mjs';
import { projectPage } from './src/templates/project.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = (...parts) => path.join(root, ...parts);

/** Locales activos. Agregar 'en' aca (y su bloque en src/data/site.js) habilita el sitio bilingue. */
const locales = [{ code: 'es', prefix: '' }];

const write = async (relPath, body) => {
  const target = out(relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body, 'utf8');
  return relPath;
};

const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
const lab = projects.filter((p) => !p.featured);

const personJsonLd = (t) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.author,
  url: site.baseUrl,
  jobTitle: 'Engineering Manager',
  description: t.meta.description,
  sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
  knowsAbout: t.meta.keywords,
});

const projectJsonLd = (project, t, url) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  headline: `${project.title} — ${project.tagline}`,
  description: project.problem,
  url,
  inLanguage: t.lang,
  author: { '@type': 'Person', name: site.author, url: site.baseUrl },
  keywords: project.stack.join(', '),
  ...(project.repositoryUrl ? { codeRepository: project.repositoryUrl } : {}),
});

const build = async () => {
  const written = [];
  const urls = [];

  // Limpieza de la salida generada (nunca toca src/, assets/img ni archivos de configuracion).
  if (existsSync(out('proyectos'))) await rm(out('proyectos'), { recursive: true, force: true });
  await rm(out('assets/css'), { recursive: true, force: true });
  await rm(out('assets/js'), { recursive: true, force: true });

  for (const { code, prefix } of locales) {
    const t = content[code];

    // Home
    const homePath = `${prefix}/`;
    written.push(
      await write(`${prefix || '.'}/index.html`.replace('./', ''), layout({
        t,
        title: t.meta.title,
        description: t.meta.description,
        path: homePath,
        bodyClass: 'page-home',
        content: home({ t, featured, lab }),
        jsonLd: personJsonLd(t),
      })),
    );
    urls.push({ loc: `${site.baseUrl}${homePath}`, priority: '1.0' });

    // Casos de estudio
    for (const project of featured) {
      const pagePath = `${prefix}/proyectos/${project.slug}/`;
      const others = featured.filter((p) => p.slug !== project.slug).slice(0, 3);
      const title = `${project.title} — ${project.tagline} | ${site.author}`;
      const description = `${project.tagline} ${project.problem}`.slice(0, 300);
      written.push(
        await write(`${pagePath.replace(/^\//, '')}index.html`, layout({
          t,
          title,
          description,
          path: pagePath,
          bodyClass: 'page-case',
          content: projectPage({ t, project, others }),
          jsonLd: projectJsonLd(project, t, `${site.baseUrl}${pagePath}`),
        })),
      );
      urls.push({ loc: `${site.baseUrl}${pagePath}`, priority: '0.8' });
    }
  }

  // 404 (GitHub Pages sirve /404.html ante rutas inexistentes)
  const t404 = content[site.defaultLocale];
  written.push(
    await write('404.html', layout({
      t: t404,
      title: `Página no encontrada — ${site.author}`,
      description: 'La página que buscás no existe.',
      path: '/404.html',
      bodyClass: 'page-404',
      content: `<section class="section notfound"><div class="shell">
        <p class="section__eyebrow">Error 404</p>
        <h1 class="section__title">Esta página no existe</h1>
        <p class="section__lead">Puede que el enlace esté roto o que la página se haya movido.</p>
        <div class="hero__ctas"><a class="btn btn--primary" href="/">${t404.ui.backHome}</a>
        <a class="btn btn--ghost" href="/#productos">Ver los productos</a></div>
      </div></section>`,
    })),
  );

  // Assets estaticos
  await cp(out('src/assets'), out('assets'), { recursive: true });
  const assetFiles = await readdir(out('assets'), { recursive: true });
  written.push(...assetFiles.filter((f) => path.extname(f)).map((f) => `assets/${f}`));

  // sitemap.xml
  written.push(
    await write(
      'sitemap.xml',
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`)
        .join('\n')}\n</urlset>\n`,
    ),
  );

  // robots.txt
  written.push(
    await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`),
  );

  console.log(`Build OK — ${written.length} archivos`);
  console.log(`  ${featured.length} casos de estudio · ${lab.length} proyectos en el laboratorio`);
  for (const file of written.filter((f) => f.endsWith('.html'))) console.log(`  · ${file}`);
};

build().catch((error) => {
  console.error('Build FAILED');
  console.error(error);
  process.exit(1);
});
