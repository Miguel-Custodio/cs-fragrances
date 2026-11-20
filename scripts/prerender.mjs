/**
 * Build-time prerender (no paid service, works on any static host: Vercel, Cloudflare Pages, ...).
 *
 *   vite build                      -> dist/public (SPA bundle + index.html template)
 *   vite build --ssr entry-server   -> dist/server/entry-server.js
 *   node scripts/prerender.mjs      -> dist/public/<route>.html for every route (about.html, business/scent-briefing.html; NOT dir/index.html, which Cloudflare 308-redirects to /about/),
 *                                      404.html, sitemap.xml and robots.txt
 *
 * The browser still runs the normal React app (it replaces the prerendered markup), so behaviour
 * does not change; crawlers and no-JS clients get real HTML.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'dist', 'public');
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js');

// Minimal browser-storage shims: some providers read localStorage while rendering.
const memory = new Map();
globalThis.localStorage = {
  getItem: (k) => (memory.has(k) ? memory.get(k) : null),
  setItem: (k, v) => memory.set(k, String(v)),
  removeItem: (k) => memory.delete(k),
  clear: () => memory.clear(),
};

const { render, routes, sitemapXml, robotsTxt } = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');

/** Removes the default SEO tags of the template; each page gets its own block. */
function stripDefaultHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="(description|robots|twitter:[^"]+)"[\s\S]*?\/?>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[\s\S]*?\/?>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
}

const base = stripDefaultHead(template).replace('<html lang="en">', '<html lang="en-CA">');
if (!base.includes('<div id="root"></div>')) throw new Error('index.html template has no empty #root');

function page(urlPath) {
  const { html, meta, head } = render(urlPath);
  if (!meta || !head) throw new Error(`No usePageMeta() call rendered for ${urlPath}`);
  const out = base.replace('</head>', `${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return { out, meta, html };
}

const problems = [];
const written = [];

for (const route of routes) {
  const { out, meta, html } = page(route.path);
  if (/<h1[\s>]/.test(html) === false) problems.push(`${route.path}: no <h1> in prerendered HTML`);
  if (/>\s*404\s*</.test(html) && /Page Not Found/i.test(html)) problems.push(`${route.path}: renders the 404 page`);
  // Invariant: a page outside the sitemap must not be indexable, and vice versa.
  if (Boolean(meta.noindex) === route.inSitemap) {
    problems.push(`${route.path}: inSitemap=${route.inSitemap} but noindex=${Boolean(meta.noindex)}`);
  }
  if (route.path.startsWith('/business') && out.includes('[PLACEHOLDER')) {
    problems.push(`${route.path}: raw [PLACEHOLDER] text is visible; use shared/b2bConfig.ts`);
  }
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(publicDir, file)), { recursive: true });
  fs.writeFileSync(path.join(publicDir, file), out);
  written.push(route.path);
}

// Real 404 page (served with status 404 by Vercel and Cloudflare Pages when no route matches).
fs.writeFileSync(path.join(publicDir, '404.html'), page('/404').out);

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml());
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt());

// Guard: nothing about the unauthorized supplier brands may ship (SCENTEC_BRANDING_ENABLED must stay off).
const forbidden = /scentec|\bIFF\b|scentwellness|regal/i;
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
for (const file of walk(publicDir)) {
  if (!/\.(html|js|css|xml|txt|json)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (forbidden.test(text)) problems.push(`${path.relative(publicDir, file)}: contains a forbidden supplier name`);
}

if (problems.length) {
  console.error('\nPrerender check failed:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log(`Prerendered ${written.length} routes + 404.html, sitemap.xml, robots.txt`);
