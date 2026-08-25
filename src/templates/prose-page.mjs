import { esc } from './components.mjs';

export const prosePage = ({ eyebrow, title, lead, sections }) => `
<section class="section prose-page">
  <div class="shell">
    <header class="section__head">
      <p class="section__eyebrow">${esc(eyebrow)}</p>
      <h1 class="section__title">${esc(title)}</h1>
      <p class="section__lead">${esc(lead)}</p>
    </header>
    <div class="prose-page__content">
      ${sections.map((section) => `<section>
        <h2>${esc(section.title)}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
        ${section.items?.length ? `<ul class="prose-list">${section.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}
      </section>`).join('')}
    </div>
  </div>
</section>`;
