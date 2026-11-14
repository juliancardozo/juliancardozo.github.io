import { esc, href, githubIcon } from './components.mjs';
import { site } from '../data/site.js';

/**
 * Shell HTML compartido. Recibe el contenido ya renderizado y arma head, header y footer.
 */
export const layout = ({
  t,
  title,
  description,
  path = '/',
  bodyClass = '',
  content = '',
  jsonLd = null,
  robots = 'index, follow',
  ogType = 'website',
  // Ruta equivalente de esta pagina en cada idioma: { es: '/blog/', en: '/en/blog/' }.
  alternates = null,
}) => {
  const canonical = `${site.baseUrl}${path}`;
  const homePath = href(t);
  const otherLocales = alternates ? Object.entries(alternates).filter(([code]) => code !== t.lang) : [];
  const ogImage = `${site.baseUrl}/assets/img/og-cover.png`;
  const year = 2026;

  return `<!DOCTYPE html>
<html lang="${esc(t.lang)}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="author" content="${esc(site.author)}" />
<meta name="keywords" content="${esc(t.meta.keywords.join(', '))}" />
<meta name="robots" content="${esc(robots)}" />
<meta name="google-site-verification" content="_9BYvf-62uRivZ6uGYEifB2Gs6wYawZ0DcW4PvrZpRo" />
<link rel="canonical" href="${esc(canonical)}" />
${
  alternates
    ? [
        ...Object.entries(alternates).map(
          ([code, altPath]) => `<link rel="alternate" hreflang="${esc(code)}" href="${esc(`${site.baseUrl}${altPath}`)}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${esc(`${site.baseUrl}${alternates[site.defaultLocale]}`)}" />`,
      ].join('\n')
    : ''
}
<meta name="theme-color" content="#faf9f6" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#0e1013" media="(prefers-color-scheme: dark)" />
<meta property="og:type" content="${esc(ogType)}" />
<meta property="og:site_name" content="${esc(site.author)}" />
<meta property="og:locale" content="${esc(t.ogLocale)}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${esc(ogImage)}" />
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml" />
<link rel="stylesheet" href="/assets/css/main.css" />
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KJ49CP7L');</script>
<!-- End Google Tag Manager -->
<!-- OpenAI Ads Measurement Pixel -->
<script>
(function (w, d, s, u) {
  if (w.oaiq) return;
  var q = function () { q.q.push(arguments); };
  q.q = [];
  w.oaiq = q;
  var js = d.createElement(s); js.async = true; js.src = u;
  var f = d.getElementsByTagName(s)[0]; f.parentNode.insertBefore(js, f);
})(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init", { pixelId: "N3bjU59DcWbZMaWFgpKk4j" });
oaiq("measure", "page_viewed", { type: "contents", contents: [{ id: location.pathname, name: document.title, content_type: "page" }] });
</script>
<!-- End OpenAI Ads Measurement Pixel -->
<script>/* Habilita las animaciones de entrada solo si hay JS. Si main.js no llega a correr, todo se muestra igual. */
if('IntersectionObserver' in window){document.documentElement.classList.add('js');window.__revealFallback=setTimeout(function(){document.documentElement.classList.remove('js')},2500)}</script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body class="${esc(bodyClass)}">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJ49CP7L"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<a class="skip-link" href="#main">${esc(t.ui.skipToContent)}</a>
<header class="site-header">
  <div class="shell site-header__inner">
    <a class="site-header__brand" href="${esc(homePath)}">
      <span class="site-header__mark" aria-hidden="true">JC</span>
      <span class="site-header__name">${esc(site.author)}</span>
    </a>
    <nav class="site-nav" aria-label="${esc(t.ui.navLabel)}">
      <ul>
        ${t.nav
          .map((item) => {
            if (item.kind === 'github') {
              return `<li><a class="site-nav__github" href="${esc(site.links.github)}" target="_blank" rel="noopener noreferrer">${githubIcon}${esc(item.label)}</a></li>`;
            }
            const target = item.href.startsWith('/') ? item.href : path === homePath ? item.href : `${homePath}${item.href}`;
            return `<li><a href="${esc(target)}"${item.cta ? ' class="site-nav__cta"' : ''}>${esc(item.label)}</a></li>`;
          })
          .join('')}
      </ul>
    </nav>
    ${otherLocales
      .map(
        ([code, altPath]) =>
          `<a class="site-lang" href="${esc(altPath)}" hreflang="${esc(code)}" lang="${esc(code)}" aria-label="${esc(t.ui.switchLanguage[code])}">${esc(code.toUpperCase())}</a>`,
      )
      .join('')}
  </div>
</header>
<main id="main">
${content}
</main>
<footer class="site-footer">
  <div class="shell site-footer__inner">
    <p class="site-footer__name">${esc(site.author)} · ${year}</p>
    <p class="site-footer__note">${esc(t.ui.footerNote)}</p>
    <ul class="site-footer__links">
      <li><a href="${esc(href(t, 'newsletter'))}">Newsletter</a></li>
      <li><a href="${esc(href(t, 'privacy'))}">${esc(t.ui.privacy)}</a></li>
      <li><a href="${esc(site.links.github)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      ${site.links.linkedin ? `<li><a class="js-track-linkedin" href="${esc(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>` : ''}
      ${site.links.email ? `<li><a href="mailto:${esc(site.links.email)}">Email</a></li>` : ''}
    </ul>
  </div>
</footer>
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
};
