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
      '/images/Studio_CS Horizon.png',
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
      '/images/Studio_CS Enigma.png',
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
      '/images/Studio_CS Her.png',
      '/images/Campaign_Her001.png',
      '/images/Campaign_Her002.png',
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
      '/images/Studio_CS Origin.png',
    ],
    featured: true,
  },

];

export const perfumes = products.filter((p) => p.category === 'perfume');
export const soaps = products.filter((p) => p.category === 'soap');
