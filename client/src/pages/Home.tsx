import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import HeroSection from '@/components/HeroSection';
import PerfumesSection from '@/components/PerfumesSection';
import FragranceDetailsSection from '@/components/FragranceDetailsSection';
import InstagramFeedSection from '@/components/InstagramFeedSection';
import IngredientsSection from '@/components/IngredientsSection';
import StorySection from '@/components/StorySection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Hero Section */}
        <HeroSection />

        {/* Perfumes Section */}
        <PerfumesSection />

        {/* Fragrance Details Section */}
        <FragranceDetailsSection />

        {/* Instagram Feed Section */}
        <InstagramFeedSection />

        {/* Ingredients Section */}
        <IngredientsSection />

        {/* Story Section */}
        <StorySection />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
