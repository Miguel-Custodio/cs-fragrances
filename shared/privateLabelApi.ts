/**
 * Private label calculator - portable core (Web Request in, Web Response out).
 *   - Vercel:           api/private-label-calc.ts
 *   - Cloudflare Pages: functions/api/private-label-calc.ts
 * POST { kg: number, quantities: { [productId]: number } } -> { ok: true, result } with no gram figures.
 * The fragrance table stays on the server. No env vars, no storage, no paid service.
 */
import { computeBatch, toPublic } from './privateLabelCalc.js';
import { PRIVATE_LABEL_PRODUCTS } from './privateLabelCatalog.js';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const MAX_BODY = 4000;
const MAX_KG = 1000;
const MAX_UNITS = 1_000_000;

const reply = (status: number, body: unknown, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...JSON_HEADERS, ...extra } });

export async function handlePrivateLabelCalc(request: Request): Promise<Response> {
  if (request.method !== 'POST') return reply(405, { ok: false, error: 'Use POST.' }, { allow: 'POST' });
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return reply(400, { ok: false, error: 'Invalid request.' });
  }
  if (raw.length > MAX_BODY) return reply(413, { ok: false, error: 'Request too large.' });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, { ok: false, error: 'Invalid JSON.' });
  }
  const b = body as { kg?: unknown; quantities?: unknown };
  const kg = typeof b?.kg === 'number' ? b.kg : Number(b?.kg);
  if (!Number.isFinite(kg) || kg < 0 || kg > MAX_KG) return reply(400, { ok: false, error: 'Invalid kg.' });
  if (typeof b.quantities !== 'object' || b.quantities === null || Array.isArray(b.quantities)) {
    return reply(400, { ok: false, error: 'Invalid quantities.' });
  }
  const input = b.quantities as Record<string, unknown>;
  const quantities: Record<string, number> = {};
  for (const p of PRIVATE_LABEL_PRODUCTS) {
    const v = Number(input[p.id] ?? 0);
    quantities[p.id] = Number.isFinite(v) ? Math.min(MAX_UNITS, Math.max(0, Math.floor(v))) : 0;
  }
  return reply(200, { ok: true, result: toPublic(computeBatch(kg, quantities)) });
}
