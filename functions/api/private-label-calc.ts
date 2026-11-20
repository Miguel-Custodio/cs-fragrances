/**
 * Cloudflare Pages Function: POST /api/private-label-calc
 * Only used if the site moves to Cloudflare Pages (Vercel ignores this folder). No env vars needed.
 * Logic: shared/privateLabelApi.ts.
 */
import { handlePrivateLabelCalc } from '../../shared/privateLabelApi.js';

export const onRequest = ({ request }: { request: Request }): Promise<Response> => handlePrivateLabelCalc(request);
