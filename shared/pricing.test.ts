import { describe, expect, it } from 'vitest';
import { buildQuote, QuoteError } from './pricing.js';
import { calcShipping } from './shipping.js';
import { findCatalogEntry } from './catalog.js';

describe('catalog', () => {
  it('has the confirmed prices', () => {
    expect(findCatalogEntry('cs-her')?.priceCents).toBe(6990);
    expect(findCatalogEntry('cs-soap-christmas-magic')?.priceCents).toBe(1290);
  });
  it('sells only kits with a confirmed price, and validates kit options', () => {
    expect(findCatalogEntry('kit-sachet-soap')).toBeUndefined(); // price TODO
    expect(findCatalogEntry('kit-perfume-soap')).toBeUndefined(); // needs a perfume choice
    expect(findCatalogEntry('kit-perfume-soap:cs-her')?.priceCents).toBe(7500);
    expect(findCatalogEntry('kit-perfume-soap:nope')).toBeUndefined();
  });
});

describe('buildQuote', () => {
  it('adds shipping and no tax when tax is disabled', () => {
    const q = buildQuote([{ id: 'cs-her', quantity: 1 }], 'bc', false);
    expect(q.taxes).toEqual([]);
    expect(q.totalCents).toBe(q.subtotalCents + q.shippingCents);
  });
  it('pickup is free', () => {
    const q = buildQuote([{ id: 'cs-her', quantity: 1 }], 'pickup', false);
    expect(q.shippingCents).toBe(0);
    expect(q.shippingFree).toBe(true);
  });
  it('applies BC GST+PST only when enabled and for BC/pickup', () => {
    const items = [{ id: 'cs-her', quantity: 1 }];
    const bc = buildQuote(items, 'bc', true);
    expect(bc.taxes.map((t) => t.id)).toEqual(['gst', 'pst']);
    expect(buildQuote(items, 'usa', true).taxes).toEqual([]);
    expect(buildQuote(items, 'bc', false).taxes).toEqual([]);
  });
  it('gives free shipping above the threshold', () => {
    expect(calcShipping('bc', 1_000_000).free).toBe(true);
  });
  it('rejects unknown products, bad quantities and empty carts', () => {
    expect(() => buildQuote([{ id: 'nope', quantity: 1 }], 'bc', false)).toThrow(QuoteError);
    expect(() => buildQuote([{ id: 'cs-her', quantity: 0 }], 'bc', false)).toThrow(QuoteError);
    expect(() => buildQuote([{ id: 'cs-her', quantity: 1.5 }], 'bc', false)).toThrow(QuoteError);
    expect(() => buildQuote([], 'bc', false)).toThrow(QuoteError);
  });
});
