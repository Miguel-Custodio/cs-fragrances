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

const PHOTOS = {
  raquel: {
    src: '/about/raquel.webp',
    alt: 'Ana Raquel Soncin, co-founder of CS Fragrances, at the CS Fragrances holiday market stand',
  },
  miguel: {
    src: '/about/miguel.webp',
    alt: 'Miguel Custodio, co-founder of CS Fragrances, serving customers at the CS Fragrances market stand',
  },
  family: {
    src: '/about/family.webp',
    alt: 'Miguel Custodio, Ana Raquel Soncin and their two sons, the family behind CS Fragrances',
  },
} as const;

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
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

function Photo({ photo, className = '' }: { photo: { src: string; alt: string }; className?: string }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={960}
      height={1200}
      loading="lazy"
      decoding="async"
      className={`w-full aspect-[4/5] object-cover rounded-lg shadow-sm ${className}`}
    />
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-2 border-l-4 border-accent pl-6 md:pl-8 py-2 font-display text-2xl md:text-3xl leading-snug text-primary">
      {children}
    </blockquote>
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
        <header className="container max-w-4xl mx-auto px-4 pb-14 md:pb-20 text-center">
          <p className="tracking-[0.3em] uppercase text-sm text-muted-foreground mb-4">Our Story</p>
          <h1 className="section-title text-primary mb-6">Every fragrance begins with a story</h1>
          <p className="text-xl md:text-2xl text-primary/80 leading-relaxed">
            Ours began with two names, a handmade bar of soap and a family willing to build
            something together.
          </p>
        </header>

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-5 gap-10 md:gap-14 items-center">
            <div className="md:col-span-3 space-y-5 text-lg md:text-xl text-primary leading-relaxed">
              <h2 className="text-3xl md:text-4xl text-primary">It started with a bar of soap</h2>
              <p>
                Long before there was a perfume, there was soap. When Miguel met Raquel, she was
                already making artisanal soap by hand. He sold it during college, bar by bar, to help
                pay her tuition in Chemistry.
              </p>
              <p>
                She had the craft. He had the care. Together they proved that something made with
                love can carry a dream a long way.
              </p>
              <p>
                Those first bars were never just a product. They were a promise between two people,
                and the beginning of everything that followed.
              </p>
            </div>
            <div className="md:col-span-2">
              <Photo photo={PHOTOS.raquel} />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-3xl mx-auto px-4 space-y-6 text-lg md:text-xl text-primary leading-relaxed">
            <h2 className="text-3xl md:text-4xl text-primary">Two names. One brand.</h2>
            <p>
              CS stands for <strong>Custodio</strong> and <strong>Soncin</strong>, our two family
              names, side by side on every label. It is a small reminder of who stands behind what you
              hold in your hands.
            </p>
            <p>
              From that first soap grew a collection of artisanal perfumes, body mists, home
              sprays and sachets, each one blended and finished by us.
            </p>
            <p>
              It is born from a passion for alchemy and the art of scent: knowledge and craft,
              blended to create fragrances that carry warmth, elegance and the beauty of everyday
              life.
            </p>
            <PullQuote>Born from love, family, and craftsmanship.</PullQuote>
          </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-5 gap-10 md:gap-14 items-center">
            <div className="md:col-span-2 order-2 md:order-1">
              <Photo photo={PHOTOS.miguel} />
            </div>
            <div className="md:col-span-3 order-1 md:order-2 space-y-5 text-lg md:text-xl text-primary leading-relaxed">
              <h2 className="text-3xl md:text-4xl text-primary">Where science meets artistry</h2>
              <p>
                Raquel&rsquo;s Chemistry background brings the science. Our hands bring the artistry.
                Every perfume, body mist, home spray, soap and sachet is made by hand, in small
                batches, here in British Columbia.
              </p>
              <p>
                We craft each scent to awaken memories and emotions, with accessible sophistication
                and an artisanal heart. Small batches let us give every detail our full attention,
                from blending the scent to wrapping the final package.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-5 gap-10 md:gap-14 items-center">
            <div className="md:col-span-3 space-y-5 text-lg md:text-xl text-primary leading-relaxed">
              <h2 className="text-3xl md:text-4xl text-primary">A family business, in every sense</h2>
              <p>
                Today we are building CS Fragrances together, with our two sons by our side and
                Reza on the team. You can meet us at local fairs and holiday markets, and you can
                find us online and on Amazon.
              </p>
              <p>
                We are building this brand the way we are raising our family: together, with patience
                and a lot of heart. Every order is packed with the same care as that first bar of
                soap.
              </p>
            </div>
            <div className="md:col-span-2">
              <Photo photo={PHOTOS.family} />
              <p className="mt-3 text-center text-muted-foreground">Miguel, Raquel and our two sons</p>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl text-primary text-center mb-10">The people behind CS</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <li>
                <h3 className="text-xl text-primary">Ana Raquel Soncin</h3>
                <p className="text-muted-foreground">Co-founder</p>
              </li>
              <li>
                <h3 className="text-xl text-primary">Miguel Custodio</h3>
                <p className="text-muted-foreground">Co-founder</p>
              </li>
              <li>
                {/* Reza: no photo yet (a real photo has been requested). Monogram until then. */}
                <div
                  aria-hidden="true"
                  className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xl"
                >
                  R
                </div>
                <h3 className="text-xl text-primary">Reza</h3>
                <p className="text-muted-foreground">Team member</p>
              </li>
            </ul>
          </div>
        </section>

        <HandmadeWithCare />

        <section className="bg-secondary py-16 md:py-24">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl text-primary mb-6">Bring a piece of our story home</h2>
            <p className="text-lg text-primary/80 mb-10 leading-relaxed">
              Accessible sophistication with an artisanal heart: that is the promise behind every
              bottle, bar and sachet. Explore our handmade soaps, artisanal perfumes and home
              fragrances, made with care in British Columbia.
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
              <li>
                <a
                  href="/business"
                  className="inline-block px-5 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  For business
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
