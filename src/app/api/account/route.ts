import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase-admin';

export async function DELETE() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '로그인이 필요해요' }, { status: 401 });
    }

    const admin = createAdminClient();

    // public.users 삭제
    await admin.from('users').delete().eq('id', user.id);

    // auth 유저 삭제
    const { error } = await admin.auth.admin.deleteUser(user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '요청 처리에 실패했습니다' }, { status: 500 });
  }
}
