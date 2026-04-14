import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inmind.kr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mypage', '/auth/', '/api/', '/banned', '/notifications'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
