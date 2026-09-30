# @ml/content

Shared content and data for every concept, so concepts differ in design, not copy.

**All data here is placeholder** (fictional products, projects, and documents)
until the current-site audit replaces it with real Material Logiq content.

| File | Contents |
|------|----------|
| `site.json` | Company name, tagline, intro, stats, nav, contact, sample limit |
| `products.json` | `categories[]` and `products[]` (specs, attributes, finishes with hex colors) |
| `projects.json` | `sectors[]` and `projects[]` (story, quote, products used) |
| `resources.json` | `types[]` and `resources[]` (spec sheets, guides, CAD/BIM, etc.) |
| `index.js` | Named exports plus lookup helpers (`getProduct`, `projectsUsingProduct`, ...) |
| `cart.js` | Browser sample cart (`add`, `remove`, `onChange`) persisted in localStorage |

```js
import { products, getProduct, resourcesForProduct } from '@ml/content';
import * as cart from '@ml/content/cart'; // client-side only
```

No real photography yet: concepts should render placeholders from each finish's
`hex` value (see the baseline's `Swatch`/`Placeholder` components).
