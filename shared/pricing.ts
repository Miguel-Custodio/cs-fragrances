import { findCatalogEntry, type ProductCategory } from './catalog.js';
import {
  calcShipping,
  ShippingError,
  type ShippingSelection,
  type ShippingZoneId,
} from './shipping.js';
import { calcTaxes, TAX_SHIPPING, type TaxLine } from './tax.js';

export interface QuoteInputItem {
  id: string;
  quantity: number;
}

export interface QuoteLine {
  id: string;
  category: ProductCategory;
  name: string;
  quantity: number;
  unitCents: number;
  totalCents: number;
}

export interface Quote {
  lines: QuoteLine[];
  subtotalCents: number;
  shippingCents: number;
  shippingFree: boolean;
  shippingZone: ShippingZoneId;
  shippingLabel: string;
  postalNormalized: string | null;
  taxes: TaxLine[];
  totalCents: number;
}

export const MAX_QTY_PER_ITEM = 20;

export class QuoteError extends Error {}

/**
 * Builds a quote from catalog prices only (the client's own prices are never
 * read). Used by the browser (cart display) and by the checkout function.
 */
export function buildQuote(
  items: readonly QuoteInputItem[],
  selection: ShippingSelection,
  taxEnabled: boolean,
): Quote {
  if (items.length === 0) throw new QuoteError('Cart is empty');

  const lines: QuoteLine[] = items.map((item) => {
    const entry = findCatalogEntry(item.id);
    if (!entry) throw new QuoteError(`Unknown product: ${item.id}`);
    if (entry.availability === 'sold-out') throw new QuoteError(`Sold out: ${entry.name}`);
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QTY_PER_ITEM) {
      throw new QuoteError(`Invalid quantity for ${item.id}`);
    }
    return {
      id: entry.id,
      category: entry.category,
      name: entry.name,
      quantity: item.quantity,
      unitCents: entry.priceCents,
      totalCents: entry.priceCents * item.quantity,
    };
  });

  const subtotalCents = lines.reduce((sum, l) => sum + l.totalCents, 0);
  let shipping;
  try {
    shipping = calcShipping(selection, subtotalCents);
  } catch (err) {
    if (err instanceof ShippingError) throw new QuoteError(err.message);
    throw err;
  }
  const taxBase = subtotalCents + (TAX_SHIPPING ? shipping.cents : 0);
  const taxes = calcTaxes(shipping.zone, taxBase, taxEnabled);
  const totalCents = subtotalCents + shipping.cents + taxes.reduce((s, t) => s + t.amountCents, 0);

  return {
    lines,
    subtotalCents,
    shippingCents: shipping.cents,
    shippingFree: shipping.free,
    shippingZone: shipping.zone,
    shippingLabel: shipping.rule.label,
    postalNormalized: shipping.postal?.normalized ?? null,
    taxes,
    totalCents,
  };
}
