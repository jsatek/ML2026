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

/** Euclidean RGB distance between two hex colors (0–441). */
export function colorDistance(a, b) {
  const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.replace('#', '').slice(i, i + 2), 16));
  const [x, y] = [rgb(a), rgb(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}
