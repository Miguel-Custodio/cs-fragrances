import { perfumes } from '@/data/products';
import { fragranceDetails } from '@/data/fragrance_details';

/**
 * "Discover the notes": for each perfume, the photo of the bottle with its ingredients next to the
 * top / heart / base notes. Helps first-time visitors who do not know the scents yet.
 */
export default function DiscoverNotes({ heading = 'h2' }: { heading?: 'h2' | 'h3' }) {
  const H = heading;
  return (
    <section id="notes" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-muted-foreground mb-3">
            New to CS?
          </p>
          <H className="text-3xl md:text-5xl text-primary mb-4">Discover the notes</H>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            See what goes into each bottle: the ingredients you can almost smell, and the notes that
            unfold from the first spritz to the last.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {perfumes.map((p) => {
            const detail = fragranceDetails.find((d) => d.productId === p.id);
            if (!p.notes || !p.ingredientImage) return null;
            return (
              <article key={p.id} className="grid grid-cols-5 bg-card rounded-lg overflow-hidden shadow-sm">
                <img
                  src={p.ingredientImage}
                  alt={`${p.name} eau de parfum bottle surrounded by its ingredients`}
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="col-span-2 h-full w-full object-cover"
                />
                <div className="col-span-3 p-5 md:p-6 flex flex-col">
                  <h3 className="text-xl md:text-2xl text-primary">{p.name}</h3>
                  {detail && <p className="text-sm text-muted-foreground mb-3">{detail.family}</p>}
                  <dl className="text-sm md:text-base text-primary/90 space-y-2 flex-1">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">Top</dt>
                      <dd>{p.notes.top}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">Heart</dt>
                      <dd>{p.notes.heart}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">Base</dt>
                      <dd>{p.notes.base}</dd>
                    </div>
                  </dl>
                  <a
                    href="/shop/perfumes"
                    className="mt-4 inline-block self-start text-primary font-semibold underline underline-offset-4 hover:text-accent-foreground"
                  >
                    Shop {p.name} (CAD ${p.price.toFixed(2)})
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
