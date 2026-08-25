import { esc, projectHref, externalLink } from './components.mjs';

export const pillarPage = ({ pillar, articles, projects, contactEmail }) => {
  const subject = encodeURIComponent(`Conversación sobre ${pillar.title}`);
  const body = encodeURIComponent(`${pillar.cta}\n\nLlegué desde el pilar: ${pillar.title}\n`);
  return `
<article class="pillar">
  <div class="shell pillar__head">
    <a class="case__back" href="/blog/#pilares"><span aria-hidden="true">←</span> Volver a los pilares</a>
    <p class="section__eyebrow">${esc(pillar.eyebrow)}</p>
    <h1 class="pillar__title">${esc(pillar.title)}</h1>
    <p class="section__lead">${esc(pillar.lead)}</p>
  </div>

  <div class="shell pillar__layout">
    <aside class="pillar__aside">
      <div>
        <p class="pillar__label">Para quién</p>
        <ul class="pillar__list">${pillar.audiences.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </div>
      <div>
        <p class="pillar__label">Conversación</p>
        <a class="btn btn--primary" href="mailto:${esc(contactEmail)}?subject=${subject}&amp;body=${body}">Escribirme sobre este tema</a>
      </div>
    </aside>

    <div class="pillar__content">
      <section class="pillar__section">
        <h2>Preguntas que organiza este pilar</h2>
        <ul class="prose-list prose-list--next">${pillar.questions.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>

      <section class="pillar__section">
        <h2>Artículos para entrar en tema</h2>
        <div class="pillar__grid">
          ${articles.map((article) => `<article class="pillar-card">
            <p class="pillar-card__meta">${esc(article.category)}</p>
            <h3><a href="/blog/${esc(article.slug)}/">${esc(article.title)}</a></h3>
            <p>${esc(article.description)}</p>
          </article>`).join('')}
        </div>
      </section>

      <section class="pillar__section">
        <h2>Proyectos que sirven como evidencia</h2>
        <div class="pillar__grid">
          ${projects.map((project) => `<article class="pillar-card">
            <p class="pillar-card__meta">${esc(project.categoryLabel)}</p>
            <h3><a href="${projectHref(project)}">${esc(project.title)}</a></h3>
            <p>${esc(project.tagline)}</p>
            <div class="pillar-card__actions">
              <a class="link link--strong" href="${projectHref(project)}">Ver caso<span class="link__arrow" aria-hidden="true">→</span></a>
              ${project.demoUrl ? externalLink(project.demoUrl, project.demoLabel || 'Ver online') : ''}
            </div>
          </article>`).join('')}
        </div>
      </section>
    </div>
  </div>
</article>`;
};
