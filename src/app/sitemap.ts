import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase-server';
import { BOARD_CONFIG, type BoardType } from '@/types/database';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-mind.dev';
  const supabase = await createClient();

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/terms`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/support`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/test`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/test/phq9`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/gad7`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/stress`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/insomnia`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/self-esteem`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/burnout`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/mbti-lite`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/enneagram`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/big5`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/introvert`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/attachment`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/love-languages`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/love-style`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/breakup-recovery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/hsp`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/perfectionism`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/self-care`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/mind-color`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/healing-style`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/comfort-style`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/test/animal-face`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/test/food-type`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/test/beverage`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/test/drama-character`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/test/past-life`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/test/cat-or-dog`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/help`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/help/depression-first-steps`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/help/pet-loss`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/help/human-loss`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/help/sleep`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/help/panic`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/help/burnout`, changeFrequency: 'monthly', priority: 0.5 },
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
