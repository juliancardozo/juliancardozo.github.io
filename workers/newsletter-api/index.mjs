const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
  });

const html = (body, status = 200, headers = {}) =>
  new Response(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Newsletter</title></head><body>${body}</body></html>`, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      ...headers,
    },
  });

const resolveAllowedOrigins = (env) => {
  const configured = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.length
    ? configured
    : ['https://juliancardozo.github.io', 'http://localhost:4321', 'http://127.0.0.1:4321'];
};

const corsHeaders = (origin, allowedOrigins) => {
  const safeOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'access-control-allow-origin': safeOrigin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, x-requested-with',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const parseRequest = async (request) => {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return request.json();
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }
  throw new Error('Formato de payload no soportado.');
};

const normalizePayload = (input) => ({
  email: String(input.email || '').trim().toLowerCase(),
  name: String(input.name || '').trim(),
  interest: String(input.interest || '').trim().toLowerCase(),
  source: String(input.source || '').trim().toLowerCase(),
  pagePath: String(input.page_path || input.pagePath || '').trim(),
  formKind: String(input.form_kind || input.formKind || '').trim().toLowerCase(),
  consent: input.consent === true || input.consent === 'true' || input.consent === 'yes' || input.consent === 'on',
  company: String(input.company || '').trim(),
});

const validatePayload = (payload) => {
  if (!payload.email || !emailPattern.test(payload.email)) {
    return { ok: false, status: 400, message: 'Ingresá un email válido.' };
  }
  if (!payload.interest) {
    return { ok: false, status: 400, message: 'Elegí un interés principal.' };
  }
  if (!payload.consent) {
    return { ok: false, status: 400, message: 'Necesito tu consentimiento para suscribirte.' };
  }
  if (payload.company) {
    return { ok: false, status: 400, message: 'No pude procesar la suscripción.' };
  }
  return { ok: true };
};

const resendRequest = async (env, path, options = {}) => {
  const response = await fetch(`https://api.resend.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  return { response, data };
};

const upsertContact = async (env, payload) => {
  const contactPath = `/contacts/${encodeURIComponent(payload.email)}`;
  const lookup = await resendRequest(env, contactPath, { method: 'GET' });

  const contactPayload = {
    first_name: payload.name || undefined,
    unsubscribed: false,
  };

  if (lookup.response.status === 200) {
    const update = await resendRequest(env, contactPath, {
      method: 'PATCH',
      body: JSON.stringify(contactPayload),
    });
    if (!update.response.ok) {
      throw new Error(`Resend update failed: ${update.response.status} ${JSON.stringify(update.data)}`);
    }
    return { created: false };
  }

  if (lookup.response.status !== 404) {
    throw new Error(`Resend lookup failed: ${lookup.response.status} ${JSON.stringify(lookup.data)}`);
  }

  const create = await resendRequest(env, '/contacts', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      ...contactPayload,
    }),
  });

  if (!create.response.ok) {
    throw new Error(`Resend create failed: ${create.response.status} ${JSON.stringify(create.data)}`);
  }

  return { created: true };
};

const responseMessage = (created) =>
  created
    ? 'Listo. Ya te sumé a la newsletter y vas a recibir la primera edición cuando se publique.'
    : 'Tu email ya estaba en la lista. Actualicé tus preferencias para próximas ediciones.';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = resolveAllowedOrigins(env);
    const cors = corsHeaders(origin, allowedOrigins);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    if (url.pathname === '/health') {
      return json({ ok: true }, 200, cors);
    }

    if (url.pathname !== '/subscribe') {
      return json({ ok: false, message: 'Ruta no encontrada.' }, 404, cors);
    }

    if (request.method !== 'POST') {
      return json({ ok: false, message: 'Método no permitido.' }, 405, cors);
    }

    if (!env.RESEND_API_KEY) {
      return json({ ok: false, message: 'Falta configurar RESEND_API_KEY en el Worker.' }, 500, cors);
    }

    if (origin && !allowedOrigins.includes(origin)) {
      return json({ ok: false, message: 'Origen no autorizado.' }, 403, cors);
    }

    try {
      const payload = normalizePayload(await parseRequest(request));
      const validation = validatePayload(payload);
      if (!validation.ok) return json(validation, validation.status, cors);

      const result = await upsertContact(env, payload);
      const message = responseMessage(result.created);
      const acceptsHtml = (request.headers.get('accept') || '').includes('text/html');

      if (acceptsHtml && !request.headers.get('x-requested-with')) {
        return html(`<main><h1>${message}</h1><p><a href="https://juliancardozo.github.io/newsletter/">Volver a la newsletter</a></p></main>`, 200, cors);
      }

      return json({ ok: true, created: result.created, message }, 200, cors);
    } catch (error) {
      return json(
        {
          ok: false,
          message: 'No pude registrar la suscripción. Revisá el Worker y la configuración de Resend.',
          error: error instanceof Error ? error.message : String(error),
        },
        500,
        cors,
      );
    }
  },
};
