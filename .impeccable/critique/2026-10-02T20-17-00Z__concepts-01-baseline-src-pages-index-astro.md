---
target: 01 Baseline home page
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/ML2026/concepts/01-baseline/src/pages/index.astro"
target_fingerprint: "sha256:89791cad90d904b7da7ec03b63bb482ddb95b2e83d4e6cc070ea4326fe8a0d2b"
target_path: /home/user/ML2026/concepts/01-baseline/src/pages/index.astro
timestamp: 2026-10-02T20-17-00Z
slug: concepts-01-baseline-src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score (Persuade surface; 7 and 10 n/a)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Cart count, toggle and toast work; card "Sample" doesn't show which finish it adds |
| 2 | Match System / Real World | 3 | "Start with the surface you're treating" is specifier language; "Sample project" pill collides with physical samples |
| 3 | User Control and Freedom | 3 | Toggle remove works; "Removed…" toast has no undo |
| 4 | Consistency and Standards | 2 | One action, six labels; three link styles; orange vs teal underline |
| 5 | Error Prevention | 2 | Card "Sample" silently adds finishes[0] (e.g. first of COFFA's 49 felts) |
| 6 | Recognition Rather Than Recall | 3 | Counts and specs on cards; no header search for returning specifiers |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | Three back-to-back catalog grids, 6 eyebrows, contentless H1 |
| 9 | Error Recovery | 3 | Good sample-limit message; failed images show broken glyphs |
| 10 | Help and Documentation | n/a | Persuade surface |
| Total | | 21/32 (66%) | Acceptable |

## Priority Issues
- [P1] Hero doesn't say what ML makes; tinted slivers hide the material; no image in mobile first viewport. clarify, layout.
- [P1] Silk Metal (proprietary) and customization (Materialize) buried/flattened. layout, bolder.
- [P2] Three redundant catalog grids (14 equal tiles); 12.8k px mobile page; samples/docs close ~11k px down. distill, adapt.
- [P2] Card "Sample" adds unseen default finish; action named six ways. clarify, harden.
- [P2] Failed hotlinked images render broken instead of hex color-field fallback. harden.

## Detector
Source clean (1 advisory: Placeholder.astro:21 11px). Live detect.js: 12 findings: kicker-above-heading x5 + hero-eyebrow-chip x1 (index.astro:20,60,93,119,132,148), all-caps-body x1 (:67), low-contrast placeholder 3.5:1 (:177), low-contrast #fff on #fff x5 (false positive: text over image+gradient). Static-HTML cramped-padding x17 false positive (CSS not resolved). Buzzword match is scraped client copy.

## Data bug
products.json taglines for BLAFFE, SLATTA, Wood Wool Engraved = "Like what you see, but want a solution tailored to your vision?" (scraper picked a CTA).
