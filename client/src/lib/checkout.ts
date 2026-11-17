import type { CartItem } from '@/contexts/CartContext';
import { buildQuote, type Quote } from '@shared/pricing';
import type { DeliveryOption } from '@shared/shipping';
import { TAX_ENABLED } from '@/lib/flags';

export function quoteForCart(items: CartItem[], option: DeliveryOption): Quote | null {
  if (items.length === 0) return null;
  try {
    return buildQuote(
      items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
      option,
      TAX_ENABLED,
    );
  } catch {
    return null;
  }
}

export type CheckoutResult =
  | { kind: 'redirect'; url: string }
  | { kind: 'fallback'; reason: string };

/**
 * Asks the server to create a Square payment link. Any failure (not configured,
 * 404 in local dev, network, Square error) resolves to `fallback`, which makes
 * the cart offer the WhatsApp order instead.
 */
export async function startCheckout(
  items: CartItem[],
  option: DeliveryOption,
  city: string,
): Promise<CheckoutResult> {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
        option,
        city,
      }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.url && typeof data.url === 'string') {
      return { kind: 'redirect', url: data.url };
    }
    return { kind: 'fallback', reason: data?.reason ?? `http_${res.status}` };
  } catch {
    return { kind: 'fallback', reason: 'network' };
  }
}
