import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITE_ROUTES } from '../client/src/data/routes';
import { BUSINESS_PAGES } from '../client/src/data/business';
import { buildGraph, buildRobots, buildSitemap, renderHeadTags, organizationNode } from '../client/src/lib/seo';
import { productReviewSchema } from '../client/src/lib/reviewSchema';
import { REVIEWS } from '../client/src/data/reviews';
import { COMPANY } from './company';
import { B2B_CONFIG, CONTACT_FOR_DETAILS, DELIVERY_TEXT, detail } from './b2bConfig';

describe('sitemap and robots (generated from the route list)', () => {
  const sitemap = buildSitemap(SITE_ROUTES);
  it('lists the business hub and its indexable pages', () => {
    expect(sitemap).toContain('https://www.csfragrances.ca/business</loc>');
    for (const p of BUSINESS_PAGES.filter((x) => x.inSitemap)) expect(sitemap).toContain(`${p.path}</loc>`);
  });
  it('keeps fragrance-oils, order-complete and the conversion pages out of the sitemap', () => {
    expect(sitemap).not.toContain('fragrance-oils');
    expect(sitemap).not.toContain('order-complete');
    expect(sitemap).not.toContain('request-quote');
    expect(sitemap).not.toContain('request-samples');
  });
  it('has no duplicate URLs', () => {
    const locs = sitemap.match(/<loc>[^<]+<\/loc>/g) ?? [];
    expect(new Set(locs).size).toBe(locs.length);
  });
  it('robots.txt blocks /api/ and /order-complete and points to the sitemap', () => {
    const robots = buildRobots();
    expect(robots).toContain('Disallow: /api/');
    expect(robots).toContain('Disallow: /order-complete');
    expect(robots).toContain('Sitemap: https://www.csfragrances.ca/sitemap.xml');
    expect(robots).not.toMatch(/Disallow:\s*\/(assets|\*\.js|\*\.css)/);
  });
});

describe('business pages kept out of the public structure', () => {
  it('marks fragrance-oils noindex and out of the sitemap', () => {
    const oils = BUSINESS_PAGES.find((p) => p.slug === 'fragrance-oils')!;
    expect(oils.noindex).toBe(true);
    expect(oils.inSitemap).toBe(false);
    expect(SITE_ROUTES.find((r) => r.path === oils.path)?.inSitemap).toBe(false);
  });
  it('every non-sitemap route is intended to be noindex (checked on real HTML at build time)', () => {
    for (const r of SITE_ROUTES) expect(typeof r.inSitemap).toBe('boolean');
  });
});

describe('structured data', () => {
  it('always includes Organization/LocalBusiness and WebSite, without the street address', () => {
    const g = buildGraph() as { '@graph': Record<string, unknown>[] };
    const text = JSON.stringify(g);
    expect(g['@graph'].map((n) => n['@id'])).toContain('https://www.csfragrances.ca/#organization');
    expect(text).toContain('Comfyshop E-Commerce');
    expect('publicAddressEnabled' in B2B_CONFIG).toBe(false);
    expect(Object.keys(COMPANY)).not.toEqual(expect.arrayContaining(['addressLine']));
    expect(text).not.toContain('postalCode');
    expect(text).toContain('Lower Mainland');
    expect(text).not.toContain('streetAddress');
    expect(text).not.toContain('85 Ave');
    expect(organizationNode()['@type']).toEqual(['Organization', 'LocalBusiness']);
  });
  it('emits no Review or AggregateRating while there are no real reviews', () => {
    expect(REVIEWS).toEqual([]);
    expect(productReviewSchema({ id: 'x', name: 'x' })).toBeUndefined();
    const text = JSON.stringify(buildGraph());
    expect(text).not.toMatch(/AggregateRating|"Review"/);
  });
  it('builds Review markup only from reviews of that product (test fixture, not site data)', () => {
    const fixture = [
      { author: 'T', rating: 4 as const, text: 'fixture', datePublished: '2026-01-01', source: 'test', sourceUrl: 'https://example.com', productId: 'a' },
      { author: 'U', rating: 5 as const, text: 'fixture', datePublished: '2026-01-02', source: 'test', sourceUrl: 'https://example.com', productId: 'b' },
    ];
    const a = productReviewSchema({ id: 'a', name: 'A' }, fixture) as any;
    expect(a.aggregateRating.reviewCount).toBe(1);
    expect(a.aggregateRating.ratingValue).toBe(4);
    expect(productReviewSchema({ id: 'c', name: 'C' }, fixture)).toBeUndefined();
  });
  it('escapes script-breaking characters in JSON-LD', () => {
    const html = renderHeadTags({ title: 'T', description: 'd', jsonLd: { '@type': 'Thing', name: '</script><b>' } }, '/x');
    expect(html).not.toContain('</script><b>');
  });
  it('adds noindex only when asked and always a canonical', () => {
    const idx = renderHeadTags({ title: 'T', description: 'd', path: '/a' }, '/a');
    const noidx = renderHeadTags({ title: 'T', description: 'd', path: '/a', noindex: true }, '/a');
    expect(idx).not.toContain('noindex');
    expect(noidx).toContain('noindex');
    expect(idx).toContain('<link rel="canonical" href="https://www.csfragrances.ca/a" />');
  });
});

