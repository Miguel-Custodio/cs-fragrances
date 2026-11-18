/**
 * Tax configuration (British Columbia).
 *
 * Taxes are OFF by default. Miguel still has to confirm whether the business
 * is registered for GST/PST. Under CRA rules a business that is NOT registered
 * for GST must not charge GST, so nothing is shown or charged until the flag is
 * switched on:
 *   - server:  TAX_ENABLED=true        (checkout function)
 *   - browser: VITE_TAX_ENABLED=true   (cart display; build-time variable)
 * Both must be set to the same value. The server is authoritative: Square
 * calculates the real tax from the percentages we send.
 */
import { isBcTaxZone, type ShippingZoneId } from './shipping.js';

export interface TaxRate {
  id: 'gst' | 'pst';
  name: string;
  /** Percentage as a string, the format Square expects (e.g. "5"). */
  percentage: string;
}

export const BC_TAXES: readonly TaxRate[] = [
  { id: 'gst', name: 'GST', percentage: '5' },
  { id: 'pst', name: 'PST', percentage: '7' },
];

/**
 * TODO (Miguel / accountant) - used only when taxes are enabled:
 *  - Orders to other provinces (HST/GST/QST rates), and US orders, are NOT
 *    configured: no tax is added for them. Confirm what applies.
 *  - Confirm whether PST applies to every product (perfume, soap, kits).
 *  - Confirm whether shipping charges are taxable.
 */
export const TAX_SHIPPING = true; // TODO confirm

export interface TaxLine {
  id: string;
  name: string;
  percentage: string;
  amountCents: number;
}

export function getApplicableTaxes(zone: ShippingZoneId, taxEnabled: boolean): readonly TaxRate[] {
  if (!taxEnabled) return [];
  return isBcTaxZone(zone) ? BC_TAXES : [];
}

export function calcTaxes(
  zone: ShippingZoneId,
  taxableBaseCents: number,
  taxEnabled: boolean,
): TaxLine[] {
  return getApplicableTaxes(zone, taxEnabled).map((t) => ({
    id: t.id,
    name: t.name,
    percentage: t.percentage,
    amountCents: Math.round((taxableBaseCents * Number(t.percentage)) / 100),
  }));
}
