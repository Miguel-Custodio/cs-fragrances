/**
 * Builds the text of the two B2B requests (quote and samples) and the mailto / WhatsApp links.
 * No backend: the visitor's email app or WhatsApp opens with the message ready to send.
 */
import { COMPANY, WHATSAPP_BASE_URL } from './company';

export const BUSINESS_TYPES = [
  'Hotel',
  'Spa or wellness',
  'Salon or barbershop',
  'Retail or boutique',
  'Office or corporate gifts',
  'Clinic or gym',
  'Other',
] as const;

export const INTERESTS = [
  'Scent for my space',
  'Amenity soaps and sprays',
  'Private label',
  'Corporate gifts',
  'Perfumes for resale',
  'Not sure yet',
] as const;

export const SCENT_DIRECTIONS = ['Fresh and clean', 'Floral', 'Woody', 'Warm and sweet', 'Not sure yet'] as const;

export const SAMPLE_WAYS = ['Scent test at my space', 'Samples sent to me', 'Either is fine'] as const;

export const CONSENT_TEXT = 'I agree to be contacted by CS Fragrances about my request.';

export interface QuoteValues {
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  spaceSize: string;
  interest: string;
  quantity: string;
  timing: string;
  message: string;
  consent: boolean;
}

export interface SampleValues {
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  sampleWay: string;
  scentDirections: string[];
  spaceSize: string;
  timing: string;
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
    `City: ${v(f.city)}`,
    `Size of space (approx. sq ft): ${v(f.spaceSize)}`,
    `Interested in: ${v(f.interest)}`,
    `Estimated quantity: ${v(f.quantity)}`,
    `Preferred timing: ${v(f.timing)}`,
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
    `City: ${v(f.city)}`,
    `I would like: ${v(f.sampleWay)}`,
    `Scent directions I like: ${f.scentDirections.length ? f.scentDirections.join(', ') : '-'}`,
    `Size of space (approx. sq ft): ${v(f.spaceSize)}`,
    `Preferred timing: ${v(f.timing)}`,
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
