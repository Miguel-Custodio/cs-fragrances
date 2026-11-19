import { describe, expect, it } from 'vitest';
import {
  briefingSubject,
  buildBriefingMessage,
  buildQuoteMessage,
  buildSampleMessage,
  mailtoUrl,
  quoteSubject,
  sampleSubject,
  whatsappUrl,
  BUSINESS_TYPES,
  INTERESTS,
  SCENT_INTEREST,
  type BriefingValues,
  type QuoteValues,
  type SampleValues,
} from './requestMessages';
import { BUSINESS_PAGES } from '../client/src/data/business';
import { pageTitle } from '../client/src/lib/seo';
import { SITE_ROUTES } from '../client/src/data/routes';
import { SCENT_MARKETING_COPY } from '../client/src/data/scentMarketingCopy';
import { B2B_CONFIG } from './b2bConfig';

const quote: QuoteValues = {
  name: 'Ana',
  business: 'Test Spa',
  email: 'ana@example.com',
  phone: '',
  businessType: 'Spa or wellness',
  city: 'Surrey',
  interest: 'Amenities',
  quantity: '',
  message: 'Hello & welcome',
  startDate: '',
  heardFrom: '',
  consent: true,
};
const sample: SampleValues = {
  name: 'Ana',
  business: 'Test Spa',
  email: 'ana@example.com',
  phone: '',
  businessType: 'Spa or wellness',
  city: 'Surrey',
  samplesOf: ['Shea butter soaps', 'Sachets'],
  message: '',
  consent: true,
};
const briefing: BriefingValues = {
  business: 'Test Spa',
  name: 'Ana',
  email: 'a@example.com',
  phone: '',
  city: 'Surrey',
  spaceType: 'Spa or wellness',
  likes: 'fresh and clean, citrus',
  dislikes: 'heavy musk',
  mood: 'calm',
  spaceSize: '',
  message: '',
  heardFrom: '',
  consent: true,
};

describe('quote and sample requests (no backend)', () => {
  it('builds two different messages with the right fields', () => {
    const q = buildQuoteMessage(quote);
    const s = buildSampleMessage(sample);
    expect(q).toContain('request a quote');
    expect(q).toContain('Service needed: Amenities');
    expect(s).toContain('request samples');
    expect(s).toContain('Samples of: Shea butter soaps, Sachets');
    expect(s).not.toContain('Service needed:');
    expect(q).toContain('I agree to be contacted by CS Fragrances');
  });
  it('the quote form is not for scent: no space size, no price or budget field', () => {
    const q = buildQuoteMessage(quote);
    expect(q).not.toMatch(/size of space|sq ft|budget|price|preferred model/i);
  });
  it('opens info@csfragrances.ca by email and the WhatsApp number prefilled', () => {
    const m = mailtoUrl(quoteSubject(quote), buildQuoteMessage(quote));
    expect(m.startsWith('mailto:info@csfragrances.ca?subject=Quote%20request%3A%20Test%20Spa&body=')).toBe(true);
    expect(m).toContain('Hello%20%26%20welcome');
    expect(sampleSubject(sample)).toBe('Sample request: Test Spa');
    expect(whatsappUrl('hi there').startsWith('https://wa.me/16045186863?text=hi%20there')).toBe(true);
  });
  it('does not leave empty values as blanks', () => {
    expect(buildQuoteMessage(quote)).toContain('Phone / WhatsApp: -');
  });
  it('lets "Scent for my space" point to the briefing, and uses the v3 business types', () => {
    expect(INTERESTS).toContain(SCENT_INTEREST);
    expect([...BUSINESS_TYPES]).toEqual([
      'Salon or barbershop', 'Aesthetic clinic', 'Spa or wellness', 'Gym', 'Boutique hotel', 'Retail', 'Office', 'Other',
    ]);
  });
});

describe('scent briefing (Marketing v3, B6)', () => {
  it('collects likes, dislikes, mood, type of space and an optional size, with consent', () => {
    const m = buildBriefingMessage(briefing);
    expect(m).toContain('Please send me samples');
    expect(m).toContain('Scents and notes I like: fresh and clean, citrus');
    expect(m).toContain("Scents and notes I don't like: heavy musk");
    expect(m).toContain('Mood I want guests to feel: calm');
    expect(m).toContain('Approximate size of the space (sq ft, optional): -');
    expect(m).toContain('I agree to be contacted by CS Fragrances');
    expect(briefingSubject({ business: 'Test Spa' })).toBe('Scent briefing: Test Spa');
    const url = mailtoUrl(briefingSubject(briefing), m);
    expect(url.startsWith('mailto:info@csfragrances.ca?subject=Scent%20briefing%3A%20Test%20Spa&body=')).toBe(true);
    expect(whatsappUrl(m).startsWith('https://wa.me/16045186863?text=')).toBe(true);
  });
  it('scent-marketing page leads with the briefing page and the 5-step flow', () => {
    const p = BUSINESS_PAGES.find((x) => x.slug === 'scent-marketing')!;
    expect(p.formTabs?.[0]).toBe('briefing');
    expect(p.steps).toHaveLength(5);
    expect(p.ctas?.[0]).toEqual({ label: 'Send your scent briefing', href: '/business/scent-briefing' });
  });
  it('/business/scent-briefing is a public route (in the sitemap)', () => {
    expect(SITE_ROUTES).toContainEqual({ path: '/business/scent-briefing', inSitemap: true });
  });
  it('briefing page copy fits the SEO limits', () => {
    const c = SCENT_MARKETING_COPY.briefingPage;
    expect(pageTitle(c.title).length).toBeLessThanOrEqual(60);
    expect(c.description.length).toBeLessThanOrEqual(155);
    expect(c.h1).toBe('Tell us about your space');
  });
  it('no scent text promises an on-site test, a visit or a free sample, or names equipment', () => {
    const pub = BUSINESS_PAGES.filter((p) => p.inSitemap);
    const text = JSON.stringify([pub, SCENT_MARKETING_COPY]);
    expect(text).not.toMatch(/scent[- ]test|on-site|on site|we bring|free of charge|\bfree\b/i);
    expect(B2B_CONFIG.freeSamples).toBe(false);
  });
});

describe('B2B page SEO limits', () => {
  it('keeps full titles at 60 characters or fewer and descriptions at 155 or fewer', () => {
    for (const p of BUSINESS_PAGES) {
      expect(pageTitle(p.title).length, p.slug).toBeLessThanOrEqual(60);
      expect(p.description.length, p.slug).toBeLessThanOrEqual(155);
    }
  });
  it('shows no public B2B prices', () => {
    const text = JSON.stringify(BUSINESS_PAGES);
    expect(text).not.toMatch(/\$\s?\d|CAD\s?\d|\d\s?CAD/i);
  });
});
