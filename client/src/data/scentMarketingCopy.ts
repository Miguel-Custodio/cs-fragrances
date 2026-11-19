/**
 * Scent marketing: the copy that describes the 5-step flow, in ONE place so Marketing's final text can
 * replace it easily. Flow decided by Miguel (19/11/2026):
 * client briefing -> samples we select -> scent choice -> space size -> machine selection and proposal.
 *
 * Page headline, story and proof points come from /workspace/gestao/b2b-storytelling-seo.md (B3.1, C3).
 * The step texts below are NEUTRAL placeholders until Marketing sends the final copy.
 */
import { B2B_CONFIG } from '@shared/b2bConfig';

export const SCENT_MARKETING_COPY = {
  // Marketing, C3 (title 58 characters with the site name, meta under 155).
  title: 'Signature Scent for Salons, Clinics & Spas',
  description:
    'A signature scent for your salon, barbershop, clinic or spa, tested in your space first. Made in BC, serving Vancouver and the Lower Mainland.',
  h1: 'A signature scent for your space',
  // Marketing, B3.1 headline and story.
  headline: 'The first thing guests notice is how your space smells.',
  intro:
    'A scent works on memory before words do. When a salon, clinic or studio smells the same every time, clients come to read it as part of the brand: calm, clean, warm. We begin with your space and the feeling you want, not with a catalogue. Our home sprays and sachets are handmade in BC, so the scent you choose is the scent you get next time too.',
  proofPoints: [
    'Handmade in small batches',
    'We choose the samples with you, from your briefing',
    'One contact for adjustments',
    'No obligation before the proposal',
  ],
  // CTA labels (primary, secondary).
  primaryCta: 'Start your scent briefing',
  secondaryCta: 'Request a quote',
  trustLine: 'Start with a short briefing. No obligation before the proposal.',
  // Neutral step texts (replace when Marketing sends the final copy).
  steps: [
    { title: 'Tell us what you like', text: 'Fill in a short briefing: the scents and notes you like and dislike, the mood you want, and the type of space.' },
    { title: 'We select samples for you', text: 'From your briefing we choose a small set of scent samples for you to try.' },
    { title: 'You choose your scent', text: 'Try the samples and pick the scent that feels like your brand.' },
    { title: 'Share the size of your space', text: 'Tell us the approximate size of the space so we can size the solution to the room.' },
    { title: 'Machine selection and proposal', text: 'We select the equipment that suits your space and send a tailored written proposal.' },
  ],
  faqFlow: {
    q: 'How does it work?',
    a: 'It starts with a short briefing about what you like. We then select a few scent samples for you, you choose your scent, and you tell us the approximate size of your space. After that we select the equipment that suits the room and send a tailored written proposal.',
  },
  equipmentFact: 'Chosen after you pick your scent and share the size of your space.',
  // Briefing form microcopy.
  formHeading: 'Your scent briefing',
  formIntro:
    'Tell us what you like and about your space. We will select samples for you and take it from there. The size of the space is optional at this stage.',
  briefingTab: 'Scent briefing',
} as const;

export const SCENT_FAMILIES = [
  'Fresh and clean',
  'Citrus',
  'Floral',
  'Fruity',
  'Woody',
  'Warm and sweet',
  'Soft and quiet',
  'Not sure yet',
] as const;

export const SCENT_MOODS = ['Calm', 'Fresh and energizing', 'Warm and welcoming', 'Luxurious', 'Clean and neutral', 'Not sure yet'] as const;

export const SPACE_TYPES = [
  'Hotel',
  'Spa or wellness',
  'Salon or barbershop',
  'Clinic or gym',
  'Retail or boutique',
  'Office',
  'Other',
] as const;

// Referenced so a future "free" decision is shown consistently (see b2bConfig.freeSamples).
export const BRIEFING_NO_OBLIGATION = B2B_CONFIG.freeSamples ? 'free of charge and with no obligation' : 'with no obligation';
