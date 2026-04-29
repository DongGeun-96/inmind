// 레거시 URL: /post/[id] → /post/[slug]/[id] 로 영구 리다이렉트
// (구글이 색인한 UUID URL과 외부 링크 호환성 유지)
import { permanentRedirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { postUrl } from '@/lib/post-url';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LegacyPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('id, title')
    .eq('id', id)
    .single();

  if (!post) notFound();

  permanentRedirect(postUrl(post));
}
