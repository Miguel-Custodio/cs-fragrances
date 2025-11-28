import { useState } from 'react';
import { Product } from '@/data/products';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!isOpen) return null;

  const currentImage = product.images[currentImageIndex];

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart!`);
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
            <h2 className="text-2xl font-bold text-primary">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image Gallery with Zoom */}
            <div className="flex flex-col gap-4">
              {/* Main Image with Zoom */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <div
                  className="transition-transform duration-200 cursor-move"
                  style={{
                    transform: `scale(${zoom})`,
                  }}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="bg-white hover:bg-gray-100 text-primary p-2 rounded-lg shadow-md transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="bg-white hover:bg-gray-100 text-primary p-2 rounded-lg shadow-md transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Zoom Level Indicator */}
              <div className="text-center text-sm text-gray-600">
                Zoom: {Math.round(zoom * 100)}%
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col gap-6">
              {/* Price */}
              <div>
                <p className="text-3xl font-bold text-primary">
                  CAD ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-primary mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block font-semibold text-primary mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center border-0 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Add to Cart
              </Button>

              {/* Additional Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">
                  Product Details
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>Category:</strong> {product.category}
                  </li>
                  <li>
                    <strong>Available Images:</strong> {product.images.length}
                  </li>
                  <li>
                    <strong>In Stock:</strong> Yes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
