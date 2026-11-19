/**
 * The street address is NOT public (the business does not receive clients). Do not add it back to
 * the site or to structured data; a build check fails if the street number or postal code appear.
 */
export const COMPANY = {
  name: 'CS Fragrances',
  legalName: 'Comfyshop E-Commerce',
  city: 'Surrey',
  regionCode: 'BC',
  region: 'British Columbia, Canada',
  countryCode: 'CA',
  countryName: 'Canada',
  /** Canadian Business Number. Miguel will provide it from the other computer. */
  businessNumber: '[PLACEHOLDER: Business Number]',
  email: 'info@csfragrances.ca',
  whatsappDisplay: '+1 604 518 6863',
  whatsappNumber: '16045186863',
  instagram: '@bycsfragrances',
  siteUrl: 'https://www.csfragrances.ca',
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${COMPANY.whatsappNumber}`;
