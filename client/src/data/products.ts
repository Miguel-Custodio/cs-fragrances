export interface Product {
  id: string;
  name: string;
  category: 'perfume' | 'soap';
  price: number;
  description: string;
  images: string[];
  featured?: boolean;
}

export const products: Product[] = [
  // Perfumes
  {
    id: 'cs-horizon',
    name: 'CS Horizon',
    category: 'perfume',
    price: 69.90,
    description: 'A captivating fragrance that captures the essence of endless horizons and new beginnings.',
    images: [
      '/products/cs-horizon-1.png',
      '/products/cs-horizon-2.png',
      '/products/cs-horizon-3.png',
      '/products/cs-horizon-4.png',
      '/products/cs-horizon-5.png',
    ],
    featured: true,
  },
  {
    id: 'cs-enigma',
    name: 'CS Enigma',
    category: 'perfume',
    price: 69.90,
    description: 'A mysterious and intriguing fragrance that reveals new layers with every wear.',
    images: [
      '/products/cs-enigma-1.png',
      '/products/cs-enigma-2.png',
      '/products/cs-enigma-3.png',
      '/products/cs-enigma-4.png',
      '/products/cs-enigma-5.png',
    ],
    featured: true,
  },
  {
    id: 'cs-her',
    name: 'CS Her',
    category: 'perfume',
    price: 69.90,
    description: 'An elegant and sophisticated fragrance designed for the modern woman.',
    images: [
      '/products/cs-her-1.png',
      '/products/cs-her-2.png',
      '/products/cs-her-3.png',
      '/products/cs-her-4.png',
      '/products/cs-her-5.png',
    ],
    featured: true,
  },
  {
    id: 'cs-origin',
    name: 'CS Origin',
    category: 'perfume',
    price: 69.90,
    description: 'A timeless fragrance that honors the roots of luxury perfumery.',
    images: [
      '/products/cs-origin-1.png',
      '/products/cs-origin-2.png',
      '/products/cs-origin-3.png',
      '/products/cs-origin-4.png',
      '/products/cs-origin-5.png',
    ],
    featured: true,
  },
  // Soaps
  {
    id: 'cs-soap-morning-dew',
    name: 'CS Morning Dew',
    category: 'soap',
    price: 9.90,
    description: 'Luxury goat milk soap with fresh morning scent. 90g with plantable seed paper packaging.',
    images: ['/products/cs-soap-morning-dew.png'],
  },
  {
    id: 'cs-soap-wild-instinct',
    name: 'CS Wild Instinct',
    category: 'soap',
    price: 9.90,
    description: 'Luxury goat milk soap with bold, natural scent. 90g with plantable seed paper packaging.',
    images: ['/products/cs-soap-wild-instinct.png'],
  },
  {
    id: 'cs-soap-forest-whispers',
    name: 'CS Forest Whispers',
    category: 'soap',
    price: 9.90,
    description: 'Luxury goat milk soap with earthy forest notes. 90g with plantable seed paper packaging.',
    images: ['/products/cs-soap-forest-whispers.png'],
  },
  {
    id: 'cs-soap-christmas-magic',
    name: 'CS Christmas Magic',
    category: 'soap',
    price: 9.90,
    description: 'Luxury goat milk soap with festive seasonal scent. 90g with plantable seed paper packaging.',
    images: ['/products/cs-soap-christmas-magic.png'],
  },
];

export const perfumes = products.filter((p) => p.category === 'perfume');
export const soaps = products.filter((p) => p.category === 'soap');
