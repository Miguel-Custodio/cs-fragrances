import { KITS, findKit } from './kits.js';

/**
 * Server-trusted product catalog.
 *
 * This is the SINGLE SOURCE OF TRUTH for prices. The storefront
 * (client/src/data/products.ts) reads prices from here, and the checkout
 * function (shared/checkout.ts) re-validates every cart line against it, so a
 * tampered cart in the browser can never change what is charged.
 *
 * All money is stored in integer cents (CAD).
 */

export const CURRENCY = 'CAD' as const;

/** 'kit' is reserved for the Christmas kits (page not built yet, awaiting approval). */
export type ProductCategory = 'perfume' | 'soap' | 'kit';

export interface CatalogEntry {
  id: string;
  /** Name shown on the Square checkout page / WhatsApp message. */
  name: string;
  category: ProductCategory;
  priceCents: number;
}

export const PERFUME_PRICE_CENTS = 6990; // CAD 69.90 (50 ml)
export const SOAP_PRICE_CENTS = 990; // CAD 9.90 (90 g)

export const CATALOG: readonly CatalogEntry[] = [
  { id: 'cs-horizon', name: 'CS Horizon (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  { id: 'cs-enigma', name: 'CS Enigma (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  { id: 'cs-her', name: 'CS Her (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  { id: 'cs-origin', name: 'CS Origin (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  {
    id: 'cs-soap-christmas-magic',
    name: 'CS Christmas Magic Goat Milk Soap (90 g)',
    category: 'soap',
    priceCents: SOAP_PRICE_CENTS,
  },
  // Kits with a CONFIRMED online price (see shared/kits.ts). Unpriced kits are not sellable.
  // Whether kits may be sold at all is gated by KITS_ENABLED (server) in shared/checkout.ts.
  ...KITS.filter((k) => k.priceCents !== null && !k.option).map(
    (k): CatalogEntry => ({
      id: k.id,
      name: `${k.name} Gift Kit`,
      category: 'kit',
      priceCents: k.priceCents as number,
    }),
  ),
];

/**
 * Finds a sellable entry. Kits with a customer choice use ids like
 * `kit-perfume-soap:cs-her`; the variant must be one of the kit's options.
 */
export function findCatalogEntry(id: string): CatalogEntry | undefined {
  const direct = CATALOG.find((p) => p.id === id);
  if (direct) return direct;
  const [kitId, variantId, ...rest] = id.split(':');
  if (!variantId || rest.length > 0) return undefined;
  const kit = findKit(kitId);
  const variant = kit?.option?.values.find((v) => v.id === variantId);
  if (!kit || !variant || kit.priceCents === null) return undefined;
  return {
    id,
    name: `${kit.name} Gift Kit - ${variant.label}`,
    category: 'kit',
    priceCents: kit.priceCents,
  };
}

/** Price in dollars (for display). Throws on unknown id so typos fail loudly at build/dev time. */
export function priceOf(id: string): number {
  const entry = findCatalogEntry(id);
  if (!entry) throw new Error(`Unknown catalog id: ${id}`);
  return entry.priceCents / 100;
}

export function formatCad(cents: number): string {
  return `CAD $${(cents / 100).toFixed(2)}`;
}
