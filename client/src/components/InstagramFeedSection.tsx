import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';

interface InstagramPost {
  id: string;
  url: string;
  caption: string;
  thumbnail?: string;
}

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  const instagramHandle = '@bycsfragrances';
  const instagramUrl = `https://instagram.com/${instagramHandle.replace('@', '')}`;

  // Placeholder posts - in production, these would be fetched from Instagram API
  // Note: Instagram's official API has restrictions, so we're using a placeholder approach
  const placeholderPosts: InstagramPost[] = [
    {
      id: '1',
      url: instagramUrl,
      caption: 'Confira nossos últimos reels e shorts no Instagram',
      thumbnail: '/images/Studio_4 Fragrances.png',
    },
    {
      id: '2',
      url: instagramUrl,
      caption: 'Descubra a essência de CS Fragrances',
      thumbnail: '/images/Studio_CS Her.png',
    },
    {
      id: '3',
      url: instagramUrl,
      caption: 'Fragrâncias que contam histórias',
      thumbnail: '/images/Studio_CS Origin.png',
    },
    {
      id: '4',
      url: instagramUrl,
      caption: 'Qualidade e elegância em cada frasco',
      thumbnail: '/images/Studio_CS Enigma.png',
    },
    {
      id: '5',
      url: instagramUrl,
      caption: 'Novos lançamentos em breve',
      thumbnail: '/images/Studio_CS Horizon.png',
    },
    {
      id: '6',
      url: instagramUrl,
      caption: 'Junte-se à comunidade CS Fragrances',
      thumbnail: '/images/Campaign_Her001.png',
    },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setPosts(placeholderPosts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="text-primary" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe nossos reels, shorts e conteúdo exclusivo no Instagram
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            Visite {instagramHandle}
          </a>
        </div>

        {/* Instagram Feed Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-600">Carregando conteúdo...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg aspect-square bg-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <Instagram className="text-white mx-auto mb-2" size={32} />
                    <p className="text-white font-semibold text-sm px-4 line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Não perca nossos conteúdos exclusivos, dicas de uso e novidades!
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
