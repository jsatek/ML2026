# ML2026: Material Logiq website redesign concepts

Exploration repo: many front-end concepts for the Material Logiq site, all built
from the same content and published to one gallery. See `PLAN.md` for goals and phases.

## Layout
- `concepts/NN-slug/`: one self-contained concept (Astro + Tailwind by default). Each has a `BRIEF.md` with front matter (`title`, `summary`, `status`, `stack`) that feeds the gallery.
- `concepts/_template/`: unstyled starter with all six routes wired to data. Copied by `pnpm new-concept`.
- `packages/brand/` (`@ml/brand`): `tokens.css` (`--ml-*` vars), `tokens.json`, logos, brand guide PDF.
- `packages/content/` (`@ml/content`): shared content **scraped from materiallogiq.com** (`site`, `products`, `materials`, `categories`, `projects`, `resources`) plus helpers and the browser sample cart (`@ml/content/cart`). See its README for the data shape.
- `research/`: `current-site.md` audit, `scrape_site.py` → `site-snapshot.json` → `build_content.py` → `packages/content/*.json`.
- `scripts/`: `dev.mjs`, `new-concept.mjs`, `build-all.mjs` (builds every concept and the gallery into `_site/`).
- Design skill: [Impeccable](https://impeccable.style) in `.claude/skills/impeccable/`. `PRODUCT.md` (root) holds shared product context; each concept's `DESIGN.md` (+ `.impeccable/design.json`) records its visual system. Work one page at a time, e.g. `/impeccable critique concepts/02-editorial/src/pages/samples.astro`. Run `/impeccable document` in a new concept once it has code.

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
- Use the sample cart from `@ml/content/cart` (localStorage, `ml:cart` event) so cart behavior is comparable across concepts. `@ml/content/sample-ui` wires `[data-add-sample]` buttons and `[data-cart-count]` badges; concepts supply their own feedback UI via `notify`.
- Motion must respect `prefers-reduced-motion`, and content must stay visible without JS (see 04-bold-motion's `.motion` class pattern).
- Brand: colors and type come from `@ml/brand/tokens.css`. Teal `#2B8F92` fails AA for small text on white, so use deep green or `#1E6F71` for small text. Indivisible isn't licensed for web yet; the fallback is Inter Tight (Google Fonts).
- Photos and documents are hotlinked from materiallogiq.com (`images.hero`, `images.gallery`, `finishes[].image`, `resources[].href`). Fall back to a color field from finish `hex` when an image is missing.
- Projects with `placeholder: true` are invented case studies (real product photo); label them as samples in the UI.
- To refresh content: `python3 research/scrape_site.py && python3 research/build_content.py` (needs `beautifulsoup4`, `pillow`). Don't hand-edit the generated JSON; change `build_content.py` instead.
- Concepts are independent: don't import from another concept. Share code by moving it into `packages/`.
- Verify a concept with `pnpm build <slug>`, then check pages at desktop and 390px mobile widths.
