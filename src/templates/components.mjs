/** Componentes compartidos entre plantillas. Todo devuelve strings de HTML. */

import { statusLabels } from '../data/site.js';

export const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Enlaces internos en markdown minimo: [texto](/url) -> <a href="/url">texto</a> */
export const inlineLinks = (value = '') =>
  esc(value).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

/** `codigo` -> <code>codigo</code>, aplicado sobre texto ya escapado. */
export const inlineCode = (value = '') =>
  inlineLinks(value).replace(/`([^`]+)`/g, '<code>$1</code>');

/**
 * URL interna de un tipo de pagina en el idioma de `t`.
 *   href(t)                      -> '/' o '/en/'
 *   href(t, 'project', 'patio')  -> '/proyectos/patio/' o '/en/projects/patio/'
 */
export const href = (t, kind = 'home', slug = '') => {
  const base = kind === 'home' ? `${t.prefix}/` : `${t.prefix}/${t.routes[kind]}/`;
  return slug ? `${base}${slug}/` : base;
};

/** Marca de GitHub, decorativa: el enlace que la contiene siempre lleva texto. */
export const githubIcon = '<svg class="icon-github" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';

export const statusBadge = (status, t) => {
  const meta = statusLabels[t.lang]?.[status];
  if (!meta) return '';
  return `<span class="badge badge--${meta.tone}"><span class="badge__dot" aria-hidden="true"></span>${esc(meta.label)}</span>`;
};

export const externalLink = (href, label, variant = 'link') => {
  if (!href) return '';
  return `<a class="${variant}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}<span class="link__arrow" aria-hidden="true">↗</span></a>`;
};

/**
 * Extracto de la historia de origen para la tarjeta: primera frase, y la segunda
 * si la primera es demasiado corta para sostenerse sola.
 */
export const originExcerpt = (story = '', minLength = 50) => {
  const sentences = story.match(/[^.!?]+[.!?]+/g) || [story];
  let excerpt = (sentences[0] || '').trim();
  if (excerpt.length < minLength && sentences[1]) excerpt += ` ${sentences[1].trim()}`;
  return excerpt;
};

export const tagList = (items = [], className = 'tags') =>
  items.length
    ? `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
    : '';

/**
 * Portadas editoriales generadas.
 *
 * Son composiciones geometricas abstractas, no capturas simuladas: el objetivo es
 * dar identidad visual a cada proyecto sin insinuar funcionalidad que no existe.
 * Cuando un proyecto tenga captura real, se agrega `image` y esta portada se omite.
 */
const motifs = {
  ledger: `
    <g class="cover__lines">
      <path d="M40 150 H320" /><path d="M40 190 H260" /><path d="M40 230 H300" />
    </g>
    <g class="cover__accent">
      <rect x="40" y="60" width="120" height="52" rx="8" />
      <circle cx="330" cy="150" r="7" /><circle cx="270" cy="190" r="7" /><circle cx="310" cy="230" r="7" />
      <path d="M330 157 V183" /><path d="M270 197 V223" />
    </g>
    <g class="cover__soft"><rect x="180" y="60" width="180" height="52" rx="8" /></g>`,
  grid: `
    <g class="cover__lines">
      <rect x="40" y="60" width="90" height="70" rx="8" /><rect x="150" y="60" width="90" height="70" rx="8" />
      <rect x="260" y="60" width="90" height="70" rx="8" /><rect x="40" y="150" width="90" height="70" rx="8" />
      <rect x="150" y="150" width="90" height="70" rx="8" /><rect x="260" y="150" width="90" height="70" rx="8" />
    </g>
    <g class="cover__accent"><rect x="150" y="150" width="90" height="70" rx="8" /><path d="M64 240 H128" /></g>
    <g class="cover__soft"><rect x="40" y="60" width="90" height="70" rx="8" /></g>`,
  pulse: `
    <g class="cover__lines"><path d="M40 160 H120 l24 -56 28 112 26 -78 22 42 h140" /></g>
    <g class="cover__accent">
      <circle cx="172" cy="216" r="8" />
      <path d="M300 70 v40 M280 90 h40" />
    </g>
    <g class="cover__soft"><rect x="40" y="228" width="310" height="2" rx="1" /></g>`,
  audit: `
    <g class="cover__lines">
      <rect x="40" y="55" width="150" height="180" rx="10" />
      <path d="M64 92 H166" /><path d="M64 122 H150" /><path d="M64 152 H166" /><path d="M64 182 H132" />
    </g>
    <g class="cover__accent">
      <path d="M226 132 l24 26 52 -60" />
      <circle cx="264" cy="145" r="72" />
    </g>`,
  spec: `
    <g class="cover__lines">
      <rect x="40" y="60" width="86" height="110" rx="8" /><rect x="146" y="60" width="86" height="110" rx="8" />
      <rect x="252" y="60" width="86" height="110" rx="8" />
      <path d="M126 115 H146" /><path d="M232 115 H252" />
    </g>
    <g class="cover__accent"><path d="M64 205 H150" /><path d="M170 205 H236" /><circle cx="295" cy="205" r="8" /></g>
    <g class="cover__soft"><rect x="252" y="60" width="86" height="110" rx="8" /></g>`,
  catalog: `
    <g class="cover__lines">
      <rect x="40" y="60" width="140" height="90" rx="8" /><rect x="200" y="60" width="150" height="90" rx="8" />
      <rect x="40" y="170" width="140" height="65" rx="8" /><rect x="200" y="170" width="150" height="65" rx="8" />
    </g>
    <g class="cover__accent"><path d="M64 200 H120" /><path d="M224 200 H286" /><circle cx="330" cy="90" r="10" /></g>
    <g class="cover__soft"><rect x="200" y="60" width="150" height="90" rx="8" /></g>`,
  wave: `
    <g class="cover__lines">
      <path d="M40 148 q30 -70 60 0 t60 0 t60 0 t60 0 t60 0" />
      <path d="M40 200 H350" />
    </g>
    <g class="cover__accent">
      <circle cx="130" cy="200" r="9" /><circle cx="220" cy="200" r="9" /><circle cx="280" cy="200" r="9" />
      <path d="M100 92 q30 -50 60 0" />
    </g>`,
};

export const cover = (project, t, { eager = false } = {}) => {
  if (project.image?.src) {
    // La primera imagen de cada pagina se carga con prioridad (es la LCP); el resto, diferida.
    const loading = eager
      ? 'loading="eager" fetchpriority="high"'
      : 'loading="lazy" fetchpriority="low"';
    return `<img class="cover cover--photo" src="${esc(project.image.src)}" alt="${esc(project.image.alt || '')}" ${loading} decoding="async" width="1600" height="1000" />`;
  }
  const motif = motifs[project.motif] || motifs.grid;
  return `<svg class="cover" viewBox="0 40 390 210" role="img" aria-label="${esc(t.ui.coverLabel)} ${esc(project.title)}" focusable="false">${motif}</svg>`;
};

export const projectHref = (project, t) => href(t, 'project', project.slug);
