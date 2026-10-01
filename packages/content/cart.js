// Browser-only sample cart shared by all concepts. Persists in localStorage and
// broadcasts a `ml:cart` event on window whenever it changes.
import site from './site.json';

const KEY = 'ml-sample-cart';
export const LIMIT = site.sampleLimit;

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

function write(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (private mode); the cart just won't persist.
  }
  window.dispatchEvent(new CustomEvent('ml:cart', { detail: items }));
}

const same = (a, b) => a.product === b.product && a.finish === b.finish;

export const getCart = read;

export function has(item) {
  return read().some((i) => same(i, item));
}

/** Adds {product, finish}. Returns 'added' | 'exists' | 'full'. */
export function add(item) {
  const items = read();
  if (items.some((i) => same(i, item))) return 'exists';
  if (items.length >= LIMIT) return 'full';
  write([...items, item]);
  return 'added';
}

export function remove(item) {
  write(read().filter((i) => !same(i, item)));
}

export function clear() {
  write([]);
}

export function onChange(fn) {
  const handler = () => fn(read());
  window.addEventListener('ml:cart', handler);
  window.addEventListener('storage', (e) => e.key === KEY && handler());
  handler();
}
