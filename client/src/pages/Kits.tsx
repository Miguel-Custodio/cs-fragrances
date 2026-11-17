import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { KITS, kitToCartProduct } from '@/data/kits';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatCad } from '@shared/catalog';
import { COMPANY, WHATSAPP_BASE_URL } from '@shared/company';
import type { KitDef } from '@shared/kits';

function KitCard({ kit }: { kit: KitDef }) {
  const { addItem } = useCart();
  const [choice, setChoice] = useState(kit.option?.values[0]?.id ?? '');
  const priced = kit.priceCents !== null;

  const add = () => {
    const product = kitToCartProduct(kit, choice);
    if (!product) return;
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const askUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
    `Hello CS Fragrances! I'm interested in the "${kit.name}" Christmas kit. Is it available and what is the price?`,
  )}`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
      <div className="aspect-[4/5] bg-secondary overflow-hidden">
        {kit.image ? (
          <img src={kit.image} alt={`${kit.name} gift kit`} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary/20">CS</div>
        )}
      </div>
      <div className="p-4 md:p-6 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{kit.name}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{kit.contents}</p>

        {kit.option && (
          <div className="mb-4">
            <label htmlFor={`opt-${kit.id}`} className="text-sm font-medium text-primary">
              {kit.option.label}
            </label>
            <select
              id={`opt-${kit.id}`}
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
            >
              {kit.option.values.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {priced ? (
          <>
            <p className="text-2xl font-bold text-primary mb-4">{formatCad(kit.priceCents as number)}</p>
            <Button onClick={add} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-primary/70 mb-4">Price coming soon</p>
            <a
              href={askUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-lg border-2 border-primary text-primary font-semibold py-2 hover:bg-primary hover:text-white transition-colors"
            >
              Ask on WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  );
}

/** /kits - only routed when VITE_KITS_ENABLED=true (see App.tsx). */
export default function Kits() {
  usePageMeta(
    'Christmas Gift Kits',
    'Handcrafted Christmas gift kits from CS Fragrances: perfume, soap, sachets, candles and more.',
  );
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Christmas Gift Kits</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handcrafted gift sets, ready to give. Order by [PLACEHOLDER: Christmas order deadline] for delivery
              before Christmas.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Corporate or bulk gifts? Message us on WhatsApp {COMPANY.whatsappDisplay}.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {KITS.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
