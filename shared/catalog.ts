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

export type ProductCategory =
  | 'perfume'
  | 'body-mist'
  | 'home-spray'
  | 'sachet'
  | 'soap'
  | 'candle'
  | 'ornament'
  | 'kit';

export interface CatalogEntry {
  id: string;
  /** Name shown on the Square checkout page / WhatsApp message. */
  name: string;
  category: ProductCategory;
  priceCents: number;
  /**
   * 'sold-out' = listed on the site but NOT sellable: the quote builder (client and checkout
   * function) rejects it. 'unconfirmed' = owner has not confirmed it is still for sale; it does
   * NOT block the purchase and is only flagged on the product card.
   */
  availability?: 'unconfirmed' | 'sold-out';
}

export const PERFUME_PRICE_CENTS = 6990; // CAD 69.90 (50 ml)
export const SOAP_PRICE_CENTS = 1290; // CAD 12.90 online (100 g bar; weight confirmed by Raquel 2026-11-19)
export const DECORATIVE_SOAP_PRICE_CENTS = 1490; // CAD 14.90 online (Christmas decorative bar; Miguel 2026-11-17)
export const BODY_MIST_PRICE_CENTS = 2990; // CAD 29.90 online (100 ml; fair price 24.90)
export const HOME_SPRAY_PRICE_CENTS = 3490; // CAD 34.90 online (250 ml; fair price 29.90)
// CSV conflict: current price list says 5.90; older art / pop-up page says 6.90. 5.90 is used.
export const SACHET_PRICE_CENTS = 590; // CAD 5.90 (30 g)
export const ORNAMENT_PRICE_CENTS = 690; // CAD 6.90 (each)
export const CANDLE_PRICE_CENTS = 890; // CAD 8.90 (100 g, Limited Christmas Edition)

/** [slug, display name] */
type Scent = readonly [string, string];

export const BODY_MIST_SCENTS: Scent[] = [
  ['rose-blush', 'Rosé Blush'],
  ['cashmere-honey', 'Cashmere Honey'],
  ['amber-aura', 'Amber Aura'],
];
export const HOME_SPRAY_SCENTS: Scent[] = [
  ['lavender-muguet', 'Lavender Muguet'],
  ['velvet-bloom', 'Velvet Bloom'],
  ['misty-moss', 'Misty Moss'],
  ['golden-fig', 'Golden Fig'],
];
export const SACHET_SCENTS: Scent[] = [...BODY_MIST_SCENTS, ...HOME_SPRAY_SCENTS];

/** Shea butter bar soaps (100 g; confirmed by Raquel 2026-11-19). CS Christmas Magic is the separate legacy entry below. */
export const SHEA_SOAP_SCENTS: Scent[] = [
  ['morning-dew', 'CS Morning Dew'],
  ['wild-instinct', 'CS Wild Instinct'],
  ['forest-whispers', 'CS Forest Whispers'],
  ['winter-spice', 'CS Winter Spice'],
  ['warm-winter', 'CS Warm Winter'],
  ['gingerbread', 'CS Gingerbread'],
  ['christmas-memories', 'CS Christmas Memories'],
  ['glowing-snowflake', 'CS Glowing Snowflake'],
  ['her', 'CS Her'],
  ['origin', 'CS Origin'],
  ['enigma', 'CS Enigma'],
  ['horizon', 'CS Horizon'],
  ['misty-moss', 'CS Misty Moss'],
  ['rose-blush', 'CS Rosé Blush'],
  ['amber-aura', 'CS Amber Aura'],
  ['cashmere-honey', 'CS Cashmere Honey'],
  ['lavender-muguet', 'CS Lavender Muguet'],
  ['velvet-bloom', 'CS Velvet Bloom'],
  ['golden-fig', 'CS Golden Fig'],
];

/**
 * Goat milk bar soaps. Miguel (2026-11-17): CS does NOT make goat milk soap, every soap is shea butter.
 * They stay listed only as SOLD OUT (not purchasable; the server rejects them).
 */
