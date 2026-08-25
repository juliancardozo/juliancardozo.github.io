import { esc, inlineCode, statusBadge, cover, projectHref, externalLink, originExcerpt } from './components.mjs';
import { labFilters } from '../data/projects.js';
import { site } from '../data/site.js';

const featuredCard = (project, t, index) => `
<article class="card card--featured ${index === 0 ? 'card--lead' : ''}" data-reveal>
  <a class="card__cover" href="${projectHref(project)}" tabindex="-1" aria-hidden="true">${cover(project, { eager: index === 0 })}</a>
  <div class="card__body">
    <p class="card__meta">
      <span class="card__category">${esc(project.categoryLabel)}</span>
      ${statusBadge(project.status)}
      <span class="card__year">${esc(project.year)}</span>
    </p>
    <h3 class="card__title"><a href="${projectHref(project)}">${esc(project.title)}</a></h3>
    <p class="card__tagline">${esc(project.tagline)}</p>
    <p class="card__origin"><span class="card__origin-label">Origen</span>${esc(originExcerpt(project.originStory))}</p>
    <ul class="chips">${project.stack.slice(0, 5).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    <div class="card__actions">
      <a class="link link--strong" href="${projectHref(project)}">${esc(t.ui.viewCase)}<span class="link__arrow" aria-hidden="true">→</span></a>
      ${project.demoUrl ? externalLink(project.demoUrl, project.demoLabel || t.ui.viewDemo) : ''}
      ${project.repositoryUrl ? externalLink(project.repositoryUrl, t.ui.viewRepo) : ''}
    </div>
  </div>
</article>`;

const labCard = (project, t) => `
<article class="lab-card" data-category="${esc(project.category)}" data-reveal>
  <p class="lab-card__meta">
    <span class="lab-card__category">${esc(project.categoryLabel)}</span>
    ${statusBadge(project.status)}
    <span class="lab-card__year">${esc(project.year)}</span>
  </p>
  <h3 class="lab-card__title">${esc(project.title)}</h3>
  <p class="lab-card__tagline">${esc(project.tagline)}</p>
  <p class="lab-card__summary">${inlineCode(project.summary)}</p>
  <ul class="chips chips--sm">${project.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
  ${
    project.repositoryUrl
      ? `<div class="lab-card__actions">${externalLink(project.repositoryUrl, t.ui.viewRepo)}</div>`
      : `<div class="lab-card__actions"><span class="lab-card__private">${esc(t.ui.noLinks)}</span></div>`
  }
</article>`;

