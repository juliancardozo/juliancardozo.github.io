/**
 * Auditoria visual y funcional con Chrome headless via CDP.
 * Sin dependencias: usa el WebSocket nativo de Node 22+.
 *
 * Por cada combinacion de pagina x viewport x tema:
 *   · captura pantalla completa en tools/shots/
 *   · detecta desbordes horizontales y que elemento los causa
 *   · reporta errores de consola y recursos que fallaron
 *   · verifica contraste minimo de texto contra su fondo
 *
 *   node tools/audit.mjs [baseUrl]
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shotsDir = path.join(root, 'tools', 'shots');
const base = process.argv[2] || 'http://localhost:4321';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;

const PAGES = [
  { name: 'home', url: '/' },
  { name: 'caso-micuota', url: '/proyectos/micuota/' },
  { name: '404', url: '/no-existe/' },
];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
];
const THEMES = ['light', 'dark'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/chrome-audit-profile',
  'about:blank',
]);

let ws;
let msgId = 0;
const pending = new Map();
const events = [];

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const connect = async () => {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const info = await res.json();
      ws = new WebSocket(info.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
      });
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && pending.has(msg.id)) {
          const { resolve, reject } = pending.get(msg.id);
          pending.delete(msg.id);
          msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
        } else if (msg.method) {
          events.push(msg);
        }
      };
      return;
    } catch {
      await sleep(200);
    }
  }
  throw new Error('No se pudo conectar a Chrome');
};

/** Se ejecuta dentro de la pagina. Devuelve diagnostico de layout, a11y y contraste. */
const PAGE_PROBE = `(() => {
  const docWidth = document.documentElement.scrollWidth;
  const viewport = window.innerWidth;
  const overflowing = [];
  if (docWidth > viewport + 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.right > viewport + 1 || r.left < -1) {
        overflowing.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '') + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
      }
    }
  }

  // Chrome devuelve color-mix() como "color(srgb 0.98 0.97 0.96 / 0.88)" (0-1),
  // y el resto como "rgb(250, 249, 246)" (0-255). Hay que normalizar ambos.
  const parseRgb = (value) => {
    if (!value) return null;
    const nums = (value.match(/[\\d.]+/g) || []).map(Number);
    if (nums.length < 3) return null;
    const srgb = /^color\\(/.test(value);
    const rgb = nums.slice(0, 3).map((c) => (srgb ? c * 255 : c));
    const alpha = value.includes('/') || /rgba/.test(value) ? (nums[3] ?? 1) : 1;
    return { rgb, alpha };
  };
  const over = (fg, bg) => fg.rgb.map((c, i) => c * fg.alpha + bg[i] * (1 - fg.alpha));
  const luminance = (rgb) => {
    const [r, g, b] = rgb.map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  // Compone las capas de fondo de abajo hacia arriba respetando la transparencia.
  const bgOf = (el) => {
    const layers = [];
    let node = el;
    while (node) {
      const parsed = parseRgb(getComputedStyle(node).backgroundColor);
      if (parsed && parsed.alpha > 0) layers.push(parsed);
      node = node.parentElement;
    }
    let base = [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return base;
  };

  const lowContrast = [];
  const seen = new Set();
  for (const el of document.querySelectorAll('p, a, li, h1, h2, h3, dt, dd, span, button')) {
    if (!el.textContent.trim() || el.children.length > 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) continue;
    const parsedFg = parseRgb(style.color);
    if (!parsedFg) continue;
    const bg = bgOf(el);
    const fg = over(parsedFg, bg);
    const l1 = luminance(fg), l2 = luminance(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(style.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
    const min = large ? 3 : 4.5;
    const key = style.color + '|' + el.className;
    if (ratio < min && !seen.has(key)) {
      seen.add(key);
      lowContrast.push({ text: el.textContent.trim().slice(0, 36), ratio: Math.round(ratio * 100) / 100, min, cls: el.className || el.tagName });
    }
  }

  const imgs = Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
  const focusable = document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').length;

  return { docWidth, viewport, overflowing: overflowing.slice(0, 8), lowContrast, brokenImages: imgs, focusable, title: document.title };
})()`;

