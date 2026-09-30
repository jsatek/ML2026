# ML2026: Material Logiq website redesign concepts

Exploration repo: many front-end concepts for the Material Logiq site, all built
from the same content and published to one gallery. See `PLAN.md` for goals and phases.

## Layout
- `concepts/NN-slug/`: one self-contained concept (Astro + Tailwind by default). Each has a `BRIEF.md` with front matter (`title`, `summary`, `status`, `stack`) that feeds the gallery.
- `concepts/_template/`: unstyled starter with all six routes wired to data. Copied by `pnpm new-concept`.
- `packages/brand/` (`@ml/brand`): `tokens.css` (`--ml-*` vars), `tokens.json`, logos, brand guide PDF.
- `packages/content/` (`@ml/content`): shared **placeholder** data (`site`, `products`, `projects`, `resources`) plus helpers and the browser sample cart (`@ml/content/cart`).
- `scripts/`: `dev.mjs`, `new-concept.mjs`, `build-all.mjs` (builds every concept and the gallery into `_site/`).

## Commands
- `pnpm install`
- `pnpm new-concept <slug> [--from <concept>]`: scaffold `concepts/NN-<slug>`
- `pnpm dev <concept>`: e.g. `pnpm dev baseline`
- `pnpm build [filter]`: all concepts and the gallery go to `_site/`; set `SITE_BASE=/ML2026/` to mimic GitHub Pages
- `pnpm preview`: serve `_site/`

## Conventions
- Every concept implements the same six routes: `/`, `/products`, `/products/[slug]`, `/projects` (+ `/projects/[slug]`), `/resources`, `/samples`.
- Read all copy and data from `@ml/content`. Never hardcode product or project data in a concept. Edit the JSON if content needs to change (it affects every concept).
- Build every internal link with the concept's `url()` helper (`src/lib/utils.ts`) so it works under the Pages sub-path.
- Use the sample cart from `@ml/content/cart` (localStorage, `ml:cart` event) so cart behavior is comparable across concepts.
- Brand: colors and type come from `@ml/brand/tokens.css`. Teal `#2B8F92` fails AA for small text on white, so use deep green or `#1E6F71` for small text. Indivisible isn't licensed for web yet; the fallback is Inter Tight (Google Fonts).
- No real photography yet: render placeholders from finish `hex` values.
- Concepts are independent: don't import from another concept. Share code by moving it into `packages/`.
- Verify a concept with `pnpm build <slug>`, then check pages at desktop and 390px mobile widths.
