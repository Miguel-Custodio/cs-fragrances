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
  /** BC Business Summary (Miguel, 2026-11-19): sole proprietorship. */
  businessType: 'BC sole proprietorship',
  registrationNumber: 'FM1064689',
  businessNumber: '788282168BC0001',
  email: 'info@csfragrances.ca',
  whatsappDisplay: '+1 604 518 6863',
  whatsappNumber: '16045186863',
  instagram: '@bycsfragrances',
  siteUrl: 'https://www.csfragrances.ca',
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${COMPANY.whatsappNumber}`;
