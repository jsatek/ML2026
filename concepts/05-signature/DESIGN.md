---
name: "Material Logiq · 05 Signature"
description: "The category standard played straight: white ground, black type, deep green actions, and Silk Metal's real finishes as the way in to every sample."
colors:
  green: "#00574F"
  green-deep: "#003f39"
  teal: "#2B8F92"
  teal-ink: "#1e6f71"
  ink: "#0b0d0c"
  muted: "#4f5755"
  white: "#ffffff"
  mist: "#f3f4f3"
  line: "#dcdfdd"
  field-stroke: "#b9bfbc"
  media-fallback: "#e6e8e7"
  error: "#b3261e"
typography:
  display:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "-0.02em"
  spec-figure:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    fontFeature: "\"tnum\""
  lead:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"ss01\", \"cv11\""
  label:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  meta:
    fontFamily: "Indivisible, Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  control: "4px"
  round: "999px"
spacing:
  swatch-gap: "0.375rem"
  gutter-sm: "1rem"
  gutter-md: "2rem"
  gutter-lg: "3rem"
  column-gap: "2.5rem"
  rule-gap: "3rem"
  section: "5rem"
  container: "90rem"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.2rem"
    height: "2.75rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
  button-line:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.2rem"
    height: "2.75rem"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.green}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.2rem"
  button-light-hover:
    backgroundColor: "{colors.mist}"
  finish-chip:
    rounded: "{rounded.control}"
    size: "2.5rem"
  facet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.45rem 0.9rem"
    height: "2.5rem"
  facet-selected:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.65rem 0.85rem"
    height: "2.75rem"
  sample-slot:
    rounded: "{rounded.control}"
    textColor: "{colors.muted}"
  footer:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
---

# Design System: Material Logiq · 05 Signature

## Overview

**Creative North Star: "The Specifier's Counter"**

The counter at a serious material library: white surfaces, black type, the product photographed straight, and the real finishes laid out where you can pick them up. Nothing stands in for the material. There is no metaphor, no styled atmosphere, and no decorative color; the brand's deep green marks every place you can act, and the finishes themselves supply all the other color on the page.

The system plays the category standard straight, held to the craft level of the best acoustics and material brands. Silk Metal is the signature: the site opens on an installed Silk Metal photograph run edge to edge, with its finishes beneath as working add-sample controls. Structure comes from thin 1px rules and a 12-column grid rather than from boxes, cards, or shadows. Density is that of a spec sheet: generous at section level, tight and tabular inside spec rows and finish grids.

**Key Characteristics:**
- White ground, near-black ink, deep green for actions and the footer band.
- Finish color appears only inside swatches, photos, and finish-color fallback fields.
- Sections open on a 1px ink rule; lists and spec rows divide on light hairlines.
- Square-edged photography; 4px corners on controls and swatches only.
- Inter Tight at two weights, 400 and 600, with tabular figures for every number.
- The finish chip is the add-sample control, wherever a finish appears.

## Colors

A black-and-white spec sheet with one green that means act, one teal that only draws lines, and no other chrome color.

### Primary
- **Material Logiq Deep Green** (`green`): the brand's deep green. Primary buttons, the header Samples button, selected filter facets, text selection, the checkmark on a chosen finish, and the footer band. Text hover on nav and document links shifts to it.
- **Pressed Green** (`green-deep`): hover state of primary buttons only.

### Secondary
- **Rule Teal** (`teal`): the brand teal as a line, never as fill or text. Link underlines (2px), the active nav underline, every focus outline (2px, 3px offset), focused field borders, the short dash before product feature bullets, and the rule above the sample-project notice.
- **Teal Ink** (`teal-ink`): reserved. Defined for any small teal text (5.9:1 on white); no shipped surface sets teal text yet.

### Neutral
- **Ink** (`ink`): all headings and body text, the 1px section rules, outline buttons and their hover fill, the toast background, and the drawer backdrop at 40%.
- **Graphite Muted** (`muted`): metadata lines, spec labels, lead paragraphs, counts (7.4:1 on white).
- **White** (`white`): the page, the header (at 95% with blur), the drawer, form fields.
- **Wall Mist** (`mist`): the only tinted band, used full width behind the finish wall. Elsewhere only in small fills: the light button's hover, the mockup notice on the samples page, and the backdrop behind design-option line drawings.
- **Hairline** (`line`): header bottom border, row dividers in lists, specs and drawers, facet outlines, format badges.
- **Field Stroke** (`field-stroke`): input and select borders, and the dashed outline of empty sample slots.
- **Media Fallback** (`media-fallback`): the neutral field shown when neither a photo nor a finish hex is available.
- **Error Red** (`error`): invalid field borders and the form error line.

### Named Rules
**The Swatch-Only Color Rule.** Finish color lives inside swatches, finish photos, and the color field that stands in for a missing photo. It never tints a button, band, border, or text.

**The One Green Rule.** If it acts, it is deep green; nothing else is. Teal never carries an action, and green never decorates.

**The Teal Line Rule.** Teal draws lines: underlines, focus outlines, a feature dash. It is never a fill, and small teal text uses `teal-ink`.

