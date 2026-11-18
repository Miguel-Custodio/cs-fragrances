import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { usePageMeta, SITE_URL } from '@/hooks/usePageMeta';
import { BUSINESS_PAGES } from '@/data/business';
import { COMPANY } from '@shared/company';

const TITLE = 'For Business: Scent Marketing, Private Label & Fragrance Oils';
const DESCRIPTION =
  'Scent marketing, private label perfume and soap manufacturing, and fragrance oil supply for businesses in Vancouver, across Canada and in the USA. Handcrafted in British Columbia.';

const HUB_FAQ = [
  {
    q: 'What does CS Fragrances offer to businesses?',
    a: 'Three services: scent marketing for physical spaces, private label manufacturing of fragrance and bath products, and fragrance and essential oils for makers and manufacturers.',
  },
  {
    q: 'Which countries do you serve?',
    a: 'We work with businesses in Canada and in the USA.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Use the form on this page or on any service page. It opens an email to us, or you can write to us on WhatsApp.',
  },
];

const hubJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/business#webpage`,
      name: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}/business`,
      isPartOf: { '@id': `${SITE_URL}/#organization` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: BUSINESS_PAGES.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.h1,
          url: `${SITE_URL}${p.path}`,
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: HUB_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'For Business', item: `${SITE_URL}/business` },
      ],
    },
  ],
};

const SUMMARY: Record<string, string> = {
  'scent-marketing':
    'A signature scent for your store, hotel, clinic or office, so your space is remembered.',
  'private-label':
    'Perfumes, body mists, home sprays, soaps and sachets made by us and sold under your brand.',
  'fragrance-oils':
    'Professional-grade fragrance and essential oils for candle, soap and cosmetics makers in Canada and the USA.',
};

export default function Business() {
  usePageMeta(TITLE, DESCRIPTION, {
    path: '/business',
    ogImage: '/videos/blending-fragrance.webp',
    ogImageAlt: 'Fragrance oils being blended by hand at the CS Fragrances studio',
    jsonLd: hubJsonLd,
  });

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <header className="bg-primary text-primary-foreground">
          <div className="container max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
            <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-accent mb-3">For business</p>
            <h1 className="text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
              Fragrance solutions for your business
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-8">
              Scent marketing in Vancouver and beyond, private label perfume and soap made in British
              Columbia, and fragrance oils for makers across Canada and the USA.
            </p>
            <a
              href="#quote"
              className="inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground hover:bg-accent/85"
            >
              Request a quote
            </a>
          </div>
        </header>

        <section className="py-14 md:py-20">
          <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            {BUSINESS_PAGES.map((p) => (
              <a
                key={p.slug}
                href={p.path}
                className="block rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <h2 className="text-xl md:text-2xl text-primary mb-3">{p.topic}</h2>
                <p className="text-primary/85 leading-relaxed mb-4">{SUMMARY[p.slug]}</p>
                <span className="font-semibold text-primary underline underline-offset-4">Learn more</span>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl text-primary mb-6 text-center">Why work with us</h2>
            <ul className="space-y-4 text-lg text-primary/90">
              <li><strong>Handcrafted in small batches</strong> in British Columbia, with the same care as our own collection.</li>
              <li><strong>Science meets artistry:</strong> a family business led by a Chemistry-trained co-founder.</li>
              <li><strong>One small team</strong> from your first message to delivery in Canada or the USA.</li>
            </ul>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl text-primary mb-6 text-center">Frequently asked questions</h2>
            <div className="space-y-3">
              {HUB_FAQ.map((f) => (
                <details key={f.q} className="rounded-lg border border-border bg-card p-4">
                  <summary className="cursor-pointer font-semibold text-primary">{f.q}</summary>
                  <p className="mt-3 text-primary/85 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20" aria-labelledby="business-quote-title">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 id="business-quote-title" className="text-2xl md:text-3xl text-primary mb-2 text-center">Request a quote</h2>
            <p className="text-center text-primary/80 mb-8">Not sure which service you need? Tell us about your business.</p>
            <QuoteForm
              topic="General business inquiry"
              idPrefix="business"
              businessTypes={['Retail store', 'Hotel / spa / clinic', 'Brand or online store', 'Maker / manufacturer', 'Other']}
            />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Or write to us directly at <a className="underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
