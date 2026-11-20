import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrivateLabelCalculator from '@/components/PrivateLabelCalculator';
import { usePageMeta } from '@/hooks/usePageMeta';
import { breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { B2B_CONFIG } from '@shared/b2bConfig';
import { CALCULATOR_PATH } from '@/data/scentMarketingCopy';

const TITLE = 'Private Label Batch Calculator';
const DESCRIPTION =
  'Plan your private label order: enter your kilograms of fragrance, mix any of our products and see how many units fit. Made in BC. Free samples.';

const jsonLd = [
  {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${CALCULATOR_PATH}#webpage`,
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${CALCULATOR_PATH}`,
    isPartOf: { '@id': ORG_ID },
    inLanguage: 'en-CA',
  },
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'For Business', path: '/business' },
    { name: 'Private label', path: '/business/private-label' },
    { name: 'Batch calculator', path: CALCULATOR_PATH },
  ]),
];

/** /business/private-label/calculator: standalone, indexable page with the batch calculator (no prices). */
export default function PrivateLabelCalculatorPage() {
  usePageMeta(TITLE, DESCRIPTION, {
    path: CALCULATOR_PATH,
    ogImage: '/og/private-label.jpg',
    ogImageAlt: 'Hands holding a handmade shea butter soap bar in a field of flowers',
    jsonLd,
  });
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'For Business', path: '/business' },
            { name: 'Private label', path: '/business/private-label' },
            { name: 'Batch calculator', path: CALCULATOR_PATH },
          ]}
        />
        <header className="container max-w-3xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl md:text-5xl text-primary mb-4">Plan your private label batch</h1>
          <p className="text-lg text-primary/85">
            Your brand on every product in our catalog, made with the fragrances you choose. The minimum order is one
            kilogram of fragrance, mixed across any products. Try the numbers here.
          </p>
        </header>
        <section className="pb-14">
          <div className="container max-w-4xl mx-auto px-4">
            <PrivateLabelCalculator headingLevel={2} idPrefix="calculator" />
          </div>
        </section>
        <section className="bg-secondary py-12">
          <div className="container max-w-3xl mx-auto px-4 text-primary/90 leading-relaxed space-y-3">
            <h2 className="text-2xl text-primary">How it works</h2>
            <p>
              Fragrance is the unit of your batch. Enter how many kilograms you want (minimum one), and 10% is counted as
              production loss. The rest is yours to spread across perfumes, body mists, home sprays, soaps, sachets,
              wax melts and candles, in any mix.
            </p>
            <p>
              Want us to take care of everything? Our optional turnkey service covers the artwork, labels and boxes, with
              your approval at each step. Samples are free. {B2B_CONFIG.meetingText}
            </p>
            <p>
              <a className="underline" href="/business/private-label">Back to private label</a> ·{' '}
              <a className="underline" href="/business#quote">Request a quote</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
