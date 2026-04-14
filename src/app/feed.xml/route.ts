import { createClient } from '@/lib/supabase-server';
import { BOARD_CONFIG, type BoardType } from '@/types/database';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inmind.kr';
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, board_type, created_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(50);

  const items = (posts || []).map((post) => {
    const description = post.content.replace(/<[^>]*>/g, '').slice(0, 200);
    const config = BOARD_CONFIG[post.board_type as BoardType];
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/post/${post.id}</link>
      <description><![CDATA[${description}]]></description>
      <category>${config?.label || post.board_type}</category>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <guid>${siteUrl}/post/${post.id}</guid>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>인마인드 - 힐링 커뮤니티</title>
    <link>${siteUrl}</link>
    <description>공감과 위로를 나눌 수 있는 따뜻한 커뮤니티</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
