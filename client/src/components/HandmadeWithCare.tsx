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

export default function HandmadeWithCare() {
  return (
    <section id="handmade" className="py-24 md:py-32 bg-primary-foreground">
      <div className="container max-w-6xl mx-auto">
        <h2 className="section-title text-primary text-center mb-6">Handmade with care</h2>
        <p className="text-lg md:text-xl text-primary/80 text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
          Every soap, sachet and fragrance is made by hand in our British Columbia studio. These
          films show the work behind our artisanal perfume and handmade soap.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTION_VIDEOS.map((video) => (
            <LazyVideo key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
