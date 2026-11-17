import { KITS_ENABLED } from '@/lib/flags';

/** Home-page teaser for the Christmas kits. Renders nothing unless VITE_KITS_ENABLED=true. */
export default function KitsBanner() {
  if (!KITS_ENABLED) return null;
  return (
    <section className="py-12 bg-secondary">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Christmas Gift Kits</h2>
        <p className="text-lg text-primary/80 mb-6">
          Handcrafted gift sets with perfume, soap, sachets and more - ready to give.
        </p>
        <a
          href="/kits"
          className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Shop Christmas Kits
        </a>
      </div>
    </section>
  );
}