describe('placeholders stay out of the public copy', () => {
  it('uses neutral wording when a B2B value is not confirmed', () => {
    expect(detail(B2B_CONFIG.minimumOrder)).toBe(CONTACT_FOR_DETAILS);
    expect(detail(B2B_CONFIG.privateLabelMinimum)).not.toBe(CONTACT_FOR_DETAILS);
    expect(detail(B2B_CONFIG.customizationOptions)).not.toBe(CONTACT_FOR_DETAILS);
    expect(detail('2 weeks')).toBe('2 weeks');
  });
  it('mentions the USA only because US delivery is confirmed (Miguel, 19/11/2026)', () => {
    expect(B2B_CONFIG.usDelivery).toBeTruthy();
    expect(DELIVERY_TEXT).toContain('United States');
    expect(DELIVERY_TEXT).toContain('Shipping is paid by the client');
    expect(DELIVERY_TEXT).not.toMatch(/contact us/i);
  });
  it('shows no street address and keeps the meeting copy neutral', () => {
    expect(B2B_CONFIG.meetingText).toMatch(/café/);
    expect(JSON.stringify(B2B_CONFIG)).not.toMatch(/15738|V4N|85 Ave/i);
  });
  it('has no raw [PLACEHOLDER] in business page data', () => {
    expect(JSON.stringify(BUSINESS_PAGES)).not.toContain('[PLACEHOLDER');
  });
});

// Runs after `pnpm build` (skipped when dist/public does not exist).
const dist = path.resolve(import.meta.dirname, '..', 'dist', 'public');
describe.skipIf(!fs.existsSync(path.join(dist, 'sitemap.xml')))('build output', () => {
  const walk = (d: string): string[] =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  it('contains no Scentec / IFF / ScentWellness text anywhere', () => {
    for (const f of walk(dist).filter((x) => /\.(html|js|css|xml|txt|json)$/.test(x))) {
      expect(fs.readFileSync(f, 'utf8'), f).not.toMatch(/scentec|\bIFF\b|scentwellness/i);
    }
  });
  it('B2B pages show no price, no Offer/price in JSON-LD, and no on-site scent test or "free" claim', () => {
    for (const r of SITE_ROUTES.filter((x) => x.path.startsWith('/business'))) {
      const html = fs.readFileSync(path.join(dist, `${r.path.slice(1)}.html`), 'utf8');
      const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
      expect(ld, r.path).not.toMatch(/"(offers|price|priceCurrency|lowPrice|highPrice)"/);
      const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
      expect(text, r.path).not.toMatch(/\$\s?\d|\bCAD\s?\d|\d\s?CAD\b/);
      expect(text, r.path).not.toMatch(/scent[- ]test|on-site|on site/i);
      // "free" is allowed only while Miguel's decision stands (b2bConfig.freeSamples).
      if (!B2B_CONFIG.freeSamples) expect(text, r.path).not.toMatch(/\bfree\b/i);
    }
  });
  it('prerenders every route with its own title, canonical and one h1', () => {
    const titles = new Set<string>();
    for (const r of SITE_ROUTES) {
      const file = path.join(dist, r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`);
      const html = fs.readFileSync(file, 'utf8');
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
      expect(title, r.path).toBeTruthy();
      titles.add(title!);
      expect(html, r.path).toContain(`<link rel="canonical" href="https://www.csfragrances.ca${r.path === '/' ? '/' : r.path}" />`);
      expect((html.match(/<h1[\s>]/g) ?? []).length, r.path).toBe(1);
      expect(html.includes('noindex'), r.path).toBe(!r.inSitemap);
    }
    expect(titles.size).toBe(SITE_ROUTES.length);
  });
  it('does not list fragrance-oils in the sitemap or in any page navigation', () => {
    expect(fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')).not.toContain('fragrance-oils');
    for (const f of walk(dist).filter((x) => x.endsWith('.html') && !x.includes('fragrance-oils'))) {
      expect(fs.readFileSync(f, 'utf8'), f).not.toContain('/business/fragrance-oils');
    }
  });
  it('has a real 404 page and a robots.txt file', () => {
    expect(fs.readFileSync(path.join(dist, '404.html'), 'utf8')).toContain('noindex');
    expect(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8')).toContain('Sitemap:');
  });
  it('never shows the street address or its postal code anywhere in the build output', () => {
    for (const f of walk(dist).filter((x) => /\.(html|js|css|xml|txt|json)$/.test(x))) {
      expect(/15738|V4N|85 Ave/i.test(fs.readFileSync(f, 'utf8')), f).toBe(false);
    }
  });
  it('never names the barbershop in any page, script or asset text', () => {
    for (const f of walk(dist).filter((x) => /\.(html|js|css|xml|txt|json)$/.test(x))) {
      expect(/regal/i.test(fs.readFileSync(f, 'utf8')), f).toBe(false);
    }
  });
  it('has no broken internal links and every og:image file exists', () => {
    const exists = (p: string) => {
      const clean = decodeURI(p.split('#')[0].split('?')[0]);
      if (clean === '' || clean === '/') return true;
      const rel = clean.replace(/^\//, '');
      return fs.existsSync(path.join(dist, rel)) || fs.existsSync(path.join(dist, `${rel}.html`));
    };
    const broken: string[] = [];
    for (const f of walk(dist).filter((x) => x.endsWith('.html'))) {
      const html = fs.readFileSync(f, 'utf8');
      for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!exists(m[1])) broken.push(`${path.relative(dist, f)} -> ${m[1]}`);
      for (const m of html.matchAll(/property="og:image" content="https:\/\/www\.csfragrances\.ca([^"]+)"/g)) if (!exists(m[1])) broken.push(`${path.relative(dist, f)} og:image ${m[1]}`);
    }
    expect(broken).toEqual([]);
  });
});
