import { Sparkles, Package } from 'lucide-react';

const CARDS = [
  {
    icon: Sparkles,
    title: 'Scent marketing',
    text: 'A signature scent for your store, hotel, clinic or office.',
    href: '/business/scent-marketing',
  },
  {
    icon: Package,
    title: 'Private label',
    text: 'Perfumes, body mists, home sprays, soaps and sachets under your brand.',
    href: '/business/private-label',
  },
];

/** Home teaser for the B2B section (/business). */
export default function ForBusinessSection() {
  return (
    <section id="business" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-accent mb-3">For business</p>
          <h2 className="text-3xl md:text-5xl text-primary-foreground mb-4">Fragrance for your brand</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Beyond our own collection, we create scent solutions for businesses and private label
            products made by hand in British Columbia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map(({ icon: Icon, title, text, href }) => (
            <a
              key={href}
              href={href}
              className="block rounded-lg border border-primary-foreground/20 p-6 hover:bg-primary-foreground/10 transition-colors"
            >
              <Icon className="h-8 w-8 text-accent mb-4" aria-hidden="true" />
              <h3 className="text-xl text-primary-foreground mb-2">{title}</h3>
              <p className="text-primary-foreground/80">{text}</p>
              <span className="mt-4 inline-block text-accent font-semibold">Learn more</span>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="/business"
            className="inline-block px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/85 transition-colors"
          >
            Explore For Business
          </a>
        </div>
      </div>
    </section>
  );
}
