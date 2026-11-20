import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RequestForms from '@/components/RequestForms';
import PrivateLabelCalculator from '@/components/PrivateLabelCalculator';
import { CALCULATOR_PATH } from '@/data/scentMarketingCopy';
import Reviews from '@/components/Reviews';
import { usePageMeta } from '@/hooks/usePageMeta';
import { breadcrumbNode, ORG_ID, SITE_URL } from '@/lib/seo';
import { PUBLIC_BUSINESS_PAGES, type BusinessPageDef } from '@/data/business';
import { Check } from 'lucide-react';

/** Real product photos cropped to 1200x630 (client/public/og, made by scripts/make-og-images.py). */
const SECTOR_LINK = {
  'private-label': { label: 'private label', href: '/business/private-label' },
  'scent-marketing': { label: 'scent marketing', href: '/business/scent-marketing' },
} as const;

const OG_ALT: Record<string, string> = {
  'scent-marketing': 'A CS Fragrances eau de parfum bottle on a mirror surrounded by white roses',
  'hotels-spas': 'A handmade CS Fragrances shea butter soap bar on a soft cream background',
  'salons-barbershops': 'CS Fragrances eau de parfum bottles in sunlight',
  amenities: 'A handmade CS Fragrances shea butter soap bar on a soft cream background',
  'corporate-gifts': 'A CS Fragrances gift box with a body mist and a shea butter soap',
  'private-label': 'Hands holding a handmade shea butter soap bar in a field of flowers',
};

function jsonLd(p: BusinessPageDef) {
  const url = `${SITE_URL}${p.path}`;
  return [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: p.h1,
      serviceType: p.serviceType,
      description: p.description,
      url,
      provider: { '@id': ORG_ID },
      areaServed: [
        { '@type': 'City', name: 'Vancouver' },
        { '@type': 'AdministrativeArea', name: 'Lower Mainland, British Columbia' },
      ],
      audience: { '@type': 'BusinessAudience', name: 'Businesses' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'For Business', path: '/business' },
      { name: p.topic, path: p.path },
    ]),
  ];
}

export default function BusinessPage({ page: p }: { page: BusinessPageDef }) {
  usePageMeta(p.title, p.description, {
    path: p.path,
    ...(OG_ALT[p.slug]
      ? { ogImage: `/og/${p.slug}.jpg`, ogImageAlt: OG_ALT[p.slug] }
      : { ogImage: p.image.src, ogImageAlt: p.image.alt }),
    noindex: p.noindex,
    jsonLd: jsonLd(p),
  });
  const others = PUBLIC_BUSINESS_PAGES.filter((x) => x.slug !== p.slug);

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'For Business', path: '/business' },
            { name: p.topic, path: p.path },
          ]}
        />

        <header className="container max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-muted-foreground mb-3">{p.kicker}</p>
            {p.sector && p.path !== SECTOR_LINK[p.sector].href && (
              <p className="mb-3 text-sm text-primary/70">
                Part of our <a className="underline" href={SECTOR_LINK[p.sector].href}>{SECTOR_LINK[p.sector].label}</a> sector
              </p>
            )}
            <h1 className="text-3xl md:text-5xl text-primary mb-5 leading-tight">{p.h1}</h1>
            <p className="text-lg md:text-xl text-primary/85 leading-relaxed mb-7">{p.intro}</p>
            <div className="flex flex-wrap gap-3">
              {(p.ctas ?? [{ label: 'Request a quote', href: '#quote' }, { label: 'Request samples', href: '#samples' }]).map((c, i) => (
                <a
                  key={c.href}
                  href={c.href}
                  className={
                    i === 0
                      ? 'inline-block rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90'
                      : 'inline-block rounded-full border border-primary/40 px-8 py-3 font-semibold text-primary hover:bg-primary/10'
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{p.trustLine}</p>
          </div>
          <img
            src={p.image.src}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            decoding="async"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            className="hidden md:block w-full max-w-[260px] justify-self-end rounded-lg object-cover shadow-md aspect-[406/720]"
          />
        </header>

        <section className="bg-secondary py-14 md:py-20">
          <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            {p.blocks.map((b) => (
              <div key={b.title} className="rounded-lg bg-card p-6 shadow-sm">
                <h2 className="text-xl text-primary mb-3">{b.title}</h2>
                <p className="text-primary/85 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl text-primary mb-5">{p.audienceTitle}</h2>
              <ul className="space-y-3">
                {p.audience.map((a) => (
                  <li key={a} className="flex gap-3 text-lg text-primary/90">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-primary mb-5">How it works</h2>
              <ol className="space-y-4">
                {p.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg text-primary">{s.title}</h3>
                      <p className="text-primary/80">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {p.slug === 'private-label' && (
          <section className="py-14 md:py-20" aria-label="Private label batch calculator">
            <div className="container max-w-4xl mx-auto px-4">
              <PrivateLabelCalculator headingLevel={2} idPrefix="calculator" />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Prefer a full page? <a className="underline" href={CALCULATOR_PATH}>Open the batch calculator</a>.
              </p>
            </div>
          </section>
        )}

        <section className="bg-secondary py-14 md:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl text-primary mb-6 text-center">At a glance</h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {p.facts.map((f) => (
                <div key={f.label} className="border-b border-primary/15 pb-3">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</dt>
                  <dd className="text-primary">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Reviews />

        <section className="py-14 md:py-20">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl text-primary mb-6 text-center">Frequently asked questions</h2>
            <div className="space-y-3">
              {p.faq.map((f) => (
                <details key={f.q} className="group rounded-lg border border-border bg-card p-4">
                  <summary className="cursor-pointer font-semibold text-primary">{f.q}</summary>
                  <p className="mt-3 text-primary/85 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RequestForms
          idPrefix={p.slug}
          tabs={p.formTabs}
          heading={p.formHeading}
          intro={p.formIntro}
          prefill={p.prefill}
          businessTypes={p.formOptions?.businessTypes}
          interests={p.formOptions?.interests}
        />

        {p.related.length > 0 && (
          <section className="py-12">
            <div className="container max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-xl text-primary mb-4">Related</h2>
              <ul className="flex flex-wrap justify-center gap-3">
                {p.related.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} className="inline-block rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {p.inSitemap && (
          <section className="pb-14">
            <div className="container max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-xl text-primary mb-4">More for business</h2>
              <ul className="flex flex-wrap justify-center gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <a href={o.path} className="inline-block rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10">
                      {o.topic}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/business" className="inline-block rounded-full border border-primary/30 px-5 py-2 text-primary hover:bg-primary/10">
                    All business services
                  </a>
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
