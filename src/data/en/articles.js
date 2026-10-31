/**
 * Artículos del blog en inglés: solo textos, indexados por slug. Fechas, slugs,
 * proyecto de origen y URLs viven en src/data/articles.js.
 */

import { aiArticles } from './articles-ai.js';
import { projectArticles } from './articles-projects.js';

/** Tags de filtro: se calculan en español (ver articles.js) y se traducen acá. */
export const tags = {
  IA: 'AI',
  Agentes: 'Agents',
  'Ingeniería inversa': 'Reverse engineering',
  Producto: 'Product',
  Música: 'Music',
  'Open-weight': 'Open-weight',
  Arquitectura: 'Architecture',
  Infraestructura: 'Infrastructure',
  Liderazgo: 'Leadership',
  Datos: 'Data',
  Startups: 'Startups',
  Pagos: 'Payments',
  Cloud: 'Cloud',
};

export const articles = { ...aiArticles, ...projectArticles };