export const GOAT_SOAP_SCENTS: Scent[] = [
  ['coastal-breeze', 'CS Coastal Breeze'],
  ['warm-apple', 'CS Warm Apple'],
  ['sparkles', 'CS Sparkles'],
  ['velvet-vanilla', 'CS Velvet Vanilla'],
  ['morning-dew', 'CS Morning Dew'],
];

export const ORNAMENT_SCENTS: Scent[] = [
  ['jade-infusion', 'CS Jade Infusion'],
  ['harvest-glow', 'CS Harvest Glow'],
  ['christmas-memories', 'CS Christmas Memories'],
  ['gingerbread', 'CS Gingerbread'],
  ['christmas-magic', 'CS Christmas Magic'],
  ['lavender-muguet', 'CS Lavender Muguet'],
  ['misty-moss', 'CS Misty Moss'],
  ['golden-fig', 'CS Golden Fig'],
  ['cashmere-honey', 'CS Cashmere Honey'],
  ['enchanted-noir', 'CS Enchanted Noir'],
];

export const CANDLE_SCENTS: Scent[] = [
  ['harvest-glow', 'Harvest Glow'],
  ['christmas-memories', 'Christmas Memories'],
  ['enchanted-noir', 'Enchanted Noir'],
  ['modern-ritual', 'Modern Ritual'],
];

export const CATALOG: readonly CatalogEntry[] = [
  { id: 'cs-horizon', name: 'CS Horizon (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  { id: 'cs-enigma', name: 'CS Enigma (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  { id: 'cs-her', name: 'CS Her (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  { id: 'cs-origin', name: 'CS Origin (50 ml)', category: 'perfume', priceCents: PERFUME_PRICE_CENTS },
  ...BODY_MIST_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `bodymist-${slug}`,
      name: `${label} Body Mist (100 ml)`,
      category: 'body-mist',
      priceCents: BODY_MIST_PRICE_CENTS,
    }),
  ),
  ...HOME_SPRAY_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `homespray-${slug}`,
      name: `${label} Home & Linen Spray (250 ml)`,
      category: 'home-spray',
      priceCents: HOME_SPRAY_PRICE_CENTS,
    }),
  ),
  ...SACHET_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `sachet-${slug}`,
      name: `${label} Fragranced Sachet (30 g)`,
      category: 'sachet',
      priceCents: SACHET_PRICE_CENTS,
    }),
  ),
  // Legacy site id, kept so saved carts keep working. Miguel (2026-11-17): all soaps are shea butter
  // (the Canva price list also lists Christmas Magic as shea butter).
  {
    id: 'cs-soap-christmas-magic',
    name: 'CS Christmas Magic Shea Butter Soap (100 g)',
    category: 'soap',
    priceCents: SOAP_PRICE_CENTS,
  },
  ...SHEA_SOAP_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `soap-shea-${slug}`,
      name: `${label} Shea Butter Soap (100 g)`,
      category: 'soap',
      priceCents: SOAP_PRICE_CENTS,
    }),
  ),
  ...GOAT_SOAP_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `soap-goat-${slug}`,
      name: `${label} Goat Milk Soap (100 g)`,
      category: 'soap',
      priceCents: SOAP_PRICE_CENTS,
      availability: 'sold-out',
    }),
  ),
  {
    id: 'soap-decorative-christmas',
    name: 'Christmas Decorative Bar Soap',
    category: 'soap',
    priceCents: DECORATIVE_SOAP_PRICE_CENTS,
  },
  ...ORNAMENT_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `ornament-${slug}`,
      name: `${label} Wax Melt Hanging Ornament`,
      category: 'ornament',
      priceCents: ORNAMENT_PRICE_CENTS,
    }),
  ),
  ...CANDLE_SCENTS.map(
    ([slug, label]): CatalogEntry => ({
      id: `candle-${slug}`,
      name: `${label} Glass Candle - Limited Christmas Edition (100 g)`,
      category: 'candle',
      priceCents: CANDLE_PRICE_CENTS,
    }),
  ),
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
