# Product

<!-- impeccable:product-schema 1 -->

This file is shared by every concept in `concepts/`. Each concept records its own visual system in its own `DESIGN.md`.

## Platform

web

## Users

**Primary: specifiers.** Architects and interior designers who choose acoustical and architectural surface products for commercial interiors (offices, hospitality, education, healthcare, retail). They visit at two moments:

- **Early design / inspiration:** comparing materials, finishes, and looks, and building a shortlist.
- **Specification / documentation:** confirming performance (NRC, fire rating), pulling data sheets, CSI specs, and CAD/BIM files into drawings, and ordering physical samples to approve a finish.

**Secondary: contractors and distributors.** Mostly look up documents (install guides, warranties, SDS, test reports) for a product they already know.

## Product Purpose

The Material Logiq website helps specifiers find the right product, see it in real finishes, and get it onto their drawings. Success is measured by two actions, weighted equally:

1. **Sample requests:** the visitor orders physical samples of specific products and finishes.
2. **Spec and document downloads:** the visitor gets data sheets, CSI specs, and CAD/BIM files.

Custom-project inquiries (Materialize) matter too, but they come after these two.

The current site (materiallogiq.com, audited in `research/current-site.md`) has no filtering or comparison, no sample-request flow, and an unsearchable 277-file asset library. Fixing those gaps is the baseline expectation for every concept.

## Positioning

- **Breadth across materials from one partner:** PET felt, Silk Metal, wood, and wood wool, with deep finish ranges (for example 39 felt colors plus wood grains, and powder coats, wood grains, and stone looks for metal).
- **Silk Metal is proprietary to Material Logiq.** No competitor can offer it. Treat it as a signature material, not one item among many.
- **The standard line can be customized.** The 26 standard product systems are a starting point; Material Logiq is able and willing to adapt them to a project's specification (the "Materialize" process: Listen → Explore → Filter → Realize → Fulfill).
- Backed by a 40-year history in acoustical and architectural products.

Tagline (existing, verbatim): "Where fabrication meets imagination."

## Operating Context

- Visitors compare products against stated requirements (surface, product type, material, NRC, fire class, color).
- Physical samples are how finishes get approved; the site caps a sample request at 8 items (`site.sampleLimit`).
- Documents are evaluated as a set per product: Specification, Drawings (DWG/SKP/RFA/OBJ/STP/3DM), Technical (test reports, data sheets), Sustainability (HPD, VOC, LEED), plus SDS, install guides, and warranties.
- Specifiers often return to the site repeatedly during a project, so repeat visits must be fast.

## Capabilities and Constraints

- **Repository purpose:** this repo explores many front-end concepts for a redesign. Every concept implements the same six routes (`/`, `/products`, `/products/[slug]`, `/projects` + detail, `/resources`, `/samples`) so they can be compared page by page. Concepts are static Astro + Tailwind builds published to one gallery.
- **Content is shared and real:** all copy and data come from `@ml/content` (scraped from materiallogiq.com). Concepts must not hardcode product or project data or invent copy that states facts.
- **Catalog:** 26 product systems across 6 product types (ceiling tiles, panels, clouds, baffles; wall panels, wall tiles) and 4 materials. Some products are missing NRC values; show them as unknown, never invent them.
- **Sample cart** is shared (`@ml/content/cart`, localStorage), so cart behavior is comparable across concepts.
- **Images and documents** are hotlinked from materiallogiq.com; fall back to a color field from the finish hex when an image is missing.
- **Naming is inconsistent on the live site** ("Silk Metal" vs "InvisiPerf Metal" vs "Microperforated Aluminium"). Use the names in `@ml/content`.

## Brand Commitments

- **Colors (brand guide, `packages/brand/`):** black `#000000`, deep green `#00574F`, teal `#2B8F92` (primary); sky `#8BD3DD`, orange `#E1663B` (secondary). Tokens live in `@ml/brand/tokens.css`.
- **Typeface:** Indivisible (Bold headlines; Regular/Medium subheads and body). It isn't licensed for web yet, so the web fallback is **Inter Tight**. This is a binding brand choice, not a default.
- **Single-underline style** for headlines, quotes, and links (from the brand guide).
- **Logo:** the Material Logiq mark with its three diagonal bands; files in `packages/brand/`.
- No voice or messaging guide exists yet. Concepts may explore tone, but must not change factual copy.

## Evidence on Hand

- Real product data, specs, finishes, and photography for all 26 products (`packages/content/products.json`).
- 277 real documents (`packages/content/resources.json`).
- **Only 2 real project case studies** (including 16 Prime Steakhouse). The other 8 projects are `placeholder: true` sample case studies built from real product photos; they must be labeled as samples in the UI.
- Real company facts: 40-year history, values, Materialize process, contact details (`packages/content/site.json`).
- **Absent, do not fabricate:** testimonials, client logos, awards, pricing, lead times, certifications beyond the documents provided, and project stories for placeholder projects.

## Product Principles

1. **Requirements to sample in as few steps as possible.** Every product view offers a direct path to a sample and to its documents.
2. **Show the real material.** Finishes, textures, and installed photos carry the decision; color accuracy matters more than decoration.
3. **Silk Metal and customization are differentiators.** Make them visible, not buried in a list.
4. **Specs are never behind the experience.** Inspiration-led layouts must still let a returning specifier reach NRC, fire rating, and CAD files fast.
5. **Same truth, different presentation.** Concepts compete on design and UX, never on altered content.

## Accessibility & Inclusion

- WCAG 2.2 AA contrast with the brand palette. Teal `#2B8F92` fails AA for small text on white; use deep green `#00574F` or `#1E6F71` for small text.
- Fully keyboard navigable; visible focus states.
- Motion respects `prefers-reduced-motion`; content stays visible without JavaScript.
- Responsive down to 390px phone width.
