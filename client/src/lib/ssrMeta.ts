import type { PageMeta } from './seo';

/** Collects the last usePageMeta() call made while server-rendering one route (build-time prerender only). */
let current: PageMeta | null = null;

export function beginCollect() {
  current = null;
}

export function recordPageMeta(meta: PageMeta) {
  current = meta;
}

export function endCollect(): PageMeta | null {
  const m = current;
  current = null;
  return m;
}
