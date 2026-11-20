/**
 * Private label calculator: what the browser is allowed to know. Names, sizes and whether a product is listed.
 * NO quantities of fragrance live here (see privateLabelFormulas.ts, which only the server function imports).
 */
import { mailtoUrl, whatsappUrl } from './requestMessages.js';

export const MIN_KG = 1;
export const KG_STEP = 0.5;

export interface PrivateLabelProduct {
  id: string;
  name: string;
  /** Short size text shown next to the name. */
  unit: string;
  /** false: the value behind this product is only an example, so the calculator shows a notice. */
  confirmed: boolean;
  /** Shown in the public calculator. */
  listed: boolean;
}

export const PRIVATE_LABEL_PRODUCTS: PrivateLabelProduct[] = [
  { id: 'edp', name: 'Eau de parfum', unit: '50 ml', confirmed: true, listed: true },
  { id: 'edp-30', name: 'Extrait de parfum', unit: '50 ml', confirmed: true, listed: true },
  { id: 'body-mist', name: 'Body mist', unit: '100 ml', confirmed: true, listed: true },
  { id: 'home-spray', name: 'Home and linen spray', unit: '250 ml', confirmed: true, listed: true },
  { id: 'bar-soap', name: 'Bar soap', unit: '100 g', confirmed: true, listed: true },
  { id: 'ornament-soap', name: 'Ornament soap', unit: '60 g average', confirmed: true, listed: true },
  { id: 'sachet', name: 'Scented sachet', unit: '30 g', confirmed: true, listed: true },
  { id: 'wax-melt', name: 'Wax melt', unit: '35 g average', confirmed: true, listed: true },
  { id: 'candle', name: 'Candle in a glass jar', unit: '100 g', confirmed: true, listed: true },
  // Pending confirmation: hidden until CS Ops confirms (then confirmed: true, listed: true).
  { id: 'decorated-soap', name: 'Decorated seasonal soap', unit: 'size to confirm', confirmed: false, listed: false },
  { id: 'sample-2ml', name: 'Perfume sample', unit: '2 ml', confirmed: false, listed: false },
];

export const listedProducts = (products: PrivateLabelProduct[] = PRIVATE_LABEL_PRODUCTS) => products.filter((p) => p.listed);

/** True when any product shown in the calculator still has an example (unconfirmed) value. */
export const hasUnconfirmedListed = (products: PrivateLabelProduct[] = PRIVATE_LABEL_PRODUCTS) =>
  listedProducts(products).some((p) => !p.confirmed);

export type BatchStatus = 'invalid' | 'empty' | 'incomplete' | 'complete' | 'over';

/** What the server function sends back. No gram figures, rounded on purpose. */
export interface PublicBatchResult {
  kgValid: boolean;
  status: BatchStatus;
  /** Whole percent of the batch filled (0 to 100). */
  percent: number;
  totalUnits: number;
  lines: { id: string; units: number; /** "About this many more fit" (rounded). */ moreFit: number }[];
}

export interface PrivateLabelQuoteExtras {
  turnkey: boolean;
  fragrances: string;
}

/** Message for the quote buttons (email or WhatsApp). Never contains gram figures or prices. */
export function buildPrivateLabelMessage(
  kg: number,
  quantities: Record<string, number>,
  result: PublicBatchResult | null,
  extras: PrivateLabelQuoteExtras,
): string {
  const chosen = listedProducts().filter((p) => (quantities[p.id] ?? 0) > 0);
  const state =
    !result ? null
    : result.status === 'over' ? 'Over capacity (I will adjust it)'
    : result.status === 'complete' ? 'The batch is complete'
    : `Batch filled: ${result.percent}% (${Math.max(0, 100 - result.percent)}% left to complete it)`;
  return [
    'Hello CS Fragrances! I would like a private label quote.',
    '',
    `Batch size: ${kg} kg of fragrance`,
    'Products:',
    ...chosen.map((p) => `- ${quantities[p.id]} x ${p.name} (${p.unit})`),
    ...(state ? [state] : []),
    `Turnkey service (artwork, labels, boxes): ${extras.turnkey ? 'yes, please' : 'no'}`,
    `Fragrances I have in mind: ${extras.fragrances.trim() || '-'}`,
    '',
    'Name:',
    'Business:',
    'Phone / WhatsApp:',
  ].join('\n');
}

export const privateLabelSubject = 'Private label quote request';
export const privateLabelMailto = (...a: Parameters<typeof buildPrivateLabelMessage>) => mailtoUrl(privateLabelSubject, buildPrivateLabelMessage(...a));
export const privateLabelWhatsapp = (...a: Parameters<typeof buildPrivateLabelMessage>) => whatsappUrl(buildPrivateLabelMessage(...a));
