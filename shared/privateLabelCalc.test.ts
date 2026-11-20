import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { cleanUnits, computeBatch, roughCount, toPublic, usableGrams } from './privateLabelCalc';
import { FRAGRANCE_GRAMS } from './privateLabelFormulas';
import {
  PRIVATE_LABEL_PRODUCTS,
  buildPrivateLabelMessage,
  hasUnconfirmedListed,
  listedProducts,
  privateLabelMailto,
} from './privateLabelCatalog';
import { handlePrivateLabelCalc } from './privateLabelApi';

describe('usable fragrance (10% loss)', () => {
  it('1 kg gives 900 g usable and 2 kg gives 1800 g', () => {
    expect(usableGrams(1)).toBe(900);
    expect(usableGrams(2)).toBe(1800);
    expect(usableGrams(1.5)).toBe(1350);
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

describe('formulas data (server only)', () => {
  it('has the confirmed CS Ops values', () => {
    expect(FRAGRANCE_GRAMS).toMatchObject({
      edp: 10, 'edp-30': 15, 'body-mist': 6, 'home-spray': 12.5, 'bar-soap': 3, 'ornament-soap': 1.8, sachet: 3, 'wax-melt': 2.1, candle: 6,
    });
  });
  it('every product in the public catalog has a value on the server, and nothing else', () => {
    expect(Object.keys(FRAGRANCE_GRAMS).sort()).toEqual(PRIVATE_LABEL_PRODUCTS.map((p) => p.id).sort());
  });
  it('unconfirmed products are not listed, so the example notice is off; it turns on if one is listed', () => {
    expect(PRIVATE_LABEL_PRODUCTS.filter((p) => !p.confirmed).every((p) => !p.listed)).toBe(true);
    expect(hasUnconfirmedListed()).toBe(false);
    const withExample = PRIVATE_LABEL_PRODUCTS.map((p) => (p.id === 'sample-2ml' ? { ...p, listed: true } : p));
    expect(hasUnconfirmedListed(withExample)).toBe(true);
    expect(listedProducts(withExample).length).toBe(listedProducts().length + 1);
  });
});

describe('what the browser can see (public catalog and API result)', () => {
  it('the public catalog has no grams, percentages, costs or prices, and names the strong perfume neutrally', () => {
    const json = JSON.stringify(PRIVATE_LABEL_PRODUCTS);
    expect(json).not.toMatch(/gram|percent|concentrat|fragrance|price|cost|cad|\$|%/i);
    expect(PRIVATE_LABEL_PRODUCTS.find((p) => p.id === 'edp-30')!.name).toBe('Extrait de parfum');
    expect(Object.keys(PRIVATE_LABEL_PRODUCTS[0]).sort()).toEqual(['confirmed', 'id', 'listed', 'name', 'unit']);
  });
  it('toPublic has no gram figures: whole percent and rounded counts only', () => {
    const r = toPublic(computeBatch(1, { edp: 2, 'body-mist': 7, 'home-spray': 1 })); // 8.28% filled
    expect(Object.keys(r).sort()).toEqual(['kgValid', 'lines', 'percent', 'status', 'totalUnits']);
    expect(Object.keys(r.lines[0]).sort()).toEqual(['id', 'moreFit', 'units']);
    expect(r.percent).toBe(8);
    expect(r.status).toBe('incomplete');
    expect(r.lines.find((l) => l.id === 'edp')!.moreFit).toBe(80); // 82 rounded down
    expect(Number.isInteger(r.percent)).toBe(true);
  });
  it('rounds "about N more" down so it stays a rough idea', () => {
    expect([0, 7, 9, 10, 14, 15, 99, 100, 137, 458].map(roughCount)).toEqual([0, 7, 9, 10, 10, 15, 95, 100, 130, 450]);
  });
  it('percent never reads 0 or 100 by rounding alone, and over capacity says 100', () => {
    expect(toPublic(computeBatch(1, { edp: 89 })).percent).toBe(99); // incomplete: capped at 99
    expect(toPublic(computeBatch(1, { edp: 90 })).percent).toBe(100); // complete
    const over = toPublic(computeBatch(1, { edp: 91 }));
    expect(over.status).toBe('over');
    expect(over.percent).toBe(100);
    expect(over.lines.every((l) => l.moreFit === 0)).toBe(true);
    expect(toPublic(computeBatch(2, { sachet: 1 })).percent).toBe(1); // tiny but not zero
  });
});

describe('quote message (no gram figures, no prices)', () => {
  it('lists the selection and the percent of the batch', () => {
    const q = { edp: 2, 'body-mist': 7, 'home-spray': 1 };
    const pub = toPublic(computeBatch(1, q));
    const m = buildPrivateLabelMessage(1, q, pub, { turnkey: true, fragrances: 'vanilla' });
    expect(m).toContain('Batch size: 1 kg of fragrance');
    expect(m).toContain('- 2 x Eau de parfum (50 ml)');
    expect(m).toContain('- 7 x Body mist (100 ml)');
    expect(m).toContain('Batch filled: 8% (92% left to complete it)');
    expect(m).toContain('Turnkey service (artwork, labels, boxes): yes, please');
    expect(m).not.toMatch(/\d\s?g\b|gram|price|\$|CAD|usable|loss/i);
    expect(buildPrivateLabelMessage(1, q, null, { turnkey: false, fragrances: '' })).not.toContain('Batch filled');
    expect(privateLabelMailto(1, q, pub, { turnkey: false, fragrances: '' }).startsWith('mailto:info@csfragrances.ca?subject=Private%20label%20quote%20request&body=')).toBe(true);
  });
});

describe('/api/private-label-calc (shared handler used by Vercel and Cloudflare)', () => {
  const post = (body: unknown, method = 'POST') =>
    handlePrivateLabelCalc(new Request('https://x.test/api/private-label-calc', { method, body: method === 'POST' ? JSON.stringify(body) : undefined }));
  it('returns only the public result', async () => {
    const res = await post({ kg: 1, quantities: { edp: 5, 'body-mist': 5 } });
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('no-store');
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.result.percent).toBe(9); // 80 g of 900 g
    expect(JSON.stringify(json)).not.toMatch(/gram|usable|remaining|loss/i);
  });
  it('rejects bad input and other methods', async () => {
    expect((await post({}, 'GET')).status).toBe(405);
    expect((await post({ kg: 'abc', quantities: {} })).status).toBe(400);
    expect((await post({ kg: 5000, quantities: {} })).status).toBe(400);
    expect((await post({ kg: 1, quantities: [] })).status).toBe(400);
    const bad = await handlePrivateLabelCalc(new Request('https://x.test/', { method: 'POST', body: '{nope' }));
    expect(bad.status).toBe(400);
    const big = await handlePrivateLabelCalc(new Request('https://x.test/', { method: 'POST', body: 'x'.repeat(5000) }));
    expect(big.status).toBe(413);
  });
  it('ignores unknown products and clamps silly quantities', async () => {
    const json = await (await post({ kg: 1, quantities: { nope: 5, edp: -3, 'body-mist': 1e12 } })).json();
    expect(json.result.status).toBe('over');
    expect(json.result.lines.find((l: { id: string }) => l.id === 'edp').units).toBe(0);
  });
  it('a kg below the minimum is flagged, not crashed', async () => {
    const json = await (await post({ kg: 0.5, quantities: { edp: 1 } })).json();
    expect(json.result.kgValid).toBe(false);
    expect(json.result.status).toBe('invalid');
  });
});

// Runs after `pnpm build`: nothing readable about the formula may be shipped to the browser.
const dist = path.resolve(import.meta.dirname, '..', 'dist', 'public');
describe.skipIf(!fs.existsSync(path.join(dist, 'sitemap.xml')))('built site hides the formula', () => {
  const walk = (d: string): string[] =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  const text = (f: string) => fs.readFileSync(f, 'utf8');
  const visible = (html: string) =>
    html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

  it('calculator and private label pages show no grams of fragrance, concentration or loss figure', () => {
    for (const rel of ['business/private-label/calculator/index.html', 'business/private-label/index.html']) {
      const html = text(path.join(dist, rel));
      const t = visible(html);
      expect(t, rel).not.toMatch(/\d\s?(g|grams?)\s+(of\s+)?(fragrance|oil)|of fragrance per unit|\bgrams? of|concentration|per unit|production loss|usable|remaining/i);
      expect(t, rel).not.toMatch(/\d+\s?%\s*(of\s+)?(fragrance|oil|concentrat)/i);
      expect(t, rel).not.toMatch(/\b10\s?%|ten percent/i);
      // JSON-LD and meta too
      expect(html, rel).not.toMatch(/gramsPerUnit|FRAGRANCE_GRAMS/);
    }
  });
  it('the browser bundle has no fragrance table and no server module', () => {
    const files = walk(dist).filter((f) => /\.(js|html|json|txt|xml)$/.test(f));
    for (const f of files) {
      const t = text(f);
      expect(t, f).not.toMatch(/gramsPerUnit|FRAGRANCE_GRAMS|usableGrams|privateLabelFormulas/);
      expect(t, f).not.toMatch(/["']?(edp|body-mist|home-spray|bar-soap|ornament-soap|sachet|wax-melt|candle)["']?\s*:\s*[0-9]+(\.[0-9]+)?\s*[,}]/);
      expect(t, f).not.toMatch(/(\b12\.5\b[^a-z]{0,6}\b1\.8\b|\b1\.8\b[^a-z]{0,6}\b2\.1\b)/);
    }
  });
});
