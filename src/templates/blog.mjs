import { esc, projectHref } from './components.mjs';
import { site } from '../data/site.js';
import { pillars } from '../data/pillars.js';
import { newsletter } from '../data/newsletter.js';
import { newsletterForm } from './newsletter-form.mjs';

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const formattedDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00Z`));
const tagKey = (tag) =>
  tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const architectureDiagram = (architecture) => {
  if (!architecture?.layers?.length) return '';
  return `
    <figure class="architecture" aria-labelledby="architecture-title architecture-caption">
      <figcaption id="architecture-caption">
        <span>Arquitectura de referencia</span>${esc(architecture.caption)}
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

const conversationCta = (article) => {
  const byTag = {
    Pagos: '¿Trabajás en fintech, pagos o suscripciones? Me interesa comparar decisiones de producto y arquitectura.',
    IA: '¿Tu equipo está evaluando IA aplicada? Me interesa conocer el problema que están intentando resolver.',
    Arquitectura: '¿Estás diseñando una arquitectura parecida? Podemos contrastar decisiones y trade-offs.',
    Producto: '¿Estás validando un producto? Me interesa conversar sobre la hipótesis y el camino técnico.',
    Cloud: '¿Tu equipo está ordenando una decisión de cloud u operación? Podemos intercambiar experiencias.',
    Liderazgo: '¿Estás liderando un equipo de ingeniería? Me interesa conversar sobre los desafíos que están atravesando.',
  };
  const prompt = article.tags.map((tag) => byTag[tag]).find(Boolean)
    || '¿Estás trabajando en un desafío parecido? Me interesa conocer el contexto y comparar experiencias.';
  const subject = encodeURIComponent(`Conversación sobre: ${article.title}`);
  const body = encodeURIComponent(`${prompt}\n\nLlegué desde el artículo: ${article.title}\n${site.baseUrl}/blog/${article.slug}/`);
  return `<aside class="article__conversation">
      <p class="article__conversation-label">Continuemos la conversación</p>
      <h2>${esc(prompt)}</h2>
      <p>Si este tema se relaciona con tu producto, equipo o investigación, escribime. Respondo personalmente y sin compromiso comercial.</p>
      <a class="btn btn--primary js-track-conversation" href="mailto:${esc(site.links.email)}?subject=${subject}&amp;body=${body}">Escribirme sobre este tema</a>
    </aside>`;
};

