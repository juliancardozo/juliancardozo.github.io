import { esc, href, projectHref, externalLink } from './components.mjs';

export const pillarPage = ({ t, pillar, articles, projects, contactEmail }) => {
  const p = t.pillarPage;
  const subject = encodeURIComponent(`${p.subjectPrefix}${pillar.title}`);
  const body = encodeURIComponent(`${pillar.cta}\n\n${p.cameFrom}${pillar.title}\n`);
  return `
<article class="pillar">
  <div class="shell pillar__head">
    <a class="case__back" href="${href(t, 'blog')}#pilares"><span aria-hidden="true">←</span> ${esc(p.back)}</a>
    <p class="section__eyebrow">${esc(pillar.eyebrow)}</p>
    <h1 class="pillar__title">${esc(pillar.title)}</h1>
    <p class="section__lead">${esc(pillar.lead)}</p>
  </div>

  <div class="shell pillar__layout">
    <aside class="pillar__aside">
      <div>
        <p class="pillar__label">${esc(p.audienceLabel)}</p>
        <ul class="pillar__list">${pillar.audiences.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </div>
      <div>
        <p class="pillar__label">${esc(p.conversationLabel)}</p>
        <a class="btn btn--primary" href="mailto:${esc(contactEmail)}?subject=${subject}&amp;body=${body}">${esc(p.writeMe)}</a>
      </div>
    </aside>

    <div class="pillar__content">
      <section class="pillar__section">
        <h2>${esc(p.questionsTitle)}</h2>
        <ul class="prose-list prose-list--next">${pillar.questions.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>

      <section class="pillar__section">
        <h2>${esc(p.articlesTitle)}</h2>
        <div class="pillar__grid">
          ${articles.map((article) => `<article class="pillar-card">
            <p class="pillar-card__meta">${esc(article.category)}</p>
            <h3><a href="${href(t, 'blog', article.slug)}">${esc(article.title)}</a></h3>
            <p>${esc(article.description)}</p>
          </article>`).join('')}
        </div>
      </section>

      <section class="pillar__section">
        <h2>${esc(p.projectsTitle)}</h2>
        <div class="pillar__grid">
          ${projects.map((project) => `<article class="pillar-card">
            <p class="pillar-card__meta">${esc(project.categoryLabel)}</p>
            <h3><a href="${projectHref(project, t)}">${esc(project.title)}</a></h3>
            <p>${esc(project.tagline)}</p>
            <div class="pillar-card__actions">
              <a class="link link--strong" href="${projectHref(project, t)}">${esc(p.viewCase)}<span class="link__arrow" aria-hidden="true">→</span></a>
              ${project.demoUrl ? externalLink(project.demoUrl, project.demoLabel || t.ui.viewDemo) : ''}
            </div>
          </article>`).join('')}
        </div>
      </section>
    </div>
  </div>
</article>`;
};
