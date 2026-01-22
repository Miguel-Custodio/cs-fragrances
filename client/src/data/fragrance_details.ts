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
    notes: 'Top Notes: Italian Mandarin. Heart Notes: Rose and Egyptian Jasmine. Base Notes: Patchouli and Musk.',
    descriptionDetail: 'CS Her (Sunshine) is a floral chypré fragrance that celebrates luminosity and feminine elegance. With vibrant citrus notes of Italian mandarin, passing through a delicate floral heart of rose and Egyptian jasmine, and finishing with the depth of patchouli and musk, this fragrance is perfect for the woman who radiates confidence and sophistication in every moment of the day.',
    imagePath: '/images/Studio_CS Her.png',
  },
  {
    productId: 'cs-origin',
    gender: 'feminino',
    notes: 'Top Notes: Ginger, Lemon, Green Mango and Red Berries. Heart Notes: Coumarin, Jasmine and Cedar. Base Notes: Musk, Agarwood (Oud), Amber and Cypriol Oil.',
    descriptionDetail: 'CS Origin (God of Fire) is an oriental woody fragrance that evokes power and sophistication. With fruity and spicy notes at the opening, passing through a rich heart of coumarin and jasmine, and finishing with the depth of oud and amber, this fragrance is a celebration of feminine essence wrapped in mystery and elegance.',
    imagePath: '/images/Studio_CS Origin.png',
  },
  {
    productId: 'cs-enigma',
    gender: 'masculino',
    notes: 'Top Notes: Calabrian Bergamot, Sichuan Pepper. Heart Notes: Lavender, Geranium, Patchouli and Vetiver. Base Notes: Ambroxan, Cedar and Labdanum.',
    descriptionDetail: 'CS Enigma (Wild Essence) is a spicy woody fragrance that encapsulates the spirit of the modern man. With spicy and aromatic notes at the opening, passing through a herbaceous and woody heart, and finishing with the depth of cedar and ambroxan, this fragrance is perfect for those seeking a unique and striking olfactory signature.',
    imagePath: '/images/Studio_CS Enigma.png',
  },
  {
    productId: 'cs-horizon',
    gender: 'masculino',
    notes: 'Top Notes: Mint, Green Apple and Lemon. Heart Notes: Fava Tonka, Ambroxan and Geranium. Base Notes: Madagascar Vanilla, Virginia Cedar, Atlas Cedar, Vetiver and Oak Moss.',
    descriptionDetail: 'CS Horizon (Eros) is an aromatic woody fragrance that captures the essence of new beginnings and freedom. With fresh and vibrant notes at the opening, passing through a soft and aromatic heart, and finishing with the depth of cedar, vetiver and oak moss, this fragrance is perfect for the man who seeks inspiration and sophistication every day.',
    imagePath: '/images/Studio_CS Horizon.png',
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
