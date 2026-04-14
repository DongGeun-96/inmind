import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import SupportClient from './SupportClient';

export const metadata: Metadata = {
  title: '고객센터',
  description: '인마인드 고객센터에서 1:1 문의를 남겨주세요.',
};

export default async function SupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // 내 문의 목록만 조회
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <SupportClient inquiries={inquiries || []} userId={user.id} />;
}
