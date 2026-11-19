import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RequestForms from '@/components/RequestForms';
import { usePageMeta } from '@/hooks/usePageMeta';

const COPY = {
  quote: {
    path: '/business/request-quote',
    name: 'Request a quote',
    title: 'Request a Quote for Your Business',
    description: 'Tell us about your business and get a tailored quote for scent, amenities, private label or corporate gifts. Handcrafted in BC.',
    h1: 'Request a quote',
    lead: 'Tell us about your business, your space and what you have in mind. We reply with a tailored quote.',
  },
  samples: {
    path: '/business/request-samples',
    name: 'Request samples',
    title: 'Request Samples for Your Business',
    description: 'Ask for samples or an on-site scent test for your hotel, spa, salon or office. Handcrafted in British Columbia.',
    h1: 'Request samples',
    lead: 'Ask for samples or an on-site scent test. Tell us a little about your space and we will get back to you.',
  },
} as const;

/** Standalone conversion pages (noindex, not in the sitemap): /business/request-quote and /business/request-samples. */
export default function BusinessRequest({ kind }: { kind: 'quote' | 'samples' }) {
  const c = COPY[kind];
  usePageMeta(c.title, c.description, { path: c.path, noindex: true });
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'For Business', path: '/business' },
            { name: c.name, path: c.path },
          ]}
        />
        <header className="container max-w-3xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl md:text-5xl text-primary mb-4">{c.h1}</h1>
          <p className="text-lg text-primary/85">{c.lead}</p>
        </header>
        <RequestForms idPrefix={`page-${kind}`} initialTab={kind} heading="Your details" />
      </main>
      <Footer />
    </div>
  );
}
