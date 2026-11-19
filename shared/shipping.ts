/**
 * Shipping configuration.
 *
 * Shipping is calculated from the postal / ZIP code entered in the cart
 * (or is free for local pickup). The server always recalculates from that
 * code; the amount shown in the browser is never trusted.
 *
 * ============================================================================
 * TODO (Miguel): ALL RATES BELOW ARE PLACEHOLDERS - NOT REAL PRICES.
 * Edit only the SHIPPING_RATES object, then set SHIPPING_RATES_CONFIRMED=true
 * in the host's environment variables. While that variable is not "true" the
 * server refuses to create Square payment links and the cart falls back to a
 * WhatsApp order, so placeholder rates can never be charged by accident.
 *
 * Future (free): replace these flat rates with the Canada Post Rating API
 * (needs a free Canada Post Solutions for Small Business account) to get a
 * real price by weight and destination.
 * ============================================================================
 */

export type ShippingMethod = 'pickup' | 'ship';

export type ShippingZoneId =
  | 'pickup'
  | 'metro-vancouver'
  | 'bc'
  | 'western'
  | 'eastern'
  | 'territories'
  | 'usa';

export type ShippingSelection =
  | { method: 'pickup' }
  | { method: 'ship'; postalCode: string };

export interface ShippingRule {
  id: ShippingZoneId;
  /** Label shown in the cart. */
  label: string;
  /** Short helper text under the rate. */
  hint: string;
  /** ISO country the parcel goes to (used to pre-fill the Square address form). */
  country: 'CA' | 'US';
  /** Flat shipping rate in cents. 0 for pickup. TODO: placeholder. */
  rateCents: number;
  /**
   * Orders with a subtotal at or above this amount (cents) ship free.
   * null = never free. TODO: placeholder.
   */
  freeOverCents: number | null;
}

/**
 * PLACEHOLDER rates (CAD cents). Not real prices.
 * Change only this object when Miguel confirms the amounts.
 */
export const SHIPPING_RATES: {
  readonly [K in Exclude<ShippingZoneId, 'pickup'>]: {
    rateCents: number;
    freeOverCents: number | null;
  };
} = {
  'metro-vancouver': { rateCents: 800, freeOverCents: 12000 }, // TODO placeholder CAD 8.00, free from 120.00
  bc: { rateCents: 1000, freeOverCents: 12000 }, // TODO placeholder CAD 10.00, free from 120.00
  western: { rateCents: 1500, freeOverCents: 15000 }, // TODO placeholder CAD 15.00, free from 150.00
  eastern: { rateCents: 1800, freeOverCents: 15000 }, // TODO placeholder CAD 18.00, free from 150.00
  territories: { rateCents: 3000, freeOverCents: 20000 }, // TODO placeholder CAD 30.00, free from 200.00
  usa: { rateCents: 2500, freeOverCents: null }, // TODO placeholder CAD 25.00, no free shipping
};

/**
 * Metro Vancouver + urban Fraser Valley (Lower Mainland) FSAs.
 * First three characters of a BC (V…) postal code.
 * Intentionally a list, not a V3/V4/V5/V6/V7 prefix rule, because some of those
 * prefixes are outside the Lower Mainland (e.g. V4T is West Kelowna).
 * Rural V0N (Bowen Island, Lions Bay, Squamish, Whistler, Sunshine Coast)
 * is treated as rest of BC.
 */
const fsaRange = (prefix: string, letters: string) => letters.split("").map((l) => `${prefix}${l}`);

