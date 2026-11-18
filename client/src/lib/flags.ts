/**
 * Build-time feature flags (Vite env vars; set in Vercel / Cloudflare Pages and rebuild).
 *
 * VITE_KITS_ENABLED=true  -> shows the /kits page and its links. OFF until Raquel/Miguel approve.
 *   (The server also needs KITS_ENABLED=true before it accepts kits in checkout.)
 * VITE_TAX_ENABLED=true   -> shows/charges BC GST+PST. OFF until Miguel confirms GST/PST registration.
 *   (The server also needs TAX_ENABLED=true.)
 */
export const KITS_ENABLED = import.meta.env.VITE_KITS_ENABLED === 'true';
export const TAX_ENABLED = import.meta.env.VITE_TAX_ENABLED === 'true';

/**
 * VITE_SCENTEC_BRANDING_ENABLED=true -> the For Business pages may name Scentec and IFF.
 * OFF until Raquel has WRITTEN authorization to use their names/logos. Never show a logo.
 */
export const SCENTEC_BRANDING_ENABLED = import.meta.env.VITE_SCENTEC_BRANDING_ENABLED === 'true';
