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

export const blogIndex = ({ t, articles, pillars, newsletter }) => {
  const b = t.blog;
  const sortedArticles = [...articles].sort((a, z) => z.date.localeCompare(a.date));
  const tags = [...new Set(sortedArticles.flatMap((article) => article.tags))].sort((a, z) => a.localeCompare(z, t.lang));
  return `
<section class="blog-index">
  <div class="shell">
    <header class="blog-index__head">
      <p class="section__eyebrow">${esc(b.eyebrow)}</p>
      <h1 class="blog-index__title">${esc(b.title)}</h1>
      <p class="section__lead">${esc(b.lead)}</p>
      <div class="hero__ctas">
        <a class="btn btn--ghost" href="${href(t, 'newsletter')}">${esc(b.newsletterCta)}</a>
        <a class="btn btn--ghost js-track-newsletter-interest" href="${href(t, 'newsletter')}#suscribirme">${esc(b.subscribeCta)}</a>
      </div>
    </header>
    <section class="blog-pillars" id="pilares" aria-labelledby="blog-pillars-title">
      <p class="section__eyebrow">${esc(b.pillarsEyebrow)}</p>
      <h2 id="blog-pillars-title">${esc(b.pillarsTitle)}</h2>
      <div class="pillar-strip">
        ${pillars.map((pillar) => `<article class="pillar-card">
          <p class="pillar-card__meta">${esc(pillar.eyebrow)}</p>
          <h3><a href="${href(t, 'topic', pillar.slug)}" class="js-track-pillar-hub">${esc(pillar.title)}</a></h3>
          <p>${esc(pillar.description)}</p>
        </article>`).join('')}
      </div>
    </section>
    <div class="filters blog-filters" id="articulos" role="group" aria-label="${esc(b.filterLabel)}" data-blog-filters>
      <button type="button" class="filters__btn" data-blog-filter="all" aria-pressed="true">${esc(b.allLabel)}</button>
      ${tags.map((tag) => `<button type="button" class="filters__btn" data-blog-filter="${esc(tagKey(tag))}" aria-pressed="false">${esc(tag)}</button>`).join('')}
    </div>
    <div class="article-grid" data-blog-grid>
      ${sortedArticles.map((article) => `
        <article class="article-card" data-blog-card data-tags="${esc(article.tags.map(tagKey).join(' '))}" data-reveal>
          <p class="article-card__meta"><span>${esc(article.category)}</span><time datetime="${esc(article.date)}">${esc(formattedDate(t, article.date))}</time></p>
          <h2 class="article-card__title"><a href="${href(t, 'blog', article.slug)}" class="js-track-article-card">${esc(article.title)}</a></h2>
          <p class="article-card__description">${esc(article.description)}</p>
          <ul class="article-card__tags" aria-label="${esc(b.tagsLabel)}">${article.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
          <div class="article-card__footer"><span>${esc(article.readingTime)}</span><a href="${href(t, 'blog', article.slug)}">${esc(b.readArticle)} <span aria-hidden="true">→</span></a></div>
        </article>`).join('')}
    </div>
    <p class="blog-empty" data-blog-empty hidden>${esc(b.emptyLabel)}</p>
    <div class="blog-more"><button type="button" class="btn btn--ghost" data-blog-load-more>${esc(b.loadMore)}</button></div>
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
        ${site.links.linkedin ? `<a class="btn btn--ghost" href="${esc(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(a.followLinkedin)}</a>` : ''}
        <a class="btn btn--ghost" href="${href(t)}">${esc(a.aboutAuthor)}</a>
      </div>
      ${companion ? `<p class="notes-download__companion"><a href="${href(t, 'blog', companion.slug)}" class="js-track-related-article">${esc(download.companionLabel || companion.title)} <span aria-hidden="true">→</span></a></p>` : ''}
      ${download.disclaimer ? `<p class="notes-download__disclaimer">${esc(download.disclaimer)}</p>` : ''}
    </aside>`;
};

export const articlePage = ({ t, article, relatedProject, relatedArticles = [], pillar = null, articles = [] }) => {
  const a = t.article;
  return `
<article class="article">
  <header class="shell article__head">
    <a class="case__back" href="${href(t, 'blog')}"><span aria-hidden="true">←</span> ${esc(a.back)}</a>
    <p class="article__meta"><span>${esc(article.category)}</span><time datetime="${esc(article.date)}">${esc(formattedDate(t, article.date))}</time><span>${esc(article.readingTime)}</span></p>
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
      ${article.sections.map((section) => `
        <section${section.kicker ? ' class="notes-concept"' : ''}>
          ${section.kicker ? `<p class="notes-concept__kicker">${esc(section.kicker)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
          ${(section.paragraphs || []).map((paragraph) => `<p>${inlineCode(paragraph)}</p>`).join('')}
          ${fieldRows(section.fields)}
          ${architectureDiagram(section.architecture, t)}
          ${fieldRows(section.fieldsAfter)}
          ${section.check ? `<p class="notes-concept__check"><span>${esc(a.checkLabel)}</span>${esc(section.check)}</p>` : ''}
        </section>`).join('')}
      ${architectureDiagram(article.architecture, t)}
      <p class="article__takeaway">${esc(article.takeaway)}</p>
      ${article.download ? downloadBox({ ...article.download, companion: null, disclaimer: null, idSuffix: '-end' }, t) : ''}
      ${conversationCta(article, t)}
    </div>
  </div>
  ${
    relatedArticles.length
      ? `<section class="shell article__related" aria-labelledby="related-articles-title">
    <p class="section__eyebrow">${esc(a.relatedEyebrow)}</p>
    <h2 id="related-articles-title">${esc(a.relatedTitle)}</h2>
    <ul>
      ${relatedArticles.map((related) => `<li><a href="${href(t, 'blog', related.slug)}" class="js-track-related-article">
        <span>${esc(related.category)}</span>
        <strong>${esc(related.title)}</strong>
        <small>${esc(related.description)}</small>
      </a></li>`).join('')}
    </ul>
  </section>`
      : ''
  }
</article>`;
};