export const LOWER_MAINLAND_FSAS: ReadonlySet<string> = new Set([
  // Langley Township / City
  'V1M',
  'V2Y',
  'V2Z',
  'V3A',
  'V4W',
  // Maple Ridge
  'V2W',
  'V2X',
  'V4R',
  // Chilliwack, Abbotsford, Mission (Fraser Valley / Lower Mainland)
  'V2P',
  'V2R',
  'V4Z',
  'V2S',
  'V2T',
  'V3G',
  'V4X',
  'V2V',
  'V4S',
  // Coquitlam, Port Coquitlam, Port Moody, Anmore, Belcarra
  'V3B',
  'V3C',
  'V3E',
  'V3H',
  'V3J',
  'V3K',
  // New Westminster
  'V3L',
  'V3M',
  // Surrey, White Rock, Pitt Meadows (generated from prefix + letters, same codes as before)
  ...fsaRange('V3', 'RSTVWXYZ'),
  ...fsaRange('V4', 'ABNP'),
  // Delta
  'V4C',
  'V4E',
  'V4G',
  'V4K',
  'V4L',
  'V4M',
  // Burnaby
  'V5A',
  'V5B',
  'V5C',
  'V5E',
  'V5G',
  'V5H',
  'V5J',
  // Vancouver
  'V5K',
  'V5L',
  'V5M',
  'V5N',
  'V5P',
  'V5R',
  'V5S',
  'V5T',
  'V5V',
  'V5W',
  'V5X',
  'V5Y',
  'V5Z',
  'V6A',
  'V6B',
  'V6C',
  'V6E',
  'V6G',
  'V6H',
  'V6J',
  'V6K',
  'V6L',
  'V6M',
  'V6N',
  'V6P',
  'V6R',
  'V6S',
  'V6T',
  'V6Z',
  'V7X',
  'V7Y',
  // Richmond
  'V6V',
  'V6W',
  'V6X',
  'V6Y',
  'V7A',
  'V7B',
  'V7C',
  'V7E',
  // North Vancouver
  'V7G',
  'V7H',
  'V7J',
  'V7K',
  'V7L',
  'V7M',
  'V7N',
  'V7P',
  'V7R',
  // West Vancouver
  'V7S',
  'V7T',
  'V7V',
  'V7W',
]);

/** First letter of a Canadian postal code → province / territory (ISO-style). */
export const POSTAL_LETTER_TO_REGION: Readonly<Record<string, { code: string; name: string }>> = {
  A: { code: 'NL', name: 'Newfoundland and Labrador' },
  B: { code: 'NS', name: 'Nova Scotia' },
  C: { code: 'PE', name: 'Prince Edward Island' },
  E: { code: 'NB', name: 'New Brunswick' },
  G: { code: 'QC', name: 'Quebec' },
  H: { code: 'QC', name: 'Quebec' },
  J: { code: 'QC', name: 'Quebec' },
  K: { code: 'ON', name: 'Ontario' },
  L: { code: 'ON', name: 'Ontario' },
  M: { code: 'ON', name: 'Ontario' },
  N: { code: 'ON', name: 'Ontario' },
  P: { code: 'ON', name: 'Ontario' },
  R: { code: 'MB', name: 'Manitoba' },
  S: { code: 'SK', name: 'Saskatchewan' },
  T: { code: 'AB', name: 'Alberta' },
  V: { code: 'BC', name: 'British Columbia' },
  // X covers both Northwest Territories and Nunavut; NT is used as a default.
  X: { code: 'NT', name: 'Northwest Territories / Nunavut' },
  Y: { code: 'YT', name: 'Yukon' },
};

const ZONE_META: {
  readonly [K in Exclude<ShippingZoneId, 'pickup'>]: Pick<ShippingRule, 'label' | 'hint' | 'country'>;
} = {
  'metro-vancouver': {
    label: 'Delivery - Lower Mainland / Metro Vancouver',
    hint: 'Delivery within Metro Vancouver and the urban Fraser Valley.',
    country: 'CA',
  },
  bc: {
    label: 'Delivery - Rest of British Columbia',
    hint: 'Delivery to the rest of British Columbia.',
    country: 'CA',
  },
  western: {
    label: 'Delivery - Western Canada (AB, SK, MB)',
    hint: 'Delivery to Alberta, Saskatchewan or Manitoba.',
    country: 'CA',
  },
  eastern: {
    label: 'Delivery - Eastern Canada (ON, QC, Atlantic)',
    hint: 'Delivery to Ontario, Quebec or Atlantic Canada.',
    country: 'CA',
  },
  territories: {
    label: 'Delivery - Territories (YT, NT, NU)',
    hint: 'Delivery to Yukon, the Northwest Territories or Nunavut.',
    country: 'CA',
  },
  usa: {
    label: 'Delivery - United States',
    hint: 'Delivery to the United States. Duties/import taxes may apply.',
    country: 'US',
  },
};

function ruleForZone(id: Exclude<ShippingZoneId, 'pickup'>): ShippingRule {
  return { id, ...ZONE_META[id], ...SHIPPING_RATES[id] };
}

