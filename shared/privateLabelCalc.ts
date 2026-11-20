/**
 * Private label batch calculator: pure logic. SERVER ONLY (it reads the fragrance table).
 * The browser gets only toPublic() results through /api/private-label-calc.
 *
 * Rules (Miguel, 19/11/2026): the client buys fragrance in kg (minimum 1 kg), an allowance for production
 * loss is taken off, and the client mixes any products until the usable fragrance is used up.
 * Math is done in tenths of a gram (integers) so decimals never drift.
 */
import { FRAGRANCE_GRAMS } from './privateLabelFormulas.js';
import { MIN_KG, PRIVATE_LABEL_PRODUCTS, listedProducts, type BatchStatus, type PrivateLabelProduct, type PublicBatchResult } from './privateLabelCatalog.js';

export const LOSS_RATE = 0.1;
const T = 10;
const gT = (id: string) => Math.round((FRAGRANCE_GRAMS[id] ?? 0) * T);
const fromT = (t: number) => t / T;

/** Usable grams of fragrance after the loss allowance. Invalid or below-minimum input gives 0. */
export function usableGrams(kg: number): number {
  if (!Number.isFinite(kg) || kg < MIN_KG) return 0;
  return fromT(Math.round(kg * 1000 * T * (1 - LOSS_RATE)));
}

export const cleanUnits = (n: unknown): number => {
  const v = typeof n === 'number' ? n : Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;
};

export interface LineResult {
  id: string;
  units: number;
  grams: number;
  moreFit: number;
}

export interface BatchResult {
  kgValid: boolean;
  usable: number;
  used: number;
  remaining: number;
  over: number;
  percent: number;
  totalUnits: number;
  lines: LineResult[];
  status: BatchStatus;
  smallestUnitGrams: number;
}

export function computeBatch(
  kg: number,
  quantities: Record<string, number | string | undefined>,
  products: PrivateLabelProduct[] = PRIVATE_LABEL_PRODUCTS,
): BatchResult {
  const list = listedProducts(products);
  const kgValid = Number.isFinite(kg) && kg >= MIN_KG;
  const usableT = Math.round(usableGrams(kg) * T);
  const smallestT = Math.min(...list.map((p) => gT(p.id)));
  let usedT = 0;
  let totalUnits = 0;
  const base = list.map((p) => {
    const units = cleanUnits(quantities[p.id]);
    const lineT = units * gT(p.id);
    usedT += lineT;
    totalUnits += units;
    return { p, units, lineT };
  });
  const remainingT = Math.max(0, usableT - usedT);
  const overT = Math.max(0, usedT - usableT);
  const lines: LineResult[] = base.map(({ p, units, lineT }) => ({
    id: p.id,
    units,
    grams: fromT(lineT),
    moreFit: kgValid ? Math.floor(remainingT / gT(p.id)) : 0,
  }));
  let status: BatchStatus;
  if (!kgValid) status = 'invalid';
  else if (overT > 0) status = 'over';
  else if (totalUnits === 0) status = 'empty';
  else if (remainingT < smallestT) status = 'complete';
  else status = 'incomplete';
  return {
    kgValid,
    usable: fromT(usableT),
    used: fromT(usedT),
    remaining: fromT(remainingT),
    over: fromT(overT),
    percent: usableT > 0 ? Math.min(100, Math.round((usedT / usableT) * 1000) / 10) : 0,
    totalUnits,
    lines,
    status,
    smallestUnitGrams: fromT(smallestT),
  };
}

/** "About N more": exact when small, then rounded down, so the answer is a rough idea, not a measurement. */
export function roughCount(n: number): number {
  if (n < 10) return n;
  if (n < 100) return Math.floor(n / 5) * 5;
  return Math.floor(n / 10) * 10;
}

/** The only shape that leaves the server: whole percent, rounded counts, no gram figures. */
export function toPublic(r: BatchResult): PublicBatchResult {
  let percent = Math.round(r.percent);
  if (r.status === 'incomplete') percent = Math.min(99, Math.max(1, percent));
  if (r.status === 'complete' || r.status === 'over') percent = 100;
  return {
    kgValid: r.kgValid,
    status: r.status,
    percent,
    totalUnits: r.totalUnits,
    lines: r.lines.map((l) => ({ id: l.id, units: l.units, moreFit: r.status === 'over' ? 0 : roughCount(l.moreFit) })),
  };
}
