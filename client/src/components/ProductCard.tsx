interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image?: string;
}

export default function ProductCard({ name, description, price, image }: ProductCardProps) {
  return (
    <div className="product-card bg-card rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2.5 group">
      {/* Product Image */}
      <div className="product-image h-96 bg-muted flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl font-bold text-primary/20">CS</div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info p-6 md:p-8">
        {/* Product Name */}
        <h3 className="product-name text-2xl md:text-3xl text-primary mb-3">
          {name}
        </h3>

        {/* Product Description */}
        <p className="product-description text-base md:text-lg text-primary/70 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Product Price */}
        <p className="product-price text-xl md:text-2xl font-bold text-primary mb-4">
          {price}
        </p>

        {/* CTA Link */}
        <a
          href="#"
          className="product-cta inline-flex items-center gap-2 text-primary font-lora hover:text-accent transition-all duration-300 group-hover:gap-3"
        >
          Learn More <span>→</span>
        </a>
      </div>
    </div>
  );
}
