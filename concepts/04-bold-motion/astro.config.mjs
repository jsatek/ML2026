import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH is set by scripts/build-all.mjs so the concept works under
// /<repo>/concepts/<slug>/ on GitHub Pages; locally it serves from /.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});
