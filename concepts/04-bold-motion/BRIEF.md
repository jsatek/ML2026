---
title: Bold motion
summary: Dark, immersive, and kinetic. The logo's three bands become the hero, and scroll drives reveals, a pinned materials scroller, stacked projects, and a product page whose imagery follows the story.
status: Draft
stack: Astro + Tailwind
---

# 04 · Bold motion

## Hypothesis
"Where fabrication meets imagination" deserves a site that feels made, not templated.
Motion and full-bleed imagery on a dark stage make the products (felt, perforated
metal, wood) feel tactile and premium, and help Material Logiq stand apart from
catalog-style competitors. Motion should guide attention rather than decorate, and
must never block access to specs.

## Primary audience
Designers and brand-conscious owners in early inspiration; also first impressions for new specifiers.

## Key UX ideas
- **Kinetic hero:** the three logo bands slide in carrying product photography, the headline rises line by line, and the bands drift apart as you scroll.
- **Material marquee + pinned horizontal scroller:** the four materials glide sideways while the page holds still.
- **Reveal-on-scroll** throughout, with staggered entrances.
- **Product page:** a sticky full-height image that crossfades as each text chapter scrolls past; a "finish wall" where choosing a swatch fills a large close-up.
- **Stacked project cards** that pile up as you scroll.
- **Filter transitions** use the View Transitions API where supported.
- **Accessible motion:** everything respects `prefers-reduced-motion` and falls back to a static layout; content is never hidden without JS.

## What to evaluate
1. Does motion increase perceived quality and time on page without frustrating specifiers who want data fast?
2. Is the dark stage right for showing material color accurately, or does it distort finishes?
3. Performance on mid-range phones (scroll smoothness, image weight).
