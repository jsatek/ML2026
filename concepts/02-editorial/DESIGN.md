---
name: "Material Logiq · 02 Editorial"
description: "Story-led and typographic: products set like specimens in a design book, with big type, hairline rules, and full-bleed photography."
colors:
  ink: "#121212"
  specimen-paper: "#f6f4ef"
  graphite-muted: "#5b5a55"
  deep-green: "#00574F"
  teal: "#2B8F92"
  teal-ink: "#1e6f71"
  sky: "#8BD3DD"
  signal-orange: "#E1663B"
  error-red: "#b3261e"
typography:
  display:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 10rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.01em"
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
  none: "0"
spacing:
  gutter-sm: "1rem"
  gutter-md: "2rem"
  gutter-lg: "3.5rem"
  section: "4rem"
  container: "90rem"
components:
  button:
    backgroundColor: "{colors.specimen-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.4rem"
    typography: "{typography.label}"
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.specimen-paper}"
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.specimen-paper}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.4rem"
  button-solid-hover:
    backgroundColor: "{colors.deep-green}"
  input:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.6rem 0"
---

# Design System: Material Logiq · 02 Editorial

## Overview

**Creative North Star: "The Specimen Book"**

A beautifully set specimen book of materials. Each product is presented the way a type foundry presents a typeface: named in very large type, measured precisely, and shown in full as large swatch plates and full-bleed photographs. The catalog is an index, not a wall of cards; documents are an A–Z appendix.

Warm paper, black ink, and thin black rules do almost all the work. There are no rounded corners, no shadows on surfaces, and no decorative color. Color comes from the materials themselves (photos and finish swatches) and from one orange accent used as a single underline. The pace is unhurried and confident, but the facts (NRC, fire class, documents) are always set alongside the imagery so a returning specifier can scan them.

**Key Characteristics:**
- Warm specimen paper, black ink, 1px black hairline rules.
- Display type up to 10rem, tightly tracked and set solid (0.95 line height).
- Square corners everywhere; buttons are outlined boxes that invert on hover.
- Orange appears only as the single underline (active nav, links, emphasis).
- Text indexes and tables instead of card grids.

## Colors

Ink on warm paper; the materials supply the color, and orange marks the one thing to notice.

### Primary
- **Ink** (`ink`): text, rules, button outlines, the solid button, the footer and full-screen menu background.

### Secondary
- **Signal Orange** (`signal-orange`): the single underline on active nav and emphasized words, link hover underlines, field focus, the cart count superscript, and focus rings.

### Tertiary
- **Deep Green** (`deep-green`): hover state of the solid button only.
- **Sky** (`sky`): text selection and hover color for links on the dark footer and menu.

### Neutral
- **Specimen Paper** (`specimen-paper`): the page background everywhere.
- **Graphite Muted** (`graphite-muted`): secondary text and unselected toggles.
- **Teal / Teal Ink** (`teal`, `teal-ink`): available from the brand tokens; small teal text must use `teal-ink`.
- **Error Red** (`error-red`): invalid field underline and error text.

### Named Rules
**The Ink and Paper Rule.** Interface chrome is only ink and paper. If you're reaching for a brand color to decorate, let a material photo or swatch do it instead.

**The One Underline Rule.** Orange appears as a single underline marking what's current or emphasized, never as a fill.

## Typography

**Display Font:** Indivisible (web fallback: Inter Tight, then Inter, system-ui)
**Body Font:** same family

**Character:** One grotesque used at extreme contrast: enormous, tightly tracked bold headlines against calm, comfortably leaded body text. The scale jump is the design.

### Hierarchy
- **Display** (700, clamp(3rem, 10vw, 10rem), 0.95, -0.035em): product names and the home cover headline.
- **Headline** (700, clamp(2.25rem, 6vw, 5.5rem), 0.95): section openers and the footer "Let's talk."
- **Lede** (400, clamp(1.25rem, 2.2vw, 1.75rem), 1.35, -0.01em): the opening paragraph of product and project pages.
- **Body** (400, 1rem, 1.6): long-form text; keep lines to about 65–75 characters.
- **Label** (600, 1rem): buttons and index column headers.

### Named Rules
**The Set Solid Rule.** Headlines sit at 0.95 line height with negative tracking. Loose, airy headings break the specimen feel.

## Layout

A wide container (max 90rem) with gutters of 1rem on phones, 2rem from 768px, and 3.5rem from 1280px. Pages are built on a 12-column grid with asymmetric spans (for example a 5-column fact column beside a 7-column image). Sections are separated by full-width 1px ink rules rather than background bands. Photography runs at 4:3, 16:10, and 21:9, often full-bleed. The product page pairs a long scrolling story with a sticky "At a glance" fact column holding the sample action. The header is not sticky; on mobile a full-screen ink menu replaces the nav.

## Elevation & Depth

Flat. Depth comes from scale, rules, and full-bleed images, never from shadows on surfaces. The only shadow is on the transient toast.

### Named Rules
**The Paper Has No Depth Rule.** Nothing on the page floats. Use a rule or a scale change to separate content.

## Shapes

Square and ruled. No border radius anywhere: buttons, images, swatch plates, and fields all have hard corners. Fields are a single bottom rule rather than a box. Swatch plates are large squares that show the actual finish texture or its hex color.

## Components

### Buttons
- **Shape:** square corners (0).
- **Default:** transparent with a 1.5px ink border, 0.9rem × 1.4rem padding, 600 weight.
- **Hover / Pressed:** inverts to ink background with paper text over 150ms; pressed sample buttons stay inverted.
- **Solid:** ink fill with paper text; hover turns deep green.

### Toggles (filters and sorts)
- **Style:** plain text in medium weight, muted.
- **State:** selected turns ink with a 2px orange underline (5px offset). No chips or pills.

### Inputs / Fields
- **Style:** no box; transparent with a 1.5px ink bottom rule, 1.125rem text.
- **Focus:** the bottom rule turns orange.
- **Error:** the bottom rule turns red.

### Navigation
- **Desktop:** a row of medium-weight text links over a full-width ink rule; the current page gets the orange underline. Samples shows its count as an orange superscript.
- **Mobile:** a "Menu" text button opens a full-screen ink index with 3rem links and the product categories with counts.

### Product Index (signature)
The products page is a sortable typographic table (name, material, type, NRC, fire class) with inline text filters and a photo preview on hover. It replaces the card grid.

## Do's and Don'ts

### Do:
- **Do** separate sections with 1px ink rules.
- **Do** set product names at display size with tight tracking.
- **Do** let photos and swatch plates carry the color.
- **Do** keep NRC, fire class, and the sample button in the sticky fact column on product pages.

### Don't:
- **Don't** round any corner.
- **Don't** fill shapes with orange; it's an underline color.
- **Don't** add shadows to cards, images, or panels.
- **Don't** replace the text index with a card grid.
