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
import { articles } from './src/data/articles.js';
import { pillars } from './src/data/pillars.js';
import { newsletter } from './src/data/newsletter.js';
import { layout } from './src/templates/layout.mjs';
import { home } from './src/templates/home.mjs';
import { projectPage } from './src/templates/project.mjs';
import { blogIndex, articlePage } from './src/templates/blog.mjs';
import { pillarPage } from './src/templates/pillar.mjs';
import { newsletterIndex, newsletterIssuePage } from './src/templates/newsletter.mjs';
import { prosePage } from './src/templates/prose-page.mjs';

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

const homeJsonLd = (t) => ({
  '@context': 'https://schema.org',
  '@graph': (() => {
    const person = personJsonLd(t);
    delete person['@context'];
    return [
      {
        '@type': 'WebSite',
        '@id': `${site.baseUrl}/#website`,
        url: site.baseUrl,
        name: site.author,
        inLanguage: t.lang,
        description: t.meta.description,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.baseUrl}/#profile`,
        url: site.baseUrl,
        name: site.author,
        mainEntity: { '@id': `${site.baseUrl}/#person` },
      },
      {
        ...person,
        '@id': `${site.baseUrl}/#person`,
      },
    ];
  })(),
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

const articleJsonLd = (article, t, url) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  description: article.description,
  datePublished: article.date,
  dateModified: article.date,
  inLanguage: t.lang,
  url,
  author: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
  publisher: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
  keywords: article.category,
});

const pillarJsonLd = (pillar, t, url, articles, projects) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: pillar.title,
  description: pillar.description,
  url,
  inLanguage: t.lang,
  author: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
  hasPart: [
    ...articles.map((article) => ({ '@type': 'BlogPosting', name: article.title, url: `${site.baseUrl}/blog/${article.slug}/` })),
    ...projects.map((project) => ({ '@type': 'CreativeWork', name: project.title, url: `${site.baseUrl}/proyectos/${project.slug}/` })),
  ],
});

const newsletterJsonLd = (t, url) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: newsletter.fullTitle,
  description: newsletter.description,
  url,
  inLanguage: t.lang,
  author: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
  hasPart: newsletter.issues.map((issue) => ({
    '@type': 'BlogPosting',
    headline: issue.title,
    url: `${site.baseUrl}/newsletter/${issue.slug}/`,
  })),
});

const newsletterIssueJsonLd = (issue, t, url) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: issue.title,
  description: issue.excerpt,
  datePublished: issue.date,
  dateModified: issue.date,
  inLanguage: t.lang,
  url,
  author: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
  publisher: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
  isPartOf: { '@type': 'CreativeWorkSeries', name: newsletter.fullTitle, url: `${site.baseUrl}/newsletter/` },
});

const privacyPageData = {
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
};

