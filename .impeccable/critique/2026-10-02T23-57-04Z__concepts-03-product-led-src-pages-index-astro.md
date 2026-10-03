---
target: 03-product-led home page
total_score: 26
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/ML2026/concepts/03-product-led/src/pages/index.astro"
target_fingerprint: "sha256:78db4cc3d72610bff7c9e9b30d0105ec71c2083d4f431013cebffe9304c5a319"
target_path: /home/user/ML2026/concepts/03-product-led/src/pages/index.astro
timestamp: 2026-10-02T23-57-04Z
slug: concepts-03-product-led-src-pages-index-astro
---
# Critique: 03-product-led home (dual-agent)
Specificity: faceted e-commerce catalog; invented family swatches (lib/colors.ts) instead of real finishes.
Score 26/36 (10 n/a). Cog load: 4 failures (21 chips + 12 swatches, all steps open).
- [P1] No sense of material; replace invented swatches with real finishes[].hex wall -> bolder/colorize
- [P1] Silk Metal one pill; Materialize one card -> shape
- [P1] Eyebrow on h1 (:17) + 3-card shortcut row (:74-89) -> distill
- [P2] Mobile finder: results not visible while choosing -> adapt
- [P3] Flat type scale, no single-underline device -> typeset
Strength: real finder with live count, filters passed through to explorer, works without JS.
Detector: text-[10px] search results; placeholder contrast 3.4:1; h1->h3 skip; 4x nested-cards.