const run = async () => {
  await connect();
  await mkdir(shotsDir, { recursive: true });

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  await send('Log.enable', {}, sessionId);
  await send('Network.enable', {}, sessionId);

  const findings = [];
  const report = [];

  for (const page of PAGES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        events.length = 0;

        await send('Emulation.setDeviceMetricsOverride', {
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: 1,
          mobile: viewport.mobile,
        }, sessionId);

        await send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-color-scheme', value: theme }],
        }, sessionId);

        await send('Page.navigate', { url: base + page.url }, sessionId);
        await sleep(900);
        // Recorre la pagina para disparar los reveals antes de capturar.
        await send('Runtime.evaluate', {
          expression: 'window.scrollTo(0, document.body.scrollHeight); new Promise(r => setTimeout(r, 400)).then(() => window.scrollTo(0,0))',
          awaitPromise: true,
        }, sessionId);
        await sleep(500);

        const { result } = await send('Runtime.evaluate', { expression: PAGE_PROBE, returnByValue: true }, sessionId);
        const probe = result.value;
        const label = `${page.name}/${viewport.name}/${theme}`;

        if (probe.overflowing.length) {
          findings.push(`${label}: scroll horizontal (${probe.docWidth}px > ${probe.viewport}px) — ${probe.overflowing.join(' | ')}`);
        }
        for (const item of probe.lowContrast) {
          findings.push(`${label}: contraste ${item.ratio}:1 (mínimo ${item.min}) en .${item.cls} — "${item.text}"`);
        }
        for (const img of probe.brokenImages) findings.push(`${label}: imagen que no cargó — ${img}`);

        const consoleErrors = events
          .filter((e) => e.method === 'Log.entryAdded' && ['error', 'warning'].includes(e.params.entry.level))
          // En la pagina 404 el propio documento responde 404: es el comportamiento esperado.
          .filter((e) => !(page.name === '404' && /404 \(Not Found\)/.test(e.params.entry.text)))
          .map((e) => `${e.params.entry.level}: ${e.params.entry.text}`);
        const failedRequests = events
          .filter((e) => e.method === 'Network.loadingFailed')
          .map((e) => e.params.errorText);
        for (const error of [...consoleErrors, ...failedRequests]) findings.push(`${label}: consola — ${error}`);

        // Las animaciones de entrada dependen del scroll real; para la captura de
        // pagina completa se fuerzan visibles (si no, aparece en blanco lo que nunca
        // entro al viewport durante el recorrido automatico).
        await send('Runtime.evaluate', {
          expression: "document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'))",
        }, sessionId);

        // Solo guarda capturas de una combinacion por tema para no llenar el repo.
        if (theme === 'light' || page.name === 'home') {
          const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }, sessionId);
          const file = path.join(shotsDir, `${page.name}-${viewport.name}-${theme}.png`);
          await writeFile(file, Buffer.from(data, 'base64'));
        }

        report.push(`${label.padEnd(34)} ${String(probe.docWidth).padStart(5)}px doc · ${String(probe.focusable).padStart(3)} focusables · ${probe.title.slice(0, 40)}`);
      }
    }
  }

  console.log(report.join('\n'));
  console.log('');
  if (findings.length) {
    console.log(`${findings.length} hallazgo(s):`);
    for (const finding of findings) console.log(`  ✗ ${finding}`);
  } else {
    console.log('Sin hallazgos: sin desbordes, sin errores de consola, contraste OK.');
  }

  ws.close();
  chrome.kill();
  process.exit(findings.length ? 1 : 0);
};

run().catch((error) => {
  console.error(error);
  chrome.kill();
  process.exit(2);
});
