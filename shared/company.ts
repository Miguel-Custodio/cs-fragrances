export const COMPANY = {
  name: 'CS Fragrances',
  legalName: 'CS Fragrances Inc.',
  region: 'British Columbia, Canada',
  email: 'info@csfragrances.ca',
  whatsappDisplay: '+1 604 518 6863',
  whatsappNumber: '16045186863',
  instagram: '@bycsfragrances',
  siteUrl: 'https://www.csfragrances.ca',
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${COMPANY.whatsappNumber}`;
