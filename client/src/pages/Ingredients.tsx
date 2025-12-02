import Navigation from '@/components/Navigation';
import IngredientsSection from '@/components/IngredientsSection';
import Footer from '@/components/Footer';

export default function Ingredients() {
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
