import type { SiteRoute } from '@/lib/seo';
import { BUSINESS_PAGES } from '@/data/business';
import { CATEGORY_GROUPS } from '@/data/products';
import { POLICIES } from '@/data/policies';
import { KITS_ENABLED } from '@/lib/flags';

/**
 * Every public route of the site. This is the single list behind:
 *  - sitemap.xml (only routes with inSitemap: true),
 *  - the build-time prerender (one static HTML file per path),
 *  - the build check that "not in sitemap" means "noindex".
 *
 * When you add a <Route> in App.tsx, add it here too (shared/routes.test.ts checks that every
 * route here renders a real page, not the 404).
 */
export const SITE_ROUTES: SiteRoute[] = [
  { path: '/', inSitemap: true },
  { path: '/about', inSitemap: true },
  { path: '/ingredients', inSitemap: true },
  { path: '/business', inSitemap: true },
  ...BUSINESS_PAGES.map((p) => ({ path: p.path, inSitemap: p.inSitemap })),
  // Briefing form (first step of scent for a space): indexed, see Marketing v3 C2/C3.
  { path: '/business/scent-briefing', inSitemap: true },
  { path: '/business/barbershop-case-study', inSitemap: true },
  // Conversion pages: reachable by link, but thin content, so noindex and not in the sitemap.
  { path: '/business/request-quote', inSitemap: false },
  { path: '/business/request-samples', inSitemap: false },
  { path: '/shop', inSitemap: true },
  ...CATEGORY_GROUPS.map((g) => ({ path: `/shop/${g.slug}`, inSitemap: true })),
  ...POLICIES.map((d) => ({ path: d.path, inSitemap: true })),
  // /kits exists only when the kits are approved (VITE_KITS_ENABLED=true).
  ...(KITS_ENABLED ? [{ path: '/kits', inSitemap: true }] : []),
  { path: '/order-complete', inSitemap: false },
];

/** Paths that are redirected (see vercel.json and client/public/_redirects). */
export const REDIRECTS: Record<string, string> = {
  '/b2b': '/business',
  '/b2b/': '/business',
};
