import {
  BODY_MIST_SCENTS,
  CANDLE_SCENTS,
  GOAT_SOAP_SCENTS,
  HOME_SPRAY_SCENTS,
  ORNAMENT_SCENTS,
  SACHET_SCENTS,
  SHEA_SOAP_SCENTS,
  findCatalogEntry,
  priceOf,
  type ProductCategory,
} from '@shared/catalog';

export interface Product {
  id: string;
  name: string;
  /** 'kit' products are built from shared/kits.ts (see client/src/data/kits.ts). */
  category: ProductCategory;
  /** Price in CAD. Always read from shared/catalog.ts (the server-trusted catalog). */
  price: number;
  description: string;
  images: string[];
  featured?: boolean;
  gender: 'masculino' | 'feminino' | 'unissex';
  /** 'sold-out' = listed but not purchasable (button disabled, server rejects). 'unconfirmed' = flag only. */
  availability?: 'unconfirmed' | 'sold-out';
  /** Short text shown next to the price, e.g. 'per soap, assorted designs, 1 bar'. */
  priceNote?: string;
  /** Short caption laid over the first photo (e.g. when the photo shows more than one unit). */
  imageCaption?: string;
  /** Photo of the bottle with its ingredients (perfumes). Shown on card hover and in 'Discover the notes'. */
  ingredientImage?: string;
  /** Top / heart / base notes (perfumes). */
  notes?: { top: string; heart: string; base: string };
  /** 'contain' for packaging/label art that must not be cropped. */
  imageFit?: 'cover' | 'contain';
}

/*
 * NOTE (Miguel, Nov 2026): marketing descriptions were removed pending his review. The text below is
 * factual only (type, size, notes taken from the technical sheets). No comparisons with other brands.
 */

const notes = (top: string, heart: string, base: string) => `Top: ${top}. Heart: ${heart}. Base: ${base}.`;

const BODY_MIST_NOTES: Record<string, string> = {
  'rose-blush': notes('Rosé champagne, Pink pepper', 'Peach blossom, Rose', 'White musk, Woody accord'),
  'cashmere-honey': notes('Lavender, Bergamot, Lemon', 'Honey, Cinnamon, Cashmeran, Jasmine Sambac', 'Tobacco Leaf, Vanilla, Tonka Bean'),
  'amber-aura': notes('Orange, Bergamot, Lemon', 'Fruits accord', 'Vanilla, White musk, Amber'),
};

const HOME_SPRAY_NOTES: Record<string, string> = {
  'lavender-muguet': notes('Lavender, Bergamot', 'Rose, Lily of the Valley (Muguet), Iris, Lavandin', 'Sandalwood, Cashmeran, Honey, Musk'),
  'velvet-bloom': notes('Cassis', 'May Rose, Freesia', 'Vanilla, Patchouli, Woody notes, Ambroxan'),
  'golden-fig': notes('Bergamot, Rhubarb leaves, Fig', 'Orange Blossom, Green notes, Ylang Ylang', 'Vanilla, Ambergris, Sandalwood'),
  'misty-moss': notes('Blackberry, Citrus accord, Raspberry, Black Currant', 'Rose, Violet, Geranium', 'Patchouli, Guaiacwood, Balsam Copaiba'),
};

/** Builds a Product from the shared catalog entry (name, price, availability always come from there). */
function fromCatalog(
  id: string,
  extra: Pick<Product, 'description' | 'images'> & Partial<Pick<Product, 'imageFit' | 'gender' | 'imageCaption' | 'priceNote'>>,
): Product {
  const entry = findCatalogEntry(id);
  if (!entry) throw new Error(`Missing catalog entry: ${id}`);
  return {
    id,
    name: entry.name,
    category: entry.category,
    price: entry.priceCents / 100,
    gender: 'unissex',
    availability: entry.availability,
    ...extra,
  };
}

const img = (name: string) => `/shop/${name}.webp`;

const SHEA_PHOTO_CAPTION = 'Example photo. Each bar carries its own scent name on the wrapper.';

