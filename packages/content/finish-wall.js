// Shared behavior for a finish wall, so every concept's wall works the same way.
// Concepts supply the markup and styles:
//   <div data-finish-wall>
//     <script type="application/json" data-wall-products>{"slug":{"name":"COFFA","href":"/products/coffa"}}</script>
//     <a data-swatch href="/products/coffa" data-name="Gray" data-hex="#515055" data-image="…"
//        data-group="Essential Colors" data-material="PET Felt" data-products="coffa vee">…</a>
//     <div data-wall-panel hidden aria-live="polite">
//       [data-wall-chip] [data-wall-name] [data-wall-meta] [data-wall-count] [data-wall-rows] [data-wall-close]
//       <template data-wall-row>[data-row-link] [data-row-name] <button data-add-sample data-label-add="…"><span data-label></span></button></template>
//     </div>
//   </div>
// Without JS each swatch is a plain link to a product that offers it.
import { getCart } from './cart.js';

export function bindFinishWall() {
  document.querySelectorAll('[data-finish-wall]').forEach((wall) => {
    const catalog = JSON.parse(wall.querySelector('[data-wall-products]')?.textContent ?? '{}');
    const panel = wall.querySelector('[data-wall-panel]');
    const rows = panel?.querySelector('[data-wall-rows]');
    const tpl = panel?.querySelector('template[data-wall-row]');
    if (!panel || !rows || !tpl) return;
    const set = (sel, fn) => panel.querySelectorAll(sel).forEach(fn);

    const close = () => {
      panel.hidden = true;
      wall.querySelector('[data-swatch][aria-current]')?.focus();
      wall.querySelectorAll('[data-swatch][aria-current]').forEach((el) => el.removeAttribute('aria-current'));
    };
    panel.querySelectorAll('[data-wall-close]').forEach((b) => b.addEventListener('click', close));
    panel.addEventListener('keydown', (e) => e.key === 'Escape' && close());

    wall.addEventListener('click', (e) => {
      const sw = e.target instanceof Element ? e.target.closest('[data-swatch]') : null;
      if (!sw || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      wall.querySelectorAll('[data-swatch][aria-current]').forEach((el) => el.removeAttribute('aria-current'));
      sw.setAttribute('aria-current', 'true');

      const { name, hex, image, group, material } = sw.dataset;
      const slugs = (sw.dataset.products ?? '').split(' ').filter((s) => catalog[s]);
      set('[data-wall-name]', (el) => (el.textContent = name));
      set('[data-wall-meta]', (el) => (el.textContent = [material, group].filter(Boolean).join(' · ')));
      set('[data-wall-count]', (el) => (el.textContent = `${slugs.length} ${slugs.length === 1 ? 'product' : 'products'}`));
      set('[data-wall-chip]', (el) => {
        el.style.backgroundColor = hex ?? '';
        el.style.backgroundImage = image ? `url("${image}")` : '';
      });
      rows.replaceChildren(...slugs.map((slug) => {
        const row = tpl.content.cloneNode(true);
        row.querySelectorAll('[data-row-name]').forEach((el) => (el.textContent = catalog[slug].name));
        row.querySelectorAll('[data-row-link]').forEach((el) => el.setAttribute('href', catalog[slug].href));
        row.querySelectorAll('[data-add-sample]').forEach((btn) => {
          btn.dataset.product = slug;
          btn.dataset.name = catalog[slug].name;
          btn.dataset.finish = name;
        });
        return row;
      }));
      panel.hidden = false;
      // Let sample-ui sync pressed state and labels on the new buttons.
      window.dispatchEvent(new CustomEvent('ml:cart', { detail: getCart() }));
    });
  });
}
