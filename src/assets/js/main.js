/**
 * Portfolio — interacciones minimas.
 *   1. Filtros del laboratorio (accesibles, con aria-pressed y conteo real)
 *   2. Reveal on scroll (respeta prefers-reduced-motion)
 *   3. Seccion activa en la navegacion y en el indice del caso de estudio
 *
 * Sin dependencias. Todo degrada a contenido visible si algo falla.
 */
(function () {
  'use strict';

  // El fallback de reveal definido en el <head> ya no hace falta: JS esta vivo.
  if (window.__revealFallback) clearTimeout(window.__revealFallback);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Filtros del laboratorio ────────────────────────────────────────── */
  var filterBar = document.querySelector('[data-filters]');
  var grid = document.querySelector('[data-lab-grid]');
  var empty = document.querySelector('[data-lab-empty]');

  if (filterBar && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));
    var buttons = Array.prototype.slice.call(filterBar.querySelectorAll('[data-filter]'));

    // Oculta filtros que no tienen ningun proyecto detras.
    buttons.forEach(function (button) {
      var key = button.getAttribute('data-filter');
      if (key === 'all') return;
      var matches = cards.some(function (card) {
        return card.getAttribute('data-category') === key;
      });
      if (!matches) button.hidden = true;
    });

    filterBar.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;

      var key = button.getAttribute('data-filter');
      var visible = 0;

      buttons.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });

      cards.forEach(function (card) {
        var show = key === 'all' || card.getAttribute('data-category') === key;
        card.hidden = !show;
        if (show) visible++;
      });

      if (empty) empty.hidden = visible !== 0;
    });
  }

  /* ── 2. Reveal on scroll ───────────────────────────────────────────────── */
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    Array.prototype.forEach.call(revealTargets, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ── 3. Seccion activa ─────────────────────────────────────────────────── */
  var trackSections = function (linkSelector) {
    var links = Array.prototype.slice.call(document.querySelectorAll(linkSelector));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = links
      .map(function (link) {
        var id = (link.getAttribute('href') || '').split('#')[1];
        var section = id && document.getElementById(id);
        if (section) map[id] = link;
        return section;
      })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (other) {
              other.removeAttribute('aria-current');
            });
            link.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  };

  trackSections('.site-nav a[href*="#"]');
  trackSections('.case__toc a[href^="#"]');
})();
