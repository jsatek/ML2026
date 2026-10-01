// Client-side filter engine shared by the home finder and the explorer page.
import type { Rec } from './records';

export type State = { q: string; surface: string; types: string[]; materials: string[]; minNrc: number; classA: boolean; colors: string[] };
export type Key = keyof State;

export const empty = (): State => ({ q: '', surface: '', types: [], materials: [], minNrc: 0, classA: false, colors: [] });

/** Does a record pass every filter except `skip` (used for live facet counts)? */
export function matches(r: Rec, s: State, skip?: Key): boolean {
  const terms = s.q.toLowerCase().split(/\s+/).filter(Boolean);
  return (
    (skip === 'q' || terms.every((t) => r.search.includes(t))) &&
    (skip === 'surface' || !s.surface || r.surfaces.includes(s.surface)) &&
    (skip === 'types' || !s.types.length || s.types.some((t) => r.types.includes(t))) &&
    (skip === 'materials' || !s.materials.length || s.materials.includes(r.material)) &&
    (skip === 'minNrc' || !s.minNrc || r.nrc >= s.minNrc) &&
    (skip === 'classA' || !s.classA || r.fire === 'A') &&
    (skip === 'colors' || !s.colors.length || s.colors.some((c) => r.colors.includes(c)))
  );
}

export function toParams(s: State): URLSearchParams {
  const p = new URLSearchParams();
  if (s.q) p.set('q', s.q);
  if (s.surface) p.set('surface', s.surface);
  s.types.forEach((t) => p.append('type', t));
  s.materials.forEach((m) => p.append('material', m));
  if (s.minNrc) p.set('nrc', String(s.minNrc));
  if (s.classA) p.set('fire', 'A');
  s.colors.forEach((c) => p.append('color', c));
  return p;
}

export function fromParams(p: URLSearchParams): State {
  return {
    q: p.get('q') ?? '',
    surface: p.get('surface') ?? '',
    types: p.getAll('type'),
    materials: p.getAll('material'),
    minNrc: Number(p.get('nrc') ?? 0),
    classA: p.get('fire') === 'A',
    colors: p.getAll('color'),
  };
}
