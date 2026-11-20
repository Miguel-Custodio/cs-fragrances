/**
 * Scent for your space: the copy that describes the 5-step flow, in ONE place.
 * Flow decided by Miguel (19/11/2026): briefing -> samples we select -> scent choice -> space size ->
 * equipment selection and proposal. Text is Marketing's v3 (/workspace/gestao/b2b-storytelling-seo.md,
 * B2, B3.1, B6, C3), verbatim except where noted. No equipment or model is promised, no price,
 * and "free" is only said if B2B_CONFIG.freeSamples is true.
 */
import { B2B_CONFIG } from '@shared/b2bConfig';
import { BUSINESS_TYPES } from '@shared/requestMessages';

export const BRIEFING_PATH = '/business/scent-briefing';
export const CALCULATOR_PATH = '/business/private-label/calculator';

/** "free " only while Miguel's decision stands (b2bConfig.freeSamples; confirmed 19/11/2026). */
export const FREE = B2B_CONFIG.freeSamples ? 'free ' : '';

export const SCENT_MARKETING_COPY = {
  // C3: title 58 characters with the site name, meta under 155.
  title: 'Signature Scent for Salons, Clinics & Spas',
  description:
    'A signature scent for your salon, barbershop, clinic or spa, chosen from samples we send you. Made in BC, serving Vancouver and the Lower Mainland.',
  h1: 'A signature scent for your space',
  // B3.1 headline and story.
  headline: 'The first thing guests notice is how your space smells.',
  intro:
    'A scent works on memory before words do. When a salon, clinic or studio smells the same every time, clients come to read it as part of the brand: calm, clean, warm. We begin with what you like, not with a catalogue. You send us a short briefing, we select a few scents and send you samples, and you choose the one that feels like your brand. Then you tell us the size of your space, we select the right diffusion equipment for it and send you a proposal. Our home sprays and sachets are handmade in BC, so the scent you choose is the scent you get next time too.',
  proofPoints: [
    'Handmade in small batches',
    'You choose from samples we send',
    'Equipment selected for your space',
    'One contact for adjustments',
    'No obligation before the proposal',
    'Machine on loan and monthly maintenance',
  ],
  // B6 CTA labels: long form for the hub, short form everywhere else.
  primaryCtaLong: "Send us a short scent briefing, we'll send samples",
  primaryCta: 'Send your scent briefing',
  secondaryCta: 'Request a quote',
  // B3.1 short snippet and B2 line under the CTAs.
  shortSnippet:
    "Send us a short scent briefing and we'll send samples. Choose your scent, tell us the size of your space, and we select the right diffusion equipment and send you a proposal. No obligation.",
  underCtas: `Tell us what you like. We select and send the ${FREE}samples. No obligation.`,
  trustLine: 'Send a short briefing, we send the samples. No obligation before the proposal.',
  // B2: "How scent for your space works (5 steps)".
  steps: [
    { title: 'Send your briefing', text: "Tell us about your space and the scents, notes and mood you like (and the ones you don't)." },
    { title: 'We send samples', text: `We select two or three scents for your briefing and send you the ${FREE}samples.` },
    { title: 'You choose your scent', text: 'Smell them in your own space, take your time and tell us which one feels like your brand.' },
    { title: 'Share the size of your space', text: 'Approximate square footage (and the number of rooms or zones, if you know).' },
    {
      title: 'We send your proposal',
      text: 'We select the right diffusion equipment for your space and send a proposal for the fragrance, the machine on loan and the monthly maintenance. A proposal comes only after you have chosen your scent.',
    },
  ],
  // B2 FAQ 2.
  faqFlow: {
    q: 'How does scent for my space work?',
    a: 'Send us a short briefing about your space and the scents you like. We select two or three scents and send you samples. You choose your scent and tell us the size of your space, and we select the right diffusion equipment for it and send you a proposal. No obligation along the way.',
  },
  // B2 "What we offer": scent line, without the placeholder.
  equipmentFact: 'We select the right diffusion equipment for your space and send a proposal.',
  // B6 briefing form page.
  briefingPage: {
    title: 'Send Your Scent Briefing',
    description:
      'Tell us about your space and the scents you like. We send samples, then propose the right equipment. Made in BC, serving Vancouver and the Lower Mainland.',
    h1: 'Tell us about your space',
    text: `Tell us what you like and we will select ${FREE}samples for you. No obligation.`,
  },
  formHeading: 'Your scent briefing',
  formIntro: `Tell us what you like and we will select ${FREE}samples for you. No obligation.`,
  briefingTab: 'Scent briefing',
} as const;

/** B2 final CTA. */
export const FINAL_CTA = {
  headline: 'Let’s find the scent of your business.',
  text: `Tell us what you like. We send the ${FREE}samples. No obligation. A real person answers.`,
} as const;

/** B6 quote form microcopy. */
export const QUOTE_MICROCOPY = 'Tell us what you need and we will come back with a recommendation. A quote is not a commitment.';

/** Briefing form: same list as the type of business (B6). */
export const SPACE_TYPES = BUSINESS_TYPES;

// Shown only if the owner decides samples are free (b2bConfig.freeSamples); otherwise never says "free".
export const BRIEFING_NO_OBLIGATION = B2B_CONFIG.freeSamples ? 'free of charge and with no obligation' : 'with no obligation';
