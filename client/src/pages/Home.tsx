import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import BenefitsBar from '@/components/BenefitsBar';
import CategoriesSection from '@/components/CategoriesSection';
import PerfumesSection from '@/components/PerfumesSection';
import DiscoverNotes from '@/components/DiscoverNotes';
import KitsBanner from '@/components/KitsBanner';
import HandmadeWithCare from '@/components/HandmadeWithCare';
import StorySection from '@/components/StorySection';
import ForBusinessSection from '@/components/ForBusinessSection';
import StayInTouch from '@/components/StayInTouch';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const HOME_TITLE = 'CS Fragrances | Artisanal Perfumes & Handmade Shea Butter Soap | British Columbia, Canada';
const HOME_DESCRIPTION =
  'Artisanal eau de parfum, handmade shea butter soap, body mists, home sprays and gifts, made by hand in small batches in British Columbia. Shipping across Canada and the US.';

export default function Home() {
  usePageMeta(HOME_TITLE, HOME_DESCRIPTION, {
    path: '/',
    ogImage: '/images/Studio_4 Fragrances.webp',
    ogImageAlt: 'CS Horizon, CS Enigma, CS Her and CS Origin eau de parfum bottles',
  });

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1">
        {/* Full-width hero carousel with production-video background */}
        <HeroCarousel />
        <BenefitsBar />
        <CategoriesSection />
        {/* Best sellers: perfumes, ingredients photo on hover */}
        <PerfumesSection />
        <DiscoverNotes />
        {/* Christmas kits banner (hidden unless VITE_KITS_ENABLED=true) */}
        <KitsBanner />
        <HandmadeWithCare />
        <StorySection />
        <ForBusinessSection />
        <StayInTouch />
      </main>
      <Footer />
    </div>
  );
}
