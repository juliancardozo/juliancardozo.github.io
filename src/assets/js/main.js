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

    // Filtro inicial desde la URL (?tag=ia), para enlazar directo a una temática.
    var initialTag = null;
    try { initialTag = new URLSearchParams(window.location.search).get('tag'); } catch (e) {}
    if (initialTag) {
      var initialButton = blogButtons.filter(function (button) {
        return button.getAttribute('data-blog-filter') === initialTag;
      })[0];
      if (initialButton) {
        activeBlogTag = initialTag;
        blogButtons.forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === initialButton));
        });
      }
    }
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

  /* ── 3. Suscripción a la newsletter ────────────────────────────────────── */
  var newsletterForms = document.querySelectorAll('[data-newsletter-form]');
  var isEnglish = document.documentElement.lang === 'en';
  var formCopy = isEnglish
    ? { sending: 'Sending...', error: 'I could not process the subscription.' }
    : { sending: 'Enviando...', error: 'No pude procesar la suscripción.' };
  // El Worker responde en español; en la versión en inglés se traducen sus mensajes conocidos.
  var workerMessages = {
    'Ingresá un email válido.': 'Please enter a valid email.',
    'Elegí un interés principal.': 'Please choose a main interest.',
    'Necesito tu consentimiento para suscribirte.': 'I need your consent to subscribe you.',
    'No pude procesar la suscripción.': 'I could not process the subscription.',
    'Listo. Ya te sumé a la newsletter y vas a recibir la primera edición cuando se publique.':
      "Done. You're on the list and will get the first issue when it's published.",
    'Tu email ya estaba en la lista. Actualicé tus preferencias para próximas ediciones.':
      'Your email was already on the list. I updated your preferences for upcoming issues.'
  };
  var localize = function (message) {
    if (!isEnglish) return message;
    return workerMessages[message] || formCopy.error;
  };
  if (newsletterForms.length && 'fetch' in window) {
    window.dataLayer = window.dataLayer || [];
    Array.prototype.forEach.call(newsletterForms, function (form) {
      var status = form.querySelector('[data-newsletter-status]');
      var submit = form.querySelector('button[type="submit"]');
      var originalLabel = submit ? submit.textContent : '';

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!submit) return;

        var formData = new FormData(form);
        var payload = {
          name: formData.get('name') || '',
          email: formData.get('email') || '',
          interest: formData.get('interest') || '',
          consent: formData.get('consent') || '',
          company: formData.get('company') || '',
          source: formData.get('source') || '',
          page_path: window.location.pathname,
          form_kind: formData.get('form_kind') || '',
          lang: document.documentElement.lang || 'es'
        };

        submit.disabled = true;
        submit.textContent = formCopy.sending;
        if (status) {
          status.textContent = '';
          status.dataset.state = 'idle';
        }

        window.dataLayer.push({
          event: 'newsletter_subscribe_submit',
          source: payload.source,
          interest: payload.interest,
          page_path: payload.page_path
        });

        fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'fetch'
          },
          body: JSON.stringify(payload)
        })
          .then(function (response) {
            return response.json().then(function (body) {
              return { ok: response.ok, body: body };
            });
          })
          .then(function (result) {
            if (!result.ok || !result.body.ok) {
              throw new Error(localize(result.body.message || formCopy.error));
            }
            form.reset();
            if (status) {
              status.textContent = localize(result.body.message);
              status.dataset.state = 'success';
            }
            window.dataLayer.push({
              event: 'newsletter_subscribe_success',
              source: payload.source,
              interest: payload.interest,
              page_path: payload.page_path
            });
          })
          .catch(function (error) {
            if (status) {
              status.textContent = error.message;
              status.dataset.state = 'error';
            }
            window.dataLayer.push({
              event: 'newsletter_subscribe_error',
              source: payload.source,
              interest: payload.interest,
              page_path: payload.page_path,
              error_message: error.message
            });
          })
          .finally(function () {
            submit.disabled = false;
            submit.textContent = originalLabel;
          });
      });
    });
  }

  /* ── 4. dataLayer para medición editorial ──────────────────────────────── */
  var trackedClicks = document.querySelectorAll(
    '.js-track-conversation, .js-track-related-article, .js-track-origin-project, .js-track-project-insight, .js-track-pillar-hub, .js-track-article-card, .js-track-newsletter-interest, .js-track-newsletter-issue'
  );
  if (trackedClicks.length) {
    window.dataLayer = window.dataLayer || [];
    Array.prototype.forEach.call(trackedClicks, function (link) {
      link.addEventListener('click', function () {
        var href = link.getAttribute('href') || '';
        var eventName = 'content_navigation_click';
        if (link.classList.contains('js-track-conversation')) eventName = 'conversation_cta_click';
        else if (link.classList.contains('js-track-related-article')) eventName = 'related_article_click';
        else if (link.classList.contains('js-track-origin-project')) eventName = 'article_to_project_click';
        else if (link.classList.contains('js-track-project-insight')) eventName = 'project_to_article_click';
        else if (link.classList.contains('js-track-pillar-hub')) eventName = 'pillar_hub_click';
        else if (link.classList.contains('js-track-article-card')) eventName = 'blog_card_click';
        else if (link.classList.contains('js-track-newsletter-interest')) eventName = 'newsletter_interest_click';
        else if (link.classList.contains('js-track-newsletter-issue')) eventName = 'newsletter_issue_click';
        window.dataLayer.push({
          event: eventName,
          link_url: href,
          link_text: (link.textContent || '').trim().slice(0, 140),
          page_path: window.location.pathname,
        });
      });
    });
  }

  /* ── 5. Reveal on scroll ───────────────────────────────────────────────── */
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

  /* ── 6. Seccion activa ─────────────────────────────────────────────────── */
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
