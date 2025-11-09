import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Essence Noir',
    description: 'A sophisticated blend of dark woods and mysterious florals',
    price: 'CAD $89.99',
  },
  {
    id: 2,
    name: 'Floral Dreams',
    description: 'Delicate rose and jasmine notes with a hint of vanilla',
    price: 'CAD $79.99',
  },
  {
    id: 3,
    name: 'Citrus Sunrise',
    description: 'Bright and energizing blend of citrus and bergamot',
    price: 'CAD $74.99',
  },
  {
    id: 4,
    name: 'Amber Luxe',
    description: 'Warm amber and sandalwood with subtle spice notes',
    price: 'CAD $94.99',
  },
  {
    id: 5,
    name: 'Ocean Breeze',
    description: 'Fresh aquatic notes with a touch of sea salt',
    price: 'CAD $84.99',
  },
  {
    id: 6,
    name: 'Velvet Musk',
    description: 'Sensual musk blended with soft floral accords',
    price: 'CAD $89.99',
  },
];

export default function ProductsSection() {
  return (
    <section id="fragrances" className="py-24 md:py-32 bg-primary-foreground">
      <div className="container">
        {/* Section Title */}
        <h2 className="section-title text-primary text-center mb-16 md:mb-24">
          Our Fragrances
        </h2>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
