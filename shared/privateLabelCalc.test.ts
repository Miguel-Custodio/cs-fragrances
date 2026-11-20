import { describe, expect, it } from 'vitest';
import {
  buildPrivateLabelMessage,
  cleanUnits,
  computeBatch,
  lossGrams,
  privateLabelMailto,
  usableGrams,
} from './privateLabelCalc';
import { PRIVATE_LABEL_PRODUCTS, hasUnconfirmedListed, listedProducts } from './privateLabelFormulas';

describe('usable fragrance (10% loss)', () => {
  it('1 kg gives 900 g usable and 2 kg gives 1800 g', () => {
    expect(usableGrams(1)).toBe(900);
    expect(usableGrams(2)).toBe(1800);
    expect(usableGrams(1.5)).toBe(1350);
    expect(lossGrams(1)).toBe(100);
    expect(lossGrams(2)).toBe(200);
  });
  it('is zero below the 1 kg minimum or for bad input', () => {
    expect(usableGrams(0.5)).toBe(0);
    expect(usableGrams(0)).toBe(0);
    expect(usableGrams(NaN)).toBe(0);
    expect(computeBatch(0.5, { edp: 5 }).status).toBe('invalid');
  });
});

describe('mixed products', () => {
  it('2 perfumes + 7 body mists + 1 home spray (confirmed formulas)', () => {
    const r = computeBatch(1, { edp: 2, 'body-mist': 7, 'home-spray': 1 });
    // 2*10 + 7*6 + 12.5 = 74.5 g
    expect(r.used).toBe(74.5);
    expect(r.remaining).toBe(825.5);
    expect(r.percent).toBe(8.3);
    expect(r.status).toBe('incomplete');
    expect(r.lines.find((l) => l.id === 'edp')!.grams).toBe(20);
    expect(r.lines.find((l) => l.id === 'body-mist')!.grams).toBe(42);
    expect(r.totalUnits).toBe(10);
  });
  it('5 perfumes + 5 body mists', () => {
    const r = computeBatch(1, { edp: 5, 'body-mist': 5 });
    expect(r.used).toBe(80);
    expect(r.remaining).toBe(820);
  });
  it('2 kg doubles the capacity', () => {
    const q = { edp: 2, 'body-mist': 7, 'home-spray': 1 };
    const one = computeBatch(1, q);
    const two = computeBatch(2, q);
    expect(two.usable).toBe(1800);
    expect(two.remaining).toBe(1725.5);
    expect(two.used).toBe(one.used);
  });
  it('has no floating point noise with decimal grams', () => {
    const r = computeBatch(1, { 'ornament-soap': 3, 'wax-melt': 3 }); // 5.4 + 6.3
    expect(r.used).toBe(11.7);
    expect(r.remaining).toBe(888.3);
  });
  it('ignores bad quantities', () => {
    expect(cleanUnits('3')).toBe(3);
    expect(cleanUnits(2.9)).toBe(2);
    expect(cleanUnits(-4)).toBe(0);
    expect(cleanUnits('abc')).toBe(0);
    expect(computeBatch(1, { edp: -3, 'body-mist': 'x' }).status).toBe('empty');
  });
});

describe('capacity, remaining and what still fits', () => {
  it('warns when over capacity', () => {
    const r = computeBatch(1, { edp: 91 }); // 910 g > 900 g
    expect(r.status).toBe('over');
    expect(r.over).toBe(10);
    expect(r.remaining).toBe(0);
    expect(r.percent).toBe(100);
    expect(r.lines.every((l) => l.moreFit === 0)).toBe(true);
  });
  it('exactly full is complete', () => {
    const r = computeBatch(1, { edp: 90 });
    expect(r.status).toBe('complete');
    expect(r.remaining).toBe(0);
    expect(r.percent).toBe(100);
  });
  it('complete when the leftover is less than the smallest unit (1.8 g)', () => {
    expect(computeBatch(1, { edp: 89 }).status).toBe('incomplete'); // 10 g left still fits one
    expect(computeBatch(1, { sachet: 299 }).status).toBe('incomplete'); // 3 g left still fits one
    const lt = computeBatch(1, { 'home-spray': 71, 'wax-melt': 4, 'ornament-soap': 2 }); // 887.5 + 8.4 + 3.6 = 899.5
    expect(lt.remaining).toBe(0.5);
    expect(lt.status).toBe('complete');
    const gap = computeBatch(1, { 'home-spray': 71, 'wax-melt': 5 }); // 898 -> 2 g left, one more ornament fits
    expect(gap.remaining).toBe(2);
    expect(gap.status).toBe('incomplete');
  });
  it('shows how many more units of each product fit in the remainder', () => {
    const r = computeBatch(1, { edp: 2, 'body-mist': 7, 'home-spray': 1 }); // 825.5 g left
    const more = (id: string) => r.lines.find((l) => l.id === id)!.moreFit;
    expect(more('edp')).toBe(82); // 825.5 / 10
    expect(more('edp-30')).toBe(55); // 825.5 / 15
    expect(more('body-mist')).toBe(137); // 825.5 / 6
    expect(more('home-spray')).toBe(66); // 825.5 / 12.5
    expect(more('sachet')).toBe(275);
    expect(more('ornament-soap')).toBe(458); // 825.5 / 1.8
    expect(more('wax-melt')).toBe(393); // 825.5 / 2.1
  });
});

