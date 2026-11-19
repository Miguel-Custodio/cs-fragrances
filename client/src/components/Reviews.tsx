import { REVIEWS, type CustomerReview } from '@/data/reviews';
import { Star } from 'lucide-react';

/**
 * Shows real customer reviews. Renders nothing when there are none (no placeholder, no stars, no
 * count). Add genuine reviews in data/reviews.ts. No JSON-LD here on purpose (self-serving rule).
 */
export default function Reviews({ reviews = REVIEWS, heading = 'What customers say' }: { reviews?: CustomerReview[]; heading?: string }) {
  if (reviews.length === 0) return null;
  return (
    <section className="py-14 md:py-20" aria-labelledby="reviews-title">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 id="reviews-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">{heading}</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <li key={`${r.author}-${r.datePublished}`} className="rounded-lg bg-card p-6 shadow-sm">
              <p className="flex gap-1 text-accent" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }, (_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
                ))}
              </p>
              <blockquote className="mt-3 text-primary/90 leading-relaxed">{r.text}</blockquote>
              <p className="mt-3 text-sm text-muted-foreground">
                {r.author} ·{' '}
                <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {r.source}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
