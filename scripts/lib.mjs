import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const CONCEPTS = join(ROOT, 'concepts');

/** Published concept folders (anything not starting with _), sorted. */
export function listConcepts() {
  return readdirSync(CONCEPTS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && existsSync(join(CONCEPTS, d.name, 'package.json')))
    .map((d) => d.name)
    .sort();
}

/** Resolve "01", "baseline", or "01-baseline" to a concept folder name. */
export function findConcept(query) {
  const all = listConcepts();
  return all.find((c) => c === query) ?? all.find((c) => c.startsWith(`${query}-`) || c.endsWith(`-${query}`) || c.includes(query));
}

/** Parse the simple `key: value` front matter at the top of BRIEF.md. */
export function readBrief(dir) {
  const file = join(CONCEPTS, dir, 'BRIEF.md');
  const meta = { title: dir, summary: '', status: '', stack: '' };
  if (!existsSync(file)) return meta;
  const m = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  for (const line of m?.[1].split('\n') ?? []) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return meta;
}
