/**
 * Shared SEO helpers. Used by the usePageMeta hook (browser) and by the build-time prerender
 * (entry-server.tsx -> scripts/prerender.mjs), so both produce the same tags.
 */
import { COMPANY } from '@shared/company';
import { B2B_CONFIG } from '@shared/b2bConfig';

export const SITE_NAME = 'CS Fragrances';
export const SITE_URL = 'https://www.csfragrances.ca';
export const DEFAULT_OG_IMAGE = '/images/Studio_4 Fragrances.webp';
export const DEFAULT_OG_ALT = 'CS Horizon, CS Enigma, CS Her and CS Origin eau de parfum bottles';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type PageMeta = {
  title: string;
  description: string;
  /** Path beginning with /, used for canonical, og:url and twitter tags. */
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  noindex?: boolean;
  /** One schema.org node, an array of nodes, or an object with @graph. */
  jsonLd?: unknown;
};

export function absoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const p = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${encodeURI(decodeURI(p))}`;
}

export function pageTitle(title: string): string {
  return title === SITE_NAME || title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

type Node = Record<string, unknown>;

/** Sitewide Organization / LocalBusiness node. Street address only when the config allows it. */
export function organizationNode(): Node {
  const address: Node = {
    '@type': 'PostalAddress',
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.regionCode,
    addressCountry: COMPANY.countryCode,
  };
  if (B2B_CONFIG.publicAddressEnabled) {
    address.streetAddress = COMPANY.addressLine;
    address.postalCode = COMPANY.postalCode;
  }
  const sameAs = ['https://instagram.com/bycsfragrances'];
  if (B2B_CONFIG.googleBusinessProfileUrl) sameAs.push(B2B_CONFIG.googleBusinessProfileUrl);
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: `${SITE_URL}/`,
    email: COMPANY.email,
    telephone: '+1-604-518-6863',
    description:
      'Family-owned maker of artisanal perfumes, shea butter soaps, body mists and home sprays, handcrafted in small batches in British Columbia, Canada.',
    address,
    areaServed: [
      { '@type': 'City', name: 'Vancouver' },
      { '@type': 'AdministrativeArea', name: 'Lower Mainland, British Columbia' },
    ],
    founder: [
      { '@type': 'Person', name: 'Miguel Custodio' },
      { '@type': 'Person', name: 'Ana Raquel Soncin' },
    ],
    sameAs,
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'en-CA',
    publisher: { '@id': ORG_ID },
  };
}

function toNodes(input: unknown): Node[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.flatMap(toNodes);
  const obj = input as Node;
  if (Array.isArray(obj['@graph'])) return toNodes(obj['@graph']);
  const { ['@context']: _ctx, ...rest } = obj;
  return [rest];
}

/** One @graph with the sitewide nodes plus the page nodes (page nodes win on equal @id). */
export function buildGraph(pageLd?: unknown) {
  const page = toNodes(pageLd);
  const pageIds = new Set(page.map((n) => n['@id']).filter(Boolean));
  const site = [organizationNode(), websiteNode()].filter((n) => !pageIds.has(n['@id']));
  return { '@context': 'https://schema.org', '@graph': [...site, ...page] };
}

export function breadcrumbNode(items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === '/' ? '/' : it.path}`,
    })),
  };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Safe JSON for an inline <script>: no </script> breakout. */
const jsonForScript = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Full <head> SEO block (title, description, robots, canonical, OG, Twitter, JSON-LD) as HTML. */
export function renderHeadTags(meta: PageMeta, fallbackPath: string): string {
  const title = pageTitle(meta.title);
  const path = meta.path ?? fallbackPath;
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const image = absoluteUrl(meta.ogImage ?? DEFAULT_OG_IMAGE);
  const imageAlt = meta.ogImageAlt ?? (meta.ogImage ? undefined : DEFAULT_OG_ALT);
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
  ];
  if (meta.noindex) lines.push('<meta name="robots" content="noindex, follow" />');
  lines.push(
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:type" content="${esc(meta.ogType ?? 'website')}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
  );
  if (imageAlt) lines.push(`<meta property="og:image:alt" content="${esc(imageAlt)}" />`);
  lines.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  );
  if (imageAlt) lines.push(`<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`);
  lines.push(
    `<script type="application/ld+json" id="page-jsonld">${jsonForScript(buildGraph(meta.jsonLd))}</script>`,
  );
  return lines.map((l) => `    ${l}`).join('\n');
}

/* ---------- sitemap and robots ---------- */

export interface SiteRoute {
  path: string;
  /** Listed in sitemap.xml. Everything not listed must be noindex (checked at build time). */
  inSitemap: boolean;
  /** Written as <path>/index.html (true) or only used for the 404 page (false). */
  prerender?: boolean;
}

export function buildSitemap(routes: SiteRoute[]): string {
  const urls = routes
    .filter((r) => r.inSitemap)
    .map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function buildRobots(): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /order-complete',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
}
