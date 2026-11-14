import { esc, inlineCode, href, projectHref } from './components.mjs';
import { site } from '../data/site.js';
import { newsletterForm } from './newsletter-form.mjs';

const formattedDate = (t, date) =>
  new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
const tagKey = (tag) =>
  tag.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const architectureDiagram = (architecture, t) => {
  if (!architecture?.layers?.length) return '';
  return `
    <figure class="architecture" aria-labelledby="architecture-title architecture-caption">
      <figcaption id="architecture-caption">
        <span>${esc(t.article.architectureLabel)}</span>${esc(architecture.caption)}
      </figcaption>
      <div class="architecture__flow" role="img" aria-label="${esc(architecture.description)}">
        ${architecture.layers.map((layer, index) => `
          ${index ? '<span class="architecture__arrow" aria-hidden="true">→</span>' : ''}
          <div class="architecture__layer">
            <p>${esc(layer.label)}</p>
            <ul>${layer.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      <p class="architecture__description" id="architecture-title">${esc(architecture.description)}</p>
    </figure>`;
};

const conversationCta = (article, t) => {
  const c = t.article.conversation;
  const prompt = article.tags.map((tag) => c.byTag[tag]).find(Boolean) || c.fallback;
  const subject = encodeURIComponent(`${c.subjectPrefix}${article.title}`);
  const body = encodeURIComponent(`${prompt}\n\n${c.cameFrom}${article.title}\n${site.baseUrl}${href(t, 'blog', article.slug)}`);
  return `<aside class="article__conversation">
      <p class="article__conversation-label">${esc(c.label)}</p>
      <h2>${esc(prompt)}</h2>
      <p>${esc(c.body)}</p>
      <a class="btn btn--primary js-track-conversation" href="mailto:${esc(site.links.email)}?subject=${subject}&amp;body=${body}">${esc(c.button)}</a>
    </aside>`;
};

/** Llamado a seguir el perfil de LinkedIn, presente al final de todos los artículos. */
const linkedinCta = (t) => {
  const l = t.article.linkedin;
  if (!site.links.linkedin || !l) return '';
  return `<aside class="article__linkedin" aria-labelledby="article-linkedin-title">
      <svg class="article__linkedin-icon" aria-hidden="true" viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
      <div>
        <p class="article__conversation-label">${esc(l.label)}</p>
        <h2 id="article-linkedin-title">${esc(l.title)}</h2>
        <p>${esc(l.body)}</p>
        <a class="btn btn--primary js-track-linkedin" href="${esc(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(l.button)} <span aria-hidden="true">↗</span></a>
      </div>
    </aside>`;
};

/** Texto normalizado para la búsqueda del índice: sin tildes, en minúsculas. */
const searchText = (...parts) =>
  parts.join(' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const fill = (template, n) => template.replace('{n}', n);
const blogFilterHref = (t, slug) => `${href(t, 'blog')}?categoria=${encodeURIComponent(slug)}#articulos`;

const articleCard = (t, article, b) => `
        <article class="article-card" data-blog-card data-cat="${esc(article.categorySlug)}" data-category="${esc(article.categorySlug)}" data-tags="${esc(article.tags.map(tagKey).join(' '))}" data-search="${esc(searchText(article.title, article.description, article.category, article.tags.join(' ')))}" data-reveal>
          <p class="article-card__meta"><a class="cat-label" data-cat="${esc(article.categorySlug)}" href="${blogFilterHref(t, article.categorySlug)}" data-blog-category-link="${esc(article.categorySlug)}">${esc(article.category)}</a><time datetime="${esc(article.date)}">${esc(formattedDate(t, article.date))}</time></p>
          <h3 class="article-card__title"><a href="${href(t, 'blog', article.slug)}" class="js-track-article-card">${esc(article.title)}</a></h3>
          <p class="article-card__description">${esc(article.description)}</p>
          <ul class="article-card__tags" aria-label="${esc(b.tagsLabel)}">${article.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
          <div class="article-card__footer"><span>${esc(article.readingTime)}</span><a href="${href(t, 'blog', article.slug)}" tabindex="-1" aria-hidden="true">${esc(b.readArticle)} <span aria-hidden="true">→</span></a></div>
        </article>`;

export const blogIndex = ({ t, articles, pillars, newsletter, categories }) => {
  const b = t.blog;
  const sorted = [...articles].sort((a, z) => z.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  const latest = rest.slice(0, 3);
  const byCategory = categories
    .map((category) => ({ ...category, items: sorted.filter((article) => article.categorySlug === category.slug) }))
    .filter((category) => category.items.length);
  return `
<section class="blog-index">
  <div class="shell">
    <header class="blog-hero">
      <div class="blog-hero__copy">
        <p class="section__eyebrow">${esc(b.eyebrow)}</p>
        <h1 class="blog-hero__title">${esc(b.title)}</h1>
        <p class="blog-hero__lead">${esc(b.lead)}</p>
        <dl class="blog-hero__stats">
          <div><dt>${esc(b.statsArticles)}</dt><dd>${sorted.length}</dd></div>
          <div><dt>${esc(b.statsCategories)}</dt><dd>${byCategory.length}</dd></div>
          <div><dt>${esc(b.statsUpdated)}</dt><dd><time datetime="${esc(featured.date)}">${esc(formattedDate(t, featured.date))}</time></dd></div>
        </dl>
        <div class="hero__ctas">
          <a class="btn btn--primary js-track-newsletter-interest" href="${href(t, 'newsletter')}#suscribirme">${esc(b.subscribeCta)}</a>
          <a class="btn btn--ghost" href="#articulos">${esc(b.browseCta)}</a>
        </div>
      </div>
      <article class="blog-feature" data-cat="${esc(featured.categorySlug)}">
        <p class="blog-feature__label">${esc(b.featuredLabel)}</p>
        <p class="article-card__meta"><a class="cat-label" data-cat="${esc(featured.categorySlug)}" href="${blogFilterHref(t, featured.categorySlug)}" data-blog-category-link="${esc(featured.categorySlug)}">${esc(featured.category)}</a><time datetime="${esc(featured.date)}">${esc(formattedDate(t, featured.date))}</time></p>
        <h2 class="blog-feature__title"><a href="${href(t, 'blog', featured.slug)}" class="js-track-article-card">${esc(featured.title)}</a></h2>
        <p class="blog-feature__description">${esc(featured.description)}</p>
        <p class="blog-feature__footer"><span>${esc(featured.readingTime)}</span><a href="${href(t, 'blog', featured.slug)}" tabindex="-1" aria-hidden="true">${esc(b.readArticle)} <span aria-hidden="true">→</span></a></p>
      </article>
    </header>

    <section class="blog-latest" aria-labelledby="blog-latest-title">
      <h2 id="blog-latest-title" class="blog-section-title">${esc(b.latestTitle)}</h2>
      <ol class="blog-latest__list">
        ${latest.map((article, index) => `<li>
          <span class="blog-latest__index" aria-hidden="true">${String(index + 2).padStart(2, '0')}</span>
          <div>
            <p class="article-card__meta"><a class="cat-label" data-cat="${esc(article.categorySlug)}" href="${blogFilterHref(t, article.categorySlug)}" data-blog-category-link="${esc(article.categorySlug)}">${esc(article.category)}</a><span>${esc(article.readingTime)}</span></p>
            <h3><a href="${href(t, 'blog', article.slug)}" class="js-track-article-card">${esc(article.title)}</a></h3>
          </div>
        </li>`).join('')}
      </ol>
    </section>

    <section class="blog-categories" aria-labelledby="blog-categories-title">
      <p class="section__eyebrow">${esc(b.categoriesEyebrow)}</p>
      <h2 id="blog-categories-title" class="blog-section-title">${esc(b.categoriesTitle)}</h2>
      <div class="category-grid">
        ${byCategory.map((category) => `<article class="category-card" data-cat="${esc(category.slug)}">
          <p class="category-card__count">${esc(fill(b.countLabel, category.items.length))}</p>
          <h3><a href="${blogFilterHref(t, category.slug)}" data-blog-category-link="${esc(category.slug)}">${esc(category.name)}</a></h3>
          <p class="category-card__description">${esc(category.description)}</p>
          <ul class="category-card__list">
            ${category.items.slice(0, 2).map((article) => `<li><a href="${href(t, 'blog', article.slug)}" class="js-track-article-card">${esc(article.title)}</a></li>`).join('')}
          </ul>
        </article>`).join('')}
      </div>
    </section>

    <section class="blog-archive" id="articulos" aria-labelledby="blog-archive-title">
      <h2 id="blog-archive-title" class="blog-section-title">${esc(b.archiveTitle)}</h2>
      <div class="blog-toolbar">
        <label class="blog-search">
          <span class="visually-hidden">${esc(b.searchLabel)}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="search" placeholder="${esc(b.searchPlaceholder)}" autocomplete="off" data-blog-search />
        </label>
        <div class="filters blog-filters" role="group" aria-label="${esc(b.filterLabel)}" data-blog-filters>
          <button type="button" class="filters__btn" data-blog-filter="all" aria-pressed="true">${esc(b.allLabel)} <span class="filters__count">${sorted.length}</span></button>
          ${byCategory.map((category) => `<button type="button" class="filters__btn" data-cat="${esc(category.slug)}" data-blog-filter="${esc(category.slug)}" aria-pressed="false">${esc(category.name)} <span class="filters__count">${category.items.length}</span></button>`).join('')}
        </div>
      </div>
      <p class="blog-results" aria-live="polite" data-blog-results data-template="${esc(b.resultsLabel)}"></p>
      <div class="article-grid" data-blog-grid>
        ${sorted.map((article) => articleCard(t, article, b)).join('')}
      </div>
      <p class="blog-empty" data-blog-empty hidden>${esc(b.emptyLabel)}</p>
      <div class="blog-more"><button type="button" class="btn btn--ghost" data-blog-load-more>${esc(b.loadMore)}</button></div>
    </section>

    <section class="blog-pillars" id="pilares" aria-labelledby="blog-pillars-title">
      <p class="section__eyebrow">${esc(b.pillarsEyebrow)}</p>
      <h2 id="blog-pillars-title" class="blog-section-title">${esc(b.pillarsTitle)}</h2>
      <div class="pillar-strip">
        ${pillars.map((pillar) => `<article class="pillar-card">
          <p class="pillar-card__meta">${esc(fill(b.countLabel, pillar.articleSlugs.length))}</p>
          <h3><a href="${href(t, 'topic', pillar.slug)}" class="js-track-pillar-hub">${esc(pillar.title)}</a></h3>
          <p>${esc(pillar.description)}</p>
        </article>`).join('')}
      </div>
    </section>

    <div class="blog-newsletter">
      ${newsletterForm({
        t,
        newsletter,
        source: 'blog-index',
        path: href(t, 'blog'),
        compact: true,
        title: b.formTitle,
        lead: b.formLead,
        buttonLabel: b.subscribeCta,
      })}
    </div>
  </div>
</section>`;
};

/** Ficha de estudio: filas etiqueta / valor (explicación, ejemplo, comparación, error frecuente). */
const fieldRows = (fields = []) =>
  fields.length
    ? `<dl class="notes-fields">${fields
        .map((field) => `<div class="notes-fields__row${field.tone ? ` notes-fields__row--${esc(field.tone)}` : ''}"><dt>${esc(field.label)}</dt><dd>${inlineCode(field.text)}</dd></div>`)
        .join('')}</dl>`
    : '';

/** Bloque de descarga del material del artículo, con salida hacia el perfil. */
const downloadBox = (download, t, articles = []) => {
  if (!download) return '';
  const a = t.article;
  const companion = download.companion ? articles.find((item) => item.slug === download.companion) : null;
  return `<aside class="notes-download" aria-labelledby="notes-download-title${download.idSuffix || ''}">
      <p class="article__conversation-label">${esc(download.meta)}</p>
      <h2 id="notes-download-title${download.idSuffix || ''}">${esc(download.title)}</h2>
      <p>${esc(download.body)}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary js-track-notes-download" href="${esc(download.href)}" download="${esc(download.filename)}" type="application/pdf">${esc(download.label)}<span aria-hidden="true">↓</span></a>
        ${site.links.linkedin ? `<a class="btn btn--ghost js-track-linkedin" href="${esc(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(a.followLinkedin)}</a>` : ''}
        <a class="btn btn--ghost" href="${href(t)}">${esc(a.aboutAuthor)}</a>
      </div>
      ${companion ? `<p class="notes-download__companion"><a href="${href(t, 'blog', companion.slug)}" class="js-track-related-article">${esc(download.companionLabel || companion.title)} <span aria-hidden="true">→</span></a></p>` : ''}
      ${download.credentialLabel && site.links.awsCert ? `<p class="notes-download__companion"><a href="${esc(site.links.awsCert)}" type="application/pdf" target="_blank" rel="noopener noreferrer" class="js-track-cert">${esc(download.credentialLabel)} <span aria-hidden="true">↗</span></a></p>` : ''}
      ${download.disclaimer ? `<p class="notes-download__disclaimer">${esc(download.disclaimer)}</p>` : ''}
    </aside>`;
};


/** Infografía del artículo: imagen optimizada que abre la versión original en alta resolución. */
const infographic = (image) =>
  image
    ? `<figure class="article__infographic">
      <a href="${esc(image.full || image.src)}" target="_blank" rel="noopener" class="js-track-infographic">
        <img src="${esc(image.src)}" alt="${esc(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" />
      </a>
      ${image.caption ? `<figcaption>${esc(image.caption)}${image.full ? ` <a href="${esc(image.full)}" download>${esc(image.downloadLabel || 'Descargar en alta resolución')}</a>` : ''}</figcaption>` : ''}
    </figure>`
    : '';

/**
 * Bloques de contenido largo, en orden: subtítulos, listas, tablas, código y diagramas Mermaid.
 *   { type: 'h3' | 'p' | 'ul' | 'ol' | 'table' | 'code' | 'mermaid' | 'note', ... }
 */
const contentBlocks = (blocks = []) =>
  blocks
    .map((block) => {
      switch (block.type) {
        case 'h3':
          return `<h3>${esc(block.text)}</h3>`;
        case 'p':
          return `<p>${inlineCode(block.text)}</p>`;
        case 'note':
          return `<p class="article__note">${block.label ? `<span>${esc(block.label)}</span>` : ''}${inlineCode(block.text)}</p>`;
        case 'ul':
        case 'ol':
          return `<${block.type} class="article__list">${block.items.map((item) => `<li>${inlineCode(item)}</li>`).join('')}</${block.type}>`;
        case 'table':
          return `<figure class="article__table">
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}
            <div class="article__table-scroll" tabindex="0" role="region" aria-label="${esc(block.caption || 'Tabla')}"><table>
              <thead><tr>${block.head.map((cell) => `<th scope="col">${inlineCode(cell)}</th>`).join('')}</tr></thead>
              <tbody>${block.rows.map((row) => `<tr>${row.map((cell, index) => (index ? `<td>${inlineCode(cell)}</td>` : `<th scope="row">${inlineCode(cell)}</th>`)).join('')}</tr>`).join('')}</tbody>
            </table></div>
          </figure>`;
        case 'code':
          return `<figure class="article__code">
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}
            <pre tabindex="0"><code${block.lang ? ` class="language-${esc(block.lang)}"` : ''}>${esc(block.text)}</code></pre>
          </figure>`;
        case 'mermaid':
          return `<figure class="article__mermaid">
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}
            <pre class="mermaid" aria-label="${esc(block.description || block.caption || '')}">${esc(block.text)}</pre>
            ${block.description ? `<p class="architecture__description">${esc(block.description)}</p>` : ''}
          </figure>`;
        default:
          return '';
      }
    })
    .join('');

/** Mermaid se carga solo en artículos que tienen diagramas, con el tema según el modo de color. */
const mermaidScript = (article) =>
  article.sections.some((section) => (section.blocks || []).some((block) => block.type === 'mermaid'))
    ? `<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs';
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  mermaid.initialize({ startOnLoad: true, theme: dark ? 'dark' : 'neutral', securityLevel: 'strict', fontFamily: 'Helvetica, Arial, sans-serif', themeVariables: dark ? { fontSize: '15px', edgeLabelBackground: '#161a1f', textColor: '#e9eaed' } : { fontSize: '15px' }, flowchart: { padding: 16 } });
</script>`
    : '';

export const articlePage = ({ t, article, relatedProject, relatedArticles = [], pillar = null, articles = [], category = null }) => {
  const a = t.article;
  return `
<article class="article">
  <header class="shell article__head">
    <a class="case__back" href="${href(t, 'blog')}"><span aria-hidden="true">←</span> ${esc(a.back)}</a>
    <p class="article__meta"><a class="cat-label" data-cat="${esc(article.categorySlug)}" href="${blogFilterHref(t, article.categorySlug)}">${esc(article.category)}</a><time datetime="${esc(article.date)}">${esc(formattedDate(t, article.date))}</time><span>${esc(article.readingTime)}</span></p>
    <h1 class="article__title">${esc(article.title)}</h1>
    <p class="article__lead">${esc(article.lead)}</p>
  </header>
  <div class="shell article__layout">
    <aside class="article__aside">
      ${pillar ? `<div><p>${esc(a.pillarLabel)}</p><a href="${href(t, 'topic', pillar.slug)}" class="js-track-pillar-hub">${esc(pillar.title)} <span aria-hidden="true">→</span></a></div>` : ''}
      ${
        relatedProject
          ? `<div><p>${esc(a.bornFrom)}</p>
      <a href="${projectHref(relatedProject, t)}" class="js-track-origin-project">${esc(article.projectName)} <span aria-hidden="true">→</span></a></div>`
          : `<div><p>${esc(a.contextLabel)}</p>
      <span>${esc(article.contextLabel || a.defaultContext)}</span>
      ${article.sourceUrl ? `<a href="${esc(article.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(article.sourceLabel || a.viewRepo)} <span aria-hidden="true">↗</span></a>` : ''}</div>`
      }
    </aside>
    <div class="article__content">
      ${downloadBox(article.download, t, articles)}
      ${infographic(article.infographic)}
      ${article.sections.map((section) => `
        <section${section.kicker ? ' class="notes-concept"' : ''}>
          ${section.kicker ? `<p class="notes-concept__kicker">${esc(section.kicker)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
          ${(section.paragraphs || []).map((paragraph) => `<p>${inlineCode(paragraph)}</p>`).join('')}
          ${fieldRows(section.fields)}
          ${architectureDiagram(section.architecture, t)}
          ${fieldRows(section.fieldsAfter)}
          ${contentBlocks(section.blocks)}
          ${section.check ? `<p class="notes-concept__check"><span>${esc(a.checkLabel)}</span>${esc(section.check)}</p>` : ''}
        </section>`).join('')}
      ${architectureDiagram(article.architecture, t)}
      <p class="article__takeaway">${esc(article.takeaway)}</p>
      ${article.download ? downloadBox({ ...article.download, companion: null, disclaimer: null, credentialLabel: null, idSuffix: '-end' }, t) : ''}
      ${linkedinCta(t)}
      ${conversationCta(article, t)}
    </div>
  </div>
  ${
    relatedArticles.length
      ? `<section class="shell article__related" aria-labelledby="related-articles-title">
    <p class="section__eyebrow">${esc(a.relatedEyebrow)}</p>
    <h2 id="related-articles-title">${esc(a.relatedTitle)}</h2>
    <ul>
      ${relatedArticles.map((related) => `<li data-cat="${esc(related.categorySlug)}"><a href="${href(t, 'blog', related.slug)}" class="js-track-related-article">
        <span class="cat-label" data-cat="${esc(related.categorySlug)}">${esc(related.category)}</span>
        <strong>${esc(related.title)}</strong>
        <small>${esc(related.description)}</small>
      </a></li>`).join('')}
    </ul>
    <p class="article__related-more">
      ${category ? `<a href="${blogFilterHref(t, category.slug)}" class="js-track-related-category">${esc(fill(a.moreInCategory, category.name))} <span aria-hidden="true">→</span></a>` : ''}
      ${pillar ? `<a href="${href(t, 'topic', pillar.slug)}" class="js-track-pillar-hub">${esc(fill(a.morePillar, pillar.title))} <span aria-hidden="true">→</span></a>` : ''}
    </p>
  </section>`
      : ''
  }
</article>${mermaidScript(article)}`;
};
