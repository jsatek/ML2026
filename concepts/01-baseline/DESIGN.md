---
name: "Material Logiq · 01 Baseline"
description: "A bright, conventional building-products site: the control every other concept is measured against."
colors:
  deep-green: "#00574F"
  deep-green-pressed: "#003f39"
  teal: "#2B8F92"
  teal-ink: "#1e6f71"
  sky: "#8BD3DD"
  signal-orange: "#E1663B"
  ink: "#111413"
  slate-muted: "#545c5a"
  showroom-white: "#ffffff"
  warm-paper: "#f5f4f0"
  hairline: "#e2e0da"
  field-stroke: "#c9c6be"
  error-red: "#b3261e"
typography:
  display:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  field: "0.6rem"
  card: "1rem"
  panel: "1.5rem"
  pill: "999px"
spacing:
  gutter-sm: "1rem"
  gutter-md: "1.5rem"
  gutter-lg: "2.5rem"
  section: "4rem"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.deep-green}"
    textColor: "{colors.showroom-white}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.35rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.deep-green-pressed}"
  button-outline:
    textColor: "{colors.deep-green}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.9rem"
  chip:
    backgroundColor: "{colors.showroom-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.85rem"
  chip-selected:
    backgroundColor: "{colors.deep-green}"
    textColor: "{colors.showroom-white}"
  input:
    backgroundColor: "{colors.showroom-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.7rem 0.9rem"
  product-card:
    backgroundColor: "{colors.showroom-white}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
---

# Design System: Material Logiq · 01 Baseline

## Overview

**Creative North Star: "The Showroom Floor"**

A bright, friendly showroom where every product sits within arm's reach. Visitors walk in, see the whole range laid out on clean white tables, pick things up, compare them side by side, and pocket a sample on the way out. Nothing is hidden behind a story or an effect; the material photography and real finish colors do the selling.

The system is deliberately conventional. It is the control for this repo, so its job is to be clear and comfortable, not surprising. Density is moderate: generous white space around cards, a sticky header that always offers the sample cart, and soft rounded shapes that invite touching. Brand color is used with restraint: deep green carries every action, teal and sky appear as quiet accents, and orange is reserved for focus rings and the underline on the brand line. Silk Metal, the material only Material Logiq makes, gets the one dark ink band on the home page.

**Key Characteristics:**
- White floor, warm-paper bays: white page with `warm-paper` bands to group sections.
- Rounded, touchable objects: pill buttons and chips, 1rem cards.
- Deep green means "do this": every primary action, selected chip, and active link.
- Photography first in every card, with the finish swatches right under it.
- A sample button on every product card and the header count always visible.

## Colors

A white showroom lit by the brand's deep green, with teal and sky as accents and orange kept for focus.

### Primary
- **Deep Showroom Green** (`deep-green`): all primary buttons, selected chips, active nav links, and text links. The one color that means "act here". Hover deepens to `deep-green-pressed`.

### Secondary
- **Brand Teal** (`teal`): the single-underline on headlines and links, and input focus outlines. Never used for small text on white (fails AA).
- **Teal Ink** (`teal-ink`): the darkened teal (5.9:1 on white) for any small teal text.
- **Sky** (`sky`): the cart-count badge, accent text and link underlines on dark bands (ink and deep green), and the hover fill of white buttons on dark.

### Tertiary
- **Signal Orange** (`signal-orange`): keyboard focus rings (3px outline, 2px offset) and the single underline on the hero's brand line ("imagination."). Nowhere else.

### Neutral
- **Ink** (`ink`): body text, the dark footer and toast, and the Silk Metal feature band.
- **Slate Muted** (`slate-muted`): secondary text, taglines, spec labels.
- **Showroom White** (`showroom-white`): the page and card surfaces.
- **Warm Paper** (`warm-paper`): alternating section bands and hover backgrounds for nav items.
- **Hairline** (`hairline`): card borders, header bottom border, chip outlines.
- **Field Stroke** (`field-stroke`): form input borders.
- **Error Red** (`error-red`): invalid field borders.

### Named Rules
**The One Action Color Rule.** If it's clickable and primary, it's deep green. Teal, sky, and orange never carry a primary action.

**The Small Teal Rule.** Brand teal is for lines and large shapes. Any teal text smaller than 24px uses `teal-ink`.

## Typography

**Display Font:** Indivisible (web fallback: Inter Tight, then Inter, system-ui)
**Body Font:** same family

**Character:** One sans family in two weights does all the work: bold, tightly tracked headings over a plain, readable body. It reads like clear signage in a showroom.

