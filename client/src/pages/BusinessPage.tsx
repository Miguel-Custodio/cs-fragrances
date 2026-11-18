import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { usePageMeta, SITE_URL } from '@/hooks/usePageMeta';
import { BUSINESS_PAGES, type BusinessPageDef } from '@/data/business';
import { COMPANY } from '@shared/company';
import { Check } from 'lucide-react';

function jsonLd(p: BusinessPageDef) {
  const url = `${SITE_URL}${p.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.h1,
        serviceType: p.serviceType,
        description: p.description,
        url,
        provider: {
          '@type': ['Organization', 'LocalBusiness'],
          '@id': `${SITE_URL}/#organization`,
          name: COMPANY.name,
          url: `${SITE_URL}/`,
          email: COMPANY.email,
          telephone: '+1-604-518-6863',
          address: {
            '@type': 'PostalAddress',
            addressLocality: COMPANY.city,
            addressRegion: COMPANY.regionCode,
            addressCountry: COMPANY.countryCode,
          },
        },
        areaServed: [
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'United States' },
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'For Business', item: `${SITE_URL}/business` },
          { '@type': 'ListItem', position: 3, name: p.h1, item: url },
        ],
      },
    ],
  };
}

export default function BusinessPage({ page: p }: { page: BusinessPageDef }) {
  usePageMeta(p.title, p.description, {
    path: p.path,
    ogImage: p.image.src,
    ogImageAlt: p.image.alt,
    jsonLd: jsonLd(p),
  });
  const others = BUSINESS_PAGES.filter((x) => x.slug !== p.slug);

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-20">
        <nav aria-label="Breadcrumb" className="container max-w-6xl mx-auto px-4 pt-6 text-sm text-muted-foreground">
          <a href="/" className="hover:underline">Home</a> / <a href="/business" className="hover:underline">For Business</a> /{' '}
          <span className="text-primary">{p.h1.split(':')[0]}</span>
        </nav>

        <header className="container max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-muted-foreground mb-3">{p.kicker}</p>
            <h1 className="text-3xl md:text-5xl text-primary mb-5 leading-tight">{p.h1}</h1>
            <p className="text-lg md:text-xl text-primary/85 leading-relaxed mb-7">{p.intro}</p>
            <a
              href="#quote"
              className="inline-block rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Request a quote or samples
            </a>
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

        <section className="bg-secondary py-14 md:py-20" aria-labelledby={`${p.slug}-quote-title`}>
          <div className="container max-w-3xl mx-auto px-4">
            <h2 id={`${p.slug}-quote-title`} className="text-2xl md:text-3xl text-primary mb-2 text-center">
              Request a quote or samples
            </h2>
            <p className="text-center text-primary/80 mb-8">Tell us about your business and we will get back to you.</p>
            <QuoteForm topic={p.topic} businessTypes={p.businessTypes} idPrefix={p.slug} />
          </div>
        </section>

        <section className="py-12">
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
      </main>
      <Footer />
    </div>
  );
}
