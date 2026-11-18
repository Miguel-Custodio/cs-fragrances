export const COMPANY = {
  name: 'CS Fragrances',
  legalName: 'Comfyshop E-Commerce',
  addressLine: '112-15738 85 Ave',
  city: 'Surrey',
  regionCode: 'BC',
  region: 'British Columbia, Canada',
  postalCode: 'V4N 6Y1',
  countryCode: 'CA',
  countryName: 'Canada',
  formattedAddress: '112-15738 85 Ave, Surrey, BC V4N 6Y1, Canada',
  /** Canadian Business Number. Miguel will provide it from the other computer. */
  businessNumber: '[PLACEHOLDER: Business Number]',
  email: 'info@csfragrances.ca',
  whatsappDisplay: '+1 604 518 6863',
  whatsappNumber: '16045186863',
  instagram: '@bycsfragrances',
  siteUrl: 'https://www.csfragrances.ca',
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${COMPANY.whatsappNumber}`;
