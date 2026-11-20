/**
 * Square checkout - portable core.
 *
 * Framework-free: takes a standard Web `Request` and returns a standard Web
 * `Response`, and receives environment variables as a plain object. Thin
 * adapters wrap it for each host:
 *   - Vercel:             api/checkout.ts
 *   - Cloudflare Pages:   functions/api/checkout.ts
 *
 * Flow: validate cart -> re-price from the server catalog (client prices are
 * ignored) -> add shipping (+ tax if enabled) -> Square CreatePaymentLink ->
 * return { url } for the browser to redirect to Square's hosted checkout.
 *
 * Square docs: https://developer.squareup.com/reference/square/checkout-api/create-payment-link
 */
import { CURRENCY } from './catalog.js';
import { COMPANY } from './company.js';
import { buildQuote, QuoteError, type QuoteInputItem } from './pricing.js';
import { resolveDestination, ShippingError, type ShippingSelection } from './shipping.js';
import { getApplicableTaxes, TAX_SHIPPING } from './tax.js';

export interface CheckoutEnv {
  [key: string]: string | undefined;
  SQUARE_ACCESS_TOKEN?: string;
  SQUARE_LOCATION_ID?: string;
  /** 'sandbox' (default) or 'production'. */
  SQUARE_ENVIRONMENT?: string;
  /** Optional override of the Square API version header. */
  SQUARE_API_VERSION?: string;
  /** Public site URL used for the post-payment redirect, e.g. https://www.csfragrances.ca */
  SITE_URL?: string;
  /** "true" to charge BC GST/PST. Default off. */
  TAX_ENABLED?: string;
  /** "true" to allow gift kits to be sold. Default off (kits are awaiting approval). */
  KITS_ENABLED?: string;
  /** "true" once the shipping rates in shared/shipping.ts are real. */
  SHIPPING_RATES_CONFIRMED?: string;
}

const DEFAULT_SQUARE_VERSION = '2026-01-22';

const SQUARE_BASE_URL = {
  sandbox: 'https://connect.squareupsandbox.com',
  production: 'https://connect.squareup.com',
} as const;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

/** Tells the browser to fall back to the WhatsApp order flow. */
function unavailable(reason: string, status = 503): Response {
  return json({ error: 'checkout_unavailable', reason, fallback: 'whatsapp' }, status);
}

interface ParsedBody {
  items: QuoteInputItem[];
  selection: ShippingSelection;
  city: string;
}

function parseBody(raw: unknown): ParsedBody {
  if (!raw || typeof raw !== 'object') throw new QuoteError('Invalid body');
  const b = raw as Record<string, unknown>;
  if (!Array.isArray(b.items) || b.items.length === 0 || b.items.length > 50) {
    throw new QuoteError('Invalid items');
  }
  const items = b.items.map((i): QuoteInputItem => {
    const it = i as Record<string, unknown>;
    if (typeof it?.id !== 'string' || typeof it?.quantity !== 'number') {
      throw new QuoteError('Invalid item');
    }
    return { id: it.id, quantity: it.quantity };
  });
  if (b.method !== 'pickup' && b.method !== 'ship') {
    throw new QuoteError('Invalid delivery method');
  }
  const postalCode = typeof b.postalCode === 'string' ? b.postalCode : '';
  const selection: ShippingSelection =
    b.method === 'pickup' ? { method: 'pickup' } : { method: 'ship', postalCode };
  try {
    resolveDestination(selection);
  } catch (err) {
    if (err instanceof ShippingError) throw new QuoteError(err.message);
    throw err;
  }
  const city = typeof b.city === 'string' ? b.city.trim().slice(0, 80) : '';
  return { items, selection, city };
}

function resolveSiteUrl(request: Request, env: CheckoutEnv): string {
  const configured = env.SITE_URL?.trim().replace(/\/+$/, '');
  if (configured) return configured;
  const origin = request.headers.get('origin');
  if (origin) return origin.replace(/\/+$/, '');
  return new URL(request.url).origin;
}

