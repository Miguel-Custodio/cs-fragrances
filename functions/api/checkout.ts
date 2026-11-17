/**
 * Cloudflare Pages Function: POST /api/checkout
 * Only used if the site moves from Vercel to Cloudflare Pages (Vercel ignores
 * this folder). Env vars are set in the Cloudflare Pages dashboard.
 * All logic lives in shared/checkout.ts.
 */
import { handleCheckout, type CheckoutEnv } from '../../shared/checkout.js';

interface Context {
  request: Request;
  env: CheckoutEnv;
}

export const onRequest = ({ request, env }: Context): Promise<Response> =>
  handleCheckout(request, env);
