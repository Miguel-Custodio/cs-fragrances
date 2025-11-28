import { fragranceDetails } from '@/data/fragrance_details';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { toast } from 'sonner';

export default function FragranceDetailsSection() {
  const { addItem } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem(product, 1);
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Discover Our Fragrances
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each fragrance is a sensory journey, carefully crafted to awaken emotions and memories.
          </p>
        </div>

        {/* Fragrances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {fragranceDetails.map((fragrance) => {
            const product = products.find((p) => p.id === fragrance.productId);
            if (!product) return null;

            return (
              <div
                key={fragrance.productId}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                  {/* Image */}
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={fragrance.imagePath}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-3xl font-bold text-primary">{product.name}</h3>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full capitalize">
                          {fragrance.gender}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {fragrance.descriptionDetail}
                      </p>

                      {/* Notes */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-primary mb-2">Fragrance Notes</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {fragrance.notes}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div>
                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-primary">
                          CAD ${product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(fragrance.productId)}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingCart size={20} />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
