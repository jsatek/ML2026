// Color families for "shop by color". Each finish is assigned to its nearest family.
import { colorDistance } from '@ml/content';

export const COLOR_FAMILIES = [
  { slug: 'white', name: 'White', hex: '#ece9e2' },
  { slug: 'beige', name: 'Beige & sand', hex: '#cdbb9c' },
  { slug: 'gray', name: 'Light gray', hex: '#b4b6b6' },
  { slug: 'charcoal', name: 'Charcoal', hex: '#55585a' },
  { slug: 'black', name: 'Black', hex: '#1f1f1f' },
  { slug: 'wood', name: 'Wood tones', hex: '#a07a52' },
  { slug: 'brown', name: 'Brown', hex: '#5e4535' },
  { slug: 'red', name: 'Red', hex: '#a8343a' },
  { slug: 'orange', name: 'Orange & gold', hex: '#d9893a' },
  { slug: 'green', name: 'Green', hex: '#55704a' },
  { slug: 'teal', name: 'Teal', hex: '#2f7f7f' },
  { slug: 'blue', name: 'Blue', hex: '#3d5f8f' },
  { slug: 'purple', name: 'Purple', hex: '#6d5a86' },
];

export function familyOf(hex: string): string {
  let best = COLOR_FAMILIES[0];
  for (const f of COLOR_FAMILIES) if (colorDistance(hex, f.hex) < colorDistance(hex, best.hex)) best = f;
  return best.slug;
}
