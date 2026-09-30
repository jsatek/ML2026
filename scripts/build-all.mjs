// Builds every concept under one static site in _site/, plus a gallery index.
//   SITE_BASE=/ML2026/ pnpm build   (GitHub Pages project path; defaults to /)
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPTS, ROOT, listConcepts, readBrief } from './lib.mjs';

const base = `/${(process.env.SITE_BASE ?? '/').replace(/^\/|\/$/g, '')}/`.replace('//', '/');
const out = join(ROOT, '_site');
const only = process.argv.slice(2);
const concepts = listConcepts().filter((c) => !only.length || only.some((q) => c.includes(q)));

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'concepts'), { recursive: true });

for (const dir of concepts) {
  console.log(`\n▸ Building ${dir}`);
  const { status } = spawnSync('pnpm', ['--filter', `./concepts/${dir}`, 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, BASE_PATH: `${base}concepts/${dir}/` },
  });
  if (status !== 0) process.exit(status ?? 1);
  cpSync(join(CONCEPTS, dir, 'dist'), join(out, 'concepts', dir), { recursive: true });
}

// Gallery ---------------------------------------------------------------
const { products } = JSON.parse(readFileSync(join(ROOT, 'packages/content/products.json'), 'utf8'));
const sampleProduct = products.find((p) => p.featured) ?? products[0];
const pages = [
  ['Home', '/'],
  ['Product navigation', '/products'],
  [`Product page (${sampleProduct.name})`, `/products/${sampleProduct.slug}`],
  ['Project portfolio', '/projects'],
  ['Resources', '/resources'],
  ['Sample request', '/samples'],
];
const repo = process.env.GITHUB_REPOSITORY ?? 'jsatek/ML2026';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const href = (dir, path = '/') => `${base}concepts/${dir}${path === '/' ? '/' : path}`;
const briefs = concepts.map((dir) => ({ dir, ...readBrief(dir) }));
cpSync(join(ROOT, 'packages/brand/logo/materiallogiq-mark.svg'), join(out, 'mark.svg'));
cpSync(join(ROOT, 'packages/brand/logo/materiallogiq-wordmark.webp'), join(out, 'wordmark.webp'));

