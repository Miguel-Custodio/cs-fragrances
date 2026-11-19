import { useParams } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCardEnhanced from '@/components/ProductCardEnhanced';
import NotFound from '@/pages/NotFound';
import { CATEGORY_GROUPS, productsInGroup } from '@/data/products';
import DiscoverNotes from '@/components/DiscoverNotes';
import { usePageMeta } from '@/hooks/usePageMeta';
import { absoluteUrl, breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { productReviewSchema } from '@/lib/reviewSchema';
import type { Product } from '@/data/products';

function productNode(p: Product, pagePath: string) {
  return {
    '@type': 'Product',
    '@id': `${SITE_URL}${pagePath}#${p.id}`,
    name: p.name,
    description: p.description,
    image: p.images.map((i) => absoluteUrl(i)),
    brand: { '@type': 'Brand', name: 'CS Fragrances' },
    manufacturer: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${pagePath}`,
      priceCurrency: 'CAD',
      price: p.price.toFixed(2),
      // Stock counts are not confirmed yet, so only "sold out" is stated.
      ...(p.availability === 'sold-out' ? { availability: 'https://schema.org/OutOfStock' } : {}),
    },
    // Only real reviews of this product (data/reviews.ts is empty today, so nothing is emitted).
    ...productReviewSchema(p),
  };
}

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
    {
      path: group ? `/shop/${group.slug}` : '/shop',
      jsonLd: group
        ? [
            breadcrumbNode([
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
              { name: group.title, path: `/shop/${group.slug}` },
            ]),
            ...productsInGroup(group).map((p) => productNode(p, `/shop/${group.slug}`)),
          ]
        : breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
          ]),
    },
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
      {group?.slug === 'perfumes' && <DiscoverNotes heading="h2" />}
      <Footer />
    </div>
  );
}
