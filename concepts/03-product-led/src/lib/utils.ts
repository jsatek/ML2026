/** Prefix a site path with the deploy base (e.g. /ML2026/concepts/01-baseline). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
