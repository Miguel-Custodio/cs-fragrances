export default function HeroSection() {
  return (
    <section className="relative w-full h-screen md:h-[90vh] bg-gradient-to-br from-secondary to-primary-foreground flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <div className="container flex flex-col items-center justify-center text-center gap-6 md:gap-8">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-7xl font-bold text-primary leading-tight">
          Born from Passion<br className="hidden md:block" />
          Crafted with Love
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-2xl italic text-primary/80 max-w-2xl">
          Accessible sophistication with an artisanal heart
        </p>

        {/* CTA Button */}
        <button className="mt-4 md:mt-8 px-8 md:px-12 py-3 md:py-4 border-2 border-primary text-primary font-lora text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg">
          Discover Our Fragrances
        </button>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-foreground to-transparent pointer-events-none"></div>
    </section>
  );
}