const build = async () => {
  const written = [];
  const urls = [];

  // Limpieza de la salida generada (nunca toca src/, assets/img ni archivos de configuracion).
  if (existsSync(out('proyectos'))) await rm(out('proyectos'), { recursive: true, force: true });
  if (existsSync(out('blog'))) await rm(out('blog'), { recursive: true, force: true });
  if (existsSync(out('temas'))) await rm(out('temas'), { recursive: true, force: true });
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
        jsonLd: homeJsonLd(t),
      })),
    );
    urls.push({ loc: `${site.baseUrl}${homePath}`, priority: '1.0' });

    const blogPath = `${prefix}/blog/`;
    written.push(
      await write(`${blogPath.replace(/^\//, '')}index.html`, layout({
        t,
        title: `Blog de tecnología y producto | ${site.author}`,
        description: 'Artículos sobre inteligencia artificial, arquitectura, infraestructura y emprendimiento a partir de proyectos propios.',
        path: blogPath,
        bodyClass: 'page-blog',
        content: blogIndex({ articles }),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `Blog de ${site.author}`,
          url: `${site.baseUrl}${blogPath}`,
          inLanguage: t.lang,
          author: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
        },
      })),
    );
    urls.push({ loc: `${site.baseUrl}${blogPath}`, priority: '0.8' });

    const privacyPath = `${prefix}/privacidad/`;
    written.push(
      await write(`${privacyPath.replace(/^\//, '')}index.html`, layout({
        t,
        title: `Privacidad de la newsletter | ${site.author}`,
        description: 'Política de privacidad y consentimiento para la newsletter personal de Julián Cardozo.',
        path: privacyPath,
        bodyClass: 'page-privacy',
        content: prosePage(privacyPageData),
      })),
    );
    urls.push({ loc: `${site.baseUrl}${privacyPath}`, priority: '0.4' });

    const newsletterPath = `${prefix}/newsletter/`;
    const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]));
    const projectBySlug = Object.fromEntries(featured.map((project) => [project.slug, project]));
    const issues = [...newsletter.issues].sort((a, b) => b.date.localeCompare(a.date));
    written.push(
      await write(`${newsletterPath.replace(/^\//, '')}index.html`, layout({
        t,
        title: `${newsletter.fullTitle} | ${site.author}`,
        description: newsletter.description,
        path: newsletterPath,
        bodyClass: 'page-newsletter',
        content: newsletterIndex({
          newsletter,
          issues,
          articlesBySlug: articleBySlug,
          projectsBySlug: projectBySlug,
        }),
        jsonLd: newsletterJsonLd(t, `${site.baseUrl}${newsletterPath}`),
      })),
    );
    urls.push({ loc: `${site.baseUrl}${newsletterPath}`, priority: '0.78' });

    for (const issue of issues) {
      const pagePath = `${prefix}/newsletter/${issue.slug}/`;
      const relatedArticle = articles.find((article) => article.slug === issue.articleSlug) || null;
      const relatedProject = featured.find((project) => project.slug === issue.projectSlug) || null;
      written.push(
        await write(`${pagePath.replace(/^\//, '')}index.html`, layout({
          t,
          title: `${issue.title} | ${newsletter.fullTitle}`,
          description: issue.metaDescription,
          path: pagePath,
          bodyClass: 'page-newsletter-issue',
          content: newsletterIssuePage({ issue, relatedArticle, relatedProject }),
          jsonLd: newsletterIssueJsonLd(issue, t, `${site.baseUrl}${pagePath}`),
          ogType: 'article',
        })),
      );
      urls.push({ loc: `${site.baseUrl}${pagePath}`, priority: '0.68' });
    }

    for (const pillar of pillars) {
      const pagePath = `${prefix}/temas/${pillar.slug}/`;
      const pillarArticles = articles.filter((article) => pillar.articleSlugs.includes(article.slug));
      const pillarProjects = featured.filter((project) => pillar.projectSlugs.includes(project.slug));
      written.push(
        await write(`${pagePath.replace(/^\//, '')}index.html`, layout({
          t,
          title: `${pillar.title} | ${site.author}`,
          description: pillar.description,
          path: pagePath,
          bodyClass: 'page-pillar',
          content: pillarPage({
            pillar,
            articles: pillarArticles,
            projects: pillarProjects,
            contactEmail: site.links.email,
          }),
          jsonLd: pillarJsonLd(pillar, t, `${site.baseUrl}${pagePath}`, pillarArticles, pillarProjects),
        })),
      );
      urls.push({ loc: `${site.baseUrl}${pagePath}`, priority: '0.75' });
    }

    for (const article of articles) {
      const pagePath = `${prefix}/blog/${article.slug}/`;
      const relatedProject = projects.find((project) => project.slug === article.projectSlug);
      if (article.projectSlug && !relatedProject) throw new Error(`Article "${article.slug}" references an unknown project.`);
      const articlePillar = pillars.find((pillar) => pillar.articleSlugs.includes(article.slug)) || null;
      const relatedArticles = articles
        .filter((candidate) => candidate.slug !== article.slug)
        .map((candidate) => ({
          ...candidate,
          score: candidate.tags.filter((tag) => article.tags.includes(tag)).length,
        }))
        .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
        .slice(0, 3);
      written.push(
        await write(`${pagePath.replace(/^\//, '')}index.html`, layout({
          t,
          title: `${article.title} | ${site.author}`,
          description: article.description,
          path: pagePath,
          bodyClass: 'page-article',
          content: articlePage({ article, relatedProject, relatedArticles, pillar: articlePillar }),
          jsonLd: articleJsonLd(article, t, `${site.baseUrl}${pagePath}`),
          ogType: 'article',
        })),
      );
      urls.push({ loc: `${site.baseUrl}${pagePath}`, priority: '0.7' });
    }

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
          content: projectPage({
            t,
            project,
            others,
            articles: articles.filter((article) => article.projectSlug === project.slug),
          }),
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
      robots: 'noindex, follow',
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
