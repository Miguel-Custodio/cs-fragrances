export interface FragranceDetail {
  productId: string;
  notes: string; // Ex: Top, Heart, Base notes
  /** Fragrance family (from the technical sheets). Marketing descriptions were removed pending review. */
  family: string;
  gender: 'masculino' | 'feminino';
  imagePath: string;
}

export const fragranceDetails: FragranceDetail[] = [
  {
    productId: 'cs-her',
    gender: 'feminino',
    notes: 'Top Notes: Italian Mandarin. Heart Notes: Rose and Egyptian Jasmine. Base Notes: Patchouli and Musk.',
    family: 'Floral Chypre',
    imagePath: '/images/Studio_CS Her.webp',
  },
  {
    productId: 'cs-origin',
    gender: 'feminino',
    notes: 'Top Notes: Ginger, Lemon, Green Mango and Red Berries. Heart Notes: Coumarin, Jasmine and Cedar. Base Notes: Musk, Agarwood (Oud), Amber and Cypriol Oil.',
    family: 'Oriental Woody',
    imagePath: '/images/Studio_CS Origin.webp',
  },
  {
    productId: 'cs-enigma',
    gender: 'masculino',
    notes: 'Top Notes: Calabrian Bergamot, Sichuan Pepper. Heart Notes: Lavender, Geranium, Patchouli and Vetiver. Base Notes: Ambroxan, Cedar and Labdanum.',
    family: 'Spicy Woody',
    imagePath: '/images/Studio_CS Enigma.webp',
  },
  {
    productId: 'cs-horizon',
    gender: 'masculino',
    notes: 'Top Notes: Mint, Green Apple and Lemon. Heart Notes: Fava Tonka, Ambroxan and Geranium. Base Notes: Madagascar Vanilla, Virginia Cedar, Atlas Cedar, Vetiver and Oak Moss.',
    family: 'Woody Aromatic',
    imagePath: '/images/Studio_CS Horizon.webp',
  },
];

// Ingredient Information (for the new section)
export const ingredientInfo = {
  title: 'Ingredient & Allergen Information',
  description: 'CS Fragrances values transparency and safety for our consumers. Our fragrances are formulated with high-quality ingredients. If you have sensitivities or allergies, we recommend checking the list below.',
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
  disclaimer: 'The list above contains the most common allergens present in our products. For a complete list of ingredients for a specific product, please check the packaging or product detail page.',
};
