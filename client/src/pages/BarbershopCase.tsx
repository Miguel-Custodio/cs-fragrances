import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RequestForms from '@/components/RequestForms';
import { usePageMeta } from '@/hooks/usePageMeta';
import { breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { B2B_CONFIG } from '@shared/b2bConfig';

/*
 * Anonymous case (public wording from the Marketing document): "a premium barbershop in Vancouver".
 * NEVER add the name of the business, sales numbers, results or a quote without the written OK of
 * the business (see B2B_CONFIG.caseQuote). No aromatization result exists yet.
 */
const PATH = '/business/barbershop-case-study';
const TITLE = 'Case: Perfumes on a Barbershop Cologne Bar';
const DESCRIPTION =
  'A premium barbershop in Vancouver carries CS Fragrances perfumes in its cologne bar. A short, honest case from a small family maker in BC.';

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
            <h1 className="text-3xl md:text-5xl text-primary mb-5 leading-tight">
              A premium barbershop in Vancouver carries our perfumes in its cologne bar
            </h1>
            <p className="text-lg md:text-xl text-primary/85 leading-relaxed">
              A short and honest case. We are a small family maker, and this is where we are today.
            </p>
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
              <h2 className="text-2xl md:text-3xl text-primary mb-3">The setting</h2>
              <p className="text-lg text-primary/90 leading-relaxed">
                A cologne bar lets a barbershop&rsquo;s clients try a fragrance in the chair and take it home.
                It turns a visit into a small ritual, and it gives the shop something to sell that fits its
                style. Our eau de parfum is on the cologne bar of a premium barbershop in Vancouver.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-primary mb-3">What we supply</h2>
              <p className="text-lg text-primary/90 leading-relaxed">
                Our own eau de parfum (50 ml), handcrafted in small batches in British Columbia. The team talks
                directly to the people who make it.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-primary mb-3">What comes next</h2>
              <p className="text-lg text-primary/90 leading-relaxed">
                The same team has asked us about a scent for the lounge and the washrooms. That conversation is
                open and there are no results to report yet. When there are, with the shop&rsquo;s permission,
                we will add them here.
              </p>
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
              Perfumes for your shelf or cologne bar, and a signature scent for your space. Start with samples
              and a scent test.
            </p>
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

        <RequestForms idPrefix="case" prefill={{ businessType: 'Salon or barbershop', interest: 'Perfumes for resale' }} initialTab="samples" />
      </main>
      <Footer />
    </div>
  );
}
