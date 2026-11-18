import { describe, expect, it } from 'vitest';
import { buildQuote, QuoteError } from './pricing.js';
import { calcShipping } from './shipping.js';
import { findCatalogEntry } from './catalog.js';
import { KITS, onlinePriceFromFairCents } from './kits.js';

describe('catalog', () => {
  it('has the confirmed prices', () => {
    expect(findCatalogEntry('cs-her')?.priceCents).toBe(6990);
    expect(findCatalogEntry('cs-soap-christmas-magic')?.priceCents).toBe(1290);
  });
  it('sells only kits with a confirmed price, and validates kit options', () => {
    expect(findCatalogEntry('kit-sachet-soap')?.priceCents).toBe(1790);
    expect(findCatalogEntry('kit-perfume-soap')).toBeUndefined(); // needs a perfume choice
    expect(findCatalogEntry('kit-perfume-soap:cs-her')?.priceCents).toBe(7500);
    expect(findCatalogEntry('kit-perfume-soap:nope')).toBeUndefined();
  });
});

describe('buildQuote', () => {
  it('adds shipping and no tax when tax is disabled', () => {
    const q = buildQuote([{ id: 'cs-her', quantity: 1 }], { method: 'ship', postalCode: 'V4N 6Y1' }, false);
    expect(q.taxes).toEqual([]);
    expect(q.totalCents).toBe(q.subtotalCents + q.shippingCents);
  });
  it('pickup is free', () => {
    const q = buildQuote([{ id: 'cs-her', quantity: 1 }], { method: 'pickup' }, false);
    expect(q.shippingCents).toBe(0);
    expect(q.shippingFree).toBe(true);
  });
  it('applies BC GST+PST only when enabled and for BC/pickup', () => {
    const items = [{ id: 'cs-her', quantity: 1 }];
    const bc = buildQuote(items, { method: 'ship', postalCode: 'V4N 6Y1' }, true);
    expect(bc.taxes.map((t) => t.id)).toEqual(['gst', 'pst']);
    expect(buildQuote(items, { method: 'ship', postalCode: '90210' }, true).taxes).toEqual([]);
    expect(buildQuote(items, { method: 'ship', postalCode: 'V4N 6Y1' }, false).taxes).toEqual([]);
  });
  it('gives free shipping above the threshold', () => {
    expect(calcShipping({ method: 'ship', postalCode: 'V4N 6Y1' }, 1_000_000).free).toBe(true);
  });
  it('rejects sold-out goat milk soaps but sells the shea butter soap of the same scent', () => {
    const sel = { method: 'ship', postalCode: 'V4N 6Y1' } as const;
    expect(() => buildQuote([{ id: 'soap-goat-morning-dew', quantity: 1 }], sel, false)).toThrow(/Sold out/);
    expect(buildQuote([{ id: 'soap-shea-morning-dew', quantity: 1 }], sel, false).subtotalCents).toBe(1290);
  });
  it('rejects unknown products, bad quantities and empty carts', () => {
    expect(() => buildQuote([{ id: 'nope', quantity: 1 }], { method: 'ship', postalCode: 'V4N 6Y1' }, false)).toThrow(QuoteError);
    expect(() => buildQuote([{ id: 'cs-her', quantity: 0 }], { method: 'ship', postalCode: 'V4N 6Y1' }, false)).toThrow(QuoteError);
    expect(() => buildQuote([{ id: 'cs-her', quantity: 1.5 }], { method: 'ship', postalCode: 'V4N 6Y1' }, false)).toThrow(QuoteError);
    expect(() => buildQuote([], { method: 'ship', postalCode: 'V4N 6Y1' }, false)).toThrow(QuoteError);
  });
});

describe('online kit prices (fair + 15%, rounded up to ,90)', () => {
  it('rounds 15.00 x 1.15 = 17.25 up to 17.90', () => {
    expect(onlinePriceFromFairCents(1500)).toBe(1790);
  });
  it('sets every kit except Perfume + Soap from the fair price, and keeps that one at 75.00', () => {
    const expected: Record<string, number> = {
      'kit-sachet-soap': 1790,
      'kit-two-candles': 1790,
      'kit-five-sachets': 2890,
      'kit-five-wax-ornaments': 3490,
      'kit-three-decorative-soaps': 3990,
      'kit-homespray-sachet': 4090,
      'kit-four-soaps-one-free': 4490,
      'kit-perfume-soap': 7500,
      'kit-bodymist-sachet': 3690,
      'kit-bodymist-soap': 4090,
      'kit-homespray-soap': 4490,
    };
    expect(KITS).toHaveLength(11);
    for (const kit of KITS) {
      expect(kit.priceCents, kit.id).toBe(expected[kit.id]);
      if (kit.id !== 'kit-perfume-soap') {
        expect(kit.priceCents).toBe(onlinePriceFromFairCents(kit.fairPriceCents));
      }
    }
  });
});
