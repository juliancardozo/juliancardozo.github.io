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

  /* ── 2. Filtros y carga progresiva del blog ─────────────────────────────── */
  var blogFilterBar = document.querySelector('[data-blog-filters]');
  var blogGrid = document.querySelector('[data-blog-grid]');
  var blogEmpty = document.querySelector('[data-blog-empty]');
  var loadMore = document.querySelector('[data-blog-load-more]');

  if (blogFilterBar && blogGrid) {
    var blogCards = Array.prototype.slice.call(blogGrid.querySelectorAll('[data-blog-card]'));
    var blogButtons = Array.prototype.slice.call(blogFilterBar.querySelectorAll('[data-blog-filter]'));
    var activeBlogTag = 'all';
    var visibleLimit = 6;

    var updateBlog = function () {
      var matches = blogCards.filter(function (card) {
        return activeBlogTag === 'all' || card.getAttribute('data-tags').split(' ').indexOf(activeBlogTag) !== -1;
      });

      blogCards.forEach(function (card) {
        var matchIndex = matches.indexOf(card);
        var show = matchIndex !== -1 && matchIndex < visibleLimit;
        card.hidden = !show;
        if (show) card.classList.add('is-visible');
      });

      if (blogEmpty) blogEmpty.hidden = matches.length !== 0;
      if (loadMore) loadMore.hidden = matches.length <= visibleLimit;
    };

    blogCards.forEach(function (card, index) {
      card.hidden = index >= visibleLimit;
    });
    updateBlog();

    blogFilterBar.addEventListener('click', function (event) {
      var button = event.target.closest('[data-blog-filter]');
      if (!button) return;

      activeBlogTag = button.getAttribute('data-blog-filter');
      visibleLimit = 6;
      blogButtons.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });
      updateBlog();
    });

    if (loadMore) {
      loadMore.addEventListener('click', function () {
        visibleLimit += 6;
        updateBlog();
      });
    }
  }

  /* ── 3. Reveal on scroll ───────────────────────────────────────────────── */
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

  /* ── 4. Seccion activa ─────────────────────────────────────────────────── */
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
