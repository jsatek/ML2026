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

## Proposed structure

```
ML2026/
├── concepts/                  # one folder per design idea
│   ├── _template/             # starter copied by the scaffold script
│   ├── 01-baseline/           # current-site structure, modernized (control)
│   └── 02-<idea>/
│       ├── BRIEF.md           # hypothesis, audience, what to evaluate
│       ├── package.json
│       └── src/
├── packages/
│   ├── content/               # shared copy, nav, products, case studies (MD/JSON)
│   ├── tokens/                # optional shared brand tokens (colors, type, logo)
│   └── assets/                # logos, product imagery, photography
├── gallery/                   # index site that links/embeds every concept
├── research/                  # current-site audit, competitor notes, screenshots
├── scripts/
│   ├── new-concept.mjs        # `pnpm new-concept <slug>` scaffolds from _template
│   └── screenshot.mjs         # Playwright captures of every concept (desktop/mobile)
├── .github/workflows/
│   └── deploy.yml             # build all concepts + gallery → GitHub Pages
├── CLAUDE.md                  # conventions so Claude sessions add concepts consistently
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

### Phase 0 — Foundations (first PR)
- [ ] pnpm workspace root, `.gitignore`, `.nvmrc`, `.editorconfig`
- [ ] `concepts/_template` (Astro + Tailwind, reads from `packages/content`)
- [ ] `scripts/new-concept.mjs` scaffold script
- [ ] `gallery/` listing every concept with its BRIEF summary
- [ ] GitHub Actions workflow deploying gallery + concepts to Pages
- [ ] `CLAUDE.md` + updated `README.md` explaining the workflow

### Phase 1 — Content & research
- [ ] Audit the current site: sitemap, page types, key messages, CTAs → `research/`
- [ ] Extract real copy into `packages/content` (home, products/services, about, contact, case studies)
- [ ] Collect brand assets (logo, colors, fonts) into `packages/assets` / `packages/tokens`
- [ ] Note 5–10 reference sites (competitors + inspiration) with screenshots

### Phase 2 — First concepts (3–4 divergent directions)
Suggested starting set — deliberately different so the comparison is useful:
- **01-baseline** — current IA, modern visual refresh (the control)
- **02-editorial** — story-led, big typography, case-study forward
- **03-product-led** — interactive product/material explorer front and center
- **04-bold-motion** — immersive hero, scroll-driven animation

Each gets a home page + one interior page first; expand only the winners.

### Phase 3 — Review & converge
- [ ] Screenshot script + gallery comparison view
- [ ] Feedback per concept (GitHub issues labeled `concept:<slug>`)
- [ ] Pick 1–2 directions, merge the best ideas, build out full page set
- [ ] Lighthouse/accessibility pass on the finalist

## Open questions

1. What is Material Logiq's current site URL/platform, and is there a brand guide?
2. Who reviews concepts (internal team, leadership, clients)? Does the gallery need to be private?
3. Any stack constraints for the eventual production site (CMS, hosting, existing team skills)?
4. Which pages matter most — home, product/service pages, case studies, careers?
