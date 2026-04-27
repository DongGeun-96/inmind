import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { renderPostContent } from '@/lib/post-content';
import { BOARD_CONFIG, CATEGORIES, type BoardType } from '@/types/database';
import PostDetailClient from './PostDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, content, board_type, is_public')
    .eq('id', id)
    .single();

  if (!post || !post.is_public) {
    return { title: '인마인드' };
  }

  const description = post.content.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      type: 'article',
      title: post.title,
      description,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
    },
  };
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

  // 비공개 게시물은 로그인 필수
  if (!post.is_public && !user) {
    notFound();
  }

  // 댓글 조회 (대댓글 포함)
  const { data: comments } = await supabase
    .from('comments')
    .select('*, user:users(nickname)')
    .eq('post_id', id)
    .order('created_at', { ascending: true });

  // 공감 수
  const { count: empathyCount } = await supabase
    .from('empathies')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id);

  // 현재 유저의 공감 여부
  let hasEmpathy = false;
  if (user) {
    const { data } = await supabase
      .from('empathies')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .maybeSingle();
    hasEmpathy = !!data;
  }

  // 같은 카테고리의 다른 글
  const category = CATEGORIES.find((cat) => cat.boards.includes(post.board_type as BoardType));
  const siblingBoards = category?.boards || [post.board_type];

  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('*, user:users(nickname), comment_count:comments(count), empathy_count:empathies(count)')
    .in('board_type', siblingBoards)
    .neq('id', id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(5);

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
    <PostDetailClient
      post={{ ...post, empathy_count: empathyCount || 0 }}
      contentHtml={renderPostContent(post.content)}
      comments={comments || []}
      config={config}
      currentUserId={user?.id || null}
      initialHasEmpathy={hasEmpathy}
      relatedPosts={relatedPosts || []}
      categoryName={category?.name || config.label}
    />
    </>
  );
}
