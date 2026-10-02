---
name: "Material Logiq · 03 Product-led"
description: "Explorer-first: a compact, search-led product tool with faceted filtering, a configurator, a document picker, and a sample drawer."
colors:
  deep-green: "#00574F"
  deep-green-pressed: "#003d37"
  teal: "#2B8F92"
  teal-ink: "#1e6f71"
  sky: "#8BD3DD"
  signal-orange: "#E1663B"
  ink: "#0f1514"
  instrument-muted: "#59615f"
  bench-white: "#ffffff"
  panel-gray: "#f2f4f3"
  hairline: "#dfe3e1"
  error-red: "#b3261e"
typography:
  headline:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  sm: "0.375rem"
  control: "0.6rem"
  card: "0.9rem"
  pill: "999px"
spacing:
  gutter-sm: "1rem"
  gutter-lg: "1.5rem"
  section: "2rem"
  container: "96rem"
components:
  button-primary:
    backgroundColor: "{colors.deep-green}"
    textColor: "{colors.bench-white}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.deep-green-pressed}"
  button-ghost:
    backgroundColor: "{colors.bench-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  chip:
    backgroundColor: "{colors.bench-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  chip-selected:
    textColor: "{colors.deep-green}"
  sample-added:
    backgroundColor: "{colors.teal-ink}"
    textColor: "{colors.bench-white}"
  input:
    backgroundColor: "{colors.bench-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.6rem 0.8rem"
  card:
    backgroundColor: "{colors.bench-white}"
    rounded: "{rounded.card}"
---

# Design System: Material Logiq · 03 Product-led

## Overview

**Creative North Star: "The Spec Workbench"**

A capable tool on a specifier's workbench, mid-project. The visitor arrives with requirements ("Class A baffle, NRC above 0.8, warm gray") and the interface behaves like an instrument: search in the header, live counts on every facet, removable filter chips, compare, and a drawer that collects samples without leaving the page. Every pixel is there to shorten the path from requirement to sample or spec kit.

It is compact and precise. The base font size is 15px, controls are small and tightly spaced, and surfaces are white with light gray panels and hairline borders. Brand color is functional: deep green for actions and selected states, teal ink for things already in the cart, sky as a light highlight for document types and messages.

**Key Characteristics:**
- Dense: 15px base, small controls, tight gaps.
- Search-first header with instant product and document results.
- White workbench with `panel-gray` side panels and hairline borders.
- Gently rounded controls (0.6rem) and cards (0.9rem); chips are pills.
- Selected means deep green; "in your cart" means teal ink.

## Colors

A neutral white workbench where green marks what's chosen and teal marks what's collected.

### Primary
- **Deep Workbench Green** (`deep-green`): primary buttons, the Samples button, selected chip borders and text, active nav, "Explore all results" links. Hover deepens to `deep-green-pressed`.

### Secondary
- **Teal Ink** (`teal-ink`): sample buttons that are already in the cart (filled, white text).
- **Brand Teal** (`teal`): field focus outlines.
- **Sky** (`sky`): document-format badges and drawer status messages, at 30–40% tint.

### Tertiary
- **Signal Orange** (`signal-orange`): keyboard focus rings only.

### Neutral
- **Ink** (`ink`): primary text.
- **Instrument Muted** (`instrument-muted`): secondary text, labels, inactive nav.
- **Bench White** (`bench-white`): page, cards, controls.
- **Panel Gray** (`panel-gray`): filter panels, search field fill, hover rows, footer.
- **Hairline** (`hairline`): borders on cards, chips, ghost buttons, and dividers.
- **Error Red** (`error-red`): invalid fields.

### Named Rules
**The Chosen vs Collected Rule.** Deep green means "selected as a filter or option". Teal ink means "in your sample cart". Never swap them.

## Typography

**Display Font:** Indivisible (web fallback: Inter Tight, then Inter, system-ui)
**Body Font:** same family

**Character:** Workmanlike and legible at small sizes. Bold headings stay modest so data and controls lead.

