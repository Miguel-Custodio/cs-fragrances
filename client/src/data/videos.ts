import { SITE_URL } from '@/hooks/usePageMeta';

export const VIDEO_WIDTH = 406;
export const VIDEO_HEIGHT = 720;

export type ProductionVideo = {
  id: string;
  src: string;
  poster: string;
  name: string;
  description: string;
  uploadDate: string;
  width: number;
  height: number;
};

/** Artisan production videos exported from Canva and compressed for the web. */
export const PRODUCTION_VIDEOS: ProductionVideo[] = [
  {
    id: 'making-soap',
    src: '/videos/making-soap.mp4',
    poster: '/videos/making-soap.webp',
    name: 'Come Make Soap With Me',
    description:
      'Behind the scenes of handmade soap making at CS Fragrances, a family-owned studio in British Columbia, Canada.',
    uploadDate: '2026-08-21',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  {
    id: 'the-process',
    src: '/videos/the-process.mp4',
    poster: '/videos/the-process.webp',
    name: 'The Process',
    description:
      'Measuring and blending ingredients by hand in the CS Fragrances studio in British Columbia.',
    uploadDate: '2026-03-28',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  {
    id: 'blending-fragrance',
    src: '/videos/blending-fragrance.mp4',
    poster: '/videos/blending-fragrance.webp',
    name: 'Blending a fragrance',
    description:
      'Artisanal fragrance blending at CS Fragrances — oils poured and combined by hand in British Columbia, Canada.',
    uploadDate: '2026-07-08',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  {
    id: 'making-sachets',
    src: '/videos/making-sachets.mp4',
    poster: '/videos/making-sachets.webp',
    name: 'Making scent sachets',
    description:
      'Handmade scent sachets being weighed and finished at the CS Fragrances studio in British Columbia.',
    uploadDate: '2026-07-08',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
];

export function videoObjectJsonLd(video: ProductionVideo) {
  return {
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: `${SITE_URL}${video.poster}`,
    uploadDate: video.uploadDate,
    contentUrl: `${SITE_URL}${video.src}`,
  };
}
