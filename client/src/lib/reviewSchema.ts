import type { CustomerReview } from '@/data/reviews';
import { REVIEWS } from '@/data/reviews';

/**
 * Review markup for ONE product, built only from real reviews of that product.
 * Returns undefined when there are none, so nothing is ever emitted with fake or empty data.
 */
export function productReviewSchema(
  product: { id: string; name: string },
  reviews: CustomerReview[] = REVIEWS,
): Record<string, unknown> | undefined {
  const mine = reviews.filter((r) => r.productId === product.id);
  if (mine.length === 0) return undefined;
  const total = mine.reduce((sum, r) => sum + r.rating, 0);
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number((total / mine.length).toFixed(1)),
      reviewCount: mine.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: mine.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.datePublished,
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      url: r.sourceUrl,
    })),
  };
}
