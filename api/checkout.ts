/**
 * Vercel Function (Node.js runtime, Web "fetch" handler): POST /api/checkout
 * All logic lives in shared/checkout.ts so it can also run on Cloudflare Pages
 * (see functions/api/checkout.ts).
 */
import { handleCheckout } from '../shared/checkout.js';

export default {
  async fetch(request: Request): Promise<Response> {
    return handleCheckout(request, process.env);
  },
};