## Typography

**Display Font:** Inter Tight (brand face Indivisible first in the stack; Inter, system-ui fallback)
**Body Font:** same family
**Label/Mono Font:** same family; numbers use tabular figures

**Character:** One grotesque in two weights. Large, tightly tracked 600 headings over a plain 400 body, with stylistic sets `ss01` and `cv11` on. It reads like a well-set data sheet.

### Hierarchy
- **Display** (600, clamp(2.75rem, 7vw, 6rem), 0.95, -0.035em): one per page, the page name ("Silk Metal", "Products", "Sample box"). Product detail pages cap it at clamp(2.5rem, 5vw, 4rem) and project pages at clamp(2.5rem, 6vw, 5rem) so long names fit.
- **Headline** (600, clamp(1.875rem, 3.6vw, 3rem), 1.05, -0.02em): section headings that open after a rule. Material names in the range list sit between headline and title at 1.875rem.
- **Title** (600, 1.125rem, -0.02em): card names, list headings, subsection headings ("Finishes", "Specifications").
- **Spec Figure** (600, 1.25 to 1.5rem, tabular): NRC, fire class, and finish counts in the spec row.
- **Lead** (400, 1.125rem): the paragraph under a display or headline, usually in `muted`, max 42rem.
- **Body** (400, 1rem, 1.5): running copy; `text-wrap: pretty`.
- **Label** (600, 0.875rem): form labels, document group names, button text at size.
- **Meta** (400, 0.875rem, `muted`): sector, location, material and type lines, finish group names, spec labels.

### Named Rules
**The Two Weights Rule.** 400 and 600, nothing else. Emphasis is size, weight 600, or ink-versus-muted, never italics, 500, or 700.

**The Heading-First Rule.** No eyebrows or kickers above headings. A heading leads; metadata (sector, location, year, material, counts) sits below it in Meta. The only text above a page heading is a breadcrumb that links back.

**The Tabular Rule.** Every number a specifier compares (NRC, class, counts, slot numbers) is set in tabular figures.

## Layout

A centered container up to 90rem with side gutters of 1rem on phones, 2rem from 768px, and 3rem from 1280px. Pages compose on a 12-column grid from 1024px, typically a 7/5 or 5/6 split with a 2.5rem column gap; below it everything stacks to one column. Signature and project heroes run their photograph full bleed above the container (44 to 58svh, min 18rem). Sections are spaced 5rem apart (6rem before documents and the footer); a section that opens on a rule gets 3rem of padding under it. Catalog grids step 1, 2, then 3 columns with 1.5rem column and 3rem row gaps. Finish grids are tight: 0.375rem gaps, 9 columns in the Silk Metal picker, 8 to 10 on product pages, and auto-fill 2.5rem minimum on the finish wall. Detail pages keep the summary and finish picker sticky beside the gallery from 1024px. The header is sticky at 64px; below 768px the nav collapses behind a two-line menu button while the Samples button stays visible.

### Named Rules
**The Ink Rule Rule.** A new section starts on a 1px `ink` rule across the container; rows inside it divide on `line` hairlines. Rules do the work boxes would do elsewhere.

## Elevation & Depth

Flat. Depth is conveyed by rules, the one mist band, and photography. Resting surfaces carry no shadow; the only resting depth is a 1px inset hairline that keeps pale swatches distinct from white. Real shadows appear only on things that float above the page: the toast, the mobile finish-detail sheet, and the small round badges sitting on top of swatches. The header uses translucency and blur, not a shadow.

### Shadow Vocabulary
- **Swatch edge** (`box-shadow: inset 0 0 0 1px rgb(0 0 0 / .12)`): every finish chip, card finish dot, drawer swatch, and filled sample slot.
- **Toast float** (`box-shadow: 0 8px 24px rgb(0 0 0 / .25)`): the add-sample confirmation toast.
- **Sheet lift** (`box-shadow: 0 -12px 32px rgb(0 0 0 / .18)`): the finish-wall detail panel when it docks to the bottom on small screens; removed from 1024px.
- **Badge** (`box-shadow: 0 1px 3px rgb(0 0 0 / .3)`): the white check badge on a chosen chip and the remove button on a filled slot.

### Named Rules
**The Flat Paper Rule.** Nothing on the page casts a shadow at rest. Only overlays float.

## Shapes

Two shapes: square photographs and slightly softened controls. Photography and media fields have square corners and are cropped 4:3, square, or full-bleed bands. Buttons, fields, facets, finish chips, sample slots, the toast, and small badges share a 4px corner. Fully round shapes are limited to small badges sitting on a swatch (the chosen-finish check and the slot remove button). Borders are 1px: `ink` for section rules and outline buttons, `line` for dividers and facets, `field-stroke` for inputs, dashed `field-stroke` for empty slots.

### Named Rules
**The 4px Control Rule.** If you can press it or type in it, it has a 4px corner. Photographs never do.

## Components

