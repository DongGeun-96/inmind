import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase-server';
import { BOARD_CONFIG, type BoardType } from '@/types/database';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inmind.kr';
  const supabase = await createClient();

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/terms`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/support`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // 게시판 페이지
  const boardPages: MetadataRoute.Sitemap = Object.keys(BOARD_CONFIG).map((board) => ({
    url: `${siteUrl}/board/${board}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 공개 게시글 (최근 500개)
  const { data: posts } = await supabase
    .from('posts')
    .select('id, updated_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(500);

  const postPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${siteUrl}/post/${post.id}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...boardPages, ...postPages];
}
