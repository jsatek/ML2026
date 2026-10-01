# ML2026 — Website Redesign Exploration Plan

Goal: a repo where we can quickly spin up, compare, and share many front-end
concepts for the Material Logiq website redesign, without each concept
reinventing content, tooling, or deployment.

## Guiding principles

1. **Concepts are cheap and isolated.** Each idea lives in its own folder and can
   use whatever stack it needs. Deleting one never breaks another.
2. **Same content, different presentation.** All concepts pull from one shared
   content source, so comparisons are about design, not copy.
3. **Everything is viewable by a link.** Every concept is built and published to
   one gallery site so stakeholders can click through without running code.
4. **Each concept states its hypothesis.** A short brief explains what the
   concept is trying to prove, so reviews stay focused.

## Inputs we have

- **Current site:** https://www.materiallogiq.com
- **Brand guide** (color, type, logo only; no voice/messaging), now in `packages/brand/`:
  - Primary: black `#000000`, deep green `#00574F`, teal `#2B8F92`
  - Secondary: sky `#8BD3DD`, orange `#E1663B`
  - Type: Indivisible (Bold headlines; Regular/Medium subheads and body); single-underline style for headlines, quotes, links
- **Constraints:** none. The goal is exploring concepts rooted in an exceptional user experience.

## Pages every concept mocks up

Each concept builds the same six pages so directions can be compared page by page.

| # | Page | Route | UX job to be done |
|---|------|-------|-------------------|
| 1 | Home | `/` | Say what Material Logiq is in seconds; route people to products, projects, samples |
| 2 | Product navigation | `/products` | Browse and filter the full line (category, application, finish, attributes); compare |
| 3 | Product page | `/products/[slug]` | Visuals, colors/finishes, specs, documents, related projects, "request sample" |
| 4 | Project portfolio | `/projects` (+ detail) | Inspiration: filter by sector/product; show products used in each project |
| 5 | Resources | `/resources` | One searchable library of spec sheets, installation guides, warranties, CAD/BIM, filterable by product and doc type |
| 6 | Sample request | `/samples` | Fast, low-friction flow: pick products/colors into a "sample cart", then contact and shipping details, then confirmation |

Shared expectations: responsive down to phone width, accessible (WCAG AA contrast with
the brand palette, keyboard navigable), and a sample cart that persists across pages
(localStorage is fine for mockups).

## Proposed structure

```
ML2026/
├── concepts/                  # one folder per design idea
│   ├── _template/             # ✅ unstyled starter, all 6 routes wired to data
│   ├── 01-baseline/           # ✅ conventional best-practice structure (control)
│   └── 02-<idea>/
│       ├── BRIEF.md           # hypothesis, audience, what to evaluate
│       ├── package.json
│       └── src/
├── packages/
│   ├── brand/                 # ✅ tokens.css/json, logos, brand guide PDF
│   ├── content/               # ✅ placeholder data + helpers + sample cart (JSON/JS)
│   └── assets/                # product imagery, project photography (later)
├── research/                  # current-site audit, competitor notes, screenshots
├── scripts/
│   ├── dev.mjs                # ✅ `pnpm dev <concept>`
│   ├── new-concept.mjs        # ✅ `pnpm new-concept <slug>` scaffolds from _template
│   ├── build-all.mjs          # ✅ builds every concept + generates the gallery into _site/
│   └── screenshot.mjs         # Playwright captures of every concept (desktop/mobile), later
├── .github/workflows/
│   └── deploy.yml             # ✅ build on PRs; deploy gallery + concepts to Pages from main
├── CLAUDE.md                  # ✅ conventions so Claude sessions add concepts consistently
└── package.json               # pnpm workspace root
```

## Recommended tooling

| Concern        | Recommendation                          | Why |
|----------------|-----------------------------------------|-----|
| Workspace      | pnpm workspaces                         | Concepts share deps/content without coupling |
| Default stack  | Astro + Tailwind (per concept)          | Great for marketing sites, fast, static output; islands allow React/Svelte where needed |
| Content        | Markdown + JSON in `packages/content`   | Easy to edit, framework-agnostic |
| Hosting        | GitHub Pages via Actions (or Vercel/Netlify for per-PR previews) | Zero-cost shareable links |
| Comparison     | Playwright screenshot script            | Side-by-side desktop/mobile captures in the gallery |
| Quality checks | Lighthouse CI (optional, later)         | Compare performance/accessibility across concepts |

Concepts are free to deviate (plain HTML, Next.js, a Three.js hero, etc.) as long
as they build to static files in `dist/`.

## Phased rollout

### Phase 0 — Foundations ✅
- [x] pnpm workspace root, `.gitignore`, `.nvmrc`, `.editorconfig`
- [x] `concepts/_template` (Astro + Tailwind, reads from `packages/content`)
- [x] `scripts/new-concept.mjs` scaffold script
- [x] Gallery (generated by `scripts/build-all.mjs`) listing every concept with its BRIEF summary, live preview, and a page-by-page comparison table
- [x] GitHub Actions workflow deploying gallery + concepts to Pages (enable Pages → Source: GitHub Actions)
- [x] `CLAUDE.md` + updated `README.md` explaining the workflow

### Phase 1 — Content & research
- [x] Brand tokens, logos, and guide in `packages/brand`
- [ ] Audit the current site: sitemap, product taxonomy, document types, sample flow, pain points → `research/current-site.md`
      (blocked: this cloud environment's network policy denies `www.materiallogiq.com`; allow the domain or paste the content)
- [x] Build `packages/content` data model: `products.json` (category, attributes, colors, specs, docs),
      `projects.json` (sector, location, products used), `resources.json` (doc type, product, file)
- [x] Fill it with placeholder products/projects/documents (12 products, 9 projects, 79 documents)
- [ ] Replace placeholders with real content once the audit is unblocked
- [ ] Get a vector master of the full logo; confirm Indivisible web-font licensing (fallback: Inter Tight)
- [ ] Note 5–10 reference sites (competitors + inspiration) with screenshots

### Phase 2 — First concepts (3–4 divergent directions)
Suggested starting set — deliberately different so the comparison is useful:
- **01-baseline** ✅ — conventional best-practice structure, all six pages (the control)
- **02-editorial** — story-led, big typography, case-study forward
- **03-product-led** — interactive product/material explorer front and center
- **04-bold-motion** — immersive hero, scroll-driven animation

Each builds all six pages at mockup fidelity (real layout and interactions, sample data).

### Phase 3 — Review & converge
- [ ] Screenshot script + gallery comparison view
- [ ] Feedback per concept (GitHub issues labeled `concept:<slug>`)
- [ ] Pick 1–2 directions, merge the best ideas, build out full page set
- [ ] Lighthouse/accessibility pass on the finalist

## Open questions

1. Who reviews concepts? Does the gallery need to be private? (A standard GitHub Pages site is public.)
2. Access to current-site content: allow `www.materiallogiq.com` in this environment, or share an export of products, projects, and documents.
3. ~~Photography?~~ Placeholders for now (color fields from finish hex values).
4. Do you have a voice/messaging direction, or should concepts explore that too?