export const products: Product[] = [
  // Perfumes
  {
    id: 'cs-horizon',
    gender: 'masculino',
    name: 'CS Horizon',
    category: 'perfume',
    price: priceOf('cs-horizon'),
    description: 'Eau de Parfum 50 ml. Woody Aromatic.',
    images: [
      '/images/CS HORIZON/18.webp',
      '/images/CS HORIZON/19.webp',
      '/images/CS HORIZON/20.webp',
      '/images/CS HORIZON/21.webp',
      '/images/CS HORIZON/22.webp',
    ],
    featured: true,
    ingredientImage: '/images/CS HORIZON/19.webp',
    notes: { top: 'Mint, Green Apple, Lemon', heart: 'Fava Tonka, Ambroxan, Geranium', base: 'Madagascar Vanilla, Virginia Cedar, Atlas Cedar, Vetiver, Oak Moss' },
  },
  {
    id: 'cs-enigma',
    gender: 'masculino',
    name: 'CS Enigma',
    category: 'perfume',
    price: priceOf('cs-enigma'),
    description: 'Eau de Parfum 50 ml. Spicy Woody.',
    images: [
      '/images/CS ENIGMA/25.webp',
      '/images/CS ENIGMA/26.webp',
      '/images/CS ENIGMA/27.webp',
      '/images/CS ENIGMA/28.webp',
      '/images/CS ENIGMA/29.webp',
    ],
    featured: true,
    ingredientImage: '/images/CS ENIGMA/26.webp',
    notes: { top: 'Calabrian Bergamot, Sichuan Pepper', heart: 'Lavender, Geranium, Patchouli, Vetiver', base: 'Ambroxan, Cedar, Labdanum' },
  },
  {
    id: 'cs-her',
    gender: 'feminino',
    name: 'CS Her',
    category: 'perfume',
    price: priceOf('cs-her'),
    description: 'Eau de Parfum 50 ml. Floral Chypre.',
    images: [
      '/images/CS HER/4.webp',
      '/images/CS HER/5.webp',
      '/images/CS HER/6.webp',
      '/images/CS HER/7.webp',
      '/images/CS HER/8.webp',
      '/images/CS HER/9.webp',
    ],
    featured: true,
    ingredientImage: '/images/CS HER/5.webp',
    notes: { top: 'Italian Mandarin', heart: 'Rose, Egyptian Jasmine', base: 'Patchouli, Musk' },
  },
  {
    id: 'cs-origin',
    gender: 'feminino',
    name: 'CS Origin',
    category: 'perfume',
    price: priceOf('cs-origin'),
    description: 'Eau de Parfum 50 ml. Oriental Woody.',
    images: [
      '/images/CS ORIGIN/11.webp',
      '/images/CS ORIGIN/12.webp',
      '/images/CS ORIGIN/13.webp',
      '/images/CS ORIGIN/14.webp',
      '/images/CS ORIGIN/15.webp',
    ],
    featured: true,
    ingredientImage: '/images/CS ORIGIN/12.webp',
    notes: { top: 'Ginger, Lemon, Green Mango, Red Berries', heart: 'Coumarin, Jasmine, Cedar', base: 'Musk, Agarwood (Oud), Amber, Cypriol Oil' },
  },
  // Body mists
  ...BODY_MIST_SCENTS.map(([slug]) =>
    fromCatalog(`bodymist-${slug}`, {
      description: `Body mist, 100 ml. ${BODY_MIST_NOTES[slug]}`,
      images: [img(`bodymist-${slug}`)],
    }),
  ),
  // Home & linen sprays
  ...HOME_SPRAY_SCENTS.map(([slug]) =>
    fromCatalog(`homespray-${slug}`, {
      description: `Home & linen spray, 250 ml. For air and fabric use only. ${HOME_SPRAY_NOTES[slug]}`,
      images: [img(`homespray-${slug}`)],
    }),
  ),
  // Sachets (photos are the packaging label art)
  ...SACHET_SCENTS.map(([slug]) =>
    fromCatalog(`sachet-${slug}`, {
      description: 'Fragranced sachet, 30 g, for drawers, closets and small enclosed spaces. Do not open the sachet.',
      images: [img(`sachet-${slug}`)],
      imageFit: 'contain',
    }),
  ),
  // Soaps
  fromCatalog('cs-soap-christmas-magic', {
    description: 'Artisanal shea butter bar soap, 90 g. Christmas scent.',
    images: [img('soap-shea-generic')],
    imageCaption: SHEA_PHOTO_CAPTION,
  }),
  ...SHEA_SOAP_SCENTS.map(([slug]) =>
    fromCatalog(`soap-shea-${slug}`, {
      description: 'Artisanal shea butter bar soap, 90 g.',
      images: [img('soap-shea-generic')], // generic example photo (not scent-specific)
      imageCaption: slug === 'enigma' ? undefined : SHEA_PHOTO_CAPTION,
    }),
  ),
  // Sold out: CS does not make goat milk soap (Miguel, 2026-11-17). No photos on purpose.
  ...GOAT_SOAP_SCENTS.map(([slug]) =>
    fromCatalog(`soap-goat-${slug}`, {
      description: 'Goat milk bar soap, 90 g. Sold out.',
      images: [],
    }),
  ),
  fromCatalog('soap-decorative-christmas', {
    description:
      'Decorative bar soap in Christmas shapes. Sold individually: CAD 14.90 buys 1 soap in an assorted design. The photo shows the whole range of designs, not a set.',
    images: [img('soap-decorative-christmas')],
    priceNote: 'per soap, assorted designs, 1 bar',
    imageCaption: 'Assorted designs, sold one by one',
  }),
  // Candles & ornaments (Christmas)
  ...CANDLE_SCENTS.map(([slug]) =>
    fromCatalog(`candle-${slug}`, {
      description: 'Glass candle, 100 g (3.5 oz). Limited Christmas Edition.',
      // label art; the first two also have a group photo
      images:
        slug === 'harvest-glow' || slug === 'christmas-memories'
          ? [img(`candle-${slug}`), img('candles-photo')]
          : [img(`candle-${slug}`)],
      imageFit: 'contain',
    }),
  ),
  ...ORNAMENT_SCENTS.map(([slug]) =>
    fromCatalog(`ornament-${slug}`, {
      description: 'Scented wax melt hanging ornament.',
      images: [img('ornaments-hanging'), img('ornaments-organza')], // generic photos (not scent-specific)
    }),
  ),
];

