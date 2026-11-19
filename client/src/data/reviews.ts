/**
 * REAL customer reviews only. Leave the list empty until genuine reviews exist.
 *
 * Rules (see /workspace/gestao/b2b-storytelling-seo.md, section C5):
 *  - Copy reviews exactly as written, unedited, with the reviewer's first name and a link to where they
 *    were posted (for example the Google Business Profile). Never write, edit or invent a review.
 *  - Amazon reviews stay on Amazon: do not copy them here.
 *  - The Reviews component shows nothing while this list is empty, and no Review / AggregateRating
 *    JSON-LD is produced (lib/reviewSchema.ts).
 *  - Schema is only emitted for reviews of a specific PRODUCT (set productId) because Google treats
 *    reviews of your own business that you host yourself as self-serving. Business reviews are
 *    displayed on the page but are not marked up.
 */
export interface CustomerReview {
  /** Reviewer first name, as published. */
  author: string;
  /** Whole number 1 to 5, exactly as given by the reviewer. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** The review text, unedited. */
  text: string;
  /** ISO date (YYYY-MM-DD) the review was posted. */
  datePublished: string;
  /** Where it was posted, e.g. 'Google'. */
  source: string;
  /** Link to the review or profile where a visitor can verify it. */
  sourceUrl: string;
  /** Catalog product id when the review is about one product (enables Product schema). */
  productId?: string;
}

export const REVIEWS: CustomerReview[] = [];
