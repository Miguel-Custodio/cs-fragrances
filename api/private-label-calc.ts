/**
 * Vercel Function (Node.js runtime, Web "fetch" handler): POST /api/private-label-calc
 * The fragrance table stays on the server; the browser only receives rounded results.
 * Logic: shared/privateLabelApi.ts (also used by functions/api/private-label-calc.ts on Cloudflare).
 */
import { handlePrivateLabelCalc } from '../shared/privateLabelApi.js';

export default {
  async fetch(request: Request): Promise<Response> {
    return handlePrivateLabelCalc(request);
  },
};
