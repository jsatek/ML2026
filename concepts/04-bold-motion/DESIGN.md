---
name: "Material Logiq · 04 Bold motion"
description: "Dark, immersive, and kinetic: the logo's three bands carry the hero, and scroll choreographs the materials on a dark stage."
colors:
  stage-night: "#0a0e0d"
  stage-night-raised: "#121917"
  bone: "#f2f1ec"
  dim: "#a3aba8"
  edge: "#26302d"
  deep-green: "#00574F"
  teal: "#2B8F92"
  sky: "#8BD3DD"
  signal-orange: "#E1663B"
typography:
  mega:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 10.5vw, 12rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  big:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  field: "0.75rem"
  panel: "1.5rem"
  pill: "999px"
spacing:
  gutter-sm: "1rem"
  gutter-lg: "2.5rem"
  section: "6rem"
  section-lg: "8rem"
  container: "100rem"
components:
  pill:
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.1rem"
    typography: "{typography.label}"
  pill-solid:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.stage-night}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.1rem"
  pill-solid-hover:
    backgroundColor: "{colors.sky}"
  input:
    backgroundColor: "{colors.stage-night-raised}"
    textColor: "{colors.bone}"
    rounded: "{rounded.field}"
    padding: "0.8rem 1rem"
  panel:
    backgroundColor: "{colors.stage-night-raised}"
    rounded: "{rounded.panel}"
---

# Design System: Material Logiq · 04 Bold motion

## Overview

**Creative North Star: "The Fabrication Stage"**

The materials perform on a dark stage. Felt, perforated metal, and wood are lit like objects in a workshop at night, and scroll is the choreography: the logo's three bands slide in carrying photography, headlines rise line by line, the materials glide across in a pinned scroller, and project cards stack as you go. Motion is direction, not decoration: it leads the eye to the next material and then gets out of the way of the specs.

The palette is nearly black with warm bone-white type and the brand colors used as light: sky for small accents and hovers, orange as the single underline, deep green as the full-screen menu. Type is uppercase and huge where it announces, plain where it informs. Everything has a reduced-motion version that is a complete, static layout, and nothing is hidden without JavaScript.

**Key Characteristics:**
- Near-black stage (`stage-night`) with bone type; `color-scheme: dark`.
- Uppercase mega type up to 12rem, tracked tight (-0.04em) and set at 0.92.
- The logo's three diagonal bands as the hero's structure and motion.
- Pill controls with thin `edge` borders; large rounded panels (1.5rem).
- Two authored motion moments on home (the logo bands and the pinned material row, which pins only for a fine pointer on wide screens), plus reveals on inner pages; all off under reduced motion.

## Colors

A night stage where the brand colors act as light sources.

### Primary
- **Stage Night** (`stage-night`): the page background and theme color.
- **Bone** (`bone`): primary text and the solid pill button.

### Secondary
- **Sky** (`sky`): small accent labels, cart count, solid-pill hover, link hovers, and field focus.
- **Signal Orange** (`signal-orange`): the single underline, focus rings, and invalid-field borders.
- **Deep Green** (`deep-green`): the full-screen menu background.

### Tertiary
- **Brand Teal** (`teal`): text selection background.

### Neutral
- **Stage Night Raised** (`stage-night-raised`): fields and raised panels.
- **Dim** (`dim`): secondary text in the footer and captions.
- **Edge** (`edge`): pill borders, dividers, and field borders.

### Named Rules
**The Lights On the Material Rule.** Color on this stage should come from material photography. Brand colors are small lights (an underline, a count, a hover), with the deep-green menu as the one full-color surface.

## Typography

**Display Font:** Indivisible (web fallback: Inter Tight, then Inter, system-ui; 800 weight loaded for the wordmark and menu)
**Body Font:** same family

**Character:** Announcements are uppercase, enormous, and tightly packed, like a stage banner. Information returns to quiet sentence case so specs stay easy to read.

