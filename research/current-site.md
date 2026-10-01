# Current site audit: materiallogiq.com

Captured 2026-10-01 with `research/scrape_site.py` (raw data in `site-snapshot.json`).
WordPress + Elementor; content lives in pages, not structured product posts.

## Positioning (verbatim)
- **Tagline:** "Where fabrication meets imagination."
- **Intro:** "With a 40-year history of delivering best-in-class acoustical and architectural products and solutions…"
- **Values:** Experienced, yet scrappy · Imaginative and collaborative · Practical ingenuity
- **Process (Materialize):** Listen → Explore → Filter → Realize → Fulfill
- **Contact:** 123 Columbia Ct North, Chaska, MN 55318 · 800.220.8412 · sales@materiallogiq.com

## Information architecture
| Nav | Contents |
|-----|----------|
| Products → Ceilings | Ceiling Tiles, Ceiling Panels, Ceiling Clouds, Ceiling Baffles (category landing pages with SEO copy + FAQs) |
| Products → Walls | Wall Panels, Wall Tiles (plus an unlinked "Wall Systems" page) |
| Products → Material | Silk Metal, Wood Wool, PET Felt, Wood |
| Materialize | Custom-solutions process page with one featured project |
| Inspiration | Photo galleries per product |
| Resources | Asset Library (one long page), Blog |
| Contact | Name/email/message form |

## Catalog
- **26 product pages**: 15 PET felt (COFFA, HOLLO, KEYS, BLAFFE, BEAM, BLADE, TOPO, GRAFFLE, GRYD, THATCH, CLASSIQ, GRILLA, PLANQ, VEE, Panel), 7 Silk Metal, 2 Wood (SLATTA, SLATTA TILE), 2 Wood Wool.
- **Shared product template:** hero name, intro and bullets → inspiration gallery → design options → spec tabs (Options/Technical) → colors and textures → resources (Specification / Drawings / Technical / Sustainability) → Materialize CTA → 3 related products.
- **Finishes:** PET felt has 13 Essential + 26 Luxe colors + 10 wood grains. Silk Metal has 9 powder coats + 9 wood grains + 3 stone. Wood wool is Painted / Primed Clear / Primed White.
- **Documents:** 277 unique files (data sheets, CSI specs, install guides, DWG/SKP/RFA/OBJ/STP/3DM, test reports, HPD/VOC/LEED, SDS, warranty).

## UX observations (opportunities for the concepts)
1. **No way to browse or compare.** `/products` is a flat grid of 20 tiles with "Learn more" only: no filters by type, material, NRC, or fire rating. Two tiles are both titled "PET Felt Ceiling System".
2. **Product type and material are separate silos.** You can browse by Ceilings/Walls or by Material, but not both at once.
3. **No sample request flow.** The only conversion path is the generic contact form.
4. **Resources aren't searchable.** The Asset Library is one long page of ~300 buttons grouped by material and type. Some buttons are dead (`href="#"`, faded via script).
5. **Thin portfolio.** The Portfolio page has one project (16 Prime Steakhouse) and filters that mostly show "(0)". The Inspiration page has photos but no project stories or product links.
6. **Inconsistent naming.** "Silk Metal" vs "InvisiPerf Metal" vs "Microperforated Aluminium" across nav, taxonomy, and file names; product names mix ALL CAPS and Title Case.
7. **Rich content that's hard to find.** Category pages have good selection guidance and FAQs that the product pages don't surface.
8. **Specs are uneven.** NRC is missing for 6 products; some values only appear in bullets.

## What the mockups use
`research/build_content.py` maps this into `packages/content`:
- Product types become `categories`; materials become `materials`.
- Swatch photos are averaged into `finishes[].hex`.
- Each product's own photos are preferred for `images.hero`.
- Documents are de-duplicated by URL. A shared file (e.g. the PET felt SDS) lists every product it applies to.
- Projects: the 2 real ones, plus 8 `placeholder: true` sample projects built from real inspiration photos.
