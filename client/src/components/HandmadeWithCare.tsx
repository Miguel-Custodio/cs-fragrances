import { useEffect, useRef } from 'react';
import { PRODUCTION_VIDEOS, type ProductionVideo } from '@/data/videos';

function LazyVideo({ video }: { video: ProductionVideo }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg bg-secondary aspect-[406/720]">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={video.poster}
          width={video.width}
          height={video.height}
          className="h-full w-full object-cover"
          aria-label={video.name}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <figcaption>
        <p className="text-primary font-medium">{video.name}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
      </figcaption>
    </figure>
  );
}

/** Real workshop photos (decorative Christmas soaps). Site-safe crops: no handwritten workshop labels. */
const PROCESS_PHOTOS = [
  {
    src: '/process/soap-step-1-shredded-base.webp',
    title: '1. A bed of shredded soap',
    alt: 'Purple silicone soap mold with six cavities, each filled with pale green shredded soap before the pour',
  },
  {
    src: '/process/soap-step-2-shapes.webp',
    title: '2. Shapes placed by hand',
    alt: 'Soap mold cavities with small Christmas shapes arranged by hand: gingerbread, pinecones, gift boxes, snowflakes and a snowman',
  },
  {
    src: '/process/soap-step-3-poured.webp',
    title: '3. Clear soap poured over',
    alt: 'Soap mold with clear soap base poured over Christmas shapes in the top cavities, the bottom cavities still waiting',
  },
  {
    src: '/process/soap-step-4-ornaments-and-shapes.webp',
    title: '4. Ornaments and shapes',
    alt: 'Pile of hand-made hanging wax ornaments and small Christmas shapes on a white tray in the workshop',
  },
] as const;

function ProcessPhotos() {
  return (
    <div className="mb-16 md:mb-20">
      <h3 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-3">How it&rsquo;s made</h3>
      <p className="text-primary/80 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
        Real photos from our workshop, showing how our decorative Christmas soaps take shape, one mold at a time.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {PROCESS_PHOTOS.map((p) => (
          <figure key={p.src} className="flex flex-col gap-2">
            <img
              src={p.src}
              alt={p.alt}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-lg bg-secondary aspect-[4/5] object-cover"
            />
            <figcaption className="text-sm text-primary/80">{p.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function HandmadeWithCare() {
  return (
    <section id="handmade" className="py-24 md:py-32 bg-primary-foreground">
      <div className="container max-w-6xl mx-auto">
        <h2 className="section-title text-primary text-center mb-6">Handmade with care</h2>
        <p className="text-lg md:text-xl text-primary/80 text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
          Every soap, sachet and fragrance is made by hand in our British Columbia studio. These
          films show the work behind our artisanal perfume and handmade soap.
        </p>
        <ProcessPhotos />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTION_VIDEOS.map((video) => (
            <LazyVideo key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
