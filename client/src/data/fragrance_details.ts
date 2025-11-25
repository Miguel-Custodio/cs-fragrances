import { Product } from './products';

export interface FragranceDetail {
  productId: string;
  notes: string; // Ex: Top, Heart, Base notes
  descriptionDetail: string; // Detailed description for the card
  gender: 'masculino' | 'feminino';
  imagePath: string;
}

export const fragranceDetails: FragranceDetail[] = [
  {
    productId: 'cs-her',
    gender: 'feminino',
    notes: 'Notas de Topo: Mandarina Italiana. Notas de Coração: Rosa e Jasmim Egípcio. Notas de Fundo: Patchouli e Almíscar.',
    descriptionDetail: 'CS Her (Sunshine) é uma fragrância floral chypré que celebra a luminosidade e a elegância feminina. Com notas cítricas vibrantes de mandarina italiana, passando por um coração floral delicado de rosa e jasmim egípcio, e finalizando com a profundidade do patchouli e almíscar, esta fragrância é perfeita para a mulher que irradia confiança e sofisticação em cada momento do dia.',
    imagePath: '/images/Studio_CS Her.png',
  },
  {
    productId: 'cs-origin',
    gender: 'feminino',
    notes: 'Notas de Topo: Gengibre, Limão, Manga Verde e Bagas Vermelhas. Notas de Coração: Cumarina, Jasmim e Cedro. Notas de Fundo: Almíscar, Agarwood (Oud), Âmbar e Óleo de Cipriol.',
    descriptionDetail: 'CS Origin (God of Fire) é uma fragrância oriental amadeirada que evoca poder e sofisticação. Com notas frutadas e especiadas na saída, passando por um coração rico em cumarina e jasmim, e finalizando com a profundidade do oud e âmbar, esta fragrância é uma celebração da essência feminina envolvida em mistério e elegância.',
    imagePath: '/images/Studio_CS Origin.png',
  },
  {
    productId: 'cs-enigma',
    gender: 'masculino',
    notes: 'Notas de Topo: Bergamota Calabresa, Pimenta de Sichuan. Notas de Coração: Lavanda, Gerânio, Patchouli e Vetiver. Notas de Fundo: Ambroxan, Cedro e Labdanum.',
    descriptionDetail: 'CS Enigma (Wild Essence) é uma fragrância spicy woody que encapsula o espírito do homem moderno. Com notas especiadas e aromáticas na saída, passando por um coração herbáceo e amadeirado, e finalizando com a profundidade do cedro e ambroxan, esta fragrância é perfeita para quem busca uma assinatura olfativa única e marcante.',
    imagePath: '/images/Studio_CS Enigma.png',
  },
  {
    productId: 'cs-horizon',
    gender: 'masculino',
    notes: 'Notas de Topo: Menta, Maçã Verde e Limão. Notas de Coração: Fava Tonka, Ambroxan e Gerânio. Notas de Fundo: Baunilha de Madagascar, Cedro da Virgínia, Cedro Atlas, Vetiver e Musgo de Carvalho.',
    descriptionDetail: 'CS Horizon (Eros) é uma fragrância amadeirada aromática que captura a essência de novos começos e liberdade. Com notas frescas e vibrantes na saída, passando por um coração suave e aromático, e finalizando com a profundidade do cedro, vetiver e musgo de carvalho, esta fragrância é perfeita para o homem que busca inspiração e sofisticação em cada dia.',
    imagePath: '/images/Studio_CS Horizon.png',
  },
];

// Informações de Ingredientes (para a nova seção)
export const ingredientInfo = {
  title: 'Informações de Ingredientes e Alergênicos',
  description: 'A CS Fragrances preza pela transparência e segurança de seus consumidores. Nossas fragrâncias são formuladas com ingredientes de alta qualidade. Se você possui sensibilidade ou alergias, recomendamos verificar a lista abaixo.',
  commonAllergens: [
    'Linalool',
    'Limonene',
    'Citronellol',
    'Geraniol',
    'Coumarin',
    'Citral',
    'Eugenol',
    'Farnesol',
  ],
  disclaimer: 'A lista acima contém os alergênicos mais comuns presentes em nossos produtos. Para a lista completa de ingredientes de um produto específico, consulte a embalagem ou a página de detalhes do produto.',
};