export const blogIndex = ({ articles }) => {
  const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const tags = [...new Set(sortedArticles.flatMap((article) => article.tags))].sort((a, b) => a.localeCompare(b, 'es'));
  return `
<section class="blog-index">
  <div class="shell">
    <header class="blog-index__head">
      <p class="section__eyebrow">Blog</p>
      <h1 class="blog-index__title">Tecnología que sale de construir producto</h1>
      <p class="section__lead">Notas sobre IA, arquitectura, infraestructura y emprendimiento a partir de decisiones tomadas en proyectos propios.</p>
      <div class="hero__ctas">
        <a class="btn btn--ghost" href="/newsletter/">Ver la newsletter</a>
        <a class="btn btn--ghost js-track-newsletter-interest" href="/newsletter/#suscribirme">Suscribirme</a>
      </div>
    </header>
    <section class="blog-pillars" id="pilares" aria-labelledby="blog-pillars-title">
      <p class="section__eyebrow">Pilares</p>
      <h2 id="blog-pillars-title">Tres puertas de entrada para entender el recorrido</h2>
      <div class="pillar-strip">
        ${pillars.map((pillar) => `<article class="pillar-card">
          <p class="pillar-card__meta">${esc(pillar.eyebrow)}</p>
          <h3><a href="/temas/${esc(pillar.slug)}/" class="js-track-pillar-hub">${esc(pillar.title)}</a></h3>
          <p>${esc(pillar.description)}</p>
        </article>`).join('')}
      </div>
    </section>
    <div class="filters blog-filters" role="group" aria-label="Filtrar artículos por tema" data-blog-filters>
      <button type="button" class="filters__btn" data-blog-filter="all" aria-pressed="true">Todo</button>
      ${tags.map((tag) => `<button type="button" class="filters__btn" data-blog-filter="${esc(tagKey(tag))}" aria-pressed="false">${esc(tag)}</button>`).join('')}
    </div>
    <div class="article-grid" data-blog-grid>
      ${sortedArticles.map((article) => `
        <article class="article-card" data-blog-card data-tags="${esc(article.tags.map(tagKey).join(' '))}" data-reveal>
          <p class="article-card__meta"><span>${esc(article.category)}</span><time datetime="${esc(article.date)}">${esc(formattedDate(article.date))}</time></p>
          <h2 class="article-card__title"><a href="/blog/${esc(article.slug)}/" class="js-track-article-card">${esc(article.title)}</a></h2>
          <p class="article-card__description">${esc(article.description)}</p>
          <ul class="article-card__tags" aria-label="Temas">${article.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
          <div class="article-card__footer"><span>${esc(article.readingTime)}</span><a href="/blog/${esc(article.slug)}/">Leer artículo <span aria-hidden="true">→</span></a></div>
        </article>`).join('')}
    </div>
    <p class="blog-empty" data-blog-empty hidden>No hay artículos con esta combinación de tags.</p>
    <div class="blog-more"><button type="button" class="btn btn--ghost" data-blog-load-more>Cargar más artículos</button></div>
    <div class="blog-newsletter">
      ${newsletterForm({
        source: 'blog-index',
        path: '/blog/',
        compact: true,
        title: '¿Querés recibir la primera edición?',
        lead: 'Si el blog te resulta útil, la newsletter sirve para profundizar ideas y abrir conversaciones con menos ruido que una red social.',
        buttonLabel: 'Suscribirme',
      })}
    </div>
  </div>
</section>`;
};

export const articlePage = ({ article, relatedProject, relatedArticles = [], pillar = null }) => `
<article class="article">
  <header class="shell article__head">
    <a class="case__back" href="/blog/"><span aria-hidden="true">←</span> Volver al blog</a>
    <p class="article__meta"><span>${esc(article.category)}</span><time datetime="${esc(article.date)}">${esc(formattedDate(article.date))}</time><span>${esc(article.readingTime)}</span></p>
    <h1 class="article__title">${esc(article.title)}</h1>
    <p class="article__lead">${esc(article.lead)}</p>
  </header>
  <div class="shell article__layout">
    <aside class="article__aside">
      ${pillar ? `<div><p>Pilar</p><a href="/temas/${esc(pillar.slug)}/" class="js-track-pillar-hub">${esc(pillar.title)} <span aria-hidden="true">→</span></a></div>` : ''}
      ${
        relatedProject
          ? `<div><p>Este artículo nace del proyecto</p>
      <a href="${projectHref(relatedProject)}" class="js-track-origin-project">${esc(article.projectName)} <span aria-hidden="true">→</span></a></div>`
          : `<div><p>Contexto</p>
      <span>${esc(article.contextLabel || 'Perfil profesional')}</span>
      ${article.sourceUrl ? `<a href="${esc(article.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(article.sourceLabel || 'Ver repositorio')} <span aria-hidden="true">↗</span></a>` : ''}</div>`
      }
    </aside>
    <div class="article__content">
      ${article.sections.map((section) => `
        <section>
          <h2>${esc(section.title)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
        </section>`).join('')}
      ${architectureDiagram(article.architecture)}
      <p class="article__takeaway">${esc(article.takeaway)}</p>
      ${conversationCta(article)}
    </div>
  </div>
  ${
    relatedArticles.length
      ? `<section class="shell article__related" aria-labelledby="related-articles-title">
    <p class="section__eyebrow">Seguir leyendo</p>
    <h2 id="related-articles-title">Artículos relacionados</h2>
    <ul>
      ${relatedArticles.map((related) => `<li><a href="/blog/${esc(related.slug)}/" class="js-track-related-article">
        <span>${esc(related.category)}</span>
        <strong>${esc(related.title)}</strong>
        <small>${esc(related.description)}</small>
      </a></li>`).join('')}
    </ul>
  </section>`
      : ''
  }
</article>`;
