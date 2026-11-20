import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RequestForms from '@/components/RequestForms';
import Reviews from '@/components/Reviews';
import { usePageMeta } from '@/hooks/usePageMeta';
import { breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { PUBLIC_BUSINESS_PAGES } from '@/data/business';
import { B2B_CONFIG, DELIVERY_TEXT, detail } from '@shared/b2bConfig';
import { BRIEFING_PATH, CALCULATOR_PATH, FINAL_CTA, FREE, SCENT_MARKETING_COPY as SM } from '@/data/scentMarketingCopy';

// Copy: /workspace/gestao/b2b-storytelling-seo.md v3, parts B1 and B2 (placeholders left out: unconfirmed facts
// come from shared/b2bConfig.ts and read "contact us for details").
const TITLE = 'Scent Marketing for Vancouver Businesses';
const DESCRIPTION =
  'Signature scent, amenity soaps, private label and corporate gifts. Made in BC, based in Surrey, serving Vancouver and the Lower Mainland. Request a quote.';

const STEPS = SM.steps;

// B2 "Segments" (order = priority), now under Sector 2 (scent marketing). Placeholders dropped; the terms of resale and dates are not stated.
const SEGMENTS = [
  {
    title: 'Salons and barbershops',
    href: '/business/salons-barbershops',
    points: [
      'A signature scent for the waiting area and the chair, so clients recognize your shop as soon as they walk in.',
      'Perfumes for your shelf or cologne bar, for resale.',
      'Amenities and gift-ready packaging that turn a favourite scent into an easy add-on.',
    ],
  },
  {
    title: 'Aesthetic clinics',
    href: '/business/scent-marketing',
    points: [
      'A calm, discreet scent for reception and treatment rooms, chosen with you from the samples we send.',
      'Amenities and small gifts for patients to take home.',
      'A consistent scent from one appointment to the next.',
    ],
  },
  {
    title: 'Spas and wellness studios',
    href: '/business/hotels-spas',
    points: [
      'A signature scent from reception to treatment room.',
      'Soaps, sprays and sachets for treatment rooms and your retail shelf.',
      'A private-label line under your own name later.',
    ],
  },
  {
    title: 'Boutique gyms',
    href: '/business/scent-marketing',
    points: [
      'A fresh, welcoming scent for reception and changing rooms.',
      'Small amenities and gift kits for members.',
      'Scent only where it makes sense for your space.',
    ],
  },
  {
    title: 'Boutique and independent hotels',
    href: '/business/hotels-spas',
    points: [
      'Amenities for rooms in your own style: handmade shea butter soaps, linen sprays and sachets.',
      'A recognizable lobby scent that feels like your property.',
      'One local contact for refills and reorders.',
    ],
  },
];

// Sector 1 (Miguel, 19/11/2026): private label on every catalog product, plus branded ready-made products.
const OFFERS = [
  {
    title: 'Private label',
    text: 'Your brand on every product in our catalog, made with the fragrances you choose. Minimum order: one kilogram of fragrance, mixed across any products. Optional turnkey service for the artwork, labels and boxes.',
    href: '/business/private-label',
  },
  {
    title: 'Private label batch calculator',
    text: 'Enter your kilograms of fragrance, choose any mix of products and see how many units fit in your batch.',
    href: CALCULATOR_PATH,
  },
  {
    title: 'Amenities with your brand',
    text: 'Handmade shea butter soap (100 g), home and linen spray (250 ml) and scented sachets (30 g), with your card or logo where possible.',
    href: '/business/amenities',
  },
  {
    title: 'Corporate gift kits',
    text: 'Gift sets for clients and teams, made from our collection.',
    href: '/business/corporate-gifts',
  },
];

// The two main paths on the hub (Miguel, 19/11/2026).
const SECTORS = [
  {
    kicker: 'Sector 1',
    title: 'Private label',
    href: '/business/private-label',
    tagline: 'Your brand on every product in our catalog.',
    points: [
      'All of our products: perfumes, body mists, home and linen sprays, soaps, sachets, wax melts and candles.',
      `Made with the fragrances you choose. We send ${FREE}samples first.`,
      'Minimum order: one kilogram of fragrance, spread across any mix of products. Use the calculator to plan it.',
      'Optional turnkey service: we create the artwork, labels and boxes with your approval.',
    ],
    ctas: [
      { label: 'Open the batch calculator', href: CALCULATOR_PATH },
      { label: 'Learn more', href: '/business/private-label' },
    ],
  },
  {
    kicker: 'Sector 2',
    title: 'Scent marketing',
    href: '/business/scent-marketing',
    tagline: 'A signature scent for your space.',
    points: [
      `You send a short briefing, we send ${FREE}samples, and you choose your scent.`,
      'We supply the fragrance and the diffusion machine.',
      'Monthly maintenance service, and the machine on loan.',
      'We propose after you choose your scent and share the size of your space. No obligation.',
    ],
    ctas: [
      { label: SM.primaryCta, href: BRIEFING_PATH },
      { label: 'Learn more', href: '/business/scent-marketing' },
    ],
  },
];

// B2 FAQ (six questions). Q4 and Q5 use the b2bConfig wording while facts are unconfirmed.
const HUB_FAQ = [
  {
    q: 'What is scent marketing?',
    a: 'Scent marketing is the use of a consistent fragrance in a physical space to support how people feel about your brand. It can be as simple as a signature room spray and scented amenities, or a diffusion setup selected for your room, with regular refills.',
  },
  { q: SM.faqFlow.q, a: SM.faqFlow.a },
  {
    q: 'How much does it cost?',
    a: 'It depends on the size of your space, the scent and the products you choose, so we quote each project individually. After you have chosen your scent and shared your square footage, we send a proposal.',
  },
  {
    q: 'Can I have products under my own brand?',
    a: `Yes. Private label covers every product in our catalog, made with the fragrances you choose. The minimum order is one kilogram of fragrance, spread across any mix of products, and our optional turnkey service can create the artwork, labels and boxes. ${
      B2B_CONFIG.privateLabelStart ? `Private label projects start from ${B2B_CONFIG.privateLabelStart}.` : 'We confirm timing and lead time in your quote.'
    }`,
  },
  {
    q: 'What do you offer for scenting a space?',
    a: `We supply the fragrance and the diffusion machine, with a monthly maintenance service, and the machine can be placed with you on loan. It starts with a short briefing and ${FREE}samples, and we send a proposal after you choose your scent.`,
  },
  {
    q: 'Where do you work?',
    a: `We are made in BC, based in Surrey and serve ${B2B_CONFIG.serviceAreaText}. ${DELIVERY_TEXT}`,
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
              Two ways to work with us: your brand on our products, or a signature scent for your space. Made by hand in BC.
            </p>
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed mb-8">
              Private label on every product in our catalog, and scent marketing with the fragrance, the diffusion
              machine and monthly maintenance, for salons, barbershops, clinics, spas, gyms and boutique hotels. Made
              in BC, based in Surrey, serving Vancouver and the Lower Mainland.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/business/private-label" className="inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground hover:bg-accent/85">
                Private label
              </a>
              <a href="/business/scent-marketing" className="inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground hover:bg-accent/85">
                Scent marketing
              </a>
              <a href="#quote" className="inline-block rounded-full border border-primary-foreground/50 px-8 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                {SM.secondaryCta}
              </a>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/70">
              {FREE ? 'Free samples. ' : ''}No obligation. Shipping is paid by the client.
            </p>
          </div>
        </header>

        <section className="py-14 md:py-20" aria-labelledby="sectors-title">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 id="sectors-title" className="text-2xl md:text-4xl text-primary mb-3 text-center">Two ways to work with us</h2>
            <p className="text-center text-primary/80 mb-10">Pick the one that fits your business. Both start with free samples and no obligation.</p>
            <div className="grid md:grid-cols-2 gap-8">
              {SECTORS.map((sec) => (
                <article key={sec.title} className="flex flex-col rounded-xl border border-border bg-card p-7 shadow-sm">
                  <p className="font-display tracking-[0.25em] uppercase text-xs text-muted-foreground mb-2">{sec.kicker}</p>
                  <h3 className="text-2xl md:text-3xl text-primary mb-2">
                    <a href={sec.href} className="underline-offset-4 hover:underline">{sec.title}</a>
                  </h3>
                  <p className="text-lg text-primary/90 mb-4">{sec.tagline}</p>
                  <ul className="list-disc pl-5 space-y-2 text-primary/85 leading-relaxed mb-6">
                    {sec.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {sec.ctas.map((c, i) => (
                      <a
                        key={c.href}
                        href={c.href}
                        className={
                          i === 0
                            ? 'inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90'
                            : 'inline-block rounded-full border border-primary/40 px-6 py-2.5 font-semibold text-primary hover:bg-primary/10'
                        }
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl text-primary mb-6 text-center leading-snug">
              It started with a bar of soap. Now it can become the scent of your space.
            </h2>
            <div className="space-y-4 text-lg text-primary/90 leading-relaxed">
              <p>
                CS Fragrances began with two names, Custodio and Soncin, and a handmade bar of soap. Raquel, then a
                chemistry student, was making artisanal soap by hand. Miguel sold it during college, bar by bar,
                to help pay her tuition. Today we are building the brand together with our family, and
                everything we make is still blended, poured and packed by hand, in small batches, here in British
                Columbia.
              </p>
              <p>
                That hands-on approach is what we bring to businesses. We make our own perfumes, body mists,
                home and linen sprays, shea butter soaps and scent sachets, so we can match a scent to your space
                and keep it consistent from one order to the next. Raquel&rsquo;s chemistry background brings the
                science; our hands bring the artistry.
              </p>
              <p>
                People remember how a place feels. We help salons, barbershops, clinics, spas, gyms and boutique
                hotels choose a scent that feels like their brand, and we deliver it in the formats that suit their
                space. Our perfumes already sit on the cologne bar of a premium barbershop in downtown Vancouver.
              </p>
              <p>
                We are a small family team, so you talk directly to the people who make your products.{' '}
                <a href="/about" className="underline underline-offset-4">Read our story</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20" aria-labelledby="offer-title">
          <div className="container max-w-5xl mx-auto px-4">
            <p className="font-display tracking-[0.25em] uppercase text-xs text-muted-foreground mb-2 text-center">Sector 1</p>
            <h2 id="offer-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">Private label and branded products</h2>
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
              Minimum order for private label: {detail(B2B_CONFIG.privateLabelMinimum)}. Every project is quoted individually.
            </p>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20" aria-labelledby="how-title">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 id="how-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">Scent marketing: how it works (5 steps)</h2>
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
            <p className="font-display tracking-[0.25em] uppercase text-xs text-muted-foreground mb-2 text-center">Sector 2</p>
            <h2 id="segments-title" className="text-2xl md:text-3xl text-primary mb-8 text-center">Scent marketing, for your kind of space</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SEGMENTS.map((seg) => (
                <a key={seg.title} href={seg.href} className="block rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
                  <h3 className="text-xl text-primary mb-3">{seg.title}</h3>
                  <ul className="list-disc pl-5 space-y-2 text-primary/85 leading-relaxed mb-4">
                    {seg.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <span className="font-semibold text-primary underline underline-offset-4">Learn more</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="proof-title">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 id="proof-title" className="text-2xl md:text-3xl text-primary mb-5">Already on the shelf</h2>
            <p className="text-lg text-primary/90 leading-relaxed">
              Our perfumes are on the cologne bar of a premium barbershop in downtown Vancouver.{' '}
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

        <section className="bg-primary text-primary-foreground py-14 text-center" aria-labelledby="final-cta-title">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 id="final-cta-title" className="text-2xl md:text-4xl mb-3 text-primary-foreground">{FINAL_CTA.headline}</h2>
            <p className="text-lg text-primary-foreground/85 mb-6">{FINAL_CTA.text}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={BRIEFING_PATH} className="inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground hover:bg-accent/85">
                {SM.primaryCtaLong}
              </a>
              <a href="#quote" className="inline-block rounded-full border border-primary-foreground/50 px-8 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                {SM.secondaryCta}
              </a>
              <a
                href={`https://wa.me/${B2B_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-primary-foreground/50 px-8 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                WhatsApp {B2B_CONFIG.whatsappDisplay}
              </a>
            </div>
          </div>
        </section>

        <RequestForms idPrefix="hub" tabs={['quote', 'briefing']} heading="Request a quote or send your briefing" />
      </main>
      <Footer />
    </div>
  );
}
