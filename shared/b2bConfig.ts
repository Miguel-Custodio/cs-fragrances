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
  // CONFIRMED by Miguel (19/11/2026): we deliver outside BC, across Canada, shipping paid by the client.
  deliveryOutsideBC: 'across Canada' as string | null,
  // CONFIRMED by Miguel (19/11/2026): we deliver to the USA too, shipping paid by the client.
  // (While this is null, NO page mentions the USA.)
  usDelivery: 'to the United States' as string | null,
  // CONFIRMED by Miguel (19/11/2026): samples are free. With true, copy may say "free samples". Set false to
  // make every B2B text drop the word "free" again (the build test checks this).
  freeSamples: true,
  // CONFIRMED by Miguel (19/11/2026): private label minimum is 1 kg of fragrance per production batch
  // (the client mixes products to use the batch; 10% of the fragrance is counted as production loss).
  privateLabelMinimum: '1 kg of fragrance per batch, mixed across any of our products' as string | null,
  // CONFIRMED by Miguel (19/11/2026): optional turnkey service for private label.
  turnkeyService: 'Optional turnkey service: we create the artwork (labels, boxes and more) with your approval' as string | null,
  // CONFIRMED by Miguel (19/11/2026): we do NOT receive clients at our location (it is a home). Meetings, if
  // needed, happen at the client's space or at a cafe. Never add a street address.
  meetingText: 'We do not receive visitors at our workshop. If a meeting helps, we meet you at your space or at a café nearby.' as string | null,
  // TODO(Miguel): how fast we answer a quote / sample request (e.g. "within 1-2 business days").
  replyTime: null as string | null,
  // CONFIRMED by Miguel (19/11/2026): scent marketing = our fragrance + a diffusion machine, with monthly
  // maintenance service and machine on loan (comodato). Still no machine model or brand is named, and no price.
  diffuserEquipment: 'We supply the fragrance and the diffusion machine, with a monthly maintenance service and the machine on loan' as string | null,
  // CONFIRMED by Miguel (19/11/2026): turnkey is available if the client wants it. Lead time still unconfirmed.
  customizationOptions: 'a label, card or logo on request, and an optional turnkey service in which we create the artwork (labels, boxes and more) with your approval' as string | null,
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

/**
 * Delivery sentence for the public pages, built from the confirmed values above. Shipping is paid by the client
 * (confirmed by Miguel, 19/11/2026). Falls back to neutral text if a value is ever set back to null.
 */
export const SHIPPING_PAID_BY_CLIENT = true;
export const DELIVERY_TEXT = B2B_CONFIG.deliveryOutsideBC
  ? `We deliver ${B2B_CONFIG.deliveryOutsideBC}${B2B_CONFIG.usDelivery ? ` and ${B2B_CONFIG.usDelivery}` : ''}.${SHIPPING_PAID_BY_CLIENT ? ' Shipping is paid by the client.' : ''}`
  : 'Delivery outside our local area: contact us for details.';

/** Value for display: the confirmed text, or the neutral fallback. */
export const detail = (value: string | null | undefined): string =>
  value && value.trim() ? value : CONTACT_FOR_DETAILS;