### Buttons
Plain, solid, and the same height everywhere.
- **Shape:** 4px corners, minimum 2.75rem tall, 0.7rem × 1.2rem padding, weight 600.
- **Primary:** deep green with white label; the main action of each view ("See all 7 Silk Metal systems", "Request 3 samples", "Search").
- **Hover / Focus:** background, color, and border transition over 150ms ease-out; primary deepens to `green-deep`; focus shows the 2px teal outline at 3px offset.
- **Line:** 1px ink border, ink label, fills ink with white label on hover or when pressed. Used for the secondary action and for the Add sample button (plus icon, label turns "Added").
- **Light:** white with green label, mist on hover; only on the green footer.
- **Text link:** 600 weight with a 2px teal underline; hover turns the text deep green.

### Chips
- **Facet (filter):** white, 1px hairline border, 4px corners, 0.9375rem text, minimum 2.5rem tall (44px on coarse pointers). Checked fills deep green with white text. Counts inside sit at 60% opacity.
- **Format badge:** tiny 4px-cornered outline tag (`line` border, 0.75rem, `muted`) for PDF, DWG and other file formats.

### Finish Chip (signature)
A real finish swatch that is itself the add-sample control. A square, 4px-cornered button filled with the finish hex and the swatch-edge inset; the photo variant lays the actual finish texture photo over the color field, and the hex stays as the fallback if the photo fails. It lifts 2px on hover over 150ms. Pressed (in the box) shows a white round badge with a deep green check, inset 22%. On the finish wall the same chip is a link that opens a detail panel listing every product in that finish, each with a small Add sample line button; a chip marked current gets a 2px ink outline at 2px offset.

### Finish Wall (signature)
Every finish across every material on one full-width `mist` band, Silk Metal first. Each material opens on an ink rule with its name and a finish count; finishes group under Meta labels in an auto-fill grid. Choosing a chip opens a sticky white detail panel beside the grid on desktop (hairline border) and a bottom sheet on mobile.

### Sample Box (signature)
Eight square slots in a 4-column grid (2 on mobile) under a ruled "N of 8 chosen" header. An empty slot is a dashed `field-stroke` square with its number in tabular `muted`. A filled slot shows the finish photo or color field with a round remove button, then the finish name (600), product and material, NRC and fire class, and links to that product's CSI spec, data sheet, and CAD. The header Samples button and drawer repeat the count, out of 8.

### Cards / Containers
- **Corner Style:** none; cards are a square 4:3 photo with text below, not a box.
- **Background:** white page, no card surface.
- **Shadow Strategy:** flat (see Elevation); the photo scales to 1.03 over 500ms on hover.
- **Border:** none; the whole card is one link and the name underlines on hover.
- **Content:** photo, name with NRC and fire class on one baseline, material and type meta line, then up to ten 14px finish dots with a "+N" count.

### Inputs / Fields
- **Style:** white, 1px `field-stroke` border, 4px corners, 0.65rem × 0.85rem padding, minimum 2.75rem; labels sit above in Label weight; placeholders in `muted`.
- **Focus:** 2px teal outline with a teal border; the caret is deep green.
- **Error:** red border after interaction (`:user-invalid`) and a red message line above the submit button.

### Navigation
- **Header:** wordmark left; Products, Projects, Resources at 0.9375rem weight 400, right aligned with 1.75rem gaps; hover turns deep green; the current page carries a 2px teal underline set down at the header's bottom edge. The deep green Samples button with its count closes the row and opens the sample drawer.
- **Mobile:** a two-line menu button reveals a full-width list of 600-weight 1.125rem links divided by hairlines; the Samples button stays in the bar.
- **Footer:** the deep green band; tagline at 1.875rem 600, white at 80% for secondary text.

### Motion
Motion is limited to small hover transitions: color changes at 150ms ease-out, the finish chip's 2px lift, and the card photo's 3% scale over 500ms. There are no entrance animations or scroll effects. Under `prefers-reduced-motion: reduce`, every transition and animation duration is zeroed and the chip lift is removed.

## Do's and Don'ts

### Do:
- **Do** use deep green (`#00574F`) for every action and selected state, and `#003f39` for its hover.
- **Do** keep finish color inside swatches, finish photos, and their color fallback fields.
- **Do** make every finish swatch an add-sample control, with the finish photo over the hex when one exists.
- **Do** open sections on a 1px ink rule and divide rows on `#dcdfdd` hairlines.
- **Do** set heading metadata below the heading in 0.875rem `muted`.
- **Do** use tabular figures for NRC, fire class, and counts.
- **Do** run photography square-edged, edge to edge or 4:3, and fall back to the finish hex when a photo is missing.

### Don't:
- **Don't** put eyebrows or kickers above headings.
- **Don't** use any weight other than 400 or 600.
- **Don't** use teal (`#2B8F92`) as a fill, for an action, or for small text; small teal text uses `#1e6f71`.
- **Don't** tint chrome (bands, buttons, borders, text) with finish colors.
- **Don't** add shadows to resting surfaces or round photographs.
- **Don't** use corners other than 4px on controls, except the small round badges that sit on a swatch.
- **Don't** add entrance, scroll, or looping motion; keep to hover transitions that zero out under reduced motion.
