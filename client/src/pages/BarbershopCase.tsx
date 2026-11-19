import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RequestForms from '@/components/RequestForms';
import { usePageMeta } from '@/hooks/usePageMeta';
import { breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { B2B_CONFIG } from '@shared/b2bConfig';
import { BRIEFING_PATH, SCENT_MARKETING_COPY as SM } from '@/data/scentMarketingCopy';

/*
 * Anonymous case, Marketing v3 B4.1: "a premium barbershop in downtown Vancouver". NEVER add the name of
 * the business, sales numbers, results, a quote or details about its scenting request (no "lounge", no
 * washrooms, no size, no dates) without the written OK of the business (see B2B_CONFIG.caseQuote).
 * No aromatization result exists. Skipped on purpose until confirmed: "What they were looking for" and
 * "Agreed a simple arrangement" (B4.1 marks them for confirmation), and "What's next".
 */
const PATH = '/business/barbershop-case-study';
const TITLE = "Perfumes on a Barbershop's Cologne Bar";
const DESCRIPTION =
  'How a premium barbershop in downtown Vancouver carries CS Fragrances perfumes on its cologne bar. Made in BC. Send your scent briefing.';

const jsonLd = [
  {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${PATH}#webpage`,
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    isPartOf: { '@id': ORG_ID },
    inLanguage: 'en-CA',
  },
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'For Business', path: '/business' },
    { name: 'Barbershop case', path: PATH },
  ]),
];

export default function BarbershopCase() {
  usePageMeta(TITLE, DESCRIPTION, {
    path: PATH,
    ogImage: '/og/barbershop-case-study.jpg',
    ogImageAlt: 'CS Fragrances eau de parfum bottles in sunlight',
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
            { name: 'Barbershop case', path: PATH },
          ]}
        />

        <header className="container max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-muted-foreground mb-3">Case</p>
            <h1 className="text-3xl md:text-5xl text-primary mb-5 leading-tight">A cologne bar with a local story</h1>
            <p className="text-lg md:text-xl text-primary/85 leading-relaxed">
              How a premium barbershop in downtown Vancouver carries our perfumes.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm text-primary" aria-label="At a glance">
              {['Premium barbershop', 'Downtown Vancouver', 'Perfumes on the cologne bar'].map((t) => (
                <li key={t} className="rounded-full border border-primary/30 px-4 py-1.5">{t}</li>
              ))}
            </ul>
          </div>
          <img
            src="/images/Studio_4 Fragrances.webp"
            alt="CS Horizon, CS Enigma, CS Her and CS Origin eau de parfum bottles"
            width={933}
            height={1400}
            decoding="async"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            className="hidden md:block w-full max-w-[260px] justify-self-end rounded-lg object-cover shadow-md aspect-[2/3]"
          />
        </header>

        <section className="bg-secondary py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4 space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl text-primary mb-3">The business</h2>
              <p className="text-lg text-primary/90 leading-relaxed">
                A premium barbershop and lounge in downtown Vancouver, where clients come for the haircut and stay for the experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-primary mb-3">What we did</h2>
              <ul className="list-disc pl-6 space-y-2 text-lg text-primary/90 leading-relaxed">
                <li>Supplied our eau de parfum in 50 ml bottles for their cologne bar, with pouches, bags and small testers for clients to try.</li>
                <li>Stayed in touch with the team, who have also asked about scenting.</li>
              </ul>
            </div>
            {B2B_CONFIG.caseQuote && (
              <figure>
                <blockquote className="border-l-4 border-accent pl-6 font-display text-2xl text-primary">
                  “{B2B_CONFIG.caseQuote.text}”
                </blockquote>
                <figcaption className="mt-2 pl-6 text-sm text-muted-foreground">{B2B_CONFIG.caseQuote.attribution}</figcaption>
              </figure>
            )}
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl text-primary mb-4">Want the same for your shop?</h2>
            <p className="text-lg text-primary/85 mb-6">
              Perfumes for your shelf or cologne bar, and a signature scent for your space. Send us a short
              scent briefing and we will send samples. No obligation.
            </p>
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <a href={BRIEFING_PATH} className="inline-block rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
                {SM.primaryCta}
              </a>
              <a href="#quote" className="inline-block rounded-full border border-primary/40 px-8 py-3 font-semibold text-primary hover:bg-primary/10">
                {SM.secondaryCta}
              </a>
            </div>
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <a href="/business/salons-barbershops" className="inline-block rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10">
                  Salons and barbershops
                </a>
              </li>
              <li>
                <a href="/business/scent-marketing" className="inline-block rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10">
                  Scent marketing
                </a>
              </li>
              <li>
                <a href="/shop/perfumes" className="inline-block rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10">
                  Perfumes
                </a>
              </li>
            </ul>
          </div>
        </section>

        <RequestForms idPrefix="case" tabs={['quote', 'briefing']} prefill={{ businessType: 'Salon or barbershop', interest: 'Perfumes for resale' }} />
      </main>
      <Footer />
    </div>
  );
}
