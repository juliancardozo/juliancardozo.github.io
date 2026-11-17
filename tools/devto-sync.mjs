/**
 * Publica en dev.to los artículos del blog que todavía no están allí.
 *
 * Un artículo se considera publicado si alguna de mis publicaciones en dev.to (borradores incluidos)
 * tiene como URL canónica la del artículo en el blog. No actualiza artículos existentes.
 *
 * Variables de entorno:
 *   DEVTO_API_KEY   key de dev.to (Settings → Extensions). Obligatoria salvo con --dry-run.
 *   DEVTO_PUBLISH   'false' crea borradores; por defecto publica.
 *   DEVTO_SINCE     fecha AAAA-MM-DD: solo artículos desde esa fecha (por defecto, todos).
 *
 *   node tools/devto-sync.mjs [--dry-run]
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { articles } from '../src/data/articles.js';
import { articleToMarkdown, articleUrl } from './markdown.mjs';

const API = 'https://dev.to/api';
const dryRun = process.argv.includes('--dry-run');
const key = process.env.DEVTO_API_KEY;
const publish = process.env.DEVTO_PUBLISH !== 'false';
const since = process.env.DEVTO_SINCE || '';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = async (path, options = {}) => {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        'api-key': key,
        accept: 'application/vnd.forem.api-v1+json',
        'content-type': 'application/json',
        'user-agent': 'blog-crosspost',
      },
    });
    if (res.status === 429 && attempt < 5) {
      const wait = Number(res.headers.get('retry-after')) || 30;
      console.log(`  límite de dev.to: espero ${wait} s`);
      await sleep(wait * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`${options.method || 'GET'} ${path}: ${res.status} ${await res.text()}`);
    return res.json();
  }
};

/** Tags del blog → tags en inglés con audiencia en dev.to. */
const TAGS = {
  'Platform Engineering': 'devops', Cloud: 'cloud', Java: 'java', Liderazgo: 'leadership', IA: 'ai',
  'Documentación': 'documentation', Agentes: 'agents', Arquitectura: 'architecture', MLOps: 'mlops',
  Python: 'python', Datos: 'data', Pagos: 'payments', Seguridad: 'security', Producto: 'product',
  Infraestructura: 'infrastructure', 'Open-weight': 'llm', Startups: 'startup',
};

/** dev.to admite hasta 4 tags alfanuméricos en minúsculas: 3 temáticos y `spanish` para el idioma. */
const devtoTags = (tags) => {
  const mapped = tags.map((t) => TAGS[t] || t.normalize('NFD').replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
  return [...new Set(mapped)].filter(Boolean).slice(0, 3).concat('spanish');
};

const payload = (article) => ({
  article: {
    title: article.title,
    body_markdown: articleToMarkdown(article, { mode: 'crosspost' }),
    published: publish,
    canonical_url: articleUrl(article),
    description: article.seoDescription || article.description,
    tags: devtoTags(article.tags),
  },
});

const existingCanonicals = async () => {
  const urls = new Set();
  for (let page = 1; ; page++) {
    const batch = await request(`/articles/me/all?per_page=100&page=${page}`);
    for (const a of batch) if (a.canonical_url) urls.add(a.canonical_url.replace(/\/?$/, '/'));
    if (batch.length < 100) return urls;
  }
};

const main = async () => {
  if (!dryRun && !key) throw new Error('Falta DEVTO_API_KEY.');
  const candidates = articles.filter((a) => !since || a.date >= since).sort((a, b) => a.date.localeCompare(b.date));
  const existing = dryRun && !key ? new Set() : await existingCanonicals();
  const pending = candidates.filter((a) => !existing.has(articleUrl(a)));

  console.log(`${candidates.length} artículos candidatos · ${candidates.length - pending.length} ya en dev.to · ${pending.length} pendientes`);
  console.log(`Modo: ${dryRun ? 'simulación' : publish ? 'publicar' : 'borradores'}`);

  for (const article of pending) {
    const body = payload(article);
    if (dryRun) {
      await mkdir('.devto-preview', { recursive: true });
      await writeFile(`.devto-preview/${article.slug}.md`, body.article.body_markdown, 'utf8');
      console.log(`  [simulación] ${article.slug} · tags: ${body.article.tags.join(', ')}`);
      continue;
    }
    const created = await request('/articles', { method: 'POST', body: JSON.stringify(body) });
    console.log(`  ${publish ? 'publicado' : 'borrador'}: ${article.slug} → ${created.url}`);
    await sleep(5000);
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
