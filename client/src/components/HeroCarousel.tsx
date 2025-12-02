import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: '/images/Studio_4 Fragrances.png',
    title: 'Discover Our Collection',
    subtitle: 'Four exquisite fragrances crafted with passion',
    cta: 'Shop Now',
  },
  {
    id: 2,
    image: '/images/Studio_CS Her.png',
    title: 'CS Her - Sunshine',
    subtitle: 'Elegant floral chypré for the modern woman',
    cta: 'Explore',
  },
  {
    id: 3,
    image: '/images/Studio_CS Origin.png',
    title: 'CS Origin - God of Fire',
    subtitle: 'Oriental woody fragrance with mystery',
    cta: 'Explore',
  },
  {
    id: 4,
    image: '/images/Studio_CS Enigma.png',
    title: 'CS Enigma - Wild Essence',
    subtitle: 'Spicy woody for the modern man',
    cta: 'Explore',
  },
  {
    id: 5,
    image: '/images/Studio_CS Horizon.png',
    title: 'CS Horizon - Eros',
    subtitle: 'Aromatic woody capturing new beginnings',
    cta: 'Explore',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const slide = carouselSlides[currentSlide];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        {carouselSlides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl mb-8 text-gray-100 animate-fade-in">
              {slide.subtitle}
            </p>
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors animate-fade-in">
              {slide.cta}
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={32} className="text-white" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add animation for fade-in effect */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
