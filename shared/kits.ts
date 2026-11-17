/**
 * Gift kits (Christmas). Hidden behind the KITS_ENABLED flag until Raquel / Miguel approve.
 *
 * priceCents:
 *   - number -> confirmed ONLINE price; the kit can be bought.
 *   - null   -> TODO: online price not confirmed yet; the kit is shown as
 *               "price to be confirmed" and CANNOT be added to the cart or sold
 *               through checkout (it is not in the server catalog).
 * fairPriceCents is the in-person (fair / pop-up) price, kept ONLY as a reference
 * for whoever sets the online price. It is never shown or charged.
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
    priceCents: null, // TODO confirm online price
    fairPriceCents: 1500,
    image: '/kits/sachet-soap.webp',
  },
  {
    id: 'kit-two-candles',
    name: '2 Candles',
    contents: '2 Limited Christmas Edition glass candles.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 1500,
    image: '/kits/two-candles.webp',
  },
  {
    id: 'kit-five-sachets',
    name: '5 Sachets',
    contents: '5 scented sachets (30 g each).',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 2500,
    image: null, // TODO no real photo of this bundle yet
  },
  {
    id: 'kit-five-wax-ornaments',
    name: '5 Wax Ornaments',
    contents: '5 scented wax hanging ornaments.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3000,
    image: '/kits/five-wax-ornaments.webp',
  },
  {
    id: 'kit-three-decorative-soaps',
    name: '3 Decorative Soaps',
    contents: '3 decorative Christmas soaps.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3400,
    image: '/kits/three-decorative-soaps.webp',
  },
  {
    id: 'kit-homespray-sachet',
    name: 'Home Spray + Sachet',
    contents: '1 home & linen spray (250 ml) + 1 scented sachet (30 g), in a gift box.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3500,
    image: '/kits/homespray-sachet.webp',
  },
  {
    id: 'kit-four-soaps-one-free',
    name: '4 Soaps + 1 Free',
    contents: 'Buy 4 handmade soaps and get a 5th one free (5 soaps in total).',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3900,
    image: null, // TODO no real photo of this bundle yet
  },
  {
    id: 'kit-perfume-soap',
    name: 'Perfume + Soap',
    contents: '1 perfume (50 ml, your choice of scent) + 1 handmade soap.',
    // Online price confirmed by Miguel: ~CAD 75.00 (perfume is 69.90 online; fair price 65.00).
    priceCents: 7500,
    fairPriceCents: 6500,
    // PROVISIONAL photo: shows the perfume with the CS gift bag and pouch (no soap in the shot).
    // The only perfume + soap kit photos are Valentine's-branded. TODO replace with a Christmas photo.
    image: '/kits/perfume-soap.webp',
    option: { label: 'Perfume', values: PERFUME_CHOICES },
  },
  {
    id: 'kit-bodymist-sachet',
    name: 'Body Mist + Sachet',
    contents: '1 body mist (100 ml) + 1 scented sachet (30 g), in a gift box.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3200,
    image: '/kits/bodymist-sachet.webp',
  },
  {
    id: 'kit-bodymist-soap',
    name: 'Body Mist + Soap',
    contents: '1 body mist (100 ml) + 1 handmade soap, in a gift box.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3500,
    image: '/kits/bodymist-soap.webp',
  },
  {
    id: 'kit-homespray-soap',
    name: 'Home Spray + Soap',
    contents: '1 home & linen spray (250 ml) + 1 handmade soap, in a gift box.',
    priceCents: null, // TODO confirm online price
    fairPriceCents: 3900,
    image: '/kits/homespray-soap.webp',
  },
];

export function findKit(id: string): KitDef | undefined {
  return KITS.find((k) => k.id === id);
}