const cards = briefs
  .map(
    (b) => `
    <article class="card">
      <div class="thumb"><iframe src="${href(b.dir)}" title="${esc(b.title)} home page preview" loading="lazy" tabindex="-1" scrolling="no"></iframe></div>
      <div class="body">
        <p class="meta"><span class="num">${esc(b.dir.slice(0, 2))}</span>${b.status ? `<span class="status">${esc(b.status)}</span>` : ''}${b.stack ? `<span>${esc(b.stack)}</span>` : ''}</p>
        <h2><a href="${href(b.dir)}">${esc(b.title)}</a></h2>
        <p>${esc(b.summary)}</p>
        <ul class="pages">${pages.map(([name, path]) => `<li><a href="${href(b.dir, path)}">${esc(name.replace(/ \(.*/, ''))}</a></li>`).join('')}</ul>
        <a class="brief" href="https://github.com/${repo}/blob/main/concepts/${b.dir}/BRIEF.md">Read the brief →</a>
      </div>
    </article>`,
  )
  .join('');

const matrix = `
  <table>
    <thead><tr><th scope="col">Page</th>${briefs.map((b) => `<th scope="col">${esc(b.dir.slice(0, 2))} · ${esc(b.title)}</th>`).join('')}</tr></thead>
    <tbody>${pages
      .map(([name, path]) => `<tr><th scope="row">${esc(name)}</th>${briefs.map((b) => `<td><a href="${href(b.dir, path)}">Open</a></td>`).join('')}</tr>`)
      .join('')}</tbody>
  </table>`;

writeFileSync(
  join(out, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>ML2026 Concepts</title>
<link rel="icon" type="image/svg+xml" href="mark.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root { --green:#00574F; --teal:#2B8F92; --teal-ink:#1E6F71; --sky:#8BD3DD; --orange:#E1663B; --ink:#111413; --muted:#545c5a; --paper:#f5f4f0; --line:#e2e0da; }
  * { box-sizing: border-box; }
  body { margin:0; font-family:"Inter Tight",system-ui,sans-serif; color:var(--ink); background:#fff; -webkit-font-smoothing:antialiased; }
  a { color: var(--green); }
  :focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }
  .wrap { max-width: 80rem; margin: 0 auto; padding: 0 16px; }
  header { background: var(--paper); border-bottom: 1px solid var(--line); padding: 48px 0 40px; }
  header img { height: 22px; }
  h1 { font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: -.02em; margin: 28px 0 8px; line-height: 1.05; }
  h1 span { text-decoration: underline; text-decoration-color: var(--orange); text-decoration-thickness: .08em; text-underline-offset: .14em; }
  .lede { color: var(--muted); max-width: 44rem; font-size: 1.125rem; margin: 0; }
  .grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr)); padding: 40px 0; }
  .card { border: 1px solid var(--line); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; }
  .thumb { aspect-ratio: 16/10; overflow: hidden; position: relative; background: var(--paper); border-bottom: 1px solid var(--line); }
  .thumb iframe { position: absolute; top: 0; left: 0; width: 1440px; height: 900px; border: 0; transform-origin: 0 0; pointer-events: none; }
  .body { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .body h2 { margin: 0; font-size: 1.5rem; letter-spacing: -.02em; }
  .body h2 a { color: inherit; text-decoration: none; }
  .body h2 a:hover { text-decoration: underline; text-decoration-color: var(--teal); }
  .body p { margin: 0; color: var(--muted); }
  .meta { display: flex; gap: 8px; align-items: center; font-size: .8rem; }
  .meta span { border: 1px solid var(--line); border-radius: 999px; padding: 2px 10px; }
  .meta .num { background: var(--green); color: #fff; border-color: var(--green); font-weight: 700; }
  .meta .status { background: var(--sky); border-color: var(--sky); color: var(--green); font-weight: 600; }
  .pages { list-style: none; padding: 0; margin: 4px 0 0; display: flex; flex-wrap: wrap; gap: 6px; }
  .pages a { display: inline-block; font-size: .85rem; padding: 4px 10px; border-radius: 999px; background: var(--paper); text-decoration: none; color: var(--ink); }
  .pages a:hover { background: var(--green); color: #fff; }
  .brief { margin-top: auto; padding-top: 8px; font-weight: 600; font-size: .9rem; }
  section h2.section { font-size: 1.5rem; letter-spacing: -.02em; margin: 16px 0; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; font-size: .95rem; }
  td, thead th + th { min-width: 10rem; }
  th, td { text-align: left; padding: 12px; border-top: 1px solid var(--line); white-space: nowrap; }
  thead th { border-top: 0; color: var(--muted); font-weight: 600; }
  footer { color: var(--muted); font-size: .85rem; padding: 48px 0; }
</style>
</head>
<body>
<header><div class="wrap">
  <img src="wordmark.webp" alt="Material Logiq" />
  <h1>Website redesign <span>concepts</span></h1>
  <p class="lede">Each concept builds the same six pages from the same placeholder content, so directions can be compared page by page. Open a concept, or jump straight to a page below.</p>
</div></header>
<main class="wrap">
  <div class="grid">${cards}</div>
  <section aria-labelledby="compare"><h2 class="section" id="compare">Compare by page</h2><div class="scroll">${matrix}</div></section>
</main>
<footer class="wrap">Built ${new Date().toISOString().slice(0, 10)} · ${briefs.length} concept${briefs.length === 1 ? '' : 's'} · <a href="https://github.com/${repo}">${esc(repo)}</a></footer>
<script>
  // Scale each 1440px-wide preview iframe to fit its card.
  const fit = () => document.querySelectorAll('.thumb').forEach((t) => (t.firstElementChild.style.transform = 'scale(' + t.clientWidth / 1440 + ')'));
  addEventListener('resize', fit); fit();
</script>
</body>
</html>
`,
);
writeFileSync(join(out, '.nojekyll'), '');
console.log(`\n✓ Built ${concepts.length} concept(s) + gallery into _site/ (base ${base})`);
