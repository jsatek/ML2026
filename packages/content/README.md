# @ml/content

Shared content and data for every concept, so concepts differ in design, not copy.

Content is **scraped from materiallogiq.com**. `research/scrape_site.py` saves a
snapshot and `research/build_content.py` generates these JSON files. Re-run both
to refresh. Images and documents link to the live site (they aren't copied
into the repo).

| File | Contents |
|------|----------|
| `site.json` | Name, tagline, intro, stats, values, 5-step process, Materialize blurb, nav, contact, sample limit |
| `products.json` | `categories[]` (6 product types), `materials[]` (4), `products[]` (26) |
| `projects.json` | `sectors[]` (site markets) and `projects[]` |
| `resources.json` | `types[]` and `resources[]` (277 real documents) |
| `index.js` | Named exports plus lookup helpers (`getProduct`, `resourcesForProduct`, ...) and `specSummary(products)` / `formatNrc(summary)` for NRC range, fire ratings and finishes of a product set |
| `cart.js` | Browser sample cart (`add`, `remove`, `onChange`) persisted in localStorage |
| `finish-wall.js` | `bindFinishWall()`: shared behavior for a finish wall built from `finishWall()` (pick a swatch, see which products offer it, add a sample). Concepts supply markup and styles. |

### Product shape
`slug, name (e.g. "COFFA"), fullName, material, category (primary type), types[], tagline,
description, features[], specs{label: string|string[]}, attributes{fireRating, nrc, acoustic},
finishes[{name, hex, group, image}], designOptions[{name, image}], images{hero, gallery[]},
related[slug], featured, source`

`finishes[].hex` is the average color of the site's swatch photo, which is useful
for color dots and placeholders. `finishes[].image` is the real swatch texture.

### Caveats
- **Projects:** the site has one portfolio entry (16 Prime Steakhouse) and one
  featured Materialize project. The rest are `placeholder: true`, built from real
  product inspiration photos.
- **Missing data:** document file sizes aren't published (`size: null`). Some
  products have no NRC value (`attributes.nrc: null`).
- **Samples:** the live site has no sample request flow. That page is a new concept.
