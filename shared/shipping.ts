/**
 * Shipping configuration.
 *
 * ============================================================================
 * TODO (Miguel): ALL VALUES BELOW ARE PLACEHOLDERS - NOT REAL PRICES.
 * They only exist so the cart and checkout can be built and tested.
 * Replace them, then set SHIPPING_RATES_CONFIRMED=true in the host's
 * environment variables. While that variable is not "true" the server refuses
 * to create Square payment links and the cart falls back to a WhatsApp order,
 * so placeholder rates can never be charged to a real customer by accident.
 * ============================================================================
 */

export type DeliveryOption = 'pickup' | 'bc' | 'canada' | 'usa';

export interface DeliveryRule {
  id: DeliveryOption;
  /** Label shown in the cart. */
  label: string;
  /** Short helper text under the selector. */
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

export const DELIVERY_RULES: readonly DeliveryRule[] = [
  {
    id: 'pickup',
    label: 'Local pickup (free)',
    hint: 'Pickup location and time are confirmed by email/WhatsApp after your order.',
    country: 'CA',
    rateCents: 0, // pickup is always free
    freeOverCents: null,
  },
  {
    id: 'bc',
    label: 'Delivery - Lower Mainland / BC',
    hint: 'Delivery within British Columbia.',
    country: 'CA',
    rateCents: 800, // TODO placeholder CAD 8.00
    freeOverCents: 12000, // TODO placeholder: free from CAD 120.00
  },
  {
    id: 'canada',
    label: 'Delivery - Rest of Canada',
    hint: 'Delivery to any other Canadian province or territory.',
    country: 'CA',
    rateCents: 1500, // TODO placeholder CAD 15.00
    freeOverCents: 15000, // TODO placeholder: free from CAD 150.00
  },
  {
    id: 'usa',
    label: 'Delivery - United States',
    hint: 'Delivery to the United States. Duties/import taxes may apply.',
    country: 'US',
    rateCents: 2500, // TODO placeholder CAD 25.00
    freeOverCents: null, // TODO placeholder: no free shipping to the US yet
  },
];

export const DEFAULT_DELIVERY_OPTION: DeliveryOption = 'bc';

export function getDeliveryRule(id: string): DeliveryRule | undefined {
  return DELIVERY_RULES.find((r) => r.id === id);
}

export interface ShippingResult {
  cents: number;
  free: boolean;
}

export function calcShipping(option: DeliveryOption, subtotalCents: number): ShippingResult {
  const rule = getDeliveryRule(option);
  if (!rule) throw new Error(`Unknown delivery option: ${option}`);
  if (option === 'pickup' || rule.rateCents === 0) return { cents: 0, free: true };
  if (rule.freeOverCents !== null && subtotalCents >= rule.freeOverCents) {
    return { cents: 0, free: true };
  }
  return { cents: rule.rateCents, free: false };
}
