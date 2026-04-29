import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { renderPostContent } from '@/lib/post-content';
import { BOARD_CONFIG, CATEGORIES, type BoardType } from '@/types/database';
import { postUrl } from '@/lib/post-url';
import PostDetailClient from './PostDetailClient';

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, content, board_type, is_public, is_anonymous, created_at, updated_at, user:users(nickname)')
    .eq('id', id)
    .single();

  if (!post || !post.is_public) {
    return { title: '인마인드' };
  }

  const plainText = post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const description = plainText.slice(0, 160);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-mind.dev';
  const canonicalPath = postUrl({ id, title: post.title });
  const config = BOARD_CONFIG[post.board_type as BoardType];
  const authorName = post.is_anonymous ? '익명' : (post.user as any)?.nickname || '알 수 없음';

  // 네이버/구글 키워드 추출 (제목 + 게시판 라벨 + 고정 브랜드)
  const titleKeywords = post.title.split(/\s+/).filter((w: string) => w.length >= 2).slice(0, 5);
  const keywords = [
    ...titleKeywords,
    config?.label,
    config?.category,
    '인마인드',
    '힌링 커뮤니티',
    '공감과 위로',
  ].filter(Boolean) as string[];

  return {
    title: post.title,
    description,
    keywords,
    authors: [{ name: authorName }],
    alternates: { canonical: `${siteUrl}${canonicalPath}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      locale: 'ko_KR',
      siteName: '인마인드',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [authorName],
      section: config?.label,
      tags: [config?.label, config?.category, '인마인드'].filter(Boolean) as string[],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
    },
    other: {
      // 네이버/일부 도구가 읽는 레거시 키워드 태그
      news_keywords: keywords.slice(0, 10).join(', '),
      'article:author': authorName,
      'article:section': config?.label || '',
      'article:published_time': post.created_at,
      'article:modified_time': post.updated_at,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug, id } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  const { data: post } = await supabase
    .from('posts')
    .select('*, user:users(nickname)')
    .eq('id', id)
    .single();

  if (!post) notFound();

  // slug는 장식용. 불일치해도 200으로 제공하고 canonical URL만 일관되게
  // (slugify 디코딩 충돌 및 리다이렉트 루프 방지)
  void slug;

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

  // 계산된 메타 값들
  const canonicalUrl = `${siteUrl}${postUrl({ id, title: post.title })}`;
  const plainText = post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const description = plainText.slice(0, 200);
  const wordCount = plainText.length;

  // 본문 내 첫 이미지 추출 (없으면 기본 OG 이미지)
  const firstImageMatch = post.content.match(/<img[^>]+src=["']([^"']+)["']/);
  const articleImage = firstImageMatch?.[1] || `${siteUrl}/opengraph-image`;

  // 댓글을 Comment 스키마로 매핑 (상위 5개만)
  const commentSchema = (comments || []).slice(0, 5).map((c: any) => ({
    '@type': 'Comment',
    text: (c.content || '').replace(/<[^>]*>/g, '').slice(0, 500),
    dateCreated: c.created_at,
    author: {
      '@type': 'Person',
      name: c.is_anonymous ? '익명' : c.user?.nickname || '알 수 없음',
    },
  }));

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: config.category, item: `${siteUrl}/board/${post.board_type}` },
      { '@type': 'ListItem', position: 3, name: config.label, item: `${siteUrl}/board/${post.board_type}` },
      { '@type': 'ListItem', position: 4, name: post.title, item: canonicalUrl },
    ],
  };

  // DiscussionForumPosting (구글 커뮤니티/포럼 전용 스키마) + Article 호환 필드
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    '@id': canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    headline: post.title,
    name: post.title,
    description,
    articleBody: plainText.slice(0, 5000),
    text: plainText.slice(0, 5000),
    wordCount,
    inLanguage: 'ko',
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: canonicalUrl,
    image: articleImage,
    keywords: [config.label, config.category, '인마인드', '힌링', '공감'].filter(Boolean).join(', '),
    isPartOf: {
      '@type': 'WebSite',
      name: '인마인드',
      url: siteUrl,
    },
    author: {
      '@type': 'Person',
      name: post.is_anonymous ? '익명' : post.user?.nickname || '알 수 없음',
    },
    publisher: {
      '@type': 'Organization',
      name: '인마인드',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: empathyCount || 0,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: (comments || []).length,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ViewAction',
        userInteractionCount: post.view_count || 0,
      },
    ],
    commentCount: (comments || []).length,
    ...(commentSchema.length > 0 ? { comment: commentSchema } : {}),
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
