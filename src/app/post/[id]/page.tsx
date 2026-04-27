import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { BOARD_CONFIG, CATEGORIES, type BoardType } from '@/types/database';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  const { data: post } = await supabase
    .from('posts')
    .select('*, user:users(nickname)')
    .eq('id', id)
    .single();

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-mind.dev';
  const config = BOARD_CONFIG[post.board_type as BoardType];

  if (!post.is_public && !user) {
    notFound();
  }

  const category = CATEGORIES.find((cat) => cat.boards.includes(post.board_type as BoardType));

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: config.category, item: `${siteUrl}/board/${post.board_type}` },
      { '@type': 'ListItem', position: 3, name: config.label, item: `${siteUrl}/board/${post.board_type}` },
      { '@type': 'ListItem', position: 4, name: post.title },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.is_anonymous ? '익명' : post.user?.nickname || '알 수 없음',
    },
    publisher: {
      '@type': 'Organization',
      name: '인마인드',
    },
    url: `${siteUrl}/post/${id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ padding: 32, fontFamily: 'monospace' }}>
        <h1>POST_DEBUG_JSONLD</h1>
        <p>title: {post.title}</p>
        <p>cat: {category?.name}</p>
      </div>
    </>
  );
}
