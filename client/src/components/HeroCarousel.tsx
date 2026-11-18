import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KITS_ENABLED } from '@/lib/flags';

/**
 * Home hero: full-width carousel with a production video as the background of every slide
 * (brand-colour overlay for legibility). Performance notes:
 *  - slide 1's poster + product photo are the LCP images (fetchpriority high);
 *  - videos mount only after the page has loaded, only for slides already visited, and never when the
 *    visitor prefers reduced motion or has data saver on (the poster image is the fallback);
 *  - the videos are 406x720 portrait clips used as soft texture under a 70% overlay.
 */
interface Slide {
  id: string;
  kicker: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Foreground product photo (desktop). */
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  video: string;
  poster: string;
}

const SLIDES: Slide[] = [
  {
    id: 'perfumes',
    kicker: 'Artisanal Eau de Parfum',
    title: 'Four signature fragrances',
    text: 'Handcrafted in small batches in British Columbia. Accessible sophistication with an artisanal heart.',
    cta: { label: 'Shop perfumes', href: '/shop/perfumes' },
    secondary: { label: 'Discover the notes', href: '/#notes' },
    image: '/images/Studio_4 Fragrances.webp',
    imageAlt: 'CS Horizon, CS Enigma, CS Her and CS Origin eau de parfum bottles',
    imageWidth: 933,
    imageHeight: 1400,
    video: '/videos/the-process.mp4',
    poster: '/videos/the-process.webp',
  },
  {
    id: 'soaps',
    kicker: 'Made by hand, bar by bar',
    title: 'Handmade shea butter soap',
    text: 'Small-batch artisanal soap, where it all began for us. Every bar is made by hand in British Columbia.',
    cta: { label: 'Shop soaps', href: '/shop/soaps' },
    image: '/shop/cover-soaps.webp',
    imageAlt: 'CS Fragrances artisanal shea butter bar soap',
    imageWidth: 960,
    imageHeight: 1200,
    video: '/videos/making-soap.mp4',
    poster: '/videos/making-soap.webp',
  },
  KITS_ENABLED
    ? {
        id: 'kits',
        kicker: 'Christmas 2026',
        title: 'Christmas gift kits',
        text: 'Handcrafted sets with perfume, soap, sachets and more, ready to give.',
        cta: { label: 'Shop Christmas kits', href: '/kits' },
        secondary: { label: 'All products', href: '/shop' },
        image: '/kits/perfume-soap.webp',
        imageAlt: 'CS Fragrances perfume and soap Christmas gift kit',
        imageWidth: 1200,
        imageHeight: 1200,
        video: '/videos/making-sachets.mp4',
        poster: '/videos/making-sachets.webp',
      }
    : {
        id: 'gifts',
        kicker: 'Christmas 2026',
        title: 'Gift ideas',
        text: 'Scented candles, wax ornaments, sachets and soaps, made by hand for the people you love.',
        cta: { label: 'Browse gift ideas', href: '/shop' },
        secondary: { label: 'Candles & ornaments', href: '/shop/candles-ornaments' },
        image: '/shop/cover-candles.webp',
        imageAlt: 'CS Fragrances Christmas candles',
        imageWidth: 960,
        imageHeight: 1200,
        video: '/videos/making-sachets.mp4',
        poster: '/videos/making-sachets.webp',
      },
  {
    id: 'story',
    kicker: 'Our story',
    title: 'Two names. One family.',
    text: 'CS is Custodio and Soncin. Where science meets artistry, a family is building a brand together.',
    cta: { label: 'Read our story', href: '/about' },
    image: '/about/family.webp',
    imageAlt: 'Miguel Custodio, Ana Raquel Soncin and their two sons, the family behind CS Fragrances',
    imageWidth: 960,
    imageHeight: 1200,
    video: '/videos/blending-fragrance.mp4',
    poster: '/videos/blending-fragrance.webp',
  },
];

const INTERVAL_MS = 7000;

/** React 18 does not know `fetchPriority`; the lowercase HTML attribute works. First slide = LCP. */
const priority = (first: boolean) =>
  (first ? { fetchpriority: 'high' } : { loading: 'lazy' }) as Record<string, string>;

function HeroVideo({ src, poster, active }: { src: string; poster: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) el.play().catch(() => {});
    else el.pause();
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={active ? 'auto' : 'none'}
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        ready ? 'opacity-70' : 'opacity-0'
      }`}
    />
  );
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);
  const [videoOk, setVideoOk] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  // Decide on video / autoplay after hydration, once the page has loaded (keeps LCP clean).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const isReduced = mq.matches;
    setReduced(isReduced);
    const allowed = !isReduced && !nav.connection?.saveData;
    const start = () => setVideoOk(allowed);
    let t: number | undefined;
    if (document.readyState === 'complete') t = window.setTimeout(start, 300);
    else window.addEventListener('load', () => (t = window.setTimeout(start, 300)), { once: true });
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => {
      if (t) window.clearTimeout(t);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const n = (i + SLIDES.length) % SLIDES.length;
    setCurrent(n);
    setVisited((v) => (v.includes(n) ? v : [...v, n]));
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      if (!document.hidden) goTo(current + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [current, paused, reduced, goTo]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="CS Fragrances highlights"
      className="relative w-full overflow-hidden bg-primary text-primary-foreground h-[calc(100svh-5rem)] min-h-[560px] max-h-[820px] mt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowLeft') goTo(current - 1);
      }}
    >
      {SLIDES.map((s, i) => {
        const active = i === current;
        const Heading = i === 0 ? 'h1' : 'h2';
        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Fallback / LCP background: the video poster */}
            <img
              src={s.poster}
              alt=""
              width={406}
              height={720}
              {...priority(i === 0)}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {videoOk && visited.includes(i) && <HeroVideo src={s.video} poster={s.poster} active={active} />}
            {/* Brand-colour overlay so the text stays readable over the video */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />

            <div className="relative h-full container mx-auto px-6 md:px-8 grid md:grid-cols-12 items-center gap-8">
              <div className="md:col-span-7 lg:col-span-6 py-10">
                <p className="font-display tracking-[0.3em] uppercase text-xs md:text-sm text-accent mb-4">
                  {s.kicker}
                </p>
                <Heading className="text-4xl sm:text-5xl lg:text-7xl text-primary-foreground mb-5 leading-[1.1]">
                  {s.title}
                </Heading>
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mb-8">{s.text}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={s.cta.href}
                    tabIndex={active ? 0 : -1}
                    className="inline-block px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/85 transition-colors"
                  >
                    {s.cta.label}
                  </a>
                  {s.secondary && (
                    <a
                      href={s.secondary.href}
                      tabIndex={active ? 0 : -1}
                      className="inline-block px-8 py-3 rounded-full border border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                    >
                      {s.secondary.label}
                    </a>
                  )}
                </div>
              </div>
              <div className="hidden md:flex md:col-span-5 lg:col-span-6 justify-center md:justify-end h-full items-center py-10">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  width={s.imageWidth}
                  height={s.imageHeight}
                  {...priority(i === 0)}
                  decoding="async"
                  className="max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-primary-foreground/20"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/30 text-primary-foreground"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/30 text-primary-foreground"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            aria-current={i === current}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? 'w-8 bg-accent' : 'w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