describe('formulas data', () => {
  it('has the confirmed CS Ops values (g of fragrance per unit)', () => {
    const g = (id: string) => PRIVATE_LABEL_PRODUCTS.find((p) => p.id === id)!;
    expect(g('edp').gramsPerUnit).toBe(10);
    expect(g('edp-30').gramsPerUnit).toBe(15);
    expect(g('body-mist').gramsPerUnit).toBe(6);
    expect(g('home-spray').gramsPerUnit).toBe(12.5);
    expect(g('bar-soap').gramsPerUnit).toBe(3);
    expect(g('ornament-soap').gramsPerUnit).toBe(1.8);
    expect(g('sachet').gramsPerUnit).toBe(3);
    expect(g('wax-melt').gramsPerUnit).toBe(2.1);
    expect(g('candle').gramsPerUnit).toBe(6);
  });
  it('grams match the percentage times the unit size for the volume and weight products', () => {
    const size: Record<string, number> = { edp: 50, 'edp-30': 50, 'body-mist': 100, 'home-spray': 250, 'bar-soap': 100, 'ornament-soap': 60, 'wax-melt': 35, candle: 100 };
    for (const [id, s] of Object.entries(size)) {
      const p = PRIVATE_LABEL_PRODUCTS.find((x) => x.id === id)!;
      expect(p.gramsPerUnit, id).toBeCloseTo((s * p.percent) / 100, 5);
    }
  });
  it('unconfirmed products are not listed, so the example notice is off; it turns on if one is listed', () => {
    expect(PRIVATE_LABEL_PRODUCTS.filter((p) => !p.confirmed).every((p) => !p.listed)).toBe(true);
    expect(hasUnconfirmedListed()).toBe(false);
    const withExample = PRIVATE_LABEL_PRODUCTS.map((p) => (p.id === 'sample-2ml' ? { ...p, listed: true } : p));
    expect(hasUnconfirmedListed(withExample)).toBe(true);
    expect(listedProducts(withExample).length).toBe(listedProducts().length + 1);
  });
  it('contains no price or cost fields', () => {
    expect(JSON.stringify(PRIVATE_LABEL_PRODUCTS)).not.toMatch(/price|cost|cad|\$/i);
  });
});

describe('quote message', () => {
  it('lists the selection and the remaining grams, with no prices', () => {
    const r = computeBatch(1, { edp: 2, 'body-mist': 7, 'home-spray': 1 });
    const m = buildPrivateLabelMessage(r, { turnkey: true, fragrances: 'vanilla' });
    expect(m).toContain('Fragrance for the batch: 1 kg (900 g usable after 10% production loss)');
    expect(m).toContain('- 2 x Eau de parfum (50 ml): 20 g');
    expect(m).toContain('- 7 x Body mist (100 ml): 42 g');
    expect(m).toContain('Remaining to complete the batch: 825.5 g');
    expect(m).toContain('Turnkey service (artwork, labels, boxes): yes, please');
    expect(m).not.toMatch(/price|\$|CAD/i);
    expect(privateLabelMailto(r, { turnkey: false, fragrances: '' }).startsWith('mailto:info@csfragrances.ca?subject=Private%20label%20quote%20request&body=')).toBe(true);
  });
});
