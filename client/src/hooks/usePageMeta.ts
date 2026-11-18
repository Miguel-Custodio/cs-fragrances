import { useEffect } from 'react';

export const SITE_NAME = 'CS Fragrances';
export const SITE_URL = 'https://www.csfragrances.ca';

export type PageMetaOpts = {
  noindex?: boolean;
  /** Path beginning with /, used for canonical, og:url and twitter tags. */
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  jsonLd?: unknown;
};

function absoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

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

/** Sets the document title, description, and optional Open Graph, Twitter, canonical and JSON-LD tags. */
export function usePageMeta(title: string, description: string, opts: PageMetaOpts = {}) {
  const pageTitle =
    title === SITE_NAME || title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const path = opts.path;
  const ogImage = opts.ogImage;
  const ogImageAlt = opts.ogImageAlt;
  const ogType = opts.ogType;
  const jsonLd = opts.jsonLd;
  const noindex = opts.noindex;

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const prevTitle = document.title;
    document.title = pageTitle;
    cleanups.push(() => {
      document.title = prevTitle;
    });

    cleanups.push(upsertNamedMeta('description', description));

    if (noindex) {
      cleanups.push(upsertNamedMeta('robots', 'noindex'));
    }

    if (path) {
      const url = `${SITE_URL}${path}`;
      cleanups.push(upsertCanonical(url));
      cleanups.push(upsertPropMeta('og:title', pageTitle));
      cleanups.push(upsertPropMeta('og:description', description));
      cleanups.push(upsertPropMeta('og:url', url));
      cleanups.push(upsertPropMeta('og:type', ogType ?? 'website'));
      cleanups.push(upsertNamedMeta('twitter:card', 'summary_large_image'));
      cleanups.push(upsertNamedMeta('twitter:title', pageTitle));
      cleanups.push(upsertNamedMeta('twitter:description', description));
      if (ogImage) {
        const abs = absoluteUrl(ogImage);
        cleanups.push(upsertPropMeta('og:image', abs));
        cleanups.push(upsertNamedMeta('twitter:image', abs));
        if (ogImageAlt) {
          cleanups.push(upsertPropMeta('og:image:alt', ogImageAlt));
          cleanups.push(upsertNamedMeta('twitter:image:alt', ogImageAlt));
        }
      }
    }

    if (jsonLd) {
      cleanups.push(upsertJsonLd(jsonLd));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pageTitle, description, path, ogImage, ogImageAlt, ogType, jsonLd, noindex]);
}
