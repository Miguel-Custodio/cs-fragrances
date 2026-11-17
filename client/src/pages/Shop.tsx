import { useParams } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCardEnhanced from '@/components/ProductCardEnhanced';
import NotFound from '@/pages/NotFound';
import { CATEGORY_GROUPS, productsInGroup } from '@/data/products';
import { usePageMeta } from '@/hooks/usePageMeta';

/** /shop (all categories) and /shop/:slug (one category). */
export default function Shop() {
  const { slug } = useParams<{ slug?: string }>();
  const group = slug ? CATEGORY_GROUPS.find((g) => g.slug === slug) : undefined;
  const invalid = Boolean(slug) && !group;
  const groups = group ? [group] : CATEGORY_GROUPS;

  usePageMeta(
    group ? group.title : 'Shop',
    group
      ? `Shop ${group.title.toLowerCase()} from CS Fragrances, handcrafted in British Columbia, Canada.`
      : 'Shop all CS Fragrances products: perfumes, body mists, home sprays, sachets, soaps, candles and ornaments.',
  );

  if (invalid) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-6">
            {group ? group.title : 'Shop'}
          </h1>
          <nav aria-label="Categories" className="flex flex-wrap justify-center gap-2 mb-12">
            <a
              href="/shop"
              className={`px-4 py-2 rounded-full border text-sm font-medium ${
                !group ? 'bg-primary text-white border-primary' : 'border-primary/30 text-primary hover:bg-primary/10'
              }`}
            >
              All
            </a>
            {CATEGORY_GROUPS.map((g) => (
              <a
                key={g.slug}
                href={`/shop/${g.slug}`}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${
                  group?.slug === g.slug
                    ? 'bg-primary text-white border-primary'
                    : 'border-primary/30 text-primary hover:bg-primary/10'
                }`}
              >
                {g.title}
              </a>
            ))}
          </nav>

          {groups.map((g) => (
            <section key={g.slug} className="mb-14">
              {!group && <h2 className="text-3xl font-bold text-primary mb-6">{g.title}</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {productsInGroup(g).map((product) => (
                  <ProductCardEnhanced key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
