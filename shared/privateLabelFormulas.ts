/**
 * SERVER ONLY. Imported by shared/privateLabelCalc.ts, which only the /api/private-label-calc functions use.
 * Never import this from client code (a build test checks the browser bundle).
 * Source: CS Ops table of 19/11/2026. Keep it private: no costs, no prices.
 */
export const FRAGRANCE_GRAMS: Record<string, number> = {
  edp: 10,
  'edp-30': 15,
  'body-mist': 6,
  'home-spray': 12.5,
  'bar-soap': 3,
  'ornament-soap': 1.8,
  sachet: 3,
  'wax-melt': 2.1,
  candle: 6,
  // pending confirmation (not listed): example values
  'decorated-soap': 1.8,
  'sample-2ml': 0.4,
};
