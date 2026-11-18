/**
 * Gift kits (Christmas). Hidden behind the KITS_ENABLED flag until Raquel / Miguel approve.
 *
 * priceCents is the confirmed ONLINE price (fair price + 15%, rounded up to
 * the next amount ending in ,90), except Perfume + Soap which Miguel confirmed
 * at CAD 75.00. fairPriceCents is the in-person (fair / pop-up) price, kept as
 * a reference only; it is never shown or charged.
 *
 * Kits stay hidden behind KITS_ENABLED until Raquel / Miguel approve.
 *
 * The individual items inside (sachets, candles, sprays...) are NOT registered
 * as separate products yet (awaiting approval); kits are sold as whole units.
 */
export interface KitOption {
  label: string;
  values: { id: string; label: string }[];
}

export interface KitDef {
  id: string;
  name: string;
  /** What is inside, in plain words. No brand comparisons in any text. */
  contents: string;
  priceCents: number | null;
  /** Reference only (fair price, CAD cents). */
  fairPriceCents: number;
  /** Public path of the (WebP) photo, or null when no real photo exists yet. */
  image: string | null;
  /** Customer choice that must be made before buying (becomes `kitId:valueId`). */
  option?: KitOption;
}


/**
 * Online kit price: fair price + 15%, rounded up to the next amount ending in ,90
 * (e.g. CAD 15.00 × 1.15 = 17.25 → 17.90). Integer math on cents.
 * Decision by Miguel, 2026-11-17. Exception: Perfume + Soap stays at CAD 75.00.
 */
export function onlinePriceFromFairCents(fairPriceCents: number): number {
  const rawCents = Math.ceil((fairPriceCents * 115) / 100);
  const rem = rawCents % 100;
  if (rem === 90) return rawCents;
  if (rem < 90) return rawCents - rem + 90;
  return rawCents - rem + 190;
}

export const PERFUME_CHOICES = [
  { id: 'cs-horizon', label: 'CS Horizon' },
  { id: 'cs-enigma', label: 'CS Enigma' },
  { id: 'cs-her', label: 'CS Her' },
  { id: 'cs-origin', label: 'CS Origin' },
];

export const KITS: readonly KitDef[] = [
  {
    id: 'kit-sachet-soap',
    name: 'Sachet + Soap',
    contents: '1 scented sachet (30 g) + 1 handmade soap, in a gift box.',
    priceCents: onlinePriceFromFairCents(1500),
    fairPriceCents: 1500,
    image: '/kits/sachet-soap.webp',
  },
  {
    id: 'kit-two-candles',
    name: '2 Candles',
    contents: '2 Limited Christmas Edition glass candles.',
    priceCents: onlinePriceFromFairCents(1500),
    fairPriceCents: 1500,
    image: '/kits/two-candles.webp',
  },
  {
    id: 'kit-five-sachets',
    name: '5 Sachets',
    contents: '5 scented sachets (30 g each).',
    priceCents: onlinePriceFromFairCents(2500),
    fairPriceCents: 2500,
    // Provisional photo from Marketing (Canva); may be replaced after the Nov 28 photo shoot.
    image: '/kits/five-sachets.webp',
  },
  {
    id: 'kit-five-wax-ornaments',
    name: '5 Wax Ornaments',
    contents: '5 scented wax hanging ornaments.',
    priceCents: onlinePriceFromFairCents(3000),
    fairPriceCents: 3000,
    image: '/kits/five-wax-ornaments.webp',
  },
  {
    id: 'kit-three-decorative-soaps',
    name: '3 Decorative Soaps',
    contents: '3 decorative Christmas soaps.',
    priceCents: onlinePriceFromFairCents(3400),
    fairPriceCents: 3400,
    image: '/kits/three-decorative-soaps.webp',
  },
  {
    id: 'kit-homespray-sachet',
    name: 'Home Spray + Sachet',
    contents: '1 home & linen spray (250 ml) + 1 scented sachet (30 g), in a gift box.',
    priceCents: onlinePriceFromFairCents(3500),
    fairPriceCents: 3500,
    image: '/kits/homespray-sachet.webp',
  },
  {
    id: 'kit-four-soaps-one-free',
    name: '4 Soaps + 1 Free',
    contents: 'Buy 4 handmade soaps and get a 5th one free (5 soaps in total).',
    priceCents: onlinePriceFromFairCents(3900),
    fairPriceCents: 3900,
    // Provisional photo from Marketing (Canva); soap labels in the photo still say 100 g, real weight is 90 g.
    image: '/kits/four-soaps-one-free.webp',
  },
  {
    id: 'kit-perfume-soap',
    name: 'Perfume + Soap',
    contents: '1 perfume (50 ml, your choice of scent) + 1 handmade soap.',
    // Online price confirmed by Miguel: ~CAD 75.00 (perfume is 69.90 online; fair price 65.00).
    priceCents: 7500,
    fairPriceCents: 6500,
    // Photo from Marketing (Canva), real products; pending Raquel's approval.
    image: '/kits/perfume-soap.webp',
    option: { label: 'Perfume', values: PERFUME_CHOICES },
  },
  {
    id: 'kit-bodymist-sachet',
    name: 'Body Mist + Sachet',
    contents: '1 body mist (100 ml) + 1 scented sachet (30 g), in a gift box.',
    priceCents: onlinePriceFromFairCents(3200),
    fairPriceCents: 3200,
    image: '/kits/bodymist-sachet.webp',
  },
  {
    id: 'kit-bodymist-soap',
    name: 'Body Mist + Soap',
    contents: '1 body mist (100 ml) + 1 handmade soap, in a gift box.',
    priceCents: onlinePriceFromFairCents(3500),
    fairPriceCents: 3500,
    image: '/kits/bodymist-soap.webp',
  },
  {
    id: 'kit-homespray-soap',
    name: 'Home Spray + Soap',
    contents: '1 home & linen spray (250 ml) + 1 handmade soap, in a gift box.',
    priceCents: onlinePriceFromFairCents(3900),
    fairPriceCents: 3900,
    image: '/kits/homespray-soap.webp',
  },
];

export function findKit(id: string): KitDef | undefined {
  return KITS.find((k) => k.id === id);
}
