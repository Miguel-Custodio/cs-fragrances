export interface Product {
  id: string;
  name: string;
  category: 'perfume' | 'soap';
  price: number;
  description: string;
  images: string[];
  featured?: boolean;
  gender: 'masculino' | 'feminino' | 'unissex';
}

export const products: Product[] = [
  // Perfumes
  {
    id: 'cs-horizon',
    gender: 'masculino',
    name: 'CS Horizon',
    category: 'perfume',
    price: 69.90,
    description: 'A captivating fragrance that captures the essence of endless horizons and new beginnings.',
    images: [
      '/images/CS HORIZON/18.png',
      '/images/CS HORIZON/19.png',
      '/images/CS HORIZON/20.png',
      '/images/CS HORIZON/21.png',
      '/images/CS HORIZON/22.png',
    ],
    featured: true,
  },
  {
    id: 'cs-enigma',
    gender: 'masculino',
    name: 'CS Enigma',
    category: 'perfume',
    price: 69.90,
    description: 'A mysterious and intriguing fragrance that reveals new layers with every wear.',
    images: [
      '/images/CS ENIGMA/25.png',
      '/images/CS ENIGMA/26.png',
      '/images/CS ENIGMA/27.png',
      '/images/CS ENIGMA/28.png',
      '/images/CS ENIGMA/29.png',
    ],
    featured: true,
  },
  {
    id: 'cs-her',
    gender: 'feminino',
    name: 'CS Her',
    category: 'perfume',
    price: 69.90,
    description: 'An elegant and sophisticated fragrance designed for the modern woman.',
    images: [
      '/images/CS HER/4.png',
      '/images/CS HER/5.png',
      '/images/CS HER/6.png',
      '/images/CS HER/7.png',
      '/images/CS HER/8.png',
      '/images/CS HER/9.png',
    ],
    featured: true,
  },
  {
    id: 'cs-origin',
    gender: 'feminino',
    name: 'CS Origin',
    category: 'perfume',
    price: 69.90,
    description: 'A timeless fragrance that honors the roots of luxury perfumery.',
    images: [
      '/images/CS ORIGIN/11.png',
      '/images/CS ORIGIN/12.png',
      '/images/CS ORIGIN/13.png',
      '/images/CS ORIGIN/14.png',
      '/images/CS ORIGIN/15.png',
    ],
    featured: true,
  },
];

export const perfumes = products.filter((p) => p.category === 'perfume');
export const soaps = products.filter((p) => p.category === 'soap');