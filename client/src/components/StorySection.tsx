export default function StorySection() {
  return (
    <section id="story" className="py-24 md:py-32 bg-secondary">
      <div className="container max-w-4xl mx-auto">
        <h2 className="section-title text-primary text-center mb-12 md:mb-16">Our Story</h2>

        <div className="space-y-6 md:space-y-8 text-center">
          <p className="text-lg md:text-xl text-primary leading-relaxed md:leading-loose">
            Every fragrance begins with a story. Ours began with two names: Custódio and Soncin.
          </p>
          <p className="text-lg md:text-xl text-primary leading-relaxed md:leading-loose">
            When Miguel and Raquel first met, she was already making soap. He sold those soaps
            during college to help her pay for her Chemistry studies. Today, CS Fragrances is their
            family-owned studio in British Columbia, where science meets artistry — handmade with
            care in Canada.
          </p>
          <p>
            <a
              href="/about"
              className="inline-block mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Read our story
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
