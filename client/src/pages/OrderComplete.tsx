import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { COMPANY } from '@shared/company';

/** Square redirects here after a successful payment. */
export default function OrderComplete() {
  const { clearCart } = useCart();
  usePageMeta('Thank you for your order', 'Your CS Fragrances order has been received.', { noindex: true });

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = new URLSearchParams(window.location.search).get('ref');

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <div className="container max-w-xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Thank you!</h1>
          <p className="text-lg text-gray-700 mb-2">
            Your payment was received and your order is being prepared. Square will email you a receipt.
          </p>
          {ref && <p className="text-gray-600 mb-6">Order reference: {ref}</p>}
          <p className="text-gray-700 mb-8">
            Questions? Email {COMPANY.email} or WhatsApp {COMPANY.whatsappDisplay}.
          </p>
          <a href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold">
            Back to the shop
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
