// Build-time: compact product records the client-side explorer filters on.
import { products, getCategory, getMaterial } from '@ml/content';
import { familyOf, COLOR_FAMILIES } from './colors';

export type Rec = {
  slug: string; name: string; material: string; types: string[]; surfaces: string[];
  nrc: number; fire: string; colors: string[]; finishes: number; featured: boolean; search: string;
};

export const records: Rec[] = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  material: p.material,
  types: p.types,
  surfaces: [...new Set(p.types.map((t) => getCategory(t)!.group))],
  nrc: p.attributes.nrc ?? 0,
  fire: p.attributes.fireRating ?? '',
  colors: [...new Set(p.finishes.map((f) => familyOf(f.hex)))],
  finishes: p.finishes.length,
  featured: p.featured,
  search: `${p.name} ${p.fullName} ${getMaterial(p.material)?.name} ${p.types.join(' ')} ${p.finishes.map((f) => f.name).join(' ')} ${p.tagline}`.toLowerCase(),
}));

/** Color families that actually occur, so we never offer an empty choice. */
export const usedFamilies = COLOR_FAMILIES.filter((f) => records.some((r) => r.colors.includes(f.slug)));

/** First finish of a product in a color family (for retargeting sample buttons). */
export const finishByFamily = Object.fromEntries(
  products.map((p) => [p.slug, Object.fromEntries(p.finishes.slice().reverse().map((f) => [familyOf(f.hex), f.name]))]),
);
