export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail (the matching BreadcrumbList JSON-LD is built with breadcrumbNode in lib/seo.ts). */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container max-w-6xl mx-auto px-4 pt-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-primary">{c.name}</span>
              ) : (
                <>
                  <a href={c.path} className="hover:underline">{c.name}</a>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
