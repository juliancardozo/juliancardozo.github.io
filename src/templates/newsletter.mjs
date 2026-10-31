import { esc, href, projectHref } from './components.mjs';
import { newsletterForm } from './newsletter-form.mjs';

const formattedDate = (t, date) =>
  new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));

export const newsletterIndex = ({ t, newsletter, issues, articlesBySlug, projectsBySlug }) => {
  const n = t.newsletterPage;
  return `
<section class="newsletter-hub">
  <div class="shell">
    <header class="newsletter-hub__head">
      <p class="section__eyebrow">${esc(n.eyebrow)}</p>
      <h1 class="newsletter-hub__title">${esc(newsletter.fullTitle)}</h1>
      <p class="section__lead">${esc(newsletter.description)}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary js-track-newsletter-interest" href="#suscribirme">${esc(newsletter.launchCta.label)}</a>
        <a class="btn btn--ghost" href="#archivo">${esc(n.archiveCta)}</a>
      </div>
      <p class="newsletter-hub__note">${esc(newsletter.promise)}</p>
    </header>

    <div id="suscribirme">
      ${newsletterForm({
        t,
        newsletter,
        source: 'newsletter-hub',
        path: href(t, 'newsletter'),
        title: n.formTitle,
        lead: n.formLead,
        buttonLabel: newsletter.launchCta.label,
      })}
    </div>

    <div class="newsletter-hub__grid">
      <article class="newsletter-panel" data-reveal>
        <p class="newsletter-panel__label">${esc(n.cadenceLabel)}</p>
        <h2>${esc(n.cadenceTitle)}</h2>
        <p>${esc(newsletter.cadence)}</p>
      </article>
      <article class="newsletter-panel" data-reveal>
        <p class="newsletter-panel__label">${esc(n.audienceLabel)}</p>
        <ul class="prose-list">${newsletter.primaryAudiences.map((audience) => `<li>${esc(audience)}</li>`).join('')}</ul>
      </article>
      <article class="newsletter-panel" data-reveal>
        <p class="newsletter-panel__label">${esc(n.statusLabel)}</p>
        <p>${esc(newsletter.statusNote)}</p>
      </article>
    </div>

    <section class="newsletter-pillars" aria-labelledby="newsletter-pillars-title">
      <p class="section__eyebrow">${esc(n.pillarsEyebrow)}</p>
      <h2 id="newsletter-pillars-title">${esc(n.pillarsTitle)}</h2>
      <div class="pillar-strip">
        ${newsletter.pillars.map((pillar) => `<article class="pillar-card" data-reveal>
          <p class="pillar-card__meta">${esc(pillar.title)}</p>
          <p>${esc(pillar.description)}</p>
        </article>`).join('')}
      </div>
    </section>

    <section class="newsletter-archive" id="archivo" aria-labelledby="newsletter-archive-title">
      <div class="section__head" data-reveal>
        <p class="section__eyebrow">${esc(n.archiveEyebrow)}</p>
        <h2 class="section__title" id="newsletter-archive-title">${esc(n.archiveTitle)}</h2>
        <p class="section__lead">${esc(n.archiveLead)}</p>
      </div>
      <div class="newsletter-archive__list">
        ${issues.map((issue) => {
          const relatedArticle = articlesBySlug[issue.articleSlug];
          const relatedProject = projectsBySlug[issue.projectSlug];
          return `<article class="newsletter-card" data-reveal>
            <p class="newsletter-card__meta"><span>${esc(issue.edition)}</span><time datetime="${esc(issue.date)}">${esc(formattedDate(t, issue.date))}</time></p>
            <h3><a href="${href(t, 'newsletter', issue.slug)}" class="js-track-newsletter-issue">${esc(issue.title)}</a></h3>
            <p>${esc(issue.excerpt)}</p>
            <ul class="article-card__tags" aria-label="${esc(n.segmentsLabel)}">${issue.segment.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
            <div class="newsletter-card__links">
              <a href="${href(t, 'newsletter', issue.slug)}" class="link link--strong js-track-newsletter-issue">${esc(n.readIssue)} <span class="link__arrow" aria-hidden="true">→</span></a>
              ${relatedArticle ? `<a href="${href(t, 'blog', relatedArticle.slug)}">${esc(n.relatedArticle)}</a>` : ''}
              ${relatedProject ? `<a href="${projectHref(relatedProject, t)}">${esc(n.relatedProject)}</a>` : ''}
            </div>
          </article>`;
        }).join('')}
      </div>
    </section>

    <section class="newsletter-sequence" aria-labelledby="newsletter-sequence-title">
      <div class="section__head" data-reveal>
        <p class="section__eyebrow">${esc(n.sequenceEyebrow)}</p>
        <h2 class="section__title" id="newsletter-sequence-title">${esc(n.sequenceTitle)}</h2>
      </div>
      <ol class="newsletter-sequence__list">
        ${newsletter.welcomeSequence.map((email) => `<li class="newsletter-sequence__item" data-reveal>
          <p class="newsletter-panel__label">${esc(email.step)}</p>
          <h3>${esc(email.title)}</h3>
          <p>${esc(email.summary)}</p>
          <p><strong>${esc(n.goalLabel)}</strong> ${esc(email.goal)}</p>
          <p><strong>CTA:</strong> ${esc(email.cta)}</p>
        </li>`).join('')}
      </ol>
    </section>
  </div>
</section>`;
};

export const newsletterIssuePage = ({ t, issue, relatedArticle, relatedProject }) => {
  const n = t.newsletterPage;
  return `
<article class="newsletter-issue">
  <header class="shell newsletter-issue__head">
    <a class="case__back" href="${href(t, 'newsletter')}"><span aria-hidden="true">←</span> ${esc(n.back)}</a>
    <p class="newsletter-issue__meta"><span>${esc(issue.edition)}</span><time datetime="${esc(issue.date)}">${esc(formattedDate(t, issue.date))}</time><span>${esc(issue.format)}</span></p>
    <h1 class="newsletter-issue__title">${esc(issue.title)}</h1>
    <p class="newsletter-issue__lead">${esc(issue.idea)}</p>
  </header>

  <div class="shell newsletter-issue__layout">
    <aside class="newsletter-issue__aside">
      <div>
        <p>${esc(n.primaryAudience)}</p>
        <span>${esc(issue.audiencePrimary)}</span>
      </div>
      <div>
        <p>${esc(n.objective)}</p>
        <span>${esc(issue.objective)}</span>
      </div>
      ${relatedProject ? `<div><p>${esc(n.relatedProject)}</p><a href="${projectHref(relatedProject, t)}">${esc(issue.projectName)} <span aria-hidden="true">→</span></a></div>` : ''}
      ${relatedArticle ? `<div><p>${esc(n.relatedArticle)}</p><a href="${href(t, 'blog', relatedArticle.slug)}">${esc(issue.articleTitle)} <span aria-hidden="true">→</span></a></div>` : ''}
    </aside>

    <div class="newsletter-issue__content">
      ${issue.opening.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
      ${issue.sections.map((section) => `<section>
        <h2>${esc(section.title)}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
      </section>`).join('')}

      <section class="newsletter-issue__tool">
        <p class="newsletter-panel__label">${esc(n.toolLabel)}</p>
        <h2>${esc(issue.practicalTool.title)}</h2>
        <ul class="prose-list">${issue.practicalTool.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>

      <section class="newsletter-issue__cta">
        <p class="newsletter-panel__label">${esc(n.ecosystemLabel)}</p>
        <p>${esc(issue.excerpt)}</p>
        <div class="newsletter-card__links">
          ${relatedArticle ? `<a href="${href(t, 'blog', relatedArticle.slug)}">${esc(issue.ecosystem.articleLabel)}</a>` : ''}
          ${relatedProject ? `<a href="${projectHref(relatedProject, t)}">${esc(issue.ecosystem.projectLabel)}</a>` : ''}
        </div>
        <a class="btn btn--primary js-track-newsletter-interest" href="${href(t, 'newsletter')}#suscribirme">${esc(issue.cta.label)}</a>
      </section>

      <p class="article__takeaway">${esc(issue.finalQuestion)}</p>
      <p>${esc(issue.signature)}</p>
      <p><strong>${esc(n.psLabel)}</strong> ${esc(issue.ps)}</p>
    </div>
  </div>
</article>`;
};
