# ML2026: Material Logiq website concepts

A workspace for exploring front-end redesign concepts for
[materiallogiq.com](https://www.materiallogiq.com). Every concept builds the same
six pages from the same shared content, and everything is published to one
gallery site for side-by-side review.

**Gallery:** `https://jsatek.github.io/ML2026/` once GitHub Pages is enabled (see below).

## Quick start

```bash
pnpm install                 # Node 22+, pnpm 10
pnpm dev baseline            # run concept 01 at http://localhost:4321
pnpm new-concept editorial   # scaffold concepts/02-editorial from the template
pnpm build && pnpm preview   # build all concepts + gallery into _site/
```

## What's here

| Path | Purpose |
|------|---------|
| `concepts/01-baseline/` | Concept 01: conventional, best-practice structure (the control) |
| `concepts/02-editorial/` | Concept 02: story-led magazine layout with a typographic product index |
| `concepts/03-product-led/` | Concept 03: explorer-first, with faceted finder, shop by color, configurator, and document picker |
| `concepts/04-bold-motion/` | Concept 04: dark, kinetic, scroll-driven |
| `concepts/_template/` | Unstyled starter with all six pages wired to data |
| `packages/brand/` | Brand tokens, logos, and brand guide |
| `packages/content/` | Shared content from materiallogiq.com (26 products, 277 documents, projects) and the sample cart |
| `research/` | Current-site audit and the scrape → content scripts |
| `scripts/` | Dev, scaffold, and build-all/gallery scripts |
| `PLAN.md` | Goals, pages, and phased plan |

The six pages every concept implements: Home, Product navigation, Product page,
Project portfolio, Resources, and Sample request.

## Deploying the gallery

`.github/workflows/deploy.yml` builds every concept on each PR and deploys to
GitHub Pages on pushes to `main`. One-time setup: **Settings → Pages → Build and
deployment → Source: GitHub Actions**. A Pages site is publicly reachable (pages
are marked `noindex`), and Pages on a private repository requires a paid GitHub plan.