export const PICKUP_RULE: ShippingRule = {
  id: 'pickup',
  label: 'Local pickup (free)',
  hint: 'Pickup location and time are confirmed by email/WhatsApp after your order.',
  country: 'CA',
  rateCents: 0,
  freeOverCents: null,
};

export const SHIPPING_ZONES: readonly ShippingZoneId[] = [
  'pickup',
  'metro-vancouver',
  'bc',
  'western',
  'eastern',
  'territories',
  'usa',
];

export function getShippingRule(id: string): ShippingRule | undefined {
  if (id === 'pickup') return PICKUP_RULE;
  if (id in SHIPPING_RATES) return ruleForZone(id as Exclude<ShippingZoneId, 'pickup'>);
  return undefined;
}

export type ParsedPostal =
  | { country: 'CA'; normalized: string; fsa: string; firstLetter: string }
  | { country: 'US'; normalized: string; zip5: string };

const CA_POSTAL = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/;

/** Parses a Canadian postal code (A1A 1A1) or a US ZIP (12345 or 12345-6789). */
export function parsePostalCode(input: string): ParsedPostal | null {
  const compact = input.trim().toUpperCase().replace(/[\s-]+/g, '');
  if (CA_POSTAL.test(compact)) {
    return {
      country: 'CA',
      normalized: `${compact.slice(0, 3)} ${compact.slice(3)}`,
      fsa: compact.slice(0, 3),
      firstLetter: compact[0]!,
    };
  }
  if (/^\d{5}$/.test(compact) || /^\d{9}$/.test(compact)) {
    return {
      country: 'US',
      normalized: compact.length === 9 ? `${compact.slice(0, 5)}-${compact.slice(5)}` : compact,
      zip5: compact.slice(0, 5),
    };
  }
  return null;
}

export function zoneFromPostal(parsed: ParsedPostal): Exclude<ShippingZoneId, 'pickup'> {
  if (parsed.country === 'US') return 'usa';
  const letter = parsed.firstLetter;
  if (letter === 'V') {
    return LOWER_MAINLAND_FSAS.has(parsed.fsa) ? 'metro-vancouver' : 'bc';
  }
  if (letter === 'T' || letter === 'S' || letter === 'R') return 'western';
  if (letter === 'X' || letter === 'Y') return 'territories';
  return 'eastern';
}

export interface ResolvedDestination {
  zone: ShippingZoneId;
  rule: ShippingRule;
  postal: ParsedPostal | null;
  /** Province/state code for Square pre_populated_data, when known. */
  regionCode: string | null;
}

export class ShippingError extends Error {}

/** Resolves local pickup or a ship-to postal/ZIP code into a zone and rate rule. */
export function resolveDestination(selection: ShippingSelection): ResolvedDestination {
  if (selection.method === 'pickup') {
    return { zone: 'pickup', rule: PICKUP_RULE, postal: null, regionCode: 'BC' };
  }
  const postal = parsePostalCode(selection.postalCode);
  if (!postal) {
    throw new ShippingError('Enter a Canadian postal code (A1A 1A1) or a US ZIP code (12345).');
  }
  const zone = zoneFromPostal(postal);
  const regionCode = postal.country === 'CA' ? (POSTAL_LETTER_TO_REGION[postal.firstLetter]?.code ?? null) : null;
  return { zone, rule: ruleForZone(zone), postal, regionCode };
}

export interface ShippingResult {
  cents: number;
  free: boolean;
  zone: ShippingZoneId;
  rule: ShippingRule;
  postal: ParsedPostal | null;
  regionCode: string | null;
}

export function calcShipping(selection: ShippingSelection, subtotalCents: number): ShippingResult {
  const dest = resolveDestination(selection);
  const { rule } = dest;
  if (dest.zone === 'pickup' || rule.rateCents === 0) {
    return { cents: 0, free: true, ...dest };
  }
  if (rule.freeOverCents !== null && subtotalCents >= rule.freeOverCents) {
    return { cents: 0, free: true, ...dest };
  }
  return { cents: rule.rateCents, free: false, ...dest };
}

/** Zones taxed with BC GST/PST when TAX_ENABLED is on (pickup and all of BC). */
export function isBcTaxZone(zone: ShippingZoneId): boolean {
  return zone === 'pickup' || zone === 'metro-vancouver' || zone === 'bc';
}