export async function handleCheckout(
  request: Request,
  env: CheckoutEnv,
  // Wrapped: on Cloudflare Workers a detached `fetch` throws "Illegal invocation".
  fetchImpl: typeof fetch = (input, init) => fetch(input, init),
): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405);
  }

  // 1. Is online payment configured at all?
  const token = env.SQUARE_ACCESS_TOKEN?.trim();
  const locationId = env.SQUARE_LOCATION_ID?.trim();
  if (!token || !locationId) return unavailable('square_not_configured');
  if (env.SHIPPING_RATES_CONFIRMED !== 'true') return unavailable('shipping_rates_not_confirmed');

  // 2. Parse + validate the cart, re-pricing from the server catalog.
  let parsed: ParsedBody;
  let quote: ReturnType<typeof buildQuote>;
  const taxEnabled = env.TAX_ENABLED === 'true';
  try {
    parsed = parseBody(await request.json());
    quote = buildQuote(parsed.items, parsed.selection, taxEnabled);
  } catch (err) {
    if (err instanceof QuoteError || err instanceof ShippingError || err instanceof SyntaxError) {
      return json({ error: 'invalid_request', message: err.message }, 400);
    }
    throw err;
  }
  if (env.KITS_ENABLED !== 'true' && quote.lines.some((l) => l.category === 'kit')) {
    return json({ error: 'invalid_request', message: 'Kits are not available yet' }, 400);
  }
  const dest = resolveDestination(parsed.selection);
  const rule = dest.rule;

  // 3. Build the Square order.
  const environment = env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
  const orderRef = `CS-${Date.now().toString(36).toUpperCase()}`;
  const siteUrl = resolveSiteUrl(request, env);
  const applicableTaxes = getApplicableTaxes(dest.zone, taxEnabled);

  const order: Record<string, unknown> = {
    location_id: locationId,
    reference_id: orderRef,
    line_items: quote.lines.map((l) => ({
      name: l.name,
      quantity: String(l.quantity),
      item_type: 'ITEM',
      base_price_money: { amount: l.unitCents, currency: CURRENCY },
    })),
  };
  if (quote.shippingCents > 0) {
    order.service_charges = [
      {
        name: `Shipping - ${rule.label}`,
        amount_money: { amount: quote.shippingCents, currency: CURRENCY },
        calculation_phase: 'SUBTOTAL_PHASE',
        taxable: taxEnabled && TAX_SHIPPING, // must be SUBTOTAL_PHASE to be taxable
      },
    ];
  }
  if (applicableTaxes.length > 0) {
    order.taxes = applicableTaxes.map((t) => ({
      uid: t.id,
      name: t.name,
      percentage: t.percentage,
      type: 'ADDITIVE',
      scope: 'ORDER',
    }));
  }

  const body = {
    idempotency_key: crypto.randomUUID(),
    order,
    checkout_options: {
      redirect_url: `${siteUrl}/order-complete?ref=${encodeURIComponent(orderRef)}`,
      merchant_support_email: COMPANY.email,
      ask_for_shipping_address: parsed.selection.method !== 'pickup',
      allow_tipping: false,
    },
    // Shipping is charged from the postal code entered in the cart (recalculated
    // here). The Square form is pre-filled to reduce a different address being typed.
    pre_populated_data:
      parsed.selection.method === 'pickup'
        ? undefined
        : {
            buyer_address: {
              country: rule.country,
              postal_code: dest.postal?.normalized,
              ...(dest.regionCode ? { administrative_district_level_1: dest.regionCode } : {}),
              ...(parsed.city ? { locality: parsed.city } : {}),
            },
          },
    payment_note: `Web order ${orderRef} | ${rule.label}${
      dest.postal ? ` | Postal: ${dest.postal.normalized}` : ''
    }${parsed.city ? ` | City: ${parsed.city}` : ''}`.slice(0, 500),
  };

  // 4. Create the payment link.
  let squareRes: Response;
  try {
    squareRes = await fetchImpl(`${SQUARE_BASE_URL[environment]}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Square-Version': env.SQUARE_API_VERSION || DEFAULT_SQUARE_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('Square request failed (network)', err instanceof Error ? err.message : err);
    return unavailable('square_unreachable', 502);
  }

  const data = (await squareRes.json().catch(() => ({}))) as {
    payment_link?: { url?: string; long_url?: string };
    errors?: Array<{ code?: string; category?: string; detail?: string }>;
  };

  const url = data.payment_link?.url || data.payment_link?.long_url;
  if (!squareRes.ok || !url) {
    // Log codes only (never the token or customer data).
    console.error(
      'Square CreatePaymentLink failed',
      squareRes.status,
      JSON.stringify((data.errors ?? []).map((e) => ({ code: e.code, category: e.category, detail: e.detail }))),
    );
    return unavailable('square_error', 502);
  }

  return json({ url, orderRef });
}
