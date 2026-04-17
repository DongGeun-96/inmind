import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import ExpertInquiryClient from './ExpertInquiryClient';

export const metadata: Metadata = {
  title: '전문가 등록 문의',
  description: '인마인드에 전문가로 등록하고 싶으신가요? 문의를 남겨주세요.',
};

export default async function ExpertInquiryPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const { data: inquiries } = await supabase
    .from('expert_inquiries')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <ExpertInquiryClient
      userId={session.user.id}
      inquiries={inquiries || []}
    />
  );
}
