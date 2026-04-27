import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { BOARD_CONFIG, CATEGORIES, type BoardType } from '@/types/database';
import PostDetailClient from './PostDetailClient';

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

  const config = BOARD_CONFIG[post.board_type as BoardType];

  if (!post.is_public && !user) {
    notFound();
  }

  const { data: comments } = await supabase
    .from('comments')
    .select('*, user:users(nickname)')
    .eq('post_id', id)
    .order('created_at', { ascending: true });

  const { count: empathyCount } = await supabase
    .from('empathies')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id);

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

  return (
    <PostDetailClient
      post={{ ...post, empathy_count: empathyCount || 0 }}
      comments={comments || []}
      config={config}
      currentUserId={user?.id || null}
      initialHasEmpathy={hasEmpathy}
      relatedPosts={relatedPosts || []}
      categoryName={category?.name || config.label}
    />
  );
}
