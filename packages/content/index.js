// Shared content for every concept, scraped from materiallogiq.com (see research/).
// Projects marked `placeholder: true` are invented; everything else is real.
import site from './site.json';
import productData from './products.json';
import projectData from './projects.json';
import resourceData from './resources.json';

export { site };
export const categories = productData.categories; // product types: ceiling tiles, baffles, wall panels…
export const materials = productData.materials; // PET Felt, Silk Metal, Wood, Wood Wool
export const products = productData.products;
export const sectors = projectData.sectors;
export const projects = projectData.projects;
export const resourceTypes = resourceData.types;
export const resources = resourceData.resources;

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const getMaterial = (slug) => materials.find((m) => m.slug === slug);
export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getResourceType = (slug) => resourceTypes.find((t) => t.slug === slug);

/** Products of a type (a product can belong to several, e.g. ceiling and wall panels). */
export const productsInCategory = (slug) => products.filter((p) => p.types.includes(slug));
export const productsInMaterial = (slug) => products.filter((p) => p.material === slug);
export const projectsUsingProduct = (slug) => projects.filter((p) => p.products.includes(slug));
export const resourcesForProduct = (slug) => resources.filter((r) => r.products.includes(slug));
export const relatedProducts = (product) => product.related.map(getProduct).filter(Boolean);

/**
 * Spec roll-up for a set of products: NRC range (unknown values skipped), fire
 * ratings present, unique finishes (by name) and finish groups.
 */
export function specSummary(list) {
  const nrc = list.map((p) => p.attributes.nrc).filter((n) => n != null);
  const finishes = [...new Map(list.flatMap((p) => p.finishes).map((f) => [f.name, f])).values()];
  return {
    count: list.length,
    nrc: nrc.length ? { min: Math.min(...nrc), max: Math.max(...nrc) } : null,
    nrcUnknown: list.length - nrc.length,
    fire: [...new Set(list.map((p) => p.attributes.fireRating).filter(Boolean))],
    finishes,
    finishGroups: [...new Set(finishes.map((f) => f.group).filter(Boolean))],
  };
}

/** "0.70–1.15", "0.80", or null when no product in the set has an NRC value. */
export function formatNrc(summary) {
  if (!summary.nrc) return null;
  const { min, max } = summary.nrc;
  return min === max ? min.toFixed(2) : `${min.toFixed(2)}–${max.toFixed(2)}`;
}

/** Euclidean RGB distance between two hex colors (0–441). */
export function colorDistance(a, b) {
  const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.replace('#', '').slice(i, i + 2), 16));
  const [x, y] = [rgb(a), rgb(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}
