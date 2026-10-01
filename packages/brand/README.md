# @ml/brand

Brand source of truth shared by every concept. Taken from the Material Logiq
Identity & Guidelines (`guide/`), which covers color, typography, and logo use
only. It does not define voice or messaging.

| File | What it is |
|------|------------|
| `tokens.css` | CSS custom properties (`--ml-*`) for colors and type |
| `tokens.json` | Same values with Pantone/CMYK references |
| `logo/materiallogiq-mark.svg` | Vector "M" mark, redrawn from the PNG (scalable) |
| `logo/materiallogiq-mark.png` | Original mark |
| `logo/materiallogiq-wordmark.webp` | Original horizontal logo (mark + wordmark) |

## Rules from the guide
- **Primary palette:** black, deep green `#00574F`, teal `#2B8F92`.
  **Secondary:** sky `#8BD3DD`, orange `#E1663B`, used as accents.
- **Type:** Indivisible. Bold for headlines; Regular or Medium for subheads
  (-10 tracking) and body (0 tracking).
- **Underline style:** a single underline may mark headlines, pull quotes, and links.
- **Logo:** keep clear space around it and respect the minimum size. An
  inverse (white-on-black) centered version and circular digital thumbnails exist.

## To do
- Get a vector (SVG) master of the full horizontal logo and the inverse version.
- Confirm the Indivisible license covers web use, then add `.woff2` files to `fonts/`.
