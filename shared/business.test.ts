import { describe, expect, it } from 'vitest';
import { BUSINESS_PAGES, NEUTRAL_OILS_SOURCE } from '../client/src/data/business';
import { SCENTEC_BRANDING_ENABLED } from '../client/src/lib/flags';

describe('For Business content', () => {
  it('keeps the Scentec branding flag off by default (no written authorization yet)', () => {
    expect(SCENTEC_BRANDING_ENABLED).toBe(false);
  });
  it('does not name Scentec or IFF while the flag is off', () => {
    const text = JSON.stringify(BUSINESS_PAGES);
    expect(text).not.toMatch(/scentec/i);
    expect(text).not.toMatch(/\bIFF\b/);
    expect(text).toContain(NEUTRAL_OILS_SOURCE);
  });
  it('has unique paths, titles and descriptions, and a generic FAQ without numbers', () => {
    expect(new Set(BUSINESS_PAGES.map((p) => p.path)).size).toBe(BUSINESS_PAGES.length);
    expect(new Set(BUSINESS_PAGES.map((p) => p.title)).size).toBe(BUSINESS_PAGES.length);
    expect(new Set(BUSINESS_PAGES.map((p) => p.description)).size).toBe(BUSINESS_PAGES.length);
    for (const p of BUSINESS_PAGES) {
      expect(p.faq.length).toBeGreaterThanOrEqual(3);
      for (const f of p.faq) expect(f.q + f.a).not.toMatch(/\d/);
    }
  });
  it('mentions no other perfume brands', () => {
    const text = JSON.stringify(BUSINESS_PAGES).toLowerCase();
    for (const bad of ['dior', 'chanel', 'sephora', 'sauvage', 'inspired by']) expect(text).not.toContain(bad);
  });
});
