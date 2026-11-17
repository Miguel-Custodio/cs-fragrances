import { useEffect } from 'react';

const SITE_NAME = 'CS Fragrances';

/** Sets the document title and meta description for a page (client-side SPA). */
export function usePageMeta(title: string, description: string, opts: { noindex?: boolean } = {}) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content;
    if (meta) meta.content = description;

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    let created = false;
    if (opts.noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
        created = true;
      }
      robots.content = 'noindex';
    }

    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== undefined) meta.content = prevDesc;
      if (created && robots) robots.remove();
    };
  }, [title, description, opts.noindex]);
}
