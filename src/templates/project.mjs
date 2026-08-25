import { esc, inlineCode, statusBadge, cover, projectHref, externalLink } from './components.mjs';

const list = (items = [], className = 'prose-list') =>
  items.length ? `<ul class="${className}">${items.map((item) => `<li>${inlineCode(item)}</li>`).join('')}</ul>` : '';

const block = (id, title, body) =>
  body ? `<section class="case__block" id="${id}"><h2 class="case__block-title">${esc(title)}</h2>${body}</section>` : '';

export const projectPage = ({ t, project, others, articles = [] }) => {
  const u = t.ui;

  const toc = [
    ['problema', u.problem],
    ['solucion', u.solution],
    project.highlights?.length ? ['resuelto', u.highlights] : null,
    project.evidence?.length ? ['evidencia', u.evidence] : null,
    project.challenges?.length ? ['desafios', u.challenges] : null,
    project.learnings?.length ? ['aprendizajes', u.learnings] : null,
    project.nextSteps?.length ? ['proximos', u.nextSteps] : null,
  ].filter(Boolean);

  return `
<article class="case">
  <div class="shell case__head">
    <a class="case__back" href="/#productos"><span aria-hidden="true">←</span> ${esc(u.backHome)}</a>
    <p class="case__meta">
      <span class="case__category">${esc(project.categoryLabel)}</span>
      ${statusBadge(project.status)}
      <span class="case__year">${esc(project.year)}</span>
    </p>
    <h1 class="case__title">${esc(project.title)}</h1>
    <p class="case__tagline">${esc(project.tagline)}</p>
    <div class="case__actions">
      ${project.demoUrl ? externalLink(project.demoUrl, project.demoLabel || u.viewDemo, 'btn btn--primary') : ''}
      ${project.repositoryUrl ? externalLink(project.repositoryUrl, u.viewRepo, 'btn btn--ghost') : ''}
    </div>
  </div>

  <div class="shell case__hero">${cover(project, { eager: true })}</div>

  <div class="shell case__layout">
    <aside class="case__aside">
      <dl class="case__facts">
        <div><dt>${esc(u.role)}</dt><dd>${esc(project.role)}</dd></div>
        <div><dt>${esc(u.audience)}</dt><dd>${esc(project.audience)}</dd></div>
        <div><dt>${esc(u.stack)}</dt><dd><ul class="chips chips--sm">${project.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></dd></div>
        <div><dt>${esc(u.capabilities)}</dt><dd><ul class="chips chips--sm">${(project.capabilities || []).map((c) => `<li>${esc(c)}</li>`).join('')}</ul></dd></div>
      </dl>
      <nav class="case__toc" aria-label="${esc(u.onThisPage)}">
        <p class="case__toc-title">${esc(u.onThisPage)}</p>
        <ul>${toc.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}</ul>
      </nav>
    </aside>

    <div class="case__content">
      <section class="case__block case__block--origin" id="origen">
        <h2 class="case__block-title">${esc(u.origin)}</h2>
        <p class="case__origin">${esc(project.originStory)}</p>
      </section>
      ${block('problema', u.problem, `<p>${esc(project.problem)}</p>`)}
      ${block('solucion', u.solution, `<p>${esc(project.solution)}</p>`)}
      ${block('resuelto', u.highlights, list(project.highlights, 'prose-list prose-list--check'))}
      ${block('evidencia', u.evidence, list(project.evidence, 'prose-list prose-list--evidence'))}
      ${block('desafios', u.challenges, list(project.challenges))}
      ${block('aprendizajes', u.learnings, list(project.learnings))}
      ${block('proximos', u.nextSteps, list(project.nextSteps, 'prose-list prose-list--next'))}
    </div>
  </div>

  <div class="shell case__more">
    <h2 class="case__more-title">${esc(u.moreProjects)}</h2>
    <ul class="case__more-list">
      ${others
        .map(
          (other) => `<li>
        <a href="${projectHref(other)}">
          <span class="case__more-name">${esc(other.title)}</span>
          <span class="case__more-tagline">${esc(other.tagline)}</span>
        </a>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
  ${
    articles.length
      ? `<section class="shell case__insights" aria-labelledby="case-insights-title">
    <p class="section__eyebrow">Aprendizajes aplicados</p>
    <h2 class="case__more-title" id="case-insights-title">Lecturas que nacen de este proyecto</h2>
    <ul class="case__more-list">
      ${articles.map((article) => `<li>
        <a href="/blog/${esc(article.slug)}/" class="js-track-project-insight">
          <span class="case__more-name">${esc(article.title)}</span>
          <span class="case__more-tagline">${esc(article.description)}</span>
        </a>
      </li>`).join('')}
    </ul>
  </section>`
      : ''
  }
</article>
`;
};
