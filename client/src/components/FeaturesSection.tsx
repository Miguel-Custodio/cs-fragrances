interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: '✨',
    title: 'Artisanal Quality',
    description: 'Handcrafted fragrances using premium ingredients from around the world',
  },
  {
    id: 2,
    icon: '🌿',
    title: 'Sustainable',
    description: 'Eco-friendly packaging and ethically sourced materials',
  },
  {
    id: 3,
    icon: '💝',
    title: 'Long-Lasting',
    description: 'Exceptional longevity with a sophisticated scent profile',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-primary-foreground">
      <div className="container">
        {/* Section Title */}
        <h2 className="section-title text-primary text-center mb-16 md:mb-24">
          Why Choose CS
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card text-center p-8 md:p-10 rounded-lg bg-card shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="text-6xl md:text-7xl mb-4 md:mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-primary/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
