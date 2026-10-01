// Shared content for every concept. All data is PLACEHOLDER until the
// current-site audit fills in real products, projects, and documents.
import site from './site.json';
import productData from './products.json';
import projectData from './projects.json';
import resourceData from './resources.json';

export { site };
export const categories = productData.categories;
export const products = productData.products;
export const sectors = projectData.sectors;
export const projects = projectData.projects;
export const resourceTypes = resourceData.types;
export const resources = resourceData.resources;

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getResourceType = (slug) => resourceTypes.find((t) => t.slug === slug);

export const productsInCategory = (slug) => products.filter((p) => p.category === slug);
export const projectsUsingProduct = (slug) => projects.filter((p) => p.products.includes(slug));
export const resourcesForProduct = (slug) => resources.filter((r) => r.product === slug);

/** Every application value used across products, sorted. */
export const applications = [...new Set(products.flatMap((p) => p.applications))].sort();
