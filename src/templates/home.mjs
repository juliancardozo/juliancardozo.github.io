import { esc, inlineCode, statusBadge, cover, href, projectHref, externalLink, originExcerpt, githubIcon } from './components.mjs';
import { site } from '../data/site.js';

const external = 'target="_blank" rel="noopener noreferrer"';

// `wide`: la ultima tarjeta toma el formato ancho cuando quedaria sola en su fila.
const featuredCard = (project, t, index, wide = false) => `
<article class="card card--featured ${index === 0 || wide ? 'card--lead' : ''}" data-reveal>
  <a class="card__cover" href="${projectHref(project, t)}" tabindex="-1" aria-hidden="true">${cover(project, t, { eager: index === 0 })}</a>
  <div class="card__body">
    <p class="card__meta">
      <span class="card__category">${esc(project.categoryLabel)}</span>
      ${statusBadge(project.status, t)}
      <span class="card__year">${esc(project.year)}</span>
    </p>
    <h3 class="card__title"><a href="${projectHref(project, t)}">${esc(project.title)}</a></h3>
    <p class="card__tagline">${esc(project.tagline)}</p>
    <p class="card__origin"><span class="card__origin-label">${esc(t.ui.originLabel)}</span>${esc(originExcerpt(project.originStory))}</p>
    <ul class="chips">${project.stack.slice(0, 5).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    <div class="card__actions">
      <a class="link link--strong" href="${projectHref(project, t)}">${esc(t.ui.viewCase)}<span class="link__arrow" aria-hidden="true">→</span></a>
      ${project.demoUrl ? externalLink(project.demoUrl, project.demoLabel || t.ui.viewDemo) : ''}
      ${project.repositoryUrl ? externalLink(project.repositoryUrl, t.ui.viewRepo) : ''}
    </div>
  </div>
</article>`;

/** Descarga del CV: mismo archivo y nombre sugerido en todos los botones. */
const cvButton = (label, variant = 'ghost', extraClass = '') =>
  site.links.cv
    ? `<a class="btn btn--${esc(variant)}${extraClass ? ` ${extraClass}` : ''}" href="${esc(site.links.cv)}" download="CV_Julian_Cardozo_Engineering_Manager.pdf" type="application/pdf">${esc(label)}<span aria-hidden="true">↓</span></a>`
    : '';

/** Botón del hero: ancla interna, descarga del CV o perfil externo (`kind: 'cv' | 'github' | 'linkedin'`). */
const heroCta = (cta) => {
  if (cta.kind === 'cv') return cvButton(cta.label, cta.variant);
  const url = cta.kind ? site.links[cta.kind] : cta.href;
  if (!url) return '';
  const icon = cta.kind === 'github' ? githubIcon : '';
  return `<a class="btn btn--${esc(cta.variant)}" href="${esc(url)}"${cta.kind ? ` ${external}` : ''}>${icon}${esc(cta.label)}</a>`;
};

/** Enlace a la evidencia de una fortaleza: tema, artículo, proyecto o GitHub. */
const evidenceLink = (item, t) =>
  item.kind === 'github'
    ? `<a class="link link--strong" href="${esc(site.links.github)}" ${external}>${githubIcon}${esc(item.label)}<span class="link__arrow" aria-hidden="true">↗</span></a>`
    : `<a class="link link--strong" href="${href(t, item.kind, item.slug)}">${esc(item.label)}<span class="link__arrow" aria-hidden="true">→</span></a>`;

