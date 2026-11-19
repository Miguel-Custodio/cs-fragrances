import { useEffect } from 'react';

import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_ALT,
  absoluteUrl,
  buildGraph,
  pageTitle as resolveTitle,
  type PageMeta,
} from '@/lib/seo';
import { recordPageMeta } from '@/lib/ssrMeta';

export { SITE_NAME, SITE_URL };

export type PageMetaOpts = {
  noindex?: boolean;
  /** Path beginning with /, used for canonical, og:url and twitter tags. Defaults to the current path. */
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  jsonLd?: unknown;
};

function upsertNamedMeta(name: string, content: string): () => void {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  const created = !el;
  const prev = el?.getAttribute('content');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (created) el!.remove();
    else if (prev === null) el!.removeAttribute('content');
    else if (prev !== undefined) el!.setAttribute('content', prev);
  };
}

function upsertPropMeta(property: string, content: string): () => void {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  const created = !el;
  const prev = el?.getAttribute('content');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (created) el!.remove();
    else if (prev === null) el!.removeAttribute('content');
    else if (prev !== undefined) el!.setAttribute('content', prev);
  };
}

function upsertCanonical(href: string): () => void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const created = !el;
  const prev = el?.getAttribute('href');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return () => {
    if (created) el!.remove();
    else if (prev === null) el!.removeAttribute('href');
    else if (prev !== undefined) el!.setAttribute('href', prev);
  };
}

const JSON_LD_ID = 'page-jsonld';

function upsertJsonLd(data: unknown): () => void {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  const created = !el;
  const prev = el?.textContent;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = JSON_LD_ID;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return () => {
    if (created) el!.remove();
    else el!.textContent = prev ?? '';
  };
}

/** Sets the document title, description, canonical, Open Graph, Twitter and JSON-LD tags. Also records them during the build-time prerender. */
export function usePageMeta(title: string, description: string, opts: PageMetaOpts = {}) {
  const pageTitle = resolveTitle(title);
  const { ogImageAlt, ogType, jsonLd, noindex } = opts;
  const ogImage = opts.ogImage;
  const explicitPath = opts.path;

  const meta: PageMeta = { title, description, path: explicitPath, ogImage, ogImageAlt, ogType, noindex, jsonLd };
  // Server render (prerender): record synchronously, effects do not run here.
  if (typeof document === 'undefined') recordPageMeta(meta);

  const path = explicitPath ?? (typeof window !== 'undefined' ? currentPath() : undefined);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const prevTitle = document.title;
    document.title = pageTitle;
    cleanups.push(() => {
      document.title = prevTitle;
    });

    cleanups.push(upsertNamedMeta('description', description));

    // Always set robots so a noindex page never leaks its tag to the next page.
    cleanups.push(upsertNamedMeta('robots', noindex ? 'noindex, follow' : 'index, follow'));

    if (path) {
      const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
      const image = absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);
      const alt = ogImageAlt ?? (ogImage ? undefined : DEFAULT_OG_ALT);
      cleanups.push(upsertCanonical(url));
      cleanups.push(upsertPropMeta('og:title', pageTitle));
      cleanups.push(upsertPropMeta('og:description', description));
      cleanups.push(upsertPropMeta('og:url', url));
      cleanups.push(upsertPropMeta('og:type', ogType ?? 'website'));
      cleanups.push(upsertNamedMeta('twitter:card', 'summary_large_image'));
      cleanups.push(upsertNamedMeta('twitter:title', pageTitle));
      cleanups.push(upsertNamedMeta('twitter:description', description));
      cleanups.push(upsertPropMeta('og:image', image));
      cleanups.push(upsertNamedMeta('twitter:image', image));
      if (alt) {
        cleanups.push(upsertPropMeta('og:image:alt', alt));
        cleanups.push(upsertNamedMeta('twitter:image:alt', alt));
      }
    }

    cleanups.push(upsertJsonLd(buildGraph(jsonLd)));

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pageTitle, description, path, ogImage, ogImageAlt, ogType, jsonLd, noindex]);
}

function currentPath(): string {
  const p = window.location.pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}
