import { esc, projectHref } from './components.mjs';
import { site } from '../data/site.js';
import { newsletterForm } from './newsletter-form.mjs';

const dateFormatter = new Intl.DateTimeFormat('es-UY', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const formattedDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00Z`));
const articleHref = (slug) => `/blog/${slug}/`;
const newsletterHref = (slug = '') => (slug ? `/newsletter/${slug}/` : '/newsletter/');

export const newsletterIndex = ({ newsletter, issues, articlesBySlug, projectsBySlug }) => `
<section class="newsletter-hub">
  <div class="shell">
    <header class="newsletter-hub__head">
      <p class="section__eyebrow">Newsletter</p>
      <h1 class="newsletter-hub__title">${esc(newsletter.fullTitle)}</h1>
      <p class="section__lead">${esc(newsletter.description)}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary js-track-newsletter-interest" href="#suscribirme">${esc(newsletter.launchCta.label)}</a>
        <a class="btn btn--ghost" href="#archivo">Ver archivo público</a>
      </div>
      <p class="newsletter-hub__note">${esc(newsletter.promise)}</p>
    </header>

    <div id="suscribirme">
      ${newsletterForm({
        source: 'newsletter-hub',
        path: '/newsletter/',
        title: 'Recibí la primera edición',
        lead: 'Dejá tu email, elegí tu interés principal y te sumo a la lista para las próximas ediciones.',
        buttonLabel: 'Quiero recibir la primera edición',
      })}
    </div>

    <div class="newsletter-hub__grid">
      <article class="newsletter-panel" data-reveal>
        <p class="newsletter-panel__label">Cadencia</p>
        <h2>Un ritmo sostenible</h2>
        <p>${esc(newsletter.cadence)}</p>
      </article>
      <article class="newsletter-panel" data-reveal>
        <p class="newsletter-panel__label">Para quién</p>
        <ul class="prose-list">${newsletter.primaryAudiences.map((audience) => `<li>${esc(audience)}</li>`).join('')}</ul>
      </article>
      <article class="newsletter-panel" data-reveal>
        <p class="newsletter-panel__label">Estado operativo</p>
        <p>${esc(newsletter.statusNote)}</p>
      </article>
    </div>

    <section class="newsletter-pillars" aria-labelledby="newsletter-pillars-title">
      <p class="section__eyebrow">Pilares editoriales</p>
      <h2 id="newsletter-pillars-title">Seis temas, una sola voz</h2>
      <div class="pillar-strip">
        ${newsletter.pillars.map((pillar) => `<article class="pillar-card" data-reveal>
          <p class="pillar-card__meta">${esc(pillar.title)}</p>
          <p>${esc(pillar.description)}</p>
        </article>`).join('')}
      </div>
    </section>

    <section class="newsletter-archive" id="archivo" aria-labelledby="newsletter-archive-title">
      <div class="section__head" data-reveal>
        <p class="section__eyebrow">Archivo público</p>
        <h2 class="section__title" id="newsletter-archive-title">Ediciones disponibles</h2>
        <p class="section__lead">Cada edición conecta una experiencia real, una idea práctica y un puente hacia el resto del ecosistema: blog, proyectos y conversaciones.</p>
      </div>
      <div class="newsletter-archive__list">
        ${issues.map((issue) => {
          const relatedArticle = articlesBySlug[issue.articleSlug];
          const relatedProject = projectsBySlug[issue.projectSlug];
          return `<article class="newsletter-card" data-reveal>
            <p class="newsletter-card__meta"><span>${esc(issue.edition)}</span><time datetime="${esc(issue.date)}">${esc(formattedDate(issue.date))}</time></p>
            <h3><a href="${newsletterHref(issue.slug)}" class="js-track-newsletter-issue">${esc(issue.title)}</a></h3>
            <p>${esc(issue.excerpt)}</p>
            <ul class="article-card__tags" aria-label="Segmentos">${issue.segment.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
            <div class="newsletter-card__links">
              <a href="${newsletterHref(issue.slug)}" class="link link--strong js-track-newsletter-issue">Leer edición <span class="link__arrow" aria-hidden="true">→</span></a>
              ${relatedArticle ? `<a href="${articleHref(relatedArticle.slug)}">Artículo relacionado</a>` : ''}
              ${relatedProject ? `<a href="${projectHref(relatedProject)}">Proyecto relacionado</a>` : ''}
            </div>
          </article>`;
        }).join('')}
      </div>
    </section>

    <section class="newsletter-sequence" aria-labelledby="newsletter-sequence-title">
      <div class="section__head" data-reveal>
        <p class="section__eyebrow">Secuencia de bienvenida</p>
        <h2 class="section__title" id="newsletter-sequence-title">Cinco emails para convertir suscripción en relación</h2>
      </div>
      <ol class="newsletter-sequence__list">
        ${newsletter.welcomeSequence.map((email) => `<li class="newsletter-sequence__item" data-reveal>
          <p class="newsletter-panel__label">${esc(email.step)}</p>
          <h3>${esc(email.title)}</h3>
          <p>${esc(email.summary)}</p>
          <p><strong>Objetivo:</strong> ${esc(email.goal)}</p>
          <p><strong>CTA:</strong> ${esc(email.cta)}</p>
        </li>`).join('')}
      </ol>
    </section>
  </div>
</section>`;

export const newsletterIssuePage = ({ issue, relatedArticle, relatedProject }) => `
<article class="newsletter-issue">
  <header class="shell newsletter-issue__head">
    <a class="case__back" href="/newsletter/"><span aria-hidden="true">←</span> Volver a la newsletter</a>
    <p class="newsletter-issue__meta"><span>${esc(issue.edition)}</span><time datetime="${esc(issue.date)}">${esc(formattedDate(issue.date))}</time><span>${esc(issue.format)}</span></p>
    <h1 class="newsletter-issue__title">${esc(issue.title)}</h1>
    <p class="newsletter-issue__lead">${esc(issue.idea)}</p>
  </header>

  <div class="shell newsletter-issue__layout">
    <aside class="newsletter-issue__aside">
      <div>
        <p>Audiencia principal</p>
        <span>${esc(issue.audiencePrimary)}</span>
      </div>
      <div>
        <p>Objetivo</p>
        <span>${esc(issue.objective)}</span>
      </div>
      ${relatedProject ? `<div><p>Proyecto relacionado</p><a href="${projectHref(relatedProject)}">${esc(issue.projectName)} <span aria-hidden="true">→</span></a></div>` : ''}
      ${relatedArticle ? `<div><p>Artículo relacionado</p><a href="${articleHref(relatedArticle.slug)}">${esc(issue.articleTitle)} <span aria-hidden="true">→</span></a></div>` : ''}
    </aside>

    <div class="newsletter-issue__content">
      ${issue.opening.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
      ${issue.sections.map((section) => `<section>
        <h2>${esc(section.title)}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
      </section>`).join('')}

      <section class="newsletter-issue__tool">
        <p class="newsletter-panel__label">Herramienta práctica</p>
        <h2>${esc(issue.practicalTool.title)}</h2>
        <ul class="prose-list">${issue.practicalTool.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>

      <section class="newsletter-issue__cta">
        <p class="newsletter-panel__label">Conexión con el ecosistema</p>
        <p>${esc(issue.excerpt)}</p>
        <div class="newsletter-card__links">
          ${relatedArticle ? `<a href="${articleHref(relatedArticle.slug)}">${esc(issue.ecosystem.articleLabel)}</a>` : ''}
          ${relatedProject ? `<a href="${projectHref(relatedProject)}">${esc(issue.ecosystem.projectLabel)}</a>` : ''}
        </div>
        <a class="btn btn--primary js-track-newsletter-interest" href="/newsletter/#suscribirme">${esc(issue.cta.label)}</a>
      </section>

      <p class="article__takeaway">${esc(issue.finalQuestion)}</p>
      <p>${esc(issue.signature)}</p>
      <p><strong>PD:</strong> ${esc(issue.ps)}</p>
    </div>
  </div>
</article>`;
