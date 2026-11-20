/**
 * Builds the text of the two B2B requests (quote and samples) and the mailto / WhatsApp links.
 * No backend: the visitor's email app or WhatsApp opens with the message ready to send.
 */
import { COMPANY, WHATSAPP_BASE_URL } from './company.js';

/** Type of business / space (Marketing v3, B6). */
export const BUSINESS_TYPES = [
  'Salon or barbershop',
  'Aesthetic clinic',
  'Spa or wellness',
  'Gym',
  'Boutique hotel',
  'Retail',
  'Office',
  'Other',
] as const;

/** "Service needed" in the quote form (Marketing v3, B6). Scent for my space leads to the briefing. */
export const INTERESTS = [
  'Amenities',
  'Corporate gifts',
  'Private label',
  'Perfumes for resale',
  'Scent for my space (start with the scent briefing)',
  'Not sure',
] as const;

/** Product samples (amenities, gift kits, private label). Scent for a space starts with the briefing instead. */
export const SAMPLE_PRODUCTS = ['Shea butter soaps', 'Home and linen sprays', 'Sachets', 'Perfumes', 'Body mists', 'Not sure yet'] as const;

export const SCENT_INTEREST = INTERESTS[4];

export const CONSENT_TEXT = 'I agree to be contacted by CS Fragrances about my request.';

export interface QuoteValues {
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  interest: string;
  quantity: string;
  message: string;
  /** Optional, under "More details". */
  startDate: string;
  heardFrom: string;
  consent: boolean;
}

export interface SampleValues {
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  samplesOf: string[];
  message: string;
  consent: boolean;
}

const v = (s: string | undefined) => (s && s.trim() ? s.trim() : '-');

export function buildQuoteMessage(f: QuoteValues): string {
  return [
    'Hello CS Fragrances! I would like to request a quote.',
    '',
    `Name: ${v(f.name)}`,
    `Business: ${v(f.business)}`,
    `Email: ${v(f.email)}`,
    `Phone / WhatsApp: ${v(f.phone)}`,
    `Type of business: ${v(f.businessType)}`,
    `City / neighbourhood: ${v(f.city)}`,
    `Service needed: ${v(f.interest)}`,
    `Estimated quantity: ${v(f.quantity)}`,
    `Desired start date: ${v(f.startDate)}`,
    `How I heard about you: ${v(f.heardFrom)}`,
    '',
    `Message: ${v(f.message)}`,
    '',
    `Consent: ${f.consent ? CONSENT_TEXT : '-'}`,
  ].join('\n');
}

export function buildSampleMessage(f: SampleValues): string {
  return [
    'Hello CS Fragrances! I would like to request samples.',
    '',
    `Name: ${v(f.name)}`,
    `Business: ${v(f.business)}`,
    `Email: ${v(f.email)}`,
    `Phone / WhatsApp: ${v(f.phone)}`,
    `Type of business: ${v(f.businessType)}`,
    `City / neighbourhood: ${v(f.city)}`,
    `Samples of: ${f.samplesOf.length ? f.samplesOf.join(', ') : '-'}`,
    '',
    `Message: ${v(f.message)}`,
    '',
    `Consent: ${f.consent ? CONSENT_TEXT : '-'}`,
  ].join('\n');
}

export const mailtoUrl = (subject: string, body: string) =>
  `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const whatsappUrl = (body: string) => `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(body)}`;

export const quoteSubject = (f: Pick<QuoteValues, 'business'>) =>
  `Quote request${f.business.trim() ? `: ${f.business.trim()}` : ''}`;
export const sampleSubject = (f: Pick<SampleValues, 'business'>) =>
  `Sample request${f.business.trim() ? `: ${f.business.trim()}` : ''}`;

export interface BriefingValues {
  business: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  spaceType: string;
  /** Scents and notes the client likes (required). */
  likes: string;
  dislikes: string;
  /** Mood to make guests feel (required). */
  mood: string;
  /** Optional at the briefing stage; asked again at step 4. */
  spaceSize: string;
  message: string;
  heardFrom: string;
  consent: boolean;
}

export function buildBriefingMessage(f: BriefingValues): string {
  return [
    'Hello CS Fragrances! Here is my scent briefing. Please send me samples.',
    '',
    `Business: ${v(f.business)}`,
    `Name: ${v(f.name)}`,
    `Email: ${v(f.email)}`,
    `Phone / WhatsApp: ${v(f.phone)}`,
    `City / neighbourhood: ${v(f.city)}`,
    `Type of space: ${v(f.spaceType)}`,
    `Scents and notes I like: ${v(f.likes)}`,
    `Scents and notes I don't like: ${v(f.dislikes)}`,
    `Mood I want guests to feel: ${v(f.mood)}`,
    `Approximate size of the space (sq ft, optional): ${v(f.spaceSize)}`,
    `How I heard about you: ${v(f.heardFrom)}`,
    '',
    `Anything else: ${v(f.message)}`,
    '',
    `Consent: ${f.consent ? CONSENT_TEXT : '-'}`,
  ].join('\n');
}

export const briefingSubject = (f: Pick<BriefingValues, 'business'>) =>
  `Scent briefing${f.business.trim() ? `: ${f.business.trim()}` : ''}`;
