import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import MypageClient from './MypageClient';

export default async function MypagePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const [{ data: profile }, { data: myPosts }, { data: myComments }, { data: myEmpathies }] = await Promise.all([
    supabase.from('users').select('*').eq('id', user.id).single(),
    supabase.from('posts').select('*, user:users(nickname), empathy_count:empathies(count), comment_count:comments(count)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
    supabase.from('comments').select('*, post:posts(id, title, board_type)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
    supabase.from('empathies').select('*, post:posts(*, user:users(nickname), empathy_count:empathies(count), comment_count:comments(count))').eq('user_id', user.id).not('post_id', 'is', null).order('created_at', { ascending: false }).limit(20),
  ]);

  return (
    <MypageClient
      profile={profile}
      myPosts={myPosts || []}
      myComments={myComments || []}
      myEmpathies={myEmpathies || []}
    />
  );
}
