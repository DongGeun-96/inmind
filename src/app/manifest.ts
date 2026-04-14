import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '인마인드 - 힐링 커뮤니티',
    short_name: '인마인드',
    description: '공감과 위로를 나눌 수 있는 따뜻한 커뮤니티',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5470FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
