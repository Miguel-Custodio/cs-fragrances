/** Home teaser for /about. */
export default function StorySection() {
  return (
    <section id="story" className="py-16 md:py-24 bg-primary-foreground">
      <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <img
          src="/about/family.webp"
          alt="Miguel Custodio, Ana Raquel Soncin and their two sons, the family behind CS Fragrances"
          width={960}
          height={1200}
          loading="lazy"
          decoding="async"
          className="w-full max-w-sm mx-auto aspect-[4/5] object-cover rounded-lg shadow-sm"
        />
        <div>
          <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-muted-foreground mb-3">
            Our story
          </p>
          <h2 className="text-3xl md:text-4xl text-primary mb-5">Ours began with two names</h2>
          <p className="text-lg text-primary/85 leading-relaxed mb-4">
            When Miguel met Raquel, she was making handmade soap and he sold it during college to
            help pay for her Chemistry studies. Today the two of us are building CS Fragrances
            together with our family: science meets artistry, made by hand in British Columbia.
          </p>
          <a
            href="/about"
            className="inline-block px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Read our story
          </a>
        </div>
      </div>
    </section>
  );
}
