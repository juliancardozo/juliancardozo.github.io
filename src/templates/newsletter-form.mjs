import { esc } from './components.mjs';
import { newsletter } from '../data/newsletter.js';

export const newsletterForm = ({
  source = 'newsletter-hub',
  path = '/newsletter/',
  title = 'Recibí la primera edición',
  lead = 'Sumate para recibir la próxima edición y futuras notas sobre liderazgo, arquitectura, producto e IA aplicada.',
  compact = false,
  buttonLabel = 'Quiero recibir la newsletter',
}) => `
  <section class="newsletter-signup ${compact ? 'newsletter-signup--compact' : ''}" aria-labelledby="newsletter-signup-title-${esc(source)}">
    <div class="newsletter-signup__copy">
      <p class="newsletter-panel__label">Suscripción</p>
      <h2 id="newsletter-signup-title-${esc(source)}">${esc(title)}</h2>
      <p>${esc(lead)}</p>
    </div>
    <form
      class="newsletter-form"
      data-newsletter-form
      action="${esc(newsletter.subscribeUrl)}"
      method="post"
      novalidate
    >
      <input type="hidden" name="source" value="${esc(source)}" />
      <input type="hidden" name="page_path" value="${esc(path)}" />
      <input type="hidden" name="form_kind" value="${compact ? 'compact' : 'full'}" />

      ${compact ? '' : `<div class="newsletter-form__field">
        <label for="newsletter-name-${esc(source)}">Nombre</label>
        <input id="newsletter-name-${esc(source)}" name="name" type="text" autocomplete="given-name" />
      </div>`}

      <div class="newsletter-form__field">
        <label for="newsletter-email-${esc(source)}">Email</label>
        <input id="newsletter-email-${esc(source)}" name="email" type="email" inputmode="email" autocomplete="email" required />
      </div>

      <div class="newsletter-form__field">
        <label for="newsletter-interest-${esc(source)}">Interés principal</label>
        <select id="newsletter-interest-${esc(source)}" name="interest" required>
          <option value="">Elegí una opción</option>
          <option value="liderazgo">Liderazgo técnico</option>
          <option value="arquitectura">Arquitectura y plataforma</option>
          <option value="ia">IA aplicada</option>
          <option value="producto">Producto y MVPs</option>
          <option value="pagos">Fintech y pagos</option>
        </select>
      </div>

      <div class="newsletter-form__field newsletter-form__field--hidden" aria-hidden="true">
        <label for="newsletter-company-${esc(source)}">Empresa</label>
        <input id="newsletter-company-${esc(source)}" name="company" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <label class="newsletter-form__consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>Acepto recibir la newsletter y actualizaciones relacionadas. Leé la <a href="/privacidad/">política de privacidad</a>.</span>
      </label>

      <div class="newsletter-form__actions">
        <button type="submit" class="btn btn--primary">${esc(buttonLabel)}</button>
        <p class="newsletter-form__meta">Sin spam. Podés pedir la baja en cualquier momento.</p>
      </div>
      <p class="newsletter-form__status" data-newsletter-status aria-live="polite"></p>
    </form>
  </section>`;
