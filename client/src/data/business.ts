import { SCENTEC_BRANDING_ENABLED } from '@/lib/flags';
import { B2B_CONFIG, detail } from '@shared/b2bConfig';

/**
 * For Business (B2B) content. English (Canadian) only. Copy comes from
 * /workspace/gestao/b2b-storytelling-seo.md (Part B) and /workspace/gestao/estrategia-b2b.md.
 *
 * Rules:
 *  - No public B2B prices, no invented numbers, clients, testimonials or certifications.
 *  - Unconfirmed facts (minimum order, lead time, equipment, terms, US delivery...) come from
 *    shared/b2bConfig.ts and read "Contact us for details" until confirmed. Never type a [PLACEHOLDER] here.
 *  - Scentec / IFF names are shown ONLY when VITE_SCENTEC_BRANDING_ENABLED=true (written authorization
 *    pending). Never add a logo. The hidden /business/fragrance-oils page uses neutral wording.
 */

export const NEUTRAL_OILS_SOURCE = 'professional-grade fragrance oils from a leading global fragrance house';

export const OILS_SOURCE_TEXT = SCENTEC_BRANDING_ENABLED
  ? 'professional-grade fragrance oils from Scentec, a distributor of IFF fragrances'
  : NEUTRAL_OILS_SOURCE;

export type BusinessSlug =
  | 'scent-marketing'
  | 'hotels-spas'
  | 'salons-barbershops'
  | 'amenities'
  | 'corporate-gifts'
  | 'private-label'
  | 'fragrance-oils';

export interface FaqItem {
  q: string;
  a: string;
}

export interface BusinessPageDef {
  slug: BusinessSlug;
  path: string;
  /** Page <title> (the site name is appended by usePageMeta). Keep the full title at 60 characters or fewer. */
  title: string;
  /** Meta description, 155 characters or fewer. */
  description: string;
  h1: string;
  intro: string;
  kicker: string;
  /** Line under the main button. */
  trustLine: string;
  image: { src: string; alt: string; width: number; height: number };
  blocks: { title: string; text: string }[];
  /** Section "Who it is for". */
  audienceTitle: string;
  audience: string[];
  /** "How it works" steps. */
  steps: { title: string; text: string }[];
  /** Extra facts shown as a list (unconfirmed values come from b2bConfig). */
  facts: { label: string; value: string }[];
  faq: FaqItem[];
  /** Short name used in menus, cards and links. */
  topic: string;
  /** One-line summary for the hub card. */
  summary: string;
  /** Internal links to related pages and products. */
  related: { label: string; href: string }[];
  /** Pre-selected values of the request forms. */
  prefill: { businessType: string; interest: string };
  /** Replaces the default business types / interests of the forms. */
  formOptions?: { businessTypes: string[]; interests: string[] };
  serviceType: string;
  /** Search phrases used naturally in the copy (for maintainers). */
  seoKeywords: string[];
  /** Listed in sitemap.xml, the hub and the menus. */
  inSitemap: boolean;
  /** Adds <meta name="robots" content="noindex">. */
  noindex?: boolean;
}

/** "No obligation", plus "free of charge" only when the policy is confirmed (b2bConfig.freeSamples). */
const TEST_TERMS = B2B_CONFIG.freeSamples ? 'free of charge and with no obligation' : 'with no obligation';
const TRUST_LINE = `On-site scent test and samples, ${TEST_TERMS}. Then a tailored quote.`;

const PRIVATE_LABEL_TIMING = B2B_CONFIG.privateLabelStart
  ? `Private label projects start from ${B2B_CONFIG.privateLabelStart}.`
  : 'Tell us about your project and we will confirm timing in your quote.';

const WHERE_WE_SERVE = `We are based in Surrey, British Columbia, and serve ${B2B_CONFIG.serviceAreaText}. Delivery elsewhere in Canada: ${B2B_CONFIG.deliveryOutsideBC ?? 'contact us for details'}.`;

const RESALE_TERMS_TEXT = B2B_CONFIG.resaleTerms ?? 'contact us for details';

