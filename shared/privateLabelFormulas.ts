/**
 * Private label: grams of FRAGRANCE (oil) used per unit of each product. Single source of truth for the
 * batch calculator. Source: CS Ops table fragrancia-por-unidade-private-label.md, from Miguel's formulas of
 * 19/11/2026 (Custos_e_Formulas_CS_Fragrances.xlsx). Assumptions: 1 g = 1 ml, percentages by weight.
 *
 * Never put costs or prices here. `confirmed: false` means the value is only an EXAMPLE: the calculator
 * shows an "Example values" notice while any unconfirmed product is listed.
 * `listed: false` keeps a product out of the public calculator (used for unconfirmed products until CS Ops confirms).
 */
export interface PrivateLabelProduct {
  id: string;
  name: string;
  /** Short size text shown next to the name, e.g. "50 ml". */
  unit: string;
  /** Fragrance concentration, % by weight (informational; the calculator uses gramsPerUnit). */
  percent: number;
  /** Grams of fragrance per unit. */
  gramsPerUnit: number;
  confirmed: boolean;
  /** Optional short note shown under the name. */
  note?: string;
  /** Shown in the public calculator. */
  listed: boolean;
}

export const PRIVATE_LABEL_PRODUCTS: PrivateLabelProduct[] = [
  { id: 'edp', name: 'Eau de parfum', unit: '50 ml', percent: 20, gramsPerUnit: 10, confirmed: true, listed: true },
  {
    id: 'edp-30',
    name: 'Eau de parfum, stronger concentration',
    unit: '50 ml',
    percent: 30,
    gramsPerUnit: 15,
    confirmed: true,
    note: 'Some fragrances (like CS Horizon) are made at a higher concentration.',
    listed: true,
  },
  { id: 'body-mist', name: 'Body mist', unit: '100 ml', percent: 6, gramsPerUnit: 6, confirmed: true, listed: true },
  { id: 'home-spray', name: 'Home and linen spray', unit: '250 ml', percent: 5, gramsPerUnit: 12.5, confirmed: true, listed: true },
  { id: 'bar-soap', name: 'Bar soap', unit: '100 g', percent: 3, gramsPerUnit: 3, confirmed: true, listed: true },
  { id: 'ornament-soap', name: 'Ornament soap', unit: '60 g average', percent: 3, gramsPerUnit: 1.8, confirmed: true, listed: true },
  { id: 'sachet', name: 'Scented sachet', unit: '30 g', percent: 10, gramsPerUnit: 3, confirmed: true, listed: true },
  { id: 'wax-melt', name: 'Wax melt', unit: '35 g average', percent: 6, gramsPerUnit: 2.1, confirmed: true, listed: true },
  { id: 'candle', name: 'Candle in a glass jar', unit: '100 g', percent: 6, gramsPerUnit: 6, confirmed: true, listed: true },
  // Pending confirmation by CS Ops: hidden from the public calculator until confirmed (then set confirmed: true, listed: true).
  { id: 'decorated-soap', name: 'Decorated seasonal soap', unit: 'size to confirm', percent: 3, gramsPerUnit: 1.8, confirmed: false, note: 'Example value', listed: false },
  { id: 'sample-2ml', name: 'Perfume sample', unit: '2 ml', percent: 20, gramsPerUnit: 0.4, confirmed: false, note: 'Example value (if it follows the eau de parfum formula)', listed: false },
];

export const listedProducts = (products: PrivateLabelProduct[] = PRIVATE_LABEL_PRODUCTS) => products.filter((p) => p.listed);

/** True when any product shown in the calculator still has an example (unconfirmed) value. */
export const hasUnconfirmedListed = (products: PrivateLabelProduct[] = PRIVATE_LABEL_PRODUCTS) =>
  listedProducts(products).some((p) => !p.confirmed);
