import { SCENTEC_BRANDING_ENABLED } from '@/lib/flags';

/**
 * For Business (B2B) content. English only. No invented numbers: MOQ, lead times and prices are
 * [PLACEHOLDER] until Miguel/Raquel confirm them.
 *
 * Scentec / IFF names are shown ONLY when VITE_SCENTEC_BRANDING_ENABLED=true (Raquel's written
 * authorization still pending). Never add a logo.
 */

export const NEUTRAL_OILS_SOURCE =
  'professional-grade fragrance oils from a leading global fragrance house, through our authorized representative for Canada and the US';

export const OILS_SOURCE_TEXT = SCENTEC_BRANDING_ENABLED
  ? 'professional-grade fragrance oils from Scentec, a distributor of IFF fragrances, through our authorized representative for Canada and the US'
  : NEUTRAL_OILS_SOURCE;

export type BusinessSlug = 'scent-marketing' | 'private-label' | 'fragrance-oils';

export interface FaqItem {
  q: string;
  a: string;
}

export interface BusinessPageDef {
  slug: BusinessSlug;
  path: string;
  /** Page <title> (the site name is appended by usePageMeta). */
  title: string;
  description: string;
  h1: string;
  intro: string;
  kicker: string;
  image: { src: string; alt: string; width: number; height: number };
  blocks: { title: string; text: string }[];
  /** Section "Who it is for". */
  audienceTitle: string;
  audience: string[];
  /** "How it works" steps. */
  steps: { title: string; text: string }[];
  /** Extra facts shown as a list (may contain placeholders). */
  facts: { label: string; value: string }[];
  faq: FaqItem[];
  /** Options for the "type of business" field. */
  businessTypes: string[];
  /** Short label of the topic for the quote email / WhatsApp message. */
  topic: string;
  serviceType: string;
  /** Keywords/search phrases rendered naturally in the copy are listed here for the maintainers. */
  seoKeywords: string[];
}

