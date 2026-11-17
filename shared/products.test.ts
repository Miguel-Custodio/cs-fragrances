import { describe, expect, it } from 'vitest';
import { CATALOG, findCatalogEntry } from './catalog.js';
import { products, CATEGORY_GROUPS, productsInGroup } from '../client/src/data/products';

describe('storefront vs server catalog', () => {
  it('every storefront product exists in the server catalog with the same price', () => {
    for (const p of products) {
      const entry = findCatalogEntry(p.id);
      expect(entry, p.id).toBeDefined();
      expect(Math.round(p.price * 100), p.id).toBe(entry!.priceCents);
    }
  });
  it('every non-kit catalog entry is shown on the storefront, once', () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of CATALOG.filter((c) => c.category !== 'kit')) expect(ids, e.id).toContain(e.id);
  });
  it('every product belongs to exactly one category group', () => {
    const total = CATEGORY_GROUPS.reduce((n, g) => n + productsInGroup(g).length, 0);
    expect(total).toBe(products.length);
  });
  it('has the confirmed prices', () => {
    const price = (id: string) => findCatalogEntry(id)!.priceCents;
    expect(price('cs-her')).toBe(6990);
    expect(price('bodymist-amber-aura')).toBe(2490);
    expect(price('homespray-golden-fig')).toBe(2990);
    expect(price('sachet-rose-blush')).toBe(590);
    expect(price('soap-shea-her')).toBe(990);
    expect(price('soap-decorative-christmas')).toBe(1290);
    expect(price('ornament-jade-infusion')).toBe(690);
    expect(price('candle-modern-ritual')).toBe(890);
  });
  it('flags only the five goat milk soaps as unconfirmed', () => {
    const flagged = CATALOG.filter((c) => c.availability === 'unconfirmed').map((c) => c.id);
    expect(flagged).toEqual([
      'soap-goat-coastal-breeze',
      'soap-goat-warm-apple',
      'soap-goat-sparkles',
      'soap-goat-velvet-vanilla',
      'soap-goat-morning-dew',
    ]);
  });
  it('contains no references to other brands', () => {
    const text = JSON.stringify([products, CATALOG]).toLowerCase();
    for (const bad of ['inspired by', 'dior', 'sauvage', 'versace', 'eros', 'god of fire', 'wild essence', 'sunshine', 'diptyque']) {
      expect(text).not.toContain(bad);
    }
  });
});
