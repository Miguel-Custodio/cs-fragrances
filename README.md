# CS Fragrances website

Vite + React 18 + TypeScript, wouter, Tailwind 4, shadcn/ui. Package manager: **pnpm**.

```bash
pnpm install
pnpm dev        # local dev server (no /api here: checkout falls back to WhatsApp)
pnpm check      # type-check
pnpm test       # unit tests (pricing, shipping, tax, checkout function)
pnpm build      # static site -> dist/public
```

## Where things live

| What | File |
| --- | --- |
| Prices (single source of truth, integer cents CAD) | `shared/catalog.ts` |
| Product catalog by category (storefront data) | `client/src/data/products.ts`, pages `client/src/pages/Shop.tsx` (`/shop`, `/shop/:category`) |
| Gift kits (hidden behind a flag) | `shared/kits.ts`, `client/src/pages/Kits.tsx` |
| Shipping rates / free-shipping rules (**placeholders - TODO**) | `shared/shipping.ts` |
| GST 5% / PST 7% (OFF by default) | `shared/tax.ts` |
| Square checkout (portable core) | `shared/checkout.ts` |
| Vercel adapter | `api/checkout.ts` |
| Cloudflare Pages adapter | `functions/api/checkout.ts` |
| WhatsApp fallback message | `shared/whatsapp.ts` |
| Policy pages (English drafts, with `[PLACEHOLDER]`s) | `client/src/data/policies.ts` |

## Checkout (Square)

1. The cart (`client/src/components/Cart.tsx`) shows subtotal, shipping, and (only if enabled) taxes.
2. "Proceed to Checkout" calls `POST /api/checkout` with item ids + quantities, the delivery option and city.
   **Prices are never taken from the browser**: the server re-prices every line from `shared/catalog.ts`.
3. The function creates a Square **payment link** (Checkout API `CreatePaymentLink`, order with `line_items`,
   a shipping `service_charge`, optional `taxes`) and returns its URL; the browser redirects to Square's hosted page.
   After payment Square sends the customer to `/order-complete`.
4. If Square is not configured, shipping rates are not confirmed, or Square errors, the cart shows a
   pre-filled **WhatsApp order** button (`https://wa.me/16045186863`) instead.

### Environment variables

See `.env.example`. Secrets are set only in the host's dashboard, never in git.

| Variable | Where | Meaning |
| --- | --- | --- |
| `SQUARE_ACCESS_TOKEN` | server | Square access token (sandbox for Preview, production for Production) |
| `SQUARE_LOCATION_ID` | server | Square location id |
| `SQUARE_ENVIRONMENT` | server | `sandbox` (default) or `production` |
| `SITE_URL` | server | e.g. `https://www.csfragrances.ca` (post-payment redirect) |
| `SHIPPING_RATES_CONFIRMED` | server | must be `true` before real payment links are created |
| `TAX_ENABLED` / `VITE_TAX_ENABLED` | server / build | `true` to charge BC GST+PST (keep `false` until GST/PST registration is confirmed) |
| `KITS_ENABLED` / `VITE_KITS_ENABLED` | server / build | `true` to show `/kits` and allow kit sales |

`VITE_*` variables are baked in at build time, so redeploy after changing them.

### Testing with Square Sandbox

1. Square Developer Dashboard -> create an application -> copy the **Sandbox** access token and sandbox location id.
2. On Vercel, set them for the **Preview** environment only, with `SQUARE_ENVIRONMENT=sandbox` and
   `SHIPPING_RATES_CONFIRMED=true` (placeholder rates are fine for testing).
3. Open the preview URL, add items, click "Proceed to Checkout", pay with a Square sandbox test card.
4. For Production use the production token/location, `SQUARE_ENVIRONMENT=production`, real shipping rates.

## Hosting

### Option A - Vercel (current)

`vercel.json` serves the SPA and keeps `/api/*` for the function (`api/checkout.ts`, Node.js runtime, Web `fetch`
handler). Pushing to `master` deploys automatically. Note: Vercel's free Hobby plan is for non-commercial use;
a store requires Pro (see the PR description).

### Option B - Cloudflare Pages (free tier)

1. Cloudflare Pages -> Create project -> connect the GitHub repo.
2. Build command `pnpm build`, output directory `dist/public`, Node 20+.
3. Add the environment variables above under Settings -> Variables and Secrets.
4. `functions/api/checkout.ts` is picked up automatically as `/api/checkout`; Pages serves `index.html`
   for unknown routes (SPA). The core logic (`shared/checkout.ts`) uses only Web-standard APIs
   (`Request`, `Response`, `fetch`, `crypto.randomUUID`), so it runs unchanged on Workers.
5. In GoDaddy, point the domain to Cloudflare (change nameservers, or add the CNAME Cloudflare gives you).
