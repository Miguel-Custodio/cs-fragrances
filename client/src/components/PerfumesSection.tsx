import { perfumes } from '@/data/products';
import ProductCardEnhanced from './ProductCardEnhanced';

export default function PerfumesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Fragrances
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of luxury fragrances, each crafted with precision and passion.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {perfumes.map((product) => (
            <ProductCardEnhanced key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
