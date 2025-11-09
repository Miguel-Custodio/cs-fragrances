import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PerfumesSection from '@/components/PerfumesSection';
import SoapSection from '@/components/SoapSection';
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
        {/* Hero Section */}
        <HeroSection />

        {/* Perfumes Section */}
        <PerfumesSection />

        {/* Soaps Section */}
        <SoapSection />

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
