import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RequestForms from '@/components/RequestForms';
import Reviews from '@/components/Reviews';
import { usePageMeta } from '@/hooks/usePageMeta';
import { breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { PUBLIC_BUSINESS_PAGES } from '@/data/business';
import { B2B_CONFIG, detail } from '@shared/b2bConfig';
import { SCENT_MARKETING_COPY } from '@/data/scentMarketingCopy';

// Copy: /workspace/gestao/b2b-storytelling-seo.md, parts B1 and B2.
const TITLE = 'Scent Marketing & Private Label in Vancouver';
const DESCRIPTION =
  'Signature scent, amenity soaps, private label and corporate gifts for hotels, spas, salons and offices. Handcrafted in BC. Request a quote or samples.';

const TEST_TERMS = B2B_CONFIG.freeSamples ? 'free of charge and with no obligation' : 'with no obligation';

const STEPS = SCENT_MARKETING_COPY.steps;

const OFFERS = [
  {
    title: 'Scent signature',
    text: 'We help you choose a scent for your space and supply it in formats that suit the room. Equipment, if needed, is chosen together at your scent test.',
    href: '/business/scent-marketing',
  },
  {
    title: 'Amenity soaps, sprays and sachets',
    text: 'Handmade shea butter soaps (90 g bars), home and linen sprays (250 ml) and scented sachets (30 g), for guest rooms, treatment rooms and retail.',
    href: '/business/amenities',
  },
  {
    title: 'Private label',
    text: 'Perfumes, body mists, home sprays, soaps and sachets under your brand, handcrafted in small batches.',
    href: '/business/private-label',
  },
  {
    title: 'Corporate gift kits',
    text: 'Curated gift sets built from our collection, for clients and teams.',
    href: '/business/corporate-gifts',
  },
  {
    title: 'Perfumes for resale',
    text: 'Our eau de parfum (50 ml) and body mists for salons, barbershops and boutiques.',
    href: '/business/salons-barbershops',
  },
];

const HUB_FAQ = [
  {
    q: 'What is scent marketing?',
    a: 'Scent marketing is the use of a consistent fragrance in a physical space to support how people feel about your brand. It can be as simple as a signature room spray and scented amenities, or a diffusion service tuned to the size of your space.',
  },
  {
    q: 'How does the scent test and sampling work?',
    a: `Tell us about your space and we bring a small selection of scents to try on site. You smell them in the real room, with real airflow, and decide what fits. It is ${TEST_TERMS}. After that we send a tailored written quote.`,
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on the size of your space, the scent and the products you choose, so we quote each project individually. Request a quote and we will reply with a clear proposal after the scent test.',
  },
  {
    q: 'Can I have products under my own brand?',
    a: `Yes. We can make perfumes, body mists, home sprays, soaps and sachets with your label. ${
      B2B_CONFIG.privateLabelStart ? `Private label projects start from ${B2B_CONFIG.privateLabelStart}.` : 'Tell us about your project and we will confirm timing, minimum order and lead time in your quote.'
    }`,
  },
  {
    q: 'Where do you deliver?',
    a: `We are based in Surrey, British Columbia, and serve ${B2B_CONFIG.serviceAreaText}. Delivery elsewhere in Canada: ${B2B_CONFIG.deliveryOutsideBC ?? 'contact us for details'}.`,
  },
  {
    q: 'Are your products made locally?',
    a: 'Yes. Our perfumes, body mists, home sprays, soaps and sachets are handcrafted in small batches in British Columbia by our family team. Ingredient lists are on each product page.',
  },
];

const hubJsonLd = [
  {
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/business#webpage`,
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/business`,
    isPartOf: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PUBLIC_BUSINESS_PAGES.map((p, i) => ({
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
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'For Business', path: '/business' },
  ]),
];

export default function Business() {
  usePageMeta(TITLE, DESCRIPTION, {
    path: '/business',
    ogImage: '/og/business.jpg',
    ogImageAlt: 'A CS Fragrances body mist and shea butter soap in a gift box',
    jsonLd: hubJsonLd,
  });

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'For Business', path: '/business' }]} />

        <header className="bg-primary text-primary-foreground mt-6">
          <div className="container max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
            <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-accent mb-3">For business</p>
            <h1 className="text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
              Give your business a scent people remember
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-3">
              A signature scent for your space. Made by hand in British Columbia.
            </p>
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed mb-8">
              Scent marketing, amenity soaps and sprays, private label and corporate gifts for hotels, spas,
              salons, boutiques and offices in Vancouver and the Lower Mainland. Small batches, a small family
              team, and a scent test in your space before you decide.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#quote" className="inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground hover:bg-accent/85">
                Request a quote
              </a>
              <a href="#samples" className="inline-block rounded-full border border-primary-foreground/50 px-8 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                Request samples
              </a>
            </div>
            <p className="mt-5 text-sm">
              <a href="#briefing" className="text-primary-foreground underline underline-offset-4">Start a scent briefing for your space</a>
            </p>
            <p className="mt-3 text-sm text-primary-foreground/70">On-site scent test, {TEST_TERMS} · Tailored quote</p>
          </div>
        </header>

        <section className="py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl text-primary mb-6 text-center leading-snug">
              It started with a bar of soap. Now it can become your signature scent.
            </h2>
            <div className="space-y-4 text-lg text-primary/90 leading-relaxed">
              <p>
                CS Fragrances began with two names, Custodio and Soncin, and a handmade bar of soap. Raquel, a
                chemistry student, was making artisanal soap by hand. Miguel sold it during college, bar by bar,
                to help pay her tuition. Today we are building the brand together with our family, and
                everything we make is still blended, poured and packed by hand, in small batches, here in British
                Columbia.
              </p>
              <p>
                That hands-on approach is what we bring to businesses. We craft our own perfumes, body mists,
                home and linen sprays, shea butter soaps and scent sachets, so we can match a scent to your space
                and keep it consistent from one order to the next. Raquel&rsquo;s chemistry background brings the
                science; our hands bring the artistry.
              </p>
              <p>
                Scent marketing is about one simple idea: people remember how a place feels. We help hotels,
                spas, salons, shops and offices choose a scent that feels like their brand. Our perfumes are
                already on the cologne bar of a premium barbershop in Vancouver.
              </p>
              <p>
                We are a small family team, so you talk directly to the people who make your products.{' '}
                <a href="/about" className="underline underline-offset-4">Read our story</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20" aria-labelledby="how-title">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 id="how-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">How scent marketing works: 5 steps</h2>
            <ol className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-lg bg-card p-6 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display mb-3">{i + 1}</span>
                  <h3 className="text-lg text-primary mb-2">{s.title}</h3>
                  <p className="text-primary/85">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="segments-title">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 id="segments-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">Who we work with</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PUBLIC_BUSINESS_PAGES.filter((p) => p.slug !== 'private-label').map((p) => (
                <a key={p.slug} href={p.path} className="block rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
                  <h3 className="text-xl text-primary mb-3">{p.topic}</h3>
                  <p className="text-primary/85 leading-relaxed mb-4">{p.summary}</p>
                  <span className="font-semibold text-primary underline underline-offset-4">Learn more</span>
                </a>
              ))}
              <a href="/business/private-label" className="block rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
                <h3 className="text-xl text-primary mb-3">Private label</h3>
                <p className="text-primary/85 leading-relaxed mb-4">
                  Perfumes, body mists, home sprays, soaps and sachets made by us and sold under your brand.
                </p>
                <span className="font-semibold text-primary underline underline-offset-4">Learn more</span>
              </a>
            </div>
            <p className="mt-8 text-center text-primary/80">
              Clinics and boutique gyms: a signature scent for reception and changing rooms is part of our{' '}
              <a href="/business/scent-marketing" className="underline underline-offset-4">scent marketing</a> service.
            </p>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20" aria-labelledby="offer-title">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 id="offer-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">What we offer</h2>
            <ul className="grid md:grid-cols-2 gap-6">
              {OFFERS.map((o) => (
                <li key={o.title} className="rounded-lg bg-card p-6 shadow-sm">
                  <h3 className="text-lg text-primary mb-2">
                    <a href={o.href} className="underline underline-offset-4">{o.title}</a>
                  </h3>
                  <p className="text-primary/85 leading-relaxed">{o.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Minimum order and lead time: {detail(B2B_CONFIG.minimumOrder === null ? null : `${B2B_CONFIG.minimumOrder}${B2B_CONFIG.leadTime ? `, ${B2B_CONFIG.leadTime}` : ''}`)}.
              Every project is quoted individually.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="proof-title">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 id="proof-title" className="text-2xl md:text-3xl text-primary mb-5">Already on the shelf</h2>
            <p className="text-lg text-primary/90 leading-relaxed">
              A premium barbershop in Vancouver carries CS Fragrances perfumes in its cologne bar.{' '}
              <a href="/business/barbershop-case-study" className="underline underline-offset-4">Read the short case</a>.
            </p>
            {B2B_CONFIG.caseQuote && (
              <figure className="mt-6">
                <blockquote className="font-display text-xl text-primary">“{B2B_CONFIG.caseQuote.text}”</blockquote>
                <figcaption className="mt-2 text-sm text-muted-foreground">{B2B_CONFIG.caseQuote.attribution}</figcaption>
              </figure>
            )}
            {B2B_CONFIG.marketsAttended.length > 0 && (
              <p className="mt-6 text-primary/85">Family-owned. Made by hand in British Columbia. Seen at {B2B_CONFIG.marketsAttended.join(', ')}.</p>
            )}
          </div>
        </section>

        <Reviews />

        <section className="bg-secondary py-14 md:py-20">
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

        <RequestForms idPrefix="hub" tabs={['quote', 'samples', 'briefing']} />
      </main>
      <Footer />
    </div>
  );
}
