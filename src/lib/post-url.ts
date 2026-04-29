// 게시글 URL 빌더 — /post/[slug]/[id] 형태로 SEO 친화적 URL 생성
// slug는 제목 기반 (한글 그대로 유지, Naver/Google 모두 한글 URL 지원)

export function slugify(title: string | null | undefined): string {
  if (!title) return 'post';
  const slug = title
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // 글자/숫자/공백/하이픈만 남김
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return slug || 'post';
}

interface PostLike {
  id: string;
  title?: string | null;
}

export function postUrl(post: PostLike): string {
  return `/post/${slugify(post.title)}/${post.id}`;
}

export function postAbsoluteUrl(post: PostLike, base = 'https://in-mind.dev'): string {
  return `${base}${postUrl(post)}`;
}