### Hierarchy
- **Headline** (700, 2.25rem, 1.1, -0.02em): page titles; the largest type on the site.
- **Title** (700, 1.25rem, 1.3): panel and section headings, drawer title.
- **Body** (400, 15px base, 1.5): descriptions and results; secondary text at 0.85–0.875rem.
- **Label** (600, 0.75rem, 0.08em tracking, uppercase, muted): facet group names and result-group headings in search.

### Named Rules
**The Data Leads Rule.** No heading should be larger than it needs to be. On a tool, the numbers and controls are the headline.

## Layout

A wide shell (max 96rem) with 1rem gutters, 1.5rem from 1024px. The explorer uses a filter sidebar beside a results grid that switches between grid and list views; product cards step from 2 to 3 or 4 columns. The header is sticky (64px) with logo, a search field that grows to fill the row, nav, and the Samples button. On mobile, the logo becomes the mark, the nav becomes a horizontal row of chips under the header, and the Samples button shows an icon and count. Vertical rhythm is tight (sections about 2rem apart).

## Elevation & Depth

Flat with borders, plus true overlays. Cards and panels are bordered, not shadowed. Floating layers use real elevation: the search results dropdown and the sample drawer (a right-side modal dialog over a 40% black backdrop) carry an extra-large shadow.

### Shadow Vocabulary
- **Overlay** (Tailwind `shadow-xl`): search dropdown and other floating panels.

### Named Rules
**The Only Overlays Float Rule.** Shadows are reserved for layers that sit above the page. Cards and panels stay flat.

## Shapes

Gently rounded and consistent: 0.6rem on buttons and fields, 0.9rem on cards and dropdowns, 0.375–0.5rem on thumbnails and list rows, full pills for chips and the search field. Finish swatches are rounded squares with a thin black ring at 10% opacity.

## Components

### Buttons
- **Shape:** 0.6rem corners.
- **Primary:** deep green with white text, 0.65rem × 1rem; hover deepens.
- **Ghost:** white with a hairline border; hover border turns ink.
- **Small:** 0.4rem × 0.7rem, 0.85rem text.
- **Sample (added):** fills teal ink with white text and no border.

### Chips
- **Style:** white pill, hairline border, 0.85rem text.
- **State:** selected chips get a deep green border, a 10% green tint, green text, and 600 weight. Active filters appear as removable chips above results.

### Cards / Containers
- **Corner Style:** 0.9rem.
- **Background:** white with a hairline border; no shadow.
- **Internal Padding:** compact (about 0.75–1rem).

### Inputs / Fields
- **Style:** white, hairline border, 0.6rem corners; the header search is a gray-filled pill with a search icon.
- **Focus:** 2px teal outline inset by 1px.
- **Error:** red border.

### Navigation
- **Desktop:** compact rounded links in muted text; hover adds a gray panel; the current page turns deep green.
- **Mobile:** chips in a horizontally scrolling row.

### Sample Drawer (signature)
A full-height dialog sliding in from the right (max 28rem). It lists each sample with its finish color swatch, name, finish, and a remove button, shows the count against the 8-sample limit, and ends with a full-width "Request these samples" button. Adding a sample anywhere opens it with a confirmation message.

### Global Search (signature)
A combobox in the header with instant results grouped into Products (thumbnail, name, material) and Documents (format badge, title), keyboard navigable, ending with "Explore all results".

## Do's and Don'ts

### Do:
- **Do** show live counts on facets and keep active filters as removable chips.
- **Do** use deep green for selected options and teal ink for samples already in the cart.
- **Do** keep controls compact and aligned to the 15px base.
- **Do** reserve shadows for the drawer, dropdowns, and other overlays.

### Don't:
- **Don't** set display-sized type; this world tops out at 2.25rem.
- **Don't** shadow cards or panels.
- **Don't** use teal (`#2B8F92`) for small text; use `teal-ink`.
- **Don't** make a visitor leave the page to add a sample.
