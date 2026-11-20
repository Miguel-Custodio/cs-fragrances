/**
 * Private label batch calculator: pure logic, no UI. Money is never involved.
 *
 * Rules (Miguel, 19/11/2026):
 *  - the client buys fragrance in kg (minimum 1 kg);
 *  - 10% of it is counted as production loss, the rest is usable;
 *  - the client mixes any products until the usable fragrance is used up.
 *
 * Math is done in tenths of a gram (integers) so 0.1 + 0.2 style errors never show up.
 */
import { mailtoUrl, whatsappUrl } from './requestMessages';
import { PRIVATE_LABEL_PRODUCTS, listedProducts, type PrivateLabelProduct } from './privateLabelFormulas';

export const LOSS_RATE = 0.1;
export const MIN_KG = 1;
export const KG_STEP = 0.5;

const T = 10; // tenths of a gram per gram
const toTenths = (g: number) => Math.round(g * T);
const fromTenths = (t: number) => t / T;

/** Usable grams of fragrance after the 10% loss. Invalid or below-minimum input gives 0. */
export function usableGrams(kg: number): number {
  if (!Number.isFinite(kg) || kg < MIN_KG) return 0;
  const tenths = Math.round(kg * 1000 * T * (1 - LOSS_RATE));
  return fromTenths(tenths);
}

export const lossGrams = (kg: number): number =>
  Number.isFinite(kg) && kg >= MIN_KG ? fromTenths(Math.round(kg * 1000 * T) - toTenths(usableGrams(kg))) : 0;

export interface LineResult {
  id: string;
  name: string;
  unit: string;
  units: number;
  gramsPerUnit: number;
  /** Grams of fragrance used by this line. */
  grams: number;
  /** How many MORE units of this product fit in what is left (0 when over or full). */
  moreFit: number;
}

export type BatchStatus = 'invalid' | 'empty' | 'incomplete' | 'complete' | 'over';

export interface BatchResult {
  kg: number;
  kgValid: boolean;
  usable: number;
  loss: number;
  used: number;
  /** Never negative. */
  remaining: number;
  /** Grams over capacity (0 when it fits). */
  over: number;
  /** 0 to 100 (capped for the progress bar). */
  percent: number;
  totalUnits: number;
  lines: LineResult[];
  status: BatchStatus;
  /** Smallest fragrance amount of any listed product: leftovers below this cannot make another unit. */
  smallestUnitGrams: number;
}

/** Clean a typed quantity: whole, non-negative. */
export const cleanUnits = (n: unknown): number => {
  const v = typeof n === 'number' ? n : Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;
};

export function computeBatch(
  kg: number,
  quantities: Record<string, number | string | undefined>,
  products: PrivateLabelProduct[] = PRIVATE_LABEL_PRODUCTS,
): BatchResult {
  const list = listedProducts(products);
  const kgValid = Number.isFinite(kg) && kg >= MIN_KG;
  const usableT = toTenths(usableGrams(kg));
  const smallestT = Math.min(...list.map((p) => toTenths(p.gramsPerUnit)));
  let usedT = 0;
  let totalUnits = 0;
  const base = list.map((p) => {
    const units = cleanUnits(quantities[p.id]);
    const gT = units * toTenths(p.gramsPerUnit);
    usedT += gT;
    totalUnits += units;
    return { p, units, gT };
  });
  const remainingT = Math.max(0, usableT - usedT);
  const overT = Math.max(0, usedT - usableT);
  const lines: LineResult[] = base.map(({ p, units, gT }) => ({
    id: p.id,
    name: p.name,
    unit: p.unit,
    units,
    gramsPerUnit: p.gramsPerUnit,
    grams: fromTenths(gT),
    moreFit: kgValid ? Math.floor(remainingT / toTenths(p.gramsPerUnit)) : 0,
  }));
  let status: BatchStatus;
  if (!kgValid) status = 'invalid';
  else if (overT > 0) status = 'over';
  else if (totalUnits === 0) status = 'empty';
  else if (remainingT < smallestT) status = 'complete';
  else status = 'incomplete';
  return {
    kg,
    kgValid,
    usable: fromTenths(usableT),
    loss: lossGrams(kg),
    used: fromTenths(usedT),
    remaining: fromTenths(remainingT),
    over: fromTenths(overT),
    percent: usableT > 0 ? Math.min(100, Math.round((usedT / usableT) * 1000) / 10) : 0,
    totalUnits,
    lines,
    status,
    smallestUnitGrams: fromTenths(smallestT),
  };
}

const g = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)} g`;

export interface PrivateLabelQuoteExtras {
  turnkey: boolean;
  fragrances: string;
}

/** Message for the "Request a private label quote" button (email or WhatsApp). No prices. */
export function buildPrivateLabelMessage(r: BatchResult, extras: PrivateLabelQuoteExtras): string {
  const chosen = r.lines.filter((l) => l.units > 0);
  return [
    'Hello CS Fragrances! I would like a private label quote.',
    '',
    `Fragrance for the batch: ${r.kg} kg (${g(r.usable)} usable after 10% production loss)`,
    'Products:',
    ...chosen.map((l) => `- ${l.units} x ${l.name} (${l.unit}): ${g(l.grams)}`),
    `Total fragrance used: ${g(r.used)} of ${g(r.usable)} (${r.percent}%)`,
    r.over > 0
      ? `Over capacity by: ${g(r.over)}`
      : r.status === 'complete'
        ? 'The batch is complete.'
        : `Remaining to complete the batch: ${g(r.remaining)}`,
    `Turnkey service (artwork, labels, boxes): ${extras.turnkey ? 'yes, please' : 'no'}`,
    `Fragrances I have in mind: ${extras.fragrances.trim() || '-'}`,
    '',
    'Name:',
    'Business:',
    'Phone / WhatsApp:',
  ].join('\n');
}

export const privateLabelSubject = 'Private label quote request';
export const privateLabelMailto = (r: BatchResult, e: PrivateLabelQuoteExtras) => mailtoUrl(privateLabelSubject, buildPrivateLabelMessage(r, e));
export const privateLabelWhatsapp = (r: BatchResult, e: PrivateLabelQuoteExtras) => whatsappUrl(buildPrivateLabelMessage(r, e));
