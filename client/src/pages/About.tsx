import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HandmadeWithCare from '@/components/HandmadeWithCare';
import { usePageMeta, SITE_URL } from '@/hooks/usePageMeta';
import { PRODUCTION_VIDEOS, videoObjectJsonLd } from '@/data/videos';
import { COMPANY } from '@shared/company';

const ABOUT_TITLE = 'Our Story | Family-Owned Handmade Soap & Artisanal Perfume in Vancouver, BC';
// Hook appends " | CS Fragrances" unless the title already includes the site name.
const ABOUT_DESCRIPTION =
  'Meet Miguel Custodio and Ana Raquel Soncin, the family behind CS Fragrances. Handmade soap and artisanal perfume, crafted with care in British Columbia, Canada.';
const OG_IMAGE = '/videos/making-soap.webp';
const OG_IMAGE_ALT = 'Handmade soap being made at the CS Fragrances studio in British Columbia';

const CATEGORY_LINKS = [
  { href: '/shop/perfumes', label: 'Artisanal perfumes' },
  { href: '/shop/soaps', label: 'Handmade soaps' },
  { href: '/shop/body-mists', label: 'Body mists' },
  { href: '/shop/home-sprays', label: 'Home sprays' },
  { href: '/shop/sachets', label: 'Scent sachets' },
  { href: '/shop/candles-ornaments', label: 'Candles & ornaments' },
];

const TEAM = [
  {
    id: 'raquel',
    name: 'Ana Raquel Soncin',
    role: 'Co-founder',
    alt: 'Portrait of Ana Raquel Soncin, co-founder of CS Fragrances, who began by making handmade soap',
    note: '[PLACEHOLDER: photo of Raquel]',
    image: '/about/raquel.webp' as string | null,
  },
  {
    id: 'miguel',
    name: 'Miguel Custodio',
    role: 'Co-founder',
    alt: 'Portrait of Miguel Custodio, co-founder of CS Fragrances',
    note: '[PLACEHOLDER: photo of Miguel]',
    image: '/about/miguel.webp' as string | null,
  },
  {
    id: 'reza',
    name: 'Reza',
    role: 'Team member',
    alt: 'Portrait of Reza, a member of the CS Fragrances team',
    note: '[PLACEHOLDER: photo of Reza]',
    image: null as string | null,
  },
] as const;

const FAMILY_PHOTO = {
  alt: 'Miguel Custodio, Ana Raquel Soncin and their two children, the family behind CS Fragrances',
  note: '[PLACEHOLDER: family photo of Miguel, Raquel and their two children]',
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE_URL}/#organization`,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: `${SITE_URL}/`,
      email: COMPANY.email,
      telephone: '+1-604-518-6863',
      areaServed: ['CA', 'US'],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'BC',
        addressCountry: 'CA',
      },
      founder: [
        { '@type': 'Person', name: 'Miguel Custodio' },
        { '@type': 'Person', name: 'Ana Raquel Soncin' },
      ],
      sameAs: ['https://instagram.com/bycsfragrances'],
    },
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      name: ABOUT_TITLE,
      description: ABOUT_DESCRIPTION,
      url: `${SITE_URL}/about`,
      isPartOf: { '@id': `${SITE_URL}/#organization` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-CA',
    },
    ...PRODUCTION_VIDEOS.map(videoObjectJsonLd),
  ],
};

function PhotoPlaceholder({
  label,
  alt,
  className = '',
  aspect = 'aspect-square',
}: {
  label: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`flex ${aspect} w-full items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-primary-foreground px-4 text-center`}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{label}</span>
      </div>
    </figure>
  );
}

export default function About() {
  usePageMeta(ABOUT_TITLE, ABOUT_DESCRIPTION, {
    path: '/about',
    ogImage: OG_IMAGE,
    ogImageAlt: OG_IMAGE_ALT,
    ogType: 'website',
    jsonLd: aboutJsonLd,
  });

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-28">
        <header className="container max-w-4xl mx-auto px-4 pb-16 md:pb-20 text-center">
          <h1 className="section-title text-primary mb-6">Our Story</h1>
          <p className="text-lg md:text-xl text-primary/80 leading-relaxed">
            Family-owned artisanal perfume and handmade soap, crafted with care in British
            Columbia, Canada.
          </p>
        </header>

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl md:text-4xl text-primary text-center mb-10">How we began</h2>
            <p className="text-lg md:text-xl text-primary leading-relaxed">
              Every fragrance begins with a story. Ours began with two names: Custódio and Soncin.
            </p>
            <p className="text-lg md:text-xl text-primary leading-relaxed">
              When Miguel and Raquel first met, she was already making soap. He sold those soaps
              during college to help her pay for her Chemistry studies. That partnership — her craft
              and his care — is still at the heart of everything we make.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl md:text-4xl text-primary text-center mb-10">
              Born from love, family, and craftsmanship
            </h2>
            <p className="text-lg md:text-xl text-primary leading-relaxed">
              Born from a passion for alchemy and the art of scent, CS Fragrances blends knowledge
              and craft to create perfumes and soaps that awaken memories and emotions. Each
              fragrance carries more than scent — it carries warmth, elegance, and the beauty of
              everyday life.
            </p>
            <p className="text-lg md:text-xl text-primary leading-relaxed">
              Where science meets artistry, we make luxury fragrances and handmade soaps to elevate
              everyday moments. Accessible sophistication with an artisanal heart. Handmade with
              care in Canada.
            </p>
          </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl text-primary text-center mb-12">Meet the family</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10">
              {TEAM.map((person) => (
                <div key={person.id} className="text-center">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.alt}
                      width={960}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/5] object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <PhotoPlaceholder label={person.note} alt={person.alt} />
                  )}
                  <h3 className="mt-4 text-xl text-primary">{person.name}</h3>
                  <p className="text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
            <div className="max-w-3xl mx-auto">
              {/* Family photo: confirm Miguel authorization before merge */}
              <img
                src="/about/family.webp"
                alt={FAMILY_PHOTO.alt}
                width={960}
                height={1200}
                loading="lazy"
                decoding="async"
                className="w-full max-w-md mx-auto aspect-[4/5] object-cover rounded-lg shadow-sm"
              />
              <p className="mt-4 text-center text-muted-foreground">
                Miguel, Raquel and their two children
              </p>
            </div>
          </div>
        </section>

        <HandmadeWithCare />

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl text-primary mb-6">Shop our collection</h2>
            <p className="text-lg text-primary/80 mb-10 leading-relaxed">
              Explore our handmade soaps, artisanal perfumes and home fragrances, made with care in
              British Columbia.
            </p>
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <a
                  href="/shop"
                  className="inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Shop all
                </a>
              </li>
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block px-5 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