### Hierarchy
- **Mega** (700, clamp(2.5rem, 10.5vw, 12rem), 0.92, -0.04em, uppercase): hero headline and footer "Let's talk".
- **Big** (700, clamp(2.25rem, 6vw, 6rem), 0.92, uppercase): section openers and product names.
- **Title** (700, 1.5rem, 1.1): card and chapter titles.
- **Body** (400, 1rem, 1.6): descriptions and specs, in bone or dim.
- **Label** (600, 1rem): pill buttons and controls.

### Named Rules
**The Shout Then Inform Rule.** Uppercase mega type announces a section; everything the visitor needs to read or compare is sentence case at body size.

## Layout

A very wide stage (max 100rem) with 1rem gutters, 2.5rem from 768px. Sections are spaced generously (6–8rem). The header is fixed and transparent, holding only the mark, a Samples pill, and a Menu pill over translucent night backgrounds with blur. The home page uses full-height scenes: the band hero, a material marquee, a pinned horizontal materials scroller, and stacked project cards. The product page pairs a sticky full-height image that crossfades with scrolling text chapters, then a "finish wall". The menu is a full-screen deep green overlay with giant uppercase links.

## Elevation & Depth

Depth comes from light and layering on the dark stage, not from shadows: translucent night overlays with backdrop blur on the header pills, raised night panels, and stacked cards that physically overlap as you scroll. The toast is the only element with a strong shadow.

### Shadow Vocabulary
- **Toast** (Tailwind `shadow-2xl`): the bone pill toast confirming samples.

## Shapes

Rounded and soft on a hard, dark field. Pills (999px) for every button and control; 1.5rem corners on image panels and project cards; 0.75rem on fields. The logo's three diagonal bands are the one recurring geometric motif, used in the hero and as image fallbacks.

## Components

### Pills (buttons)
- **Shape:** full pill.
- **Default:** transparent with a 1px edge border, bone text, 600 weight; hover border turns bone.
- **Solid / Pressed:** bone fill with night text; solid hover turns sky. Transitions take 200ms.
- **Header pills:** 60% night fill with backdrop blur so they stay legible over imagery.

### Inputs / Fields
- **Style:** raised night fill, edge border, 0.75rem corners, bone text.
- **Focus:** 2px sky outline inset by 1px.
- **Error:** orange border.

### Navigation
- **Header:** mark plus spaced uppercase wordmark (hidden on phones), Samples pill with sky count, Menu pill.
- **Menu:** full-screen deep green overlay; links at clamp(2.5rem, 9vw, 7rem), 800 weight, uppercase, separated by thin bone rules, entering with a staggered rise; Escape closes it and returns focus.

### Motion system (signature)
- **Reveal:** fade and 40px rise over 0.9s, eased `cubic-bezier(.2,.7,.2,1)`, staggered 90ms per item.
- **Rise:** headline lines slide up from a clipped mask over 1s, staggered 120ms after a 250ms delay.
- **Bands:** the three logo bands slide in over 1.2s, staggered 150ms, then drift apart with scroll (scroll-timeline where supported).
- **Page transitions:** same-origin view transitions where supported.
- **Gating:** motion classes only apply once JS adds `.motion` to `<html>`; `prefers-reduced-motion` disables every animation and transition and shows the final state.

## Do's and Don'ts

### Do:
- **Do** gate every animation behind the `.motion` class and switch it off under `prefers-reduced-motion`.
- **Do** use uppercase mega type only to announce; keep specs and body text in sentence case.
- **Do** keep the Samples pill and its count visible in the fixed header.
- **Do** check finish colors against the dark stage; show swatches large enough to judge.

### Don't:
- **Don't** hide content until JavaScript runs.
- **Don't** let motion delay access to specs, documents, or the sample action.
- **Don't** use square corners on controls; this world is pills and soft panels.
- **Don't** fill large areas with brand color other than the menu's deep green.
