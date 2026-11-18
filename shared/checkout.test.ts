import { describe, expect, it, vi } from 'vitest';
import { handleCheckout, type CheckoutEnv } from './checkout.js';

const env: CheckoutEnv = {
  SQUARE_ACCESS_TOKEN: 'test-token',
  SQUARE_LOCATION_ID: 'LOC123',
  SQUARE_ENVIRONMENT: 'sandbox',
  SITE_URL: 'https://example.test',
  SHIPPING_RATES_CONFIRMED: 'true',
};

const post = (body: unknown) =>
  new Request('https://example.test/api/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

const okSquare = () =>
  vi.fn(async () =>
    new Response(JSON.stringify({ payment_link: { url: 'https://square.link/u/ABC' } }), { status: 200 }),
  ) as unknown as typeof fetch;

describe('handleCheckout', () => {
  it('falls back when Square is not configured', async () => {
    const res = await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship', postalCode: 'V4N 6Y1' }), {});
    expect(res.status).toBe(503);
    expect((await res.json()).fallback).toBe('whatsapp');
  });

  it('falls back while shipping rates are not confirmed', async () => {
    const res = await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship', postalCode: 'V4N 6Y1' }), {
      ...env,
      SHIPPING_RATES_CONFIRMED: undefined,
    });
    expect(res.status).toBe(503);
  });

  it('ignores client prices and builds the Square order from the server catalog', async () => {
    const fetchMock = okSquare();
    const res = await handleCheckout(
      post({ items: [{ id: 'cs-her', quantity: 2, price: 0.01, priceCents: 1 }], method: 'ship', postalCode: 'M5V 2T6', city: 'Toronto' }),
      env,
      fetchMock,
    );
    expect(res.status).toBe(200);
    expect((await res.json()).url).toBe('https://square.link/u/ABC');

    const [url, init] = (fetchMock as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://connect.squareupsandbox.com/v2/online-checkout/payment-links');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-token');
    const sent = JSON.parse(init.body as string);
    expect(sent.order.location_id).toBe('LOC123');
    expect(sent.order.line_items[0].base_price_money).toEqual({ amount: 6990, currency: 'CAD' });
    expect(sent.order.line_items[0].quantity).toBe('2');
    expect(sent.order.service_charges[0].amount_money.currency).toBe('CAD');
    expect(sent.order.taxes).toBeUndefined(); // taxes are off by default
    expect(sent.checkout_options.ask_for_shipping_address).toBe(true);
  });

  it('adds taxes only when TAX_ENABLED=true', async () => {
    const fetchMock = okSquare();
    await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship', postalCode: 'V4N 6Y1' }), { ...env, TAX_ENABLED: 'true' }, fetchMock);
    const sent = JSON.parse(((fetchMock as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit])[1].body as string);
    expect(sent.order.taxes.map((t: { name: string }) => t.name)).toEqual(['GST', 'PST']);
  });

  it('uses the production host only when SQUARE_ENVIRONMENT=production', async () => {
    const fetchMock = okSquare();
    await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'pickup' }), { ...env, SQUARE_ENVIRONMENT: 'production' }, fetchMock);
    expect(((fetchMock as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [string])[0]).toContain('https://connect.squareup.com/');
  });

  it('rejects kits while KITS_ENABLED is not true', async () => {
    const body = { items: [{ id: 'kit-perfume-soap:cs-her', quantity: 1 }], method: 'ship', postalCode: 'V4N 6Y1' };
    expect((await handleCheckout(post(body), env, okSquare())).status).toBe(400);
    expect((await handleCheckout(post(body), { ...env, KITS_ENABLED: 'true' }, okSquare())).status).toBe(200);
  });

  it('rejects unknown products and malformed bodies', async () => {
    expect((await handleCheckout(post({ items: [{ id: 'x', quantity: 1 }], method: 'ship', postalCode: 'V4N 6Y1' }), env, okSquare())).status).toBe(400);
    expect((await handleCheckout(post({ nope: true }), env, okSquare())).status).toBe(400);
    expect((await handleCheckout(new Request('https://example.test/api/checkout'), env)).status).toBe(405);
  });

  it('falls back when Square returns an error', async () => {
    const failing = vi.fn(async () => new Response(JSON.stringify({ errors: [{ code: 'UNAUTHORIZED' }] }), { status: 401 })) as unknown as typeof fetch;
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship', postalCode: 'V4N 6Y1' }), env, failing);
    expect(res.status).toBe(502);
    expect((await res.json()).fallback).toBe('whatsapp');
    spy.mockRestore();
  });

  it('recalculates shipping from the postal code and pre-fills Square', async () => {
    const fetchMock = okSquare();
    const res = await handleCheckout(
      post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship', postalCode: 'v4n6y1', city: 'Surrey' }),
      env,
      fetchMock,
    );
    expect(res.status).toBe(200);
    const sent = JSON.parse(((fetchMock as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit])[1].body as string);
    expect(sent.order.service_charges[0].amount_money).toEqual({ amount: 800, currency: 'CAD' });
    expect(sent.pre_populated_data.buyer_address).toEqual({
      country: 'CA',
      postal_code: 'V4N 6Y1',
      administrative_district_level_1: 'BC',
      locality: 'Surrey',
    });
    expect(sent.payment_note).toContain('Postal: V4N 6Y1');
  });

  it('rejects shipment without a valid postal code', async () => {
    expect((await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship', postalCode: 'nope' }), env, okSquare())).status).toBe(400);
    expect((await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'ship' }), env, okSquare())).status).toBe(400);
    expect((await handleCheckout(post({ items: [{ id: 'cs-her', quantity: 1 }], method: 'drone' }), env, okSquare())).status).toBe(400);
  });
});
