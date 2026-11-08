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
import { dataFor } from './src/data/i18n.js';
import { layout } from './src/templates/layout.mjs';
import { home } from './src/templates/home.mjs';
import { projectPage } from './src/templates/project.mjs';
import { blogIndex, articlePage } from './src/templates/blog.mjs';
import { pillarPage } from './src/templates/pillar.mjs';
import { newsletterIndex, newsletterIssuePage } from './src/templates/newsletter.mjs';
import { prosePage } from './src/templates/prose-page.mjs';
import { href } from './src/templates/components.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = (...parts) => path.join(root, ...parts);

/** Locales activos. El primero es el idioma por defecto y se sirve en la raiz; el resto bajo su `prefix`. */
const locales = ['es', 'en'];

const write = async (relPath, body) => {
  const target = out(relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body, 'utf8');
  return relPath;
};

/** Ruta de una pagina en cada idioma, para hreflang y el selector de idioma. */
const alternatesFor = (kind, slug = '') =>
  Object.fromEntries(locales.map((code) => [code, href(content[code], kind, slug)]));

const fileFor = (pagePath) => `${pagePath.replace(/^\//, '')}index.html`;

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

const homeJsonLd = (t) => {
  const homeUrl = `${site.baseUrl}${href(t)}`;
  const person = personJsonLd(t);
  delete person['@context'];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.baseUrl}/#website`,
        url: site.baseUrl,
        name: site.author,
        inLanguage: locales,
        description: t.meta.description,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${homeUrl}#profile`,
        url: homeUrl,
        name: site.author,
        inLanguage: t.lang,
        mainEntity: { '@id': `${site.baseUrl}/#person` },
      },
      {
        ...person,
        '@id': `${site.baseUrl}/#person`,
      },
    ],
  };
};

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
    ...articles.map((article) => ({ '@type': 'BlogPosting', name: article.title, url: `${site.baseUrl}${href(t, 'blog', article.slug)}` })),
    ...projects.map((project) => ({ '@type': 'CreativeWork', name: project.title, url: `${site.baseUrl}${href(t, 'project', project.slug)}` })),
  ],
});

const newsletterJsonLd = (newsletter, t, url) => ({
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
    url: `${site.baseUrl}${href(t, 'newsletter', issue.slug)}`,
  })),
});

const newsletterIssueJsonLd = (newsletter, issue, t, url) => ({
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
  isPartOf: { '@type': 'CreativeWorkSeries', name: newsletter.fullTitle, url: `${site.baseUrl}${href(t, 'newsletter')}` },
});

