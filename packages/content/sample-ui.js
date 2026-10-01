// Shared wiring for sample-cart UI so every concept behaves the same:
//   <button data-add-sample data-product="slug" data-name="COFFA" data-finish="Gray" data-label-add="Add sample">
//     <span data-label>Add sample</span></button>
//   <span data-cart-count></span>
// Concepts style these however they like; this only toggles state and text.
import * as cart from './cart.js';

/**
 * @param {{ notify?: (message: string, kind: 'added'|'removed'|'full') => void, addedLabel?: string }} [opts]
 */
export function bindSampleUI(opts = {}) {
  const { notify = () => {}, addedLabel = 'Added' } = opts;

  const sync = (items) => {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(items.length);
      el.toggleAttribute('hidden', items.length === 0 && el.hasAttribute('data-hide-empty'));
    });
    document.querySelectorAll('[data-add-sample]').forEach((btn) => {
      const inCart = items.some((i) => i.product === btn.dataset.product && i.finish === btn.dataset.finish);
      btn.setAttribute('aria-pressed', String(inCart));
      const label = btn.querySelector('[data-label]');
      if (label) label.textContent = inCart ? addedLabel : btn.dataset.labelAdd ?? 'Add sample';
    });
  };
  cart.onChange(sync);

  document.addEventListener('click', (e) => {
    const btn = e.target instanceof Element ? e.target.closest('[data-add-sample]') : null;
    if (!btn) return;
    const item = { product: btn.dataset.product, finish: btn.dataset.finish };
    const name = btn.dataset.name ?? 'Sample';
    if (cart.has(item)) {
      cart.remove(item);
      notify(`Removed ${name} · ${item.finish}`, 'removed');
    } else if (cart.add(item) === 'full') {
      notify(`Sample limit reached (${cart.LIMIT}). Remove one to add another.`, 'full');
    } else {
      notify(`Added ${name} · ${item.finish}`, 'added');
    }
  });

  return { refresh: () => sync(cart.getCart()) };
}
