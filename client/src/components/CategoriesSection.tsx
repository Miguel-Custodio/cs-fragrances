import { CATEGORY_GROUPS, productsInGroup } from '@/data/products';

/** Home: "Shop by category" tiles. One small lazy WebP per tile, so the home stays light. */
export default function CategoriesSection() {
  return (
    <section id="shop" className="py-16 md:py-24 bg-primary-foreground">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perfumes, body mists, home sprays, sachets, soaps, candles and ornaments.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {CATEGORY_GROUPS.map((group) => (
            <a
              key={group.slug}
              href={`/shop/${group.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/5] bg-secondary overflow-hidden">
                <img
                  src={group.cover}
                  alt={`${group.title} by CS Fragrances`}
                  width={600}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-primary">{group.title}</h3>
                <p className="text-sm text-gray-500">{productsInGroup(group).length} products</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
