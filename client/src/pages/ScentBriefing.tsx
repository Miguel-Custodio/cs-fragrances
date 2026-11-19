import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ScentBriefingForm } from '@/components/RequestForms';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BRIEFING_PATH, SCENT_MARKETING_COPY as SM } from '@/data/scentMarketingCopy';
import { B2B_CONFIG } from '@shared/b2bConfig';

/**
 * /business/scent-briefing: the first step of scent for your space (Marketing v3, B6, C3).
 * Indexed (in the sitemap). Reuses ScentBriefingForm: email (mailto) or WhatsApp, CASL consent,
 * optional square footage. No backend, no price, no equipment or model promised.
 */
export default function ScentBriefing() {
  const c = SM.briefingPage;
  usePageMeta(c.title, c.description, {
    path: BRIEFING_PATH,
    ogImage: '/og/scent-marketing.jpg',
    ogImageAlt: 'A CS Fragrances eau de parfum bottle on a mirror surrounded by white roses',
    jsonLd: [{ '@type': 'WebPage', name: c.title, description: c.description }],
  });
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'For Business', path: '/business' },
            { name: 'Scent briefing', path: BRIEFING_PATH },
          ]}
        />
        <header className="container max-w-3xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl md:text-5xl text-primary mb-4">{c.h1}</h1>
          <p className="text-lg text-primary/85">{c.text}</p>
        </header>

        <section className="bg-secondary py-12" aria-labelledby="briefing-form-title">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 id="briefing-form-title" className="text-2xl md:text-3xl text-primary mb-6 text-center">{SM.formHeading}</h2>
            <ScentBriefingForm idPrefix="briefing-page" />
          </div>
        </section>

        <section className="py-12 md:py-16" aria-labelledby="briefing-steps-title">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 id="briefing-steps-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">How scent for your space works</h2>
            <ol className="grid gap-5 md:grid-cols-2">
              {SM.steps.map((st, i) => (
                <li key={st.title} className="rounded-lg border border-border bg-card p-5">
                  <p className="font-display text-sm tracking-widest text-muted-foreground mb-1">STEP {i + 1}</p>
                  <h3 className="text-lg text-primary mb-2">{st.title}</h3>
                  <p className="text-primary/85 leading-relaxed">{st.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-primary/80">
              Made in BC, based in Surrey, serving {B2B_CONFIG.serviceAreaText}. Prefer to talk first? Write to{' '}
              <a className="underline" href={`mailto:${B2B_CONFIG.email}`}>{B2B_CONFIG.email}</a>.
            </p>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Looking for amenities, gift kits or private label? <a className="underline" href="/business#quote">Request a quote</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
