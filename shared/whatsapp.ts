import { formatCad } from './catalog.js';
import { getDeliveryRule } from './shipping.js';
import { WHATSAPP_BASE_URL } from './company.js';
import type { Quote } from './pricing.js';

/**
 * Pre-filled WhatsApp order message, used when online payment (Square) is not
 * configured or fails.
 */
export function buildWhatsAppOrderUrl(quote: Quote, option: string, city: string): string {
  const rule = getDeliveryRule(option);
  const lines = [
    'Hello CS Fragrances! I would like to place an order:',
    '',
    ...quote.lines.map(
      (l) => `- ${l.quantity} x ${l.name} @ ${formatCad(l.unitCents)} = ${formatCad(l.totalCents)}`,
    ),
    '',
    `Subtotal: ${formatCad(quote.subtotalCents)}`,
    `Delivery: ${rule?.label ?? option}`,
    `Shipping: ${quote.shippingFree ? 'Free' : formatCad(quote.shippingCents)}`,
    ...quote.taxes.map((t) => `${t.name} (${t.percentage}%): ${formatCad(t.amountCents)}`),
    `Total: ${formatCad(quote.totalCents)}`,
    `City: ${city.trim() || '(please ask me)'}`,
    '',
    'Please confirm availability and how to pay. Thank you!',
  ];
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
}