### Hierarchy
- **Display** (700, 3rem, line-height 1, -0.02em): home hero headline.
- **Headline** (700, 2.25rem, 1.1): section and page titles.
- **Title** (700, 1.125rem, 1.4): product and project card names.
- **Body** (400, 1rem, 1.5): paragraphs; taglines at 0.875rem in `slate-muted`, clamped to two lines on cards.
- **Label** (600, 0.875rem): buttons, chips, spec values.

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

### Named Rules
**The Single Underline Rule.** From the brand guide: emphasis in headlines, quotes, and links is a single underline (0.08em thick, 0.14em offset), never italics or a highlight box. It is teal on nav and links, and orange only on the hero's brand line.

## Layout

A centered container (max 80rem) with side gutters of 1rem on phones, 1.5rem from 640px, and 2.5rem from 1024px. Sections are spaced 4rem apart (up to 5rem on the hero). Catalog grids step from 1 column to 2 then 3 or 4 columns; detail pages use a 12-column grid with a media column and a sticky info column. The header is sticky (64px, 80px from 1024px) with a translucent white background, and collapses to a menu button below 768px while keeping the Samples button visible.

## Elevation & Depth

Mostly flat with hairline borders. Depth appears only as a response to interaction: product cards gain a large soft shadow on hover, and the toast floats with an extra-large shadow. The header uses a 95% white background with backdrop blur instead of a shadow.

### Shadow Vocabulary
- **Card lift** (Tailwind `shadow-lg`): product and project cards on hover.
- **Toast float** (Tailwind `shadow-xl`): the cart confirmation toast.

### Named Rules
**The Flat at Rest Rule.** Surfaces are flat with a hairline border until touched. Shadows mean "you're interacting with this".

## Shapes

Soft and touchable. Buttons, chips, nav items, and the cart badge are full pills (999px). Cards use 1rem corners, larger feature panels 1.5rem, and form fields 0.6rem. Card images are cropped to 4:3 and scale up 3% on hover inside an overflow-hidden frame. Every media frame is a color field from the finish hex with the logo's diagonal bands as texture; the photo sits on top and removes itself if it fails to load (images are hotlinked), so a broken image never shows.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** deep green with white label, 0.75rem × 1.35rem padding, 600 weight.
- **Hover / Focus:** background deepens to `deep-green-pressed` over 150ms; focus shows the orange ring.
- **Outline:** 1.5px border in the current color (deep green for sample buttons), 8% tint on hover.
- **Small:** 0.5rem × 0.9rem, 0.875rem text; used for card sample buttons and the header Samples button.
- **Touch target:** every button is at least 44px tall (min-height 2.75rem).

### Chips
- **Style:** white pill, hairline border, 0.875rem medium text.
- **State:** selected (pressed or checked) fills deep green with white text. Used for catalog filters.

### Cards / Containers
- **Corner Style:** 1rem.
- **Background:** white with a hairline border.
- **Shadow Strategy:** flat; large shadow on hover.
- **Internal Padding:** 1.25rem.
- **Order:** image (4:3), name, material and type line (teal ink), two-line tagline, NRC and fire class, then the finish picker and the sample button pinned to the bottom.

### Inputs / Fields
- **Style:** white, `field-stroke` border, 0.6rem corners, 0.7rem × 0.9rem padding.
- **Focus:** 2px teal outline and teal border.
- **Error:** red border once the user has interacted (`:user-invalid`).

### Navigation
- **Desktop:** right-aligned pill links in medium weight at 80% ink; hover adds a warm-paper pill; the current page turns deep green with the teal single underline.
- **Mobile:** a hamburger toggles a full-width list of large links under the header; the Samples button stays visible.

### Sample Button (signature)
A small outline pill with a plus icon on every product card and project. On cards it sits under a finish picker: up to six swatches spread across the range, each a 28px button, with the chosen one ringed in deep green and named ("Sample finish: Beige"), so the visitor always knows which finish they're adding. Pressing it toggles that product and finish in the shared cart; the label changes to "Added" with a check icon. A dark pill toast confirms with a "View samples" link, or offers "Undo" after a removal.

## Do's and Don'ts

### Do:
- **Do** use deep green (`#00574F`) for every primary action and selected state.
- **Do** keep photography first in cards, cropped 4:3, with the finish swatches directly underneath.
- **Do** keep the sample button and the header cart count visible at every width.
- **Do** use `teal-ink` (`#1e6f71`) for any small teal text.
- **Do** fall back to a finish-hex color field when an image is missing or fails to load.
- **Do** show performance where people choose (for example an NRC range on each product-type tile).

### Don't:
- **Don't** put teal (`#2B8F92`) text under 24px on white.
- **Don't** use orange for anything but focus rings and the hero brand-line underline.
- **Don't** put a small uppercase label above a heading; the heading carries the section.
- **Don't** add a sample without showing which finish it is.
- **Don't** add shadows to resting surfaces; depth is a hover response.
- **Don't** use square corners on buttons or chips; this world is rounded.
