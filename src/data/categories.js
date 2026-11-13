/**
 * Categorías del blog: una por artículo, alineadas con los pilares.
 * Los tags son temas transversales (varios por artículo); la categoría es la sección.
 * El slug es estable entre idiomas y se usa en el filtro del índice (?categoria=<slug>).
 */
export const categories = [
  {
    slug: 'ia-agentes',
    name: 'IA y agentes',
    description: 'Ingeniería con agentes: especificación, contexto, orquestación, loops y controles.',
    pillar: 'ingenieria-con-ia',
    en: { name: 'AI and agents', description: 'Engineering with agents: specification, context, orchestration, loops and controls.' },
  },
  {
    slug: 'modelos-ia',
    name: 'Modelos y tendencias de IA',
    description: 'Lanzamientos, modelos open-weight, hardware y gobernanza, leídos desde la ingeniería.',
    pillar: 'ingenieria-con-ia',
    en: { name: 'AI models and trends', description: 'Releases, open-weight models, hardware and governance, read from an engineering angle.' },
  },
  {
    slug: 'arquitectura-plataforma',
    name: 'Arquitectura y plataforma',
    description: 'Cloud, multi-tenancy, confiabilidad e infraestructura proporcionada al problema.',
    pillar: 'plataforma-arquitectura',
    en: { name: 'Architecture and platform', description: 'Cloud, multi-tenancy, reliability and infrastructure sized to the problem.' },
  },
  {
    slug: 'fintech-pagos',
    name: 'Fintech y pagos',
    description: 'Pagos, Open Finance y sistemas regulados, donde un error es una transacción que no ocurrió.',
    pillar: 'plataforma-arquitectura',
    en: { name: 'Fintech and payments', description: 'Payments, Open Finance and regulated systems, where a bug is a transaction that never happened.' },
  },
  {
    slug: 'liderazgo-producto',
    name: 'Liderazgo y producto',
    description: 'Equipos, Developer Experience, producto y emprendimiento técnico.',
    pillar: 'liderazgo-tecnico',
    en: { name: 'Leadership and product', description: 'Teams, Developer Experience, product and technical entrepreneurship.' },
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]));
