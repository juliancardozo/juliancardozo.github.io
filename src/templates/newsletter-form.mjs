import { esc, href } from './components.mjs';

export const newsletterForm = ({
  t,
  newsletter,
  source = 'newsletter-hub',
  path = href(t, 'newsletter'),
  title = t.form.defaultTitle,
  lead = t.form.defaultLead,
  compact = false,
  buttonLabel = t.form.defaultButton,
}) => {
  const f = t.form;
  return `
  <section class="newsletter-signup ${compact ? 'newsletter-signup--compact' : ''}" aria-labelledby="newsletter-signup-title-${esc(source)}">
    <div class="newsletter-signup__copy">
      <p class="newsletter-panel__label">${esc(f.label)}</p>
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
        <label for="newsletter-name-${esc(source)}">${esc(f.name)}</label>
        <input id="newsletter-name-${esc(source)}" name="name" type="text" autocomplete="given-name" />
      </div>`}

      <div class="newsletter-form__field">
        <label for="newsletter-email-${esc(source)}">${esc(f.email)}</label>
        <input id="newsletter-email-${esc(source)}" name="email" type="email" inputmode="email" autocomplete="email" required />
      </div>

      <div class="newsletter-form__field">
        <label for="newsletter-interest-${esc(source)}">${esc(f.interest)}</label>
        <select id="newsletter-interest-${esc(source)}" name="interest" required>
          <option value="">${esc(f.choose)}</option>
          ${f.interests.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('\n          ')}
        </select>
      </div>

      <div class="newsletter-form__field newsletter-form__field--hidden" aria-hidden="true">
        <label for="newsletter-company-${esc(source)}">${esc(f.company)}</label>
        <input id="newsletter-company-${esc(source)}" name="company" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <label class="newsletter-form__consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>${esc(f.consentBefore)}<a href="${href(t, 'privacy')}">${esc(f.consentLink)}</a>.</span>
      </label>

      <div class="newsletter-form__actions">
        <button type="submit" class="btn btn--primary">${esc(buttonLabel)}</button>
        <p class="newsletter-form__meta">${esc(f.meta)}</p>
      </div>
      <p class="newsletter-form__status" data-newsletter-status aria-live="polite"></p>
    </form>
  </section>`;
};
