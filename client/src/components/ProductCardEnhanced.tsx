import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardEnhancedProps {
  product: Product;
}

export default function ProductCardEnhanced({ product }: ProductCardEnhancedProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart!`);
    setQuantity(1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = product.images[currentImageIndex];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image Gallery */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden group cursor-pointer">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Expand Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white text-primary p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="View product details"
        >
          <Maximize2 size={20} />
        </button>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">CAD ${product.price.toFixed(2)}</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-4">
          <label htmlFor={`qty-${product.id}`} className="text-sm font-medium">
            Qty:
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100"
            >
              −
            </button>
            <input
              id={`qty-${product.id}`}
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border-0 focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </Button>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
