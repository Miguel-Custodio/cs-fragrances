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
  type QuoteValues,
  type SampleValues,
} from './requestMessages';
import { BUSINESS_PAGES } from '../client/src/data/business';
import { pageTitle } from '../client/src/lib/seo';

const quote: QuoteValues = {
  name: 'Ana',
  business: 'Test Spa',
  email: 'ana@example.com',
  phone: '',
  businessType: 'Spa or wellness',
  city: 'Surrey',
  spaceSize: '',
  interest: 'Scent for my space',
  quantity: '',
  timing: '',
  message: 'Hello & welcome',
  consent: true,
};
const sample: SampleValues = {
  name: 'Ana',
  business: 'Test Spa',
  email: 'ana@example.com',
  phone: '',
  businessType: 'Spa or wellness',
  city: 'Surrey',
  sampleWay: 'Scent test at my space',
  scentDirections: ['Floral', 'Woody'],
  spaceSize: '',
  timing: '',
  message: '',
  consent: true,
};

describe('quote and sample requests (no backend)', () => {
  it('builds two different messages with the right fields', () => {
    const q = buildQuoteMessage(quote);
    const s = buildSampleMessage(sample);
    expect(q).toContain('request a quote');
    expect(q).toContain('Interested in: Scent for my space');
    expect(s).toContain('request samples');
    expect(s).toContain('Scent directions I like: Floral, Woody');
    expect(s).not.toContain('Interested in:');
    expect(q).toContain('I agree to be contacted by CS Fragrances');
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
});

describe('scent briefing', () => {
  it('collects preferences, space type and an optional size, with consent', () => {
    const m = buildBriefingMessage({
      name: 'Ana', business: 'Test Spa', email: 'a@example.com', phone: '', city: 'Surrey', spaceType: 'Spa or wellness',
      families: ['Floral', 'Woody'], likes: 'lavender', dislikes: 'heavy musk', moods: ['Calm'], spaceSize: '', message: '', consent: true,
    });
    expect(m).toContain('Scent families I like: Floral, Woody');
    expect(m).toContain('Scents or notes I dislike: heavy musk');
    expect(m).toContain('Mood I want: Calm');
    expect(m).toContain('Approximate size of space (sq ft, optional): -');
    expect(m).toContain('I agree to be contacted by CS Fragrances');
    expect(briefingSubject({ business: 'Test Spa' })).toBe('Scent briefing: Test Spa');
  });
  it('scent-marketing page uses the briefing form and the 5-step flow', () => {
    const p = BUSINESS_PAGES.find((x) => x.slug === 'scent-marketing')!;
    expect(p.formTabs?.[0]).toBe('briefing');
    expect(p.steps).toHaveLength(5);
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
