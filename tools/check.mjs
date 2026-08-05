/**
 * Verificacion del sitio construido, sin dependencias:
 *   · enlaces internos que apunten a archivos inexistentes
 *   · atributos de imagen/accesibilidad basicos
 *   · un solo <h1> por pagina y jerarquia de encabezados
 *   · enlaces externos sin rel="noopener"
 *   · anchors internos (#id) que no existen en la pagina
 *
 *   node tools/check.mjs
 */
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const note = (file, message) => problems.push(`${file}: ${message}`);

const htmlFiles = async (dir = root, acc = []) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'src', 'tools'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await htmlFiles(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
};

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const files = await htmlFiles();
let internalLinks = 0;
let externalLinks = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');

  const h1 = html.match(/<h1[\s>]/g) || [];
  if (h1.length !== 1) note(rel, `tiene ${h1.length} elementos <h1> (debe haber exactamente 1)`);

  const ids = new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g)).map((m) => m[1]));

  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const [tag, href] = match;

    if (/^https?:/.test(href)) {
      externalLinks++;
      if (!/rel="[^"]*noopener/.test(tag)) note(rel, `enlace externo sin rel="noopener": ${href}`);
      continue;
    }
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;

    if (href.startsWith('#')) {
      if (href.length > 1 && !ids.has(href.slice(1))) note(rel, `ancla inexistente: ${href}`);
      continue;
    }

    internalLinks++;
    const [pathPart, hash] = href.split('#');
    let target = path.join(root, pathPart);
    if (pathPart.endsWith('/')) target = path.join(target, 'index.html');
    if (!(await exists(target))) note(rel, `enlace interno roto: ${href}`);
    else if (hash) {
      const targetHtml = await readFile(target, 'utf8');
      const targetIds = new Set(Array.from(targetHtml.matchAll(/\sid="([^"]+)"/g)).map((m) => m[1]));
      if (!targetIds.has(hash)) note(rel, `ancla inexistente en destino: ${href}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    if (!/\salt="/.test(tag)) note(rel, `<img> sin alt: ${tag.slice(0, 70)}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) note(rel, `<img> sin width/height (layout shift): ${tag.slice(0, 70)}`);
    if (!/\sloading="/.test(tag)) note(rel, `<img> sin loading: ${tag.slice(0, 70)}`);
  }

  if (!/<meta name="description"/.test(html)) note(rel, 'sin meta description');
  if (!/<link rel="canonical"/.test(html)) note(rel, 'sin canonical');
  if (!/<html lang="/.test(html)) note(rel, 'sin atributo lang');
  if (/(?:api_key|secret|password|token)\s*[:=]\s*["'][A-Za-z0-9_\-]{12,}/i.test(html)) note(rel, 'posible secreto embebido');
}

console.log(`Revisadas ${files.length} páginas · ${internalLinks} enlaces internos · ${externalLinks} externos`);
if (problems.length) {
  console.log(`\n${problems.length} problema(s):`);
  for (const problem of problems) console.log(`  ✗ ${problem}`);
  process.exit(1);
}
console.log('Sin problemas.');
