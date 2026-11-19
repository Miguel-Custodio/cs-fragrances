/**
 * Build-time prerender entry (not shipped to the browser). scripts/prerender.mjs calls render() for
 * every route in SITE_ROUTES and writes the HTML next to the SPA bundle, so crawlers get real
 * content, <title>, meta tags, canonical and JSON-LD without running JavaScript.
 */
import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import App from './App';
import { SITE_ROUTES } from '@/data/routes';
import { beginCollect, endCollect } from '@/lib/ssrMeta';
import { buildRobots, buildSitemap, renderHeadTags } from '@/lib/seo';

export function render(path: string) {
  beginCollect();
  const html = renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );
  const meta = endCollect();
  return { html, meta, head: meta ? renderHeadTags(meta, path) : null };
}

export const routes = SITE_ROUTES;
export const sitemapXml = () => buildSitemap(SITE_ROUTES);
export const robotsTxt = () => buildRobots();
