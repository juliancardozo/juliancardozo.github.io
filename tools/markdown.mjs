/**
 * Convierte un artículo de `src/data/articles.js` a Markdown.
 *
 * - `docs`: versión para el repositorio (docs/articulos), con diagramas Mermaid como código.
 * - `crosspost`: versión para otras plataformas (dev.to). Los enlaces internos pasan a absolutos,
 *   los diagramas Mermaid se reemplazan por un enlace al original y se agrega el aviso de publicación original.
 *
 *   node tools/markdown.mjs <slug> [docs|crosspost]
 */

import { pathToFileURL } from 'node:url';
import { site } from '../src/data/site.js';
import { articles } from '../src/data/articles.js';

export const articleUrl = (article) => `${site.baseUrl}/blog/${article.slug}/`;

export const articleToMarkdown = (article, { mode = 'docs' } = {}) => {
  const crosspost = mode === 'crosspost';
  const url = articleUrl(article);
  const abs = (text) => (crosspost ? String(text).replace(/\]\(\//g, `](${site.baseUrl}/`) : text);

  const block = (b) => {
    if (b.type === 'p') return [abs(b.text), ''];
    if (b.type === 'h3') return [`### ${b.text}`, ''];
    if (b.type === 'ul') return [...b.items.map((i) => `- ${abs(i)}`), ''];
    if (b.type === 'ol') return [...b.items.map((i, n) => `${n + 1}. ${abs(i)}`), ''];
    if (b.type === 'note') return [`> **${b.label}:** ${abs(b.text)}`, ''];
    if (b.type === 'code') return [`_${b.caption}_`, '', '```' + b.lang, b.text, '```', ''];
    if (b.type === 'mermaid') {
      if (crosspost) return [`_${b.caption}: el diagrama se puede ver en el [artículo original](${url})._`, ''];
      return [`_${b.caption}_`, '', '```mermaid', b.text, '```', ''];
    }
    if (b.type === 'table') {
      return [
        `_${b.caption}_`,
        '',
        `| ${b.head.join(' | ')} |`,
        `|${b.head.map(() => '---').join('|')}|`,
        ...b.rows.map((r) => `| ${r.map(abs).join(' | ')} |`),
        '',
      ];
    }
    return [];
  };

  const out = crosspost
    ? [`_Publicado originalmente en [juliancardozo.github.io](${url})._`, '', abs(article.lead), '']
    : [`# ${article.title}`, '', `_${article.date} · ${article.readingTime}_`, '', article.lead, ''];
  for (const s of article.sections) {
    out.push(`## ${s.title}`, '');
    for (const p of s.paragraphs || []) out.push(abs(p), '');
    for (const b of s.blocks || []) out.push(...block(b));
  }
  out.push('---', '', `**${abs(article.takeaway)}**`, '');
  return out.join('\n');
};

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const [slug, mode = 'docs'] = process.argv.slice(2);
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    console.error(`No existe el artículo "${slug}".`);
    process.exit(1);
  }
  process.stdout.write(articleToMarkdown(article, { mode }));
}