const COST_ANSWER =
  'It depends on the size of your space, the scent and the products you choose, so we quote each project individually. Request a quote and we will reply with a clear proposal after the scent test.';

const SCENT_TEST_ANSWER = `Tell us about your space and we bring a small selection of scents to try on site. You smell them in the real room, with real airflow, and decide what fits. It is ${TEST_TERMS}. After that we send a tailored written quote.`;

const MADE_LOCALLY_ANSWER =
  'Yes. Our perfumes, body mists, home sprays, soaps and sachets are handcrafted in small batches in British Columbia by our family team. Ingredient lists are on each product page.';

export const BUSINESS_PAGES: BusinessPageDef[] = [
  {
    slug: 'scent-marketing',
    path: '/business/scent-marketing',
    title: 'Scent Marketing for Business in Vancouver',
    description:
      'A signature scent for your store, hotel, clinic or office, tested in your space first. Handcrafted in BC. Request a quote.',
    h1: 'Scent marketing: give your space a signature scent',
    kicker: 'For business',
    trustLine: TRUST_LINE,
    intro:
      'People remember how a place feels. A carefully chosen scent turns a store, hotel, clinic or office into an experience and becomes part of your brand. We help businesses in Vancouver and the Lower Mainland choose a signature scent, try it in their own space, and keep it consistent order after order.',
    image: {
      src: '/videos/making-sachets.webp',
      alt: 'Handmade scent sachets being weighed at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'A signature scent for your brand',
        text: 'We help you find the fragrance that fits your brand, your space and your guests, from fresh and clean to warm and welcoming, and keep it consistent from one order to the next.',
      },
      {
        title: 'Scent for every kind of space',
        text: 'Boutique and independent hotels, spas and wellness studios, salons and barbershops, retail stores, offices and showrooms. Clinics and boutique gyms too: reception, treatment rooms and changing rooms.',
      },
      {
        title: 'Made by us, in small batches',
        text: 'Our own home sprays and sachets are handcrafted in British Columbia, so we can match a scent to your space and talk to you directly about it.',
      },
    ],
    audienceTitle: 'Who scent marketing is for',
    audience: [
      'Hotels and boutique lodging',
      'Spas, wellness studios and aesthetic clinics',
      'Salons and barbershops',
      'Retail stores and boutiques',
      'Offices, showrooms and boutique gyms',
    ],
    steps: [
      { title: 'Tell us about your space', text: 'Type of business, size of the space and the feeling you want guests to have. A short call or a form is enough.' },
      { title: 'Try it in your space', text: `We bring a small selection of scent samples and do a scent test on site, ${TEST_TERMS}. You smell it where your guests will.` },
      { title: 'Get a tailored quote', text: 'You receive a written quote built around your space and your scent, then delivery and simple repeat orders so the scent stays consistent.' },
    ],
    facts: [
      { label: 'Where we work', value: B2B_CONFIG.serviceAreaText },
      { label: 'Formats and equipment', value: detail(B2B_CONFIG.diffuserEquipment ?? 'Home and linen sprays and sachets from our collection. Diffusion equipment is chosen together at your scent test.') },
      { label: 'Minimum order', value: detail(B2B_CONFIG.minimumOrder) },
      { label: 'Lead time', value: detail(B2B_CONFIG.leadTime) },
    ],
    faq: [
      {
        q: 'What is scent marketing?',
        a: 'Scent marketing is the use of a consistent fragrance in a physical space to support how people feel about your brand. It can be as simple as a signature room spray and scented amenities, or a diffusion service tuned to the size of your space.',
      },
      { q: 'How does the scent test work?', a: SCENT_TEST_ANSWER },
      { q: 'How much does it cost?', a: COST_ANSWER },
      {
        q: 'Can you create a scent just for my brand?',
        a: 'We start from your brand and your space, suggest fragrance directions and share samples, then refine the one you prefer.',
      },
      { q: 'Where do you deliver?', a: WHERE_WE_SERVE },
      { q: 'Are your products made locally?', a: MADE_LOCALLY_ANSWER },
    ],
    topic: 'Scent marketing',
    summary: 'A signature scent for your store, hotel, clinic or office, tested in your space before you decide.',
    related: [
      { label: 'Hotels and spas', href: '/business/hotels-spas' },
      { label: 'Salons and barbershops', href: '/business/salons-barbershops' },
      { label: 'Home sprays', href: '/shop/home-sprays' },
      { label: 'Sachets', href: '/shop/sachets' },
    ],
    prefill: { businessType: 'Retail or boutique', interest: 'Scent for my space' },
    serviceType: 'Scent marketing and ambient fragrance design',
    seoKeywords: ['scent marketing Vancouver', 'ambient scenting', 'signature scent for business', 'scent marketing Lower Mainland'],
    inSitemap: true,
  },
  {
    slug: 'hotels-spas',
    path: '/business/hotels-spas',
    title: 'Hotel & Spa Amenities and Scent in Vancouver',
    description:
      'Handmade soaps, sprays and a signature scent for boutique hotels and spas in Vancouver and the Lower Mainland. Request a quote.',
    h1: 'A signature scent and handmade amenities for your guests',
    kicker: 'Hotels and spas',
    trustLine: TRUST_LINE,
    intro:
      'For boutique and independent hotels, spas and wellness studios in Vancouver and the Lower Mainland: a scent that feels like your property, and handmade shea butter soaps, linen sprays and sachets made in small batches in British Columbia.',
    image: {
      src: '/videos/making-soap.webp',
      alt: 'Handmade shea butter soap being made at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'Hotels: a scent that is yours',
        text: 'A recognizable lobby and guest-room scent that feels like your property, not a generic hotel smell. Amenities with your own look, handmade in small batches, and one local contact for scent, refills and reorders.',
      },
      {
        title: 'Spas: calm from reception to treatment room',
        text: 'A consistent scent chosen with you and tested in your space. Soaps, sprays and sachets for treatment rooms and retail shelves, and take-home products that extend the experience after the visit.',
      },
      {
        title: 'Small team, direct contact',
        text: 'We are a small family team. You talk directly to the people who make your products, from the first scent test to every reorder.',
      },
    ],
    audienceTitle: 'Who this is for',
    audience: [
      'Boutique and independent hotels',
      'Day spas and wellness studios',
      'Aesthetic clinics and boutique gyms (reception and changing rooms)',
      'Guesthouses and bed and breakfasts',
    ],
    steps: [
      { title: 'Tell us about your property', text: 'Type of business, the spaces you want to scent and the feeling you want guests to have.' },
      { title: 'Try scents in your space', text: `A scent test on site, ${TEST_TERMS}, plus samples of our soaps, sprays and sachets.` },
      { title: 'Quote and simple reorders', text: 'A tailored written quote, then delivery and repeat orders so everything stays consistent.' },
    ],
    facts: [
      { label: 'Products', value: 'Shea butter soaps (90 g), home and linen sprays (250 ml), scent sachets (30 g)' },
      { label: 'Branded options', value: detail(B2B_CONFIG.customizationOptions) },
      { label: 'Private label', value: PRIVATE_LABEL_TIMING },
      { label: 'Minimum order and lead time', value: B2B_CONFIG.minimumOrder && B2B_CONFIG.leadTime ? `${B2B_CONFIG.minimumOrder} / ${B2B_CONFIG.leadTime}` : detail(null) },
    ],
    faq: [
      { q: 'Can you scent a hotel lobby or a spa?', a: 'Yes. We start with a scent test in the space, then recommend formats that suit the room. Equipment, if needed, is chosen together after the test.' },
      { q: 'What amenities can you supply?', a: 'Handmade shea butter soaps, home and linen sprays and scent sachets, for guest rooms, treatment rooms and retail shelves. See the amenities page for details.' },
      { q: 'Can the products carry my brand?', a: `We offer branded options and private label. ${PRIVATE_LABEL_TIMING}` },
      { q: 'How much does it cost?', a: COST_ANSWER },
      { q: 'Where do you deliver?', a: WHERE_WE_SERVE },
    ],
    topic: 'Hotels and spas',
    summary: 'A signature scent and handmade amenities for boutique hotels, spas and wellness studios.',
    related: [
      { label: 'Amenity soaps, sprays and sachets', href: '/business/amenities' },
      { label: 'Scent marketing', href: '/business/scent-marketing' },
      { label: 'Private label', href: '/business/private-label' },
      { label: 'Shea butter soaps', href: '/shop/soaps' },
    ],
    prefill: { businessType: 'Hotel', interest: 'Amenity soaps and sprays' },
    serviceType: 'Scent and amenity supply for hotels and spas',
    seoKeywords: ['boutique hotel amenities Vancouver', 'handmade soap hotel amenities Canada', 'spa retail products', 'hotel scent Vancouver'],
    inSitemap: true,
  },
  {
    slug: 'salons-barbershops',
    path: '/business/salons-barbershops',
    title: 'Scent & Perfumes for Salons and Barbershops',
    description:
      'A signature scent for your salon or barbershop, plus perfumes for your shelf or cologne bar. Made in BC. Request samples or a quote.',
    h1: 'A scent your clients remember, and a shelf that sells',
    kicker: 'Salons and barbershops',
    trustLine: TRUST_LINE,
    intro:
      'A signature scent for the waiting area and the chair, and perfumes and body mists for your shelf or cologne bar. Made by hand in British Columbia for salons and barbershops in Vancouver and the Lower Mainland.',
    image: {
      src: '/videos/blending-fragrance.webp',
      alt: 'Fragrance being blended by hand at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'A signature scent for your shop',
        text: 'Clients recognize your shop the moment they walk in. We help you choose a scent for the waiting area and the chair, and test it in your space first.',
      },
      {
        title: 'Perfumes for your shelf or cologne bar',
        text: `Our eau de parfum (50 ml) and body mists (100 ml) for resale. Terms for resale: ${RESALE_TERMS_TEXT}.`,
      },
      {
        title: 'Gift-ready',
        text: 'Packaging that makes a client’s favourite scent an easy sale and an easy gift.',
      },
    ],
    audienceTitle: 'Who this is for',
    audience: ['Barbershops and cologne bars', 'Hair and beauty salons', 'Nail and aesthetic studios', 'Grooming lounges'],
    steps: [
      { title: 'Tell us about your shop', text: 'The size of the space, the style of your clients and what you would like to carry on your shelf.' },
      { title: 'Try it in your shop', text: `A scent test on site, ${TEST_TERMS}, and samples of our perfumes and body mists.` },
      { title: 'Quote and reorders', text: 'A tailored written quote, then simple repeat orders.' },
    ],
    facts: [
      { label: 'Perfumes', value: 'Eau de parfum, 50 ml (CS Horizon, CS Enigma, CS Her, CS Origin)' },
      { label: 'Body mists', value: '100 ml' },
      { label: 'Resale terms', value: detail(B2B_CONFIG.resaleTerms) },
      { label: 'Minimum order', value: detail(B2B_CONFIG.minimumOrder) },
    ],
    faq: [
      { q: 'Can I sell your perfumes in my shop?', a: 'Yes, we work with salons, barbershops and boutiques. Request a quote and tell us about your shop, and we will explain how it works.' },
      { q: 'Can you scent my waiting area?', a: SCENT_TEST_ANSWER },
      { q: 'Do you have a business that already carries your perfumes?', a: 'Yes. Our perfumes are already on the cologne bar of a premium barbershop in Vancouver. Read the short case on this site.' },
      { q: 'How much does it cost?', a: COST_ANSWER },
      { q: 'Where do you deliver?', a: WHERE_WE_SERVE },
    ],
    topic: 'Salons and barbershops',
    summary: 'A signature scent for your shop, plus perfumes and body mists for your shelf or cologne bar.',
    related: [
      { label: 'Barbershop cologne bar: a short case', href: '/business/barbershop-case-study' },
      { label: 'Scent marketing', href: '/business/scent-marketing' },
      { label: 'Perfumes', href: '/shop/perfumes' },
      { label: 'Body mists', href: '/shop/body-mists' },
    ],
    prefill: { businessType: 'Salon or barbershop', interest: 'Perfumes for resale' },
    serviceType: 'Scent and perfume supply for salons and barbershops',
    seoKeywords: ['barbershop cologne bar', 'retail products for salons', 'perfume for salons Canada', 'barbershop scent Vancouver'],
    inSitemap: true,
  },
  {
    slug: 'amenities',
    path: '/business/amenities',
    title: 'Handmade Amenity Soaps and Sprays in BC',
    description:
      'Handmade shea butter soaps, home and linen sprays and scent sachets for guest rooms, treatment rooms and shelves. Made in BC. Request samples.',
    h1: 'Handmade amenities for guest rooms, treatment rooms and shelves',
    kicker: 'Amenities',
    trustLine: `Samples available, ${TEST_TERMS}. Tell us the rooms and the quantity and we send a tailored quote.`,
    intro:
      'Shea butter soaps, home and linen sprays and scent sachets, handmade in small batches in British Columbia. A simple, consistent way to give guests, clients and shoppers something they will want to take home, with simple repeat orders.',
    image: {
      src: '/videos/making-soap.webp',
      alt: 'Handmade shea butter soap being made at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'Shea butter soaps',
        text: 'Handmade bar soaps (90 g) made with shea butter, in a range of scents. Made in small batches in British Columbia, with the ingredient list on the product page.',
      },
      {
        title: 'Home and linen sprays',
        text: 'Room and linen sprays (250 ml) for guest rooms, treatment rooms and waiting areas, in scents you can try before you decide.',
      },
      {
        title: 'Scent sachets',
        text: 'Fragranced sachets (30 g) for drawers, wardrobes, linen closets and retail shelves.',
      },
    ],
    audienceTitle: 'Who amenities are for',
    audience: [
      'Boutique and independent hotels, guesthouses and bed and breakfasts',
      'Spas, wellness studios and aesthetic clinics (treatment rooms and take-home retail)',
      'Salons and barbershops (washrooms and retail shelf)',
      'Gift shops and boutiques',
    ],
    steps: [
      { title: 'Tell us the rooms and the quantity', text: 'How many rooms or treatment rooms, how often you restock and the feeling you want.' },
      { title: 'Try the samples', text: 'We send or bring samples of the soaps, sprays and sachets so you can choose in your own space.' },
      { title: 'Quote and simple repeat orders', text: 'A tailored written quote, then repeat orders for the products that work for you.' },
    ],
    facts: [
      { label: 'Soaps', value: 'Shea butter bar soap, 90 g' },
      { label: 'Home and linen sprays', value: '250 ml' },
      { label: 'Sachets', value: '30 g' },
      { label: 'Branded options (label, card, logo)', value: detail(B2B_CONFIG.customizationOptions) },
      { label: 'Minimum order', value: detail(B2B_CONFIG.minimumOrder) },
      { label: 'Lead time', value: detail(B2B_CONFIG.leadTime) },
    ],
    faq: [
      { q: 'What amenities do you make?', a: 'Handmade shea butter soaps, home and linen sprays and scent sachets, all made in small batches in British Columbia.' },
      { q: 'Can the amenities carry my brand?', a: `We offer branded options and private label. ${PRIVATE_LABEL_TIMING}` },
      { q: 'Can I try them before I order?', a: 'Yes. Request samples with the form on this page and tell us about your space.' },
      { q: 'What are the ingredients?', a: 'Ingredient lists are on each product page, and allergen information is on our ingredients page.' },
      { q: 'How much does it cost?', a: COST_ANSWER },
      { q: 'Where do you deliver?', a: WHERE_WE_SERVE },
    ],
    topic: 'Amenities',
    summary: 'Handmade shea butter soaps, home and linen sprays and scent sachets for rooms and shelves.',
    related: [
      { label: 'Hotels and spas', href: '/business/hotels-spas' },
      { label: 'Private label', href: '/business/private-label' },
      { label: 'Shea butter soaps', href: '/shop/soaps' },
      { label: 'Home sprays', href: '/shop/home-sprays' },
      { label: 'Sachets', href: '/shop/sachets' },
      { label: 'Ingredients and allergens', href: '/ingredients' },
    ],
    prefill: { businessType: 'Hotel', interest: 'Amenity soaps and sprays' },
    serviceType: 'Supply of handmade amenity soaps, sprays and sachets',
    seoKeywords: ['handmade soap hotel amenities Canada', 'boutique hotel amenities Vancouver', 'spa amenities soap BC', 'linen spray for hotels'],
    inSitemap: true,
  },
  {
    slug: 'corporate-gifts',
    path: '/business/corporate-gifts',
    title: 'Corporate Gifts in Vancouver, Made in BC',
    description:
      'Curated, locally handmade gift kits for clients and teams in Vancouver and the Lower Mainland. Request a quote.',
    h1: 'Corporate gifts that feel personal',
    kicker: 'Corporate gifts',
    trustLine: 'Tell us who you are thanking and we build a kit around it. Samples available on request.',
    intro:
      'Curated gift kits for clients and teams, built from our handmade collection of perfumes, shea butter soaps, sprays and sachets. Produced locally in British Columbia, so you can talk to the people who pack your order.',
    image: {
      src: '/videos/making-sachets.webp',
      alt: 'Handmade scent sachets being weighed at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'Curated, not generic',
        text: 'We build kits from our own collection, from a small thank-you with a soap to a gift set with a perfume, around who you are thanking and what you would like to say.',
      },
      {
        title: 'A personal touch',
        text: `A card or your logo can make the kit yours. Customization options: ${B2B_CONFIG.customizationOptions ?? 'contact us for details'}.`,
      },
      {
        title: 'Made locally',
        text: 'Handcrafted in small batches in British Columbia by a small family team. You talk directly to the people who make and pack your order.',
      },
    ],
    audienceTitle: 'Who corporate gifts are for',
    audience: [
      'Offices and professional firms thanking clients',
      'Real estate teams with closing gifts',
      'Clinics and studios thanking clients and referrers',
      'Teams, events and welcome packs',
    ],
    steps: [
      { title: 'Tell us who you are thanking', text: 'The number of gifts, your budget and when you need them.' },
      { title: 'We propose a kit', text: 'A curated kit from our collection, with samples if you would like to see and smell it first.' },
      { title: 'Approve and receive', text: 'A tailored written quote, then production and delivery.' },
    ],
    facts: [
      { label: 'Built from', value: 'Our perfumes, shea butter soaps, sprays and sachets' },
      { label: 'Customization (card, logo)', value: detail(B2B_CONFIG.customizationOptions) },
      { label: 'Minimum order', value: detail(B2B_CONFIG.minimumOrder) },
      { label: 'Lead time', value: detail(B2B_CONFIG.leadTime) },
      { label: 'Delivery', value: WHERE_WE_SERVE },
    ],
    faq: [
      { q: 'What goes in a corporate gift kit?', a: 'Kits are built from our own handmade collection: perfumes, shea butter soaps, home sprays and sachets. We propose a kit around your budget and your recipients.' },
      { q: 'Can I add my logo or a card?', a: `We offer a card or your logo on kits. Options and lead time: ${B2B_CONFIG.customizationOptions ?? 'contact us for details'}.` },
      { q: 'How much does it cost?', a: COST_ANSWER },
      { q: 'How early should I order?', a: `Lead time depends on the size of your order: ${B2B_CONFIG.leadTime ?? 'contact us for details'}. Tell us your date when you request a quote.` },
      { q: 'Where do you deliver?', a: WHERE_WE_SERVE },
    ],
    topic: 'Corporate gifts',
    summary: 'Curated, locally handmade gift kits for clients and teams.',
    related: [
      { label: 'Amenity soaps, sprays and sachets', href: '/business/amenities' },
      { label: 'Private label', href: '/business/private-label' },
      { label: 'Perfumes', href: '/shop/perfumes' },
      { label: 'Shea butter soaps', href: '/shop/soaps' },
    ],
    prefill: { businessType: 'Office or corporate gifts', interest: 'Corporate gifts' },
    serviceType: 'Corporate gift kits',
    seoKeywords: ['corporate gifts Vancouver', 'client gifts Vancouver', 'local corporate gift baskets BC'],
    inSitemap: true,
  },
  {
    slug: 'private-label',
    path: '/business/private-label',
    title: 'Private Label Soap & Perfume Made in BC',
    description:
      'Your brand on handmade soaps, perfumes, sprays and sachets, made in small batches in British Columbia. Request a quote.',
    h1: 'Private label: your brand, our craft',
    kicker: 'For business',
    trustLine: 'Tell us about your brand and we will confirm what is possible in your quote.',
    intro:
      'Launch or grow your own fragrance and bath line without building a production studio. We make perfumes, body mists, home sprays, soaps and sachets with your brand on them, handcrafted in small batches in British Columbia.',
    image: {
      src: '/videos/making-soap.webp',
      alt: 'Handmade soap being made at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'Products we can make for your brand',
        text: 'Eau de parfum, body mists, home and linen sprays, shea butter bar soaps and fragranced sachets. Tell us what your customers love and we will help you shape the range.',
      },
      {
        title: 'Handcrafted in small batches',
        text: 'The same hands-on approach behind our own collection: careful blending, attention to detail and consistent quality, ideal for boutiques, hotels, spas, gift companies and growing brands.',
      },
      {
        title: 'One partner, start to finish',
        text: 'From scent selection and samples to production and delivery, you deal with the same small team.',
      },
    ],
    audienceTitle: 'Who private label is for',
    audience: [
      'Boutiques and concept stores',
      'Hotels, spas and wellness brands',
      'Gift and corporate gifting companies',
      'Salons, clinics and influencers launching a line',
      'Local and online brands adding fragrance to their range',
    ],
    steps: [
      { title: 'Brief', text: 'Tell us about your brand, your customers and the products you have in mind.' },
      { title: 'Scent selection and samples', text: 'Choose from fragrance directions and test samples.' },
      { title: 'Packaging and labels', text: 'Agree the packaging and the label content for your brand.' },
      { title: 'Production and delivery', text: 'We produce your order by hand and deliver it to you.' },
    ],
    facts: [
      { label: 'Products', value: 'Perfumes, body mists, home sprays, soaps, sachets' },
      { label: 'Project start', value: B2B_CONFIG.privateLabelStart ? `From ${B2B_CONFIG.privateLabelStart}` : detail(null) },
      { label: 'Minimum order quantity', value: detail(B2B_CONFIG.minimumOrder) },
      { label: 'Production and delivery time', value: detail(B2B_CONFIG.leadTime) },
      { label: 'Pricing', value: 'Quoted per project' },
    ],
    faq: [
      { q: 'What is private label?', a: 'Private label means the product is made by us and sold under your brand name, with your own label and packaging.' },
      { q: 'Which products can you make?', a: 'Perfumes, body mists, home sprays, soaps and sachets. Tell us what you need and we will confirm what is possible.' },
      { q: 'Can I choose my own fragrance?', a: 'We suggest fragrance directions based on your brand and share samples before you decide.' },
      { q: 'When can we start?', a: PRIVATE_LABEL_TIMING },
      { q: 'Where do you deliver?', a: WHERE_WE_SERVE },
      { q: 'What are the minimum order quantities and lead times?', a: 'They depend on the product and the project. Send us your request and we will confirm both in your quote.' },
    ],
    topic: 'Private label',
    summary: 'Perfumes, body mists, home sprays, soaps and sachets made by us and sold under your brand.',
    related: [
      { label: 'Amenity soaps, sprays and sachets', href: '/business/amenities' },
      { label: 'Corporate gift kits', href: '/business/corporate-gifts' },
      { label: 'Shea butter soaps', href: '/shop/soaps' },
      { label: 'Perfumes', href: '/shop/perfumes' },
    ],
    prefill: { businessType: 'Retail or boutique', interest: 'Private label' },
    serviceType: 'Private label manufacturing of fragrance and bath products',
    seoKeywords: ['private label soap Canada', 'private label perfume Canada', 'custom soap manufacturer BC', 'white label fragrance'],
    inSitemap: true,
  },
  {
    // Hidden page: out of the menu, footer, hub and sitemap, and noindex, until Raquel has WRITTEN
    // authorization from the supplier and Miguel confirms (question A5 in the Marketing document).
    slug: 'fragrance-oils',
    path: '/business/fragrance-oils',
    title: 'Fragrance Oils for Makers',
    description:
      'Professional-grade fragrance oils and essential oils for candle, soap and cosmetics makers. Request samples and a quote.',
    h1: 'Fragrance oils and essential oils for makers',
    kicker: 'For makers',
    trustLine: 'Tell us what you make and we will suggest options.',
    intro: `Supplying the people who make. We offer ${OILS_SOURCE_TEXT}, for makers and manufacturers.`,
    image: {
      src: '/videos/blending-fragrance.webp',
      alt: 'Fragrance oils being blended by hand at the CS Fragrances studio',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'For candle, soap and cosmetics makers',
        text: 'Fragrance and essential oils for candles, soaps, body care and cosmetics, home fragrance and room aromatization.',
      },
      {
        title: 'Made-for-makers support',
        text: 'We know what it is like to formulate and produce by hand. Ask us about scent directions for your product type and how to test them.',
      },
      {
        title: 'Samples and quotes on request',
        text: 'We serve small studios and growing manufacturers. Samples and quotes on request.',
      },
    ],
    audienceTitle: 'Who it is for',
    audience: ['Candle makers', 'Soap and bath product makers', 'Cosmetics and personal care brands', 'Home fragrance and aromatization companies'],
    steps: [
      { title: 'Tell us what you make', text: 'Product type, scent direction and the volume you expect to use.' },
      { title: 'Receive samples', text: 'We suggest options and arrange samples so you can test them in your product.' },
      { title: 'Place your order', text: 'Confirm the oils, sizes and delivery in your quote.' },
    ],
    facts: [
      { label: 'Product types', value: 'Fragrance oils and essential oils' },
      { label: 'Minimum order and sizes', value: detail(B2B_CONFIG.minimumOrder) },
      { label: 'Catalogue and pricing', value: 'On request' },
    ],
    faq: [
      { q: 'Who can buy your fragrance oils?', a: 'Makers and manufacturers of candles, soaps, cosmetics and home fragrance. Tell us about your business when you request a quote.' },
      { q: 'Can I get samples before ordering?', a: 'Samples can be requested through the form on this page.' },
      { q: 'Are the oils safe for my product type?', a: 'Suitability depends on your product and on regulations in your market. Tell us what you make and we will point you to appropriate options. Always test in your own formula.' },
      { q: 'Do you offer essential oils too?', a: 'Fragrance oils and essential oils. Ask for what you need in your request.' },
    ],
    topic: 'Fragrance oils',
    summary: 'Professional-grade fragrance and essential oils for makers.',
    related: [],
    prefill: { businessType: 'Maker or manufacturer', interest: 'Fragrance oils' },
    formOptions: {
      businessTypes: ['Maker or manufacturer', 'Candle maker', 'Soap or bath products', 'Cosmetics or personal care', 'Other'],
      interests: ['Fragrance oils', 'Essential oils', 'Not sure yet'],
    },
    serviceType: 'Wholesale supply of fragrance oils and essential oils',
    seoKeywords: ['fragrance oil supplier Canada', 'candle fragrance oil Canada', 'soap fragrance oil wholesale'],
    inSitemap: false,
    noindex: true,
  },
];

export const findBusinessPage = (slug: string) => BUSINESS_PAGES.find((p) => p.slug === slug);

/** Pages shown in the hub, menus and related links (everything except the hidden ones). */
export const PUBLIC_BUSINESS_PAGES = BUSINESS_PAGES.filter((p) => p.inSitemap);
