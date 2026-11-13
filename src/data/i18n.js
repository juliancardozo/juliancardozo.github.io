/**
 * Contenido localizado.
 *
 * El español es la fuente: estructura, slugs, URLs, stack y fechas viven solo en
 * projects.js, articles.js, pillars.js y newsletter.js. Cada traducción en
 * `src/data/<locale>/` contiene solo los textos, indexados por slug, y se mezcla
 * sobre la base: los objetos se combinan clave a clave y los arrays se reemplazan.
 * Si falta la traducción de un elemento, el build avisa y usa el texto en español.
 */

import { projects, labFilters } from './projects.js';
import { articles } from './articles.js';
import { pillars } from './pillars.js';
import { newsletter } from './newsletter.js';
import { categories, categoryBySlug } from './categories.js';
import * as en from './en/index.js';

const translations = { en };

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const merge = (base, override) => {
  if (override === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) return override;
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) result[key] = merge(base[key], value);
  return result;
};

const localizeBySlug = (list, overrides, kind, code) =>
  list.map((item) => {
    const override = overrides?.[item.slug];
    if (!override) {
      console.warn(`  ! Falta traducción [${code}] de ${kind} "${item.slug}": se usa el español.`);
      return item;
    }
    return merge(item, override);
  });

export const dataFor = (code) => {
  if (code === 'es') return { projects, articles, pillars, newsletter, categories, labFilters: labFilters.es };

  const tr = translations[code];
  if (!tr) throw new Error(`No hay traducciones para el locale "${code}".`);

  return {
    projects: localizeBySlug(projects, tr.projects, 'proyecto', code).map((project) => ({
      ...project,
      capabilities: (project.capabilities || []).map((item) => tr.capabilities[item] || item),
    })),
    articles: localizeBySlug(articles, tr.articles, 'artículo', code).map((article) => ({
      ...article,
      // La categoría sale siempre de categories.js, para que el filtro y los textos coincidan.
      category: categoryBySlug[article.categorySlug][code]?.name || article.category,
      tags: article.tags.map((tag) => tr.tags[tag] || tag),
    })),
    categories: categories.map((category) => ({ ...category, ...(category[code] || {}) })),
    pillars: localizeBySlug(pillars, tr.pillars, 'pilar', code),
    newsletter: {
      ...merge(newsletter, tr.newsletter.base),
      issues: localizeBySlug(newsletter.issues, tr.newsletter.issues, 'edición', code),
    },
    labFilters: tr.labFilters,
  };
};
