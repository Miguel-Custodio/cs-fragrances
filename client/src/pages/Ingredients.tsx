import Navigation from '@/components/Navigation';
import IngredientsSection from '@/components/IngredientsSection';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Ingredients() {
  usePageMeta(
    'Ingredients and allergens',
    'Ingredient and allergen information for CS Fragrances perfumes, body mists, home sprays, soaps and sachets, handmade in British Columbia.',
    { path: '/ingredients' },
  );
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {/* Ingredients Section */}
        <IngredientsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
