/**
 * Single place for every B2B (For Business) fact that is still UNCONFIRMED.
 *
 * Rule: a value of `null` means "not confirmed yet". The public pages then show neutral copy
 * ("Contact us for details") and make no claim. Fill in a value here and it appears everywhere,
 * with no other code change. Never invent a value.
 *
 * Source of the open questions: /workspace/gestao/b2b-storytelling-seo.md (Part A, Part B) and
 * /workspace/gestao/estrategia-b2b.md.
 */
import { COMPANY } from './company';

/** Neutral text shown wherever a value below is still null. */
export const CONTACT_FOR_DETAILS = 'Contact us for details';

export const B2B_CONFIG = {
  // TODO(Miguel): minimum order per product line (private label, amenities, corporate kits).
  minimumOrder: null as string | null,
  // TODO(Miguel): lead time for amenities / kits / private label orders.
  leadTime: null as string | null,
  // TODO(Miguel): confirm the date private label starts accepting projects (docs suggest January 2027).
  privateLabelStart: null as string | null,
  // TODO(Miguel): do we deliver B2B orders outside British Columbia / Canada? Fill the exact sentence.
  deliveryOutsideBC: null as string | null,
  // TODO(Miguel): confirm B2B delivery to the USA. While null, NO page mentions the USA.
  usDelivery: null as string | null,
  // TODO(Miguel): set true only when the on-site scent test and samples are confirmed as free of charge
  // (Commercial: policy still open, "courtesy or credit on the first order"). While false, copy says
  // "no obligation" and never "free".
  freeSamples: false,
  // TODO(Miguel): how fast we answer a quote / sample request (e.g. "within 1-2 business days").
  replyTime: null as string | null,
  // TODO(Miguel/Raquel): diffuser model/equipment (none in stock yet). Pages say "defined at the visit".
  diffuserEquipment: null as string | null,
  // TODO(Miguel): customization options for amenities and kits (logo, card, label) and their lead time.
  customizationOptions: null as string | null,
  // TODO(Miguel): wholesale / consignment terms for salons, barbershops and boutiques.
  resaleTerms: null as string | null,
  // TODO(Miguel/Raquel): Google Business Profile URL, once verified. Added to schema `sameAs`.
  googleBusinessProfileUrl: null as string | null,
  // TODO(Raquel): real fairs/markets we attended, shown as proof only when listed here and true.
  marketsAttended: [] as string[],
  // TODO(Raquel): written OK from the barbershop to publish a quote from the barbershop (and, separately, the name).
  caseQuote: null as { text: string; attribution: string } | null,

  /** Confirmed contact details (already public on the site). No other phone/email exists yet. */
  email: COMPANY.email,
  whatsappDisplay: COMPANY.whatsappDisplay,
  whatsappNumber: COMPANY.whatsappNumber,
  /** Confirmed service-area wording (Commercial strategy): made in BC, based in Surrey, serving Vancouver and the Lower Mainland. */
  serviceAreaText: 'Vancouver and the Lower Mainland, British Columbia',
} as const;

/** Value for display: the confirmed text, or the neutral fallback. */
export const detail = (value: string | null | undefined): string =>
  value && value.trim() ? value : CONTACT_FOR_DETAILS;