const build = async () => {
  const written = [];
  const urls = [];

  // Limpieza de la salida generada (nunca toca src/, assets/img ni archivos de configuracion).
  const generatedDirs = new Set(['blog', 'newsletter', ...locales.flatMap((code) => {
    const t = content[code];
    return t.prefix ? [t.prefix.replace(/^\//, '')] : [t.routes.project, t.routes.topic, t.routes.privacy];
  })]);
  for (const dir of generatedDirs) {
    if (existsSync(out(dir))) await rm(out(dir), { recursive: true, force: true });
  }
  await rm(out('assets/css'), { recursive: true, force: true });
  await rm(out('assets/js'), { recursive: true, force: true });

  for (const code of locales) {
    const t = content[code];
    const { projects, articles, pillars, newsletter, labFilters } = dataFor(code);
    const featured = projects
      .filter((p) => p.featured)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    const lab = projects.filter((p) => !p.featured);

    const page = async (kind, slug, options, priority) => {
      const pagePath = href(t, kind, slug);
      written.push(await write(fileFor(pagePath), layout({ t, path: pagePath, alternates: alternatesFor(kind, slug), ...options })));
      urls.push({ kind, slug, code, priority });
      return pagePath;
    };

    // Home
    await page('home', '', {
      title: t.meta.title,
      description: t.meta.description,
      bodyClass: 'page-home',
      content: home({ t, featured, lab, labFilters, pillars, newsletter }),
      jsonLd: homeJsonLd(t),
    }, '1.0');

    const blogPath = href(t, 'blog');
    await page('blog', '', {
      title: `${t.pages.blogTitle} | ${site.author}`,
      description: t.pages.blogDescription,
      bodyClass: 'page-blog',
      content: blogIndex({ t, articles, pillars, newsletter }),
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${t.pages.blogName} ${site.author}`,
        url: `${site.baseUrl}${blogPath}`,
        inLanguage: t.lang,
        author: { '@id': `${site.baseUrl}/#person`, name: site.author, url: site.baseUrl },
      },
    }, '0.8');

    await page('privacy', '', {
      title: `${t.pages.privacyTitle} | ${site.author}`,
      description: t.pages.privacyDescription,
      bodyClass: 'page-privacy',
      content: prosePage(t.privacy),
    }, '0.4');

    const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]));
    const projectBySlug = Object.fromEntries(featured.map((project) => [project.slug, project]));
    const issues = [...newsletter.issues].sort((a, b) => b.date.localeCompare(a.date));
    await page('newsletter', '', {
      title: `${newsletter.fullTitle} | ${site.author}`,
      description: newsletter.description,
      bodyClass: 'page-newsletter',
      content: newsletterIndex({
        t,
        newsletter,
        issues,
        articlesBySlug: articleBySlug,
        projectsBySlug: projectBySlug,
      }),
      jsonLd: newsletterJsonLd(newsletter, t, `${site.baseUrl}${href(t, 'newsletter')}`),
    }, '0.78');

    for (const issue of issues) {
      const relatedArticle = articles.find((article) => article.slug === issue.articleSlug) || null;
      const relatedProject = featured.find((project) => project.slug === issue.projectSlug) || null;
      await page('newsletter', issue.slug, {
        title: `${issue.title} | ${newsletter.fullTitle}`,
        description: issue.metaDescription,
        bodyClass: 'page-newsletter-issue',
        content: newsletterIssuePage({ t, issue, relatedArticle, relatedProject }),
        jsonLd: newsletterIssueJsonLd(newsletter, issue, t, `${site.baseUrl}${href(t, 'newsletter', issue.slug)}`),
        ogType: 'article',
      }, '0.68');
    }

    for (const pillar of pillars) {
      const pillarArticles = articles.filter((article) => pillar.articleSlugs.includes(article.slug));
      const pillarProjects = featured.filter((project) => pillar.projectSlugs.includes(project.slug));
      await page('topic', pillar.slug, {
        title: `${pillar.title} | ${site.author}`,
        description: pillar.description,
        bodyClass: 'page-pillar',
        content: pillarPage({
          t,
          pillar,
          articles: pillarArticles,
          projects: pillarProjects,
          contactEmail: site.links.email,
        }),
        jsonLd: pillarJsonLd(pillar, t, `${site.baseUrl}${href(t, 'topic', pillar.slug)}`, pillarArticles, pillarProjects),
      }, '0.75');
    }

    for (const article of articles) {
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
      await page('blog', article.slug, {
        title: `${article.title} | ${site.author}`,
        description: article.description,
        bodyClass: 'page-article',
        content: articlePage({ t, article, relatedProject, relatedArticles, pillar: articlePillar, articles }),
        jsonLd: articleJsonLd(article, t, `${site.baseUrl}${href(t, 'blog', article.slug)}`),
        ogType: 'article',
      }, '0.7');
    }

    // Casos de estudio
    for (const project of featured) {
      // Proyectos con sitio propio: la ruta del caso de estudio redirige ahi y sale del sitemap.
      if (project.redirectUrl) {
        const pagePath = href(t, 'project', project.slug);
        const target = project.redirectUrl;
        written.push(await write(fileFor(pagePath), `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8" />
<title>${project.title}</title>
<meta name="robots" content="noindex, follow" />
<link rel="canonical" href="${target}" />
<meta http-equiv="refresh" content="0; url=${target}" />
<script>location.replace(${JSON.stringify(target)});</script>
</head>
<body><p><a href="${target}">${target}</a></p></body>
</html>
`));
        continue;
      }
      const others = featured.filter((p) => p.slug !== project.slug).slice(0, 3);
      await page('project', project.slug, {
        title: `${project.title} — ${project.tagline} | ${site.author}`,
        description: `${project.tagline} ${project.problem}`.slice(0, 300),
        bodyClass: 'page-case',
        content: projectPage({
          t,
          project,
          others,
          articles: articles.filter((article) => article.projectSlug === project.slug),
        }),
        jsonLd: projectJsonLd(project, t, `${site.baseUrl}${href(t, 'project', project.slug)}`),
      }, '0.8');
    }
  }

  // 404 (GitHub Pages sirve /404.html ante rutas inexistentes). Bilingue: no sabemos de que idioma llega.
  const t404 = content[site.defaultLocale];
  const tEn = content.en;
  written.push(
    await write('404.html', layout({
      t: t404,
      title: `${t404.notFound.title} — ${site.author}`,
      description: t404.notFound.description,
      path: '/404.html',
      bodyClass: 'page-404',
      robots: 'noindex, follow',
      content: `<section class="section notfound"><div class="shell">
        <p class="section__eyebrow">Error 404</p>
        <h1 class="section__title">${t404.notFound.heading}</h1>
        <p class="section__lead">${t404.notFound.lead}</p>
        <p class="section__lead" lang="en">${tEn.notFound.heading}. ${tEn.notFound.lead}</p>
        <div class="hero__ctas"><a class="btn btn--primary" href="/">${t404.ui.backHome}</a>
        <a class="btn btn--ghost" href="/#productos">${t404.notFound.productsCta}</a>
        <a class="btn btn--ghost" href="${href(tEn)}" lang="en">${tEn.ui.backHome}</a></div>
      </div></section>`,
    })),
  );

  // Assets estaticos
  await cp(out('src/assets'), out('assets'), { recursive: true });
  const assetFiles = await readdir(out('assets'), { recursive: true });
  written.push(...assetFiles.filter((f) => path.extname(f)).map((f) => `assets/${f}`));

  // sitemap.xml, con las versiones de cada idioma enlazadas entre si
  const sitemapEntry = ({ kind, slug, code, priority }) => {
    const alternates = alternatesFor(kind, slug);
    const links = Object.entries(alternates)
      .map(([lang, altPath]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${site.baseUrl}${altPath}"/>`)
      .join('');
    return `  <url><loc>${site.baseUrl}${alternates[code]}</loc>${links}<priority>${priority}</priority></url>`;
  };
  written.push(
    await write(
      'sitemap.xml',
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls
        .map(sitemapEntry)
        .join('\n')}\n</urlset>\n`,
    ),
  );

  // robots.txt
  written.push(
    await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`),
  );

  console.log(`Build OK — ${written.length} archivos`);
  console.log(`  ${locales.length} idiomas: ${locales.join(', ')}`);
  for (const file of written.filter((f) => f.endsWith('.html'))) console.log(`  · ${file}`);
};

build().catch((error) => {
  console.error('Build FAILED');
  console.error(error);
  process.exit(1);
});
