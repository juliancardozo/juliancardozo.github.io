/**
 * Servidor estatico para desarrollo. Replica el comportamiento de GitHub Pages:
 * `/ruta/` -> `/ruta/index.html`, y 404.html para lo que no existe.
 *
 *   node tools/serve.mjs [puerto]
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2]) || 4321;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
};

const resolve = async (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidate = path.join(root, clean);
  if (!candidate.startsWith(root)) return null;
  try {
    const info = await stat(candidate);
    if (info.isDirectory()) return path.join(candidate, 'index.html');
    return candidate;
  } catch {
    return null;
  }
};

createServer(async (req, res) => {
  const file = await resolve(req.url);
  if (file) {
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(body);
      return;
    } catch {
      /* cae al 404 */
    }
  }
  try {
    const body = await readFile(path.join(root, '404.html'));
    res.writeHead(404, { 'content-type': types['.html'] });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
