import { soaps } from '@/data/products';
import ProductCardEnhanced from './ProductCardEnhanced';

export default function SoapSection() {
  return (
    <section id="soaps" className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/5">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Luxury Goat Milk Soap
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pamper your skin with our handcrafted goat milk soap, packaged in plantable seed paper.
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {soaps.map((product) => (
            <div key={product.id} className="w-full max-w-sm">
              <ProductCardEnhanced product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