export const home = ({ t, featured, lab }) => {
  const s = t.sections;

  return `
<section class="hero">
  <div class="shell">
    <p class="hero__eyebrow">${esc(t.hero.eyebrow)}</p>
    <h1 class="hero__title">${esc(t.hero.title)}</h1>
    <p class="hero__lead">${esc(t.hero.lead)}</p>
    <div class="hero__ctas">
      ${t.hero.ctas
        .map((cta) => `<a class="btn btn--${esc(cta.variant)}" href="${esc(cta.href)}">${esc(cta.label)}</a>`)
        .join('')}
    </div>
    <p class="hero__note">${esc(t.hero.note)}</p>
    <dl class="facts">
      ${t.hero.facts
        .map(
          (fact) => `<div class="facts__item"><dt class="facts__value">${esc(fact.value)}</dt><dd class="facts__label">${esc(fact.label)}</dd></div>`,
        )
        .join('')}
    </dl>
  </div>
</section>

<section class="section section--alt about" id="acerca" aria-labelledby="acerca-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.acerca.eyebrow)}</p>
      <h2 class="section__title" id="acerca-title">${esc(s.acerca.title)}</h2>
      <p class="section__lead">${esc(s.acerca.lead)}</p>
    </header>
    <ol class="about__path">
      ${s.acerca.stages
        .map(
          (stage, index) => `<li class="about__stage" data-reveal>
        <span class="about__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <h3>${esc(stage.title)}</h3>
        <p>${esc(stage.body)}</p>
        <p class="about__scope"><span>Alcance</span>${esc(stage.scope)}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <aside class="about__future" data-reveal>
      <p class="about__future-label">Proyección profesional</p>
      <h3>${esc(s.acerca.future.title)}</h3>
      <p>${esc(s.acerca.future.body)}</p>
    </aside>
  </div>
</section>

<section class="section" id="productos" aria-labelledby="productos-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.productos.eyebrow)}</p>
      <h2 class="section__title" id="productos-title">${esc(s.productos.title)}</h2>
      <p class="section__lead">${esc(s.productos.lead)}</p>
    </header>
    <div class="cards">
      ${featured.map((project, index) => featuredCard(project, t, index)).join('')}
    </div>
  </div>
</section>

<section class="section section--alt" id="origen" aria-labelledby="origen-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.origen.eyebrow)}</p>
      <h2 class="section__title" id="origen-title">${esc(s.origen.title)}</h2>
      <p class="section__lead">${esc(s.origen.lead)}</p>
    </header>
    <ol class="flow">
      ${s.origen.steps
        .map(
          (step, i) => `<li class="flow__item" data-reveal>
        <span class="flow__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="flow__title">${esc(step.step)}</h3>
        <p class="flow__body">${esc(step.body)}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <ul class="origins" aria-label="Ejemplos de problemas convertidos en productos">
      ${s.origen.examples
        .map(
          (ex) => `<li class="origins__item">
        <span class="origins__from">${esc(ex.from)}</span>
        <span class="origins__arrow" aria-hidden="true">→</span>
        <a class="origins__to" href="/proyectos/${esc(ex.slug)}/">${esc(ex.to)}</a>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section" id="laboratorio" aria-labelledby="laboratorio-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.laboratorio.eyebrow)}</p>
      <h2 class="section__title" id="laboratorio-title">${esc(s.laboratorio.title)}</h2>
      <p class="section__lead">${esc(s.laboratorio.lead)}</p>
    </header>
    <div class="filters" role="group" aria-label="Filtrar proyectos del laboratorio" data-filters>
      ${labFilters.es
        .map(
          (filter, i) =>
            `<button type="button" class="filters__btn" data-filter="${esc(filter.key)}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(filter.label)}</button>`,
        )
        .join('')}
    </div>
    <div class="lab-grid" data-lab-grid>
      ${lab.map((project) => labCard(project, t)).join('')}
    </div>
    <p class="lab-empty" data-lab-empty hidden>${esc(s.laboratorio.emptyLabel)}</p>
  </div>
</section>

<section class="section section--alt" id="recorrido" aria-labelledby="recorrido-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.recorrido.eyebrow)}</p>
      <h2 class="section__title" id="recorrido-title">${esc(s.recorrido.title)}</h2>
      <p class="section__lead">${esc(s.recorrido.lead)}</p>
    </header>
    <ol class="path">
      ${s.recorrido.stages
        .map(
          (stage) => `<li class="path__item" data-reveal>
        <div class="path__marker" aria-hidden="true"></div>
        <p class="path__period">${esc(stage.period)}</p>
        <h3 class="path__title">${esc(stage.title)}</h3>
        <p class="path__body">${esc(stage.body)}</p>
        <p class="path__gained"><span>Capacidad que sumó</span>${esc(stage.gained)}</p>
      </li>`,
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section" id="capacidades" aria-labelledby="capacidades-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.capacidades.eyebrow)}</p>
      <h2 class="section__title" id="capacidades-title">${esc(s.capacidades.title)}</h2>
      <p class="section__lead">${esc(s.capacidades.lead)}</p>
    </header>
    <div class="skills">
      ${s.capacidades.groups
        .map(
          (group) => `<article class="skills__group" data-reveal>
        <h3 class="skills__title">${esc(group.title)}</h3>
        <p class="skills__body">${esc(group.body)}</p>
        <ul class="skills__list">${group.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </article>`,
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--alt" id="filosofia" aria-labelledby="filosofia-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.filosofia.eyebrow)}</p>
      <h2 class="section__title" id="filosofia-title">${esc(s.filosofia.title)}</h2>
    </header>
    <div class="principles">
      ${s.filosofia.items
        .map(
          (item) => `<article class="principles__item" data-reveal>
        <h3 class="principles__title">${esc(item.title)}</h3>
        <p class="principles__body">${esc(item.body)}</p>
      </article>`,
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--contact" id="contacto" aria-labelledby="contacto-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.contacto.eyebrow)}</p>
      <h2 class="section__title" id="contacto-title">${esc(s.contacto.title)}</h2>
      <p class="section__lead">${esc(s.contacto.lead)}</p>
    </header>
    <ul class="contact-topics">
      ${s.contacto.items.map((item) => `<li>${esc(item)}</li>`).join('')}
    </ul>
    <div class="contact-links">
      ${
        site.links.email
          ? `<a class="btn btn--primary" href="mailto:${esc(site.links.email)}">${esc(s.contacto.emailLabel)}</a>`
          : ''
      }
      ${
        site.links.linkedin
          ? `<a class="btn btn--ghost" href="${esc(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(s.contacto.linkedinLabel)}</a>`
          : ''
      }
      <a class="btn btn--ghost" href="${esc(site.links.github)}" target="_blank" rel="noopener noreferrer">${esc(s.contacto.githubLabel)}</a>
    </div>
  </div>
</section>
`;
};