export const perfumes = products.filter((p) => p.category === 'perfume');
export const soaps = products.filter((p) => p.category === 'soap');

/**
 * Category card covers. To swap a cover (e.g. the new 3-candle photo), replace the file in
 * client/public/shop/ (keep 4:5, WebP) or change the path here. Nothing else references them.
 */
export const CATEGORY_COVERS = {
  perfumes: '/images/Studio_4 Fragrances.webp',
  soaps: '/shop/cover-soaps.webp', // PROVISIONAL: CS Enigma shea mockup (wrapper says 100 g); replace with a real photo
  candles: '/shop/cover-candles.webp', // PROVISIONAL: 2 candles (Harvest Glow, Christmas Memories); the 3 current candles are pending
} as const;

export interface CategoryGroup {
  slug: string;
  title: string;
  categories: ProductCategory[];
  /** Image used on the home category tile. */
  cover: string;
}

/** Shop-by-category groups, in display order. */
export const CATEGORY_GROUPS: CategoryGroup[] = [
  { slug: 'perfumes', title: 'Perfumes', categories: ['perfume'], cover: CATEGORY_COVERS.perfumes },
  { slug: 'body-mists', title: 'Body Mists', categories: ['body-mist'], cover: img('bodymist-rose-blush') },
  { slug: 'home-sprays', title: 'Home Sprays', categories: ['home-spray'], cover: img('homespray-misty-moss') },
  { slug: 'sachets', title: 'Sachets', categories: ['sachet'], cover: img('sachet-golden-fig') },
  { slug: 'soaps', title: 'Soaps', categories: ['soap'], cover: CATEGORY_COVERS.soaps },
  { slug: 'candles-ornaments', title: 'Candles & Ornaments', categories: ['candle', 'ornament'], cover: CATEGORY_COVERS.candles },
];

export const productsInGroup = (group: CategoryGroup) =>
  products.filter((p) => group.categories.includes(p.category));