export const home = ({ t, featured, pillars }) => {
  const s = t.sections;
  const highlighted = s.productos.highlight
    .map((slug) => featured.find((project) => project.slug === slug))
    .filter(Boolean);
  const others = featured.filter((project) => !highlighted.includes(project));

  return `
<section class="hero">
  <div class="shell">
    <p class="hero__eyebrow">${esc(t.hero.eyebrow)}</p>
    <h1 class="hero__title">${esc(t.hero.title)}</h1>
    <p class="hero__lead">${esc(t.hero.lead)}</p>
    <p class="hero__note">${esc(t.hero.note)}</p>
    <div class="hero__ctas">
      ${t.hero.ctas.map(heroCta).join('')}
    </div>
    <dl class="facts">
      ${t.hero.facts
        .map((fact) => {
          const value = fact.kind
            ? `<a href="${esc(site.links[fact.kind])}" ${external}>${esc(fact.value)}</a>`
            : esc(fact.value);
          return `<div class="facts__item"><dt class="facts__value">${value}</dt><dd class="facts__label">${esc(fact.label)}</dd></div>`;
        })
        .join('')}
    </dl>
  </div>
</section>

<section class="section section--alt ai-cta" id="ia" aria-labelledby="ia-title">
  <div class="shell" data-reveal>
    <p class="section__eyebrow">${esc(s.ia.eyebrow)}</p>
    <h2 class="section__title" id="ia-title">${esc(s.ia.title)}</h2>
    ${s.ia.body.map((paragraph) => `<p class="section__lead">${esc(paragraph)}</p>`).join('\n    ')}
    ${s.ia.layers ? `<ol class="ai-layers">${s.ia.layers
      .map((layer) => `<li><h3 class="ai-layers__title">${esc(layer.title)}</h3><p>${inlineCode(layer.body)}</p></li>`)
      .join('')}</ol>` : ''}
    ${s.ia.closing ? `<p class="section__lead ai-cta__closing">${esc(s.ia.closing)}</p>` : ''}
    <ul class="chips">${s.ia.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
    <div class="hero__ctas">${s.ia.cta ? `<a class="btn btn--primary" href="#contacto">${esc(s.ia.cta)}<span aria-hidden="true">→</span></a>` : ''}
      ${s.ia.pillarCta ? `<a class="btn ${s.ia.cta ? 'btn--ghost' : 'btn--primary'}" href="${href(t, 'topic', s.ia.pillarSlug)}">${esc(s.ia.pillarCta)}</a>` : ''}
      ${s.ia.blogCta ? `<a class="btn btn--ghost" href="${href(t, 'blog')}?tag=${encodeURIComponent(s.ia.blogTag)}#articulos">${esc(s.ia.blogCta)}</a>` : ''}</div>
  </div>
</section>

<section class="section" id="fortalezas" aria-labelledby="fortalezas-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.fortalezas.eyebrow)}</p>
      <h2 class="section__title" id="fortalezas-title">${esc(s.fortalezas.title)}</h2>
      <p class="section__lead">${esc(s.fortalezas.lead)}</p>
    </header>
    <div class="pillar-strip">
      ${s.fortalezas.items
        .map(
          (item) => `<article class="pillar-card" data-reveal>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.body)}</p>
        <div class="pillar-card__actions">${item.evidence.map((link) => evidenceLink(link, t)).join('')}</div>
      </article>`,
        )
        .join('')}
    </div>
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
      ${[...s.recorrido.stages]
        .reverse()
        .map(
          (stage) => `<li class="path__item" data-reveal>
        <div class="path__marker" aria-hidden="true"></div>
        <p class="path__period">${esc(stage.period)}</p>
        <h3 class="path__title">${esc(stage.title)}</h3>
        <p class="path__body">${esc(stage.body)}</p>
        <p class="path__gained"><span>${esc(s.recorrido.gainedLabel)}</span>${esc(stage.gained)}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <aside class="about__future" data-reveal>
      <p class="about__future-label">${esc(s.acerca.future.label)}</p>
      <h3>${esc(s.acerca.future.title)}</h3>
      <p>${esc(s.acerca.future.body)}</p>
      ${s.acerca.future.cta ? cvButton(s.acerca.future.cta, 'primary', 'about__future-cta') : ''}
    </aside>
  </div>
</section>

<section class="section" id="liderazgo" aria-labelledby="liderazgo-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.liderazgo.eyebrow)}</p>
      <h2 class="section__title" id="liderazgo-title">${esc(s.liderazgo.title)}</h2>
    </header>
    <div class="principles">
      ${s.liderazgo.items
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

<section class="section section--alt" id="productos" aria-labelledby="productos-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.productos.eyebrow)}</p>
      <h2 class="section__title" id="productos-title">${esc(s.productos.title)}</h2>
      <p class="section__lead">${esc(s.productos.lead)}</p>
    </header>
    <aside class="github-panel" data-reveal>
      <div>
        <h3>${esc(s.productos.github.title)}</h3>
        <p>${esc(s.productos.github.body)}</p>
      </div>
      <a class="btn btn--primary" href="${esc(site.links.github)}" ${external}>${githubIcon}${esc(s.productos.github.cta)}</a>
    </aside>
    <div class="cards">
      ${highlighted
        .map((project, index) => {
          const orphan = index > 0 && index === highlighted.length - 1 && (highlighted.length - 1) % 2 === 1;
          return featuredCard(project, t, index, orphan);
        })
        .join('')}
    </div>
    ${
      others.length
        ? `<div class="more-projects" data-reveal>
      <h3>${esc(s.productos.moreLabel)}</h3>
      <ul>${others
        .map((project) => `<li><a href="${projectHref(project, t)}">${esc(project.title)}</a><span>${esc(project.tagline)}</span></li>`)
        .join('')}</ul>
    </div>`
        : ''
    }
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
          (group) => `<article class="skills__group"${group.id ? ` id="${esc(group.id)}"` : ''} data-reveal>
        <h3 class="skills__title">${esc(group.title)}</h3>
        <p class="skills__body">${esc(group.body)}</p>
        <ul class="skills__list">${group.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </article>`,
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--alt" id="pilares" aria-labelledby="pilares-title">
  <div class="shell">
    <header class="section__head" data-reveal>
      <p class="section__eyebrow">${esc(s.pilares.eyebrow)}</p>
      <h2 class="section__title" id="pilares-title">${esc(s.pilares.title)}</h2>
      <p class="section__lead">${esc(s.pilares.lead)}</p>
    </header>
    <div class="pillar-strip">
      ${pillars
        .map(
          (pillar) => `<article class="pillar-card" data-reveal>
        <p class="pillar-card__meta">${esc(pillar.eyebrow)}</p>
        <h3><a href="${href(t, 'topic', pillar.slug)}">${esc(pillar.title)}</a></h3>
        <p>${esc(pillar.description)}</p>
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
          ? `<a class="btn btn--primary" href="mailto:${esc(site.links.email)}?subject=${encodeURIComponent(s.contacto.emailSubject)}">${esc(s.contacto.emailLabel)}</a>`
          : ''
      }
      ${s.contacto.cvLabel ? cvButton(s.contacto.cvLabel) : ''}
      <a class="btn btn--ghost" href="${esc(site.links.github)}" ${external}>${githubIcon}${esc(s.contacto.githubLabel)}</a>
      ${
        site.links.linkedin
          ? `<a class="btn btn--ghost" href="${esc(site.links.linkedin)}" ${external}>${esc(s.contacto.linkedinLabel)}</a>`
          : ''
      }
    </div>
  </div>
</section>
`;
};