export const BUSINESS_PAGES: BusinessPageDef[] = [
  {
    slug: 'scent-marketing',
    path: '/business/scent-marketing',
    title: 'Scent Marketing in Vancouver, Canada & the USA',
    description:
      'Scent marketing for stores, hotels, clinics and offices. Give your space a signature scent that people remember. Handcrafted in British Columbia. Request a quote.',
    h1: 'Scent marketing: give your space a signature scent',
    kicker: 'For business',
    intro:
      'People remember how a place feels. A carefully chosen scent turns a store, hotel, clinic or office into an experience, and becomes part of your brand. We design and supply scent for businesses in Vancouver, across Canada and in the USA.',
    image: {
      src: '/videos/making-sachets.webp',
      alt: 'Handmade scent sachets being weighed at the CS Fragrances studio in British Columbia',
      width: 406,
      height: 720,
    },
    blocks: [
      {
        title: 'A signature scent for your brand',
        text: 'We help you find the fragrance that fits your brand, your space and your customers, from fresh and clean to warm and welcoming. Your olfactory signature stays consistent in every location.',
      },
      {
        title: 'Scent for every kind of space',
        text: 'Retail stores, boutique and independent hotels, spas and wellness studios, medical and dental clinics, offices, showrooms and event venues.',
      },
      {
        title: 'Made by us, in small batches',
        text: 'Our own home sprays and sachets are handcrafted in British Columbia, so we can match a scent to your space and keep the quality consistent from order to order.',
      },
    ],
    audienceTitle: 'Who scent marketing is for',
    audience: [
      'Retail stores and boutiques',
      'Hotels, B&Bs and short-term rentals',
      'Clinics, spas and wellness studios',
      'Offices, showrooms and co-working spaces',
      'Restaurants, cafes and event venues',
    ],
    steps: [
      { title: 'Tell us about your space', text: 'Send us your type of business, the size of the space and the feeling you want to create.' },
      { title: 'We propose scents', text: 'We suggest fragrance directions and send samples so you can try them in your own space.' },
      { title: 'Approve your signature', text: 'Choose the scent that feels like your brand.' },
      { title: 'Delivery and refills', text: 'We supply your scent in the formats agreed in your quote, with simple repeat orders.' },
    ],
    facts: [
      { label: 'Service area', value: 'Vancouver, British Columbia, all of Canada and the USA' },
      { label: 'Formats and equipment', value: '[PLACEHOLDER: confirm formats offered, e.g. sprays, sachets, diffuser oils]' },
      { label: 'Minimum order', value: '[PLACEHOLDER: MOQ]' },
      { label: 'Lead time', value: '[PLACEHOLDER: lead time]' },
    ],
    faq: [
      {
        q: 'What is scent marketing?',
        a: 'Scent marketing, also called olfactive or ambient scenting, is the use of a consistent fragrance in a physical space to support the experience people have with your brand.',
      },
      {
        q: 'Which businesses can use a signature scent?',
        a: 'Stores, hotels, clinics, spas, offices, showrooms and event venues are common examples. If people spend time in your space, a signature scent can be part of the experience.',
      },
      {
        q: 'Can you create a scent just for my brand?',
        a: 'Yes. We start from your brand and your space, suggest fragrance directions and share samples, then refine the one you prefer.',
      },
      {
        q: 'Do you serve businesses outside Vancouver?',
        a: 'Yes. We work with businesses across Canada and in the USA. Request a quote and tell us where you are located.',
      },
    ],
    businessTypes: ['Retail store', 'Hotel / lodging', 'Clinic / spa / wellness', 'Office / showroom', 'Restaurant / venue', 'Other'],
    topic: 'Scent marketing',
    serviceType: 'Scent marketing and ambient fragrance design',
    seoKeywords: ['scent marketing Vancouver', 'scent marketing Canada', 'scent marketing USA', 'ambient scenting', 'signature scent for business'],
  },
  {
    slug: 'private-label',
    path: '/business/private-label',
    title: 'Private Label Perfume & Soap Manufacturer in Canada',
    description:
      'Private label perfume, body mist, home spray, soap and sachet manufacturing in British Columbia. Your brand, our handcrafted production. Request a quote or samples.',
    h1: 'Private label: your brand, our craft',
    kicker: 'For business',
    intro:
      'Launch or grow your own fragrance and bath line without building a production studio. We make perfumes, body mists, home sprays, soaps and sachets with your brand on them, handcrafted in small batches in British Columbia, Canada.',
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
        text: 'From scent selection and samples to production and delivery across Canada and the USA, you deal with the same small team.',
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
      { title: 'Production and delivery', text: 'We produce your order by hand and ship it to you.' },
    ],
    facts: [
      { label: 'Products', value: 'Perfumes, body mists, home sprays, soaps, sachets' },
      { label: 'Minimum order quantity', value: '[PLACEHOLDER: MOQ per product]' },
      { label: 'Production and delivery time', value: '[PLACEHOLDER: lead time]' },
      { label: 'Pricing', value: 'Quoted per project' },
    ],
    faq: [
      {
        q: 'What is private label?',
        a: 'Private label means the product is made by us and sold under your brand name, with your own label and packaging.',
      },
      {
        q: 'Which products can you make?',
        a: 'Perfumes, body mists, home sprays, soaps and sachets. Tell us what you need and we will confirm what is possible.',
      },
      {
        q: 'Can I choose my own fragrance?',
        a: 'Yes. We will suggest fragrance directions based on your brand and share samples before you decide.',
      },
      {
        q: 'Do you ship to the USA?',
        a: 'Yes, we deliver across Canada and to the USA. Tell us your location when you request a quote.',
      },
      {
        q: 'What are the minimum order quantities and lead times?',
        a: 'They depend on the product and the project. Send us your request and we will confirm both in your quote.',
      },
    ],
    businessTypes: ['Boutique / retail', 'Hotel / spa / wellness', 'Gift / corporate gifting', 'Brand or influencer', 'Online store', 'Other'],
    topic: 'Private label',
    serviceType: 'Private label manufacturing of fragrance and bath products',
    seoKeywords: ['private label perfume Canada', 'white label fragrance', 'private label soap Canada', 'contract manufacturing fragrance'],
  },
  {
    slug: 'fragrance-oils',
    path: '/business/fragrance-oils',
    title: 'Fragrance Oil Supplier for Canada & the USA',
    description:
      'Professional-grade fragrance oils and essential oils for candle, soap and cosmetics makers in Canada and the USA. Request samples and a quote.',
    h1: 'Fragrance oils and essential oils for makers',
    kicker: 'For business',
    intro: `Supplying the people who make. We offer ${OILS_SOURCE_TEXT}, for makers and manufacturers in Canada and the USA.`,
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
        title: 'Canada and USA',
        text: 'We serve small studios and growing manufacturers on both sides of the border. Samples and quotes on request.',
      },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      'Candle makers',
      'Soap and bath product makers',
      'Cosmetics and personal care brands',
      'Home fragrance and aromatization companies',
      'Hobbyists scaling into a business',
    ],
    steps: [
      { title: 'Tell us what you make', text: 'Product type, scent direction and the volume you expect to use.' },
      { title: 'Receive samples', text: 'We suggest options and arrange samples so you can test them in your product.' },
      { title: 'Place your order', text: 'Confirm the oils, sizes and delivery in your quote.' },
      { title: 'Reorder easily', text: 'Repeat orders for the scents that work for you.' },
    ],
    facts: [
      { label: 'Product types', value: 'Fragrance oils and essential oils' },
      { label: 'Markets', value: 'Canada and the USA' },
      { label: 'Minimum order and sizes', value: '[PLACEHOLDER: MOQ and sizes]' },
      { label: 'Catalogue and pricing', value: '[PLACEHOLDER: catalogue and price list, on request]' },
    ],
    faq: [
      {
        q: 'Who can buy your fragrance oils?',
        a: 'Makers and manufacturers of candles, soaps, cosmetics and home fragrance in Canada and the USA. Tell us about your business when you request a quote.',
      },
      {
        q: 'Can I get samples before ordering?',
        a: 'Yes. Samples can be requested through the form on this page.',
      },
      {
        q: 'Are the oils safe for my product type?',
        a: 'Suitability depends on your product and on regulations in your market. Tell us what you make and we will point you to appropriate options. Always test in your own formula.',
      },
      {
        q: 'Do you offer essential oils too?',
        a: 'Yes, fragrance oils and essential oils. Ask for what you need in your request.',
      },
    ],
    businessTypes: ['Candle maker', 'Soap / bath products', 'Cosmetics / personal care', 'Home fragrance / aromatization', 'Hobbyist scaling up', 'Other'],
    topic: 'Fragrance oils',
    serviceType: 'Wholesale supply of fragrance oils and essential oils',
    seoKeywords: ['fragrance oil supplier Canada', 'fragrance oil supplier USA', 'candle fragrance oil Canada', 'soap fragrance oil wholesale'],
  },
];

export const findBusinessPage = (slug: string) => BUSINESS_PAGES.find((p) => p.slug === slug);
