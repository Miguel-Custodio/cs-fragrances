export default function StorySection() {
  return (
    <section id="story" className="py-24 md:py-32 bg-secondary">
      <div className="container max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="section-title text-primary text-center mb-12 md:mb-16">
          Our Story
        </h2>

        {/* Content */}
        <div className="space-y-6 md:space-y-8 text-center">
          <p className="text-lg md:text-xl text-primary leading-relaxed md:leading-loose">
            At CS Fragrances, we believe that every scent tells a story. Founded on the principle that luxury should be accessible to everyone, we craft fragrances that celebrate the beauty of life's most precious moments. Each bottle is a testament to our commitment to quality, artistry, and authenticity.
          </p>

          <p className="text-lg md:text-xl text-primary leading-relaxed md:leading-loose">
            Our master perfumers blend rare ingredients sourced from around the world, creating unique olfactory experiences that transcend the ordinary. We don't just create fragrances; we create memories, emotions, and connections that last a lifetime.
          </p>

          <p className="text-lg md:text-xl text-primary leading-relaxed md:leading-loose">
            With a passion for excellence and a dedication to sustainability, CS Fragrances represents the perfect balance between sophistication and accessibility. Discover the art of fragrance, where passion meets craftsmanship in every spray.
          </p>
        </div>
      </div>
    </section>
  );
}
