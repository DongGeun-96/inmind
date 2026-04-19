import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase-admin';

const BOT_PATTERN = /bot|crawler|spider|crawling|prerender|lighthouse|headless/i;

function generateToken(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get('user-agent') || '';
    if (BOT_PATTERN.test(ua)) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const body = await request.json();
    const path = typeof body.path === 'string' ? body.path : '/';

    const cookieStore = await cookies();
    let visitorToken = cookieStore.get('inmind_visitor')?.value;
    let isNewVisitor = false;

    if (!visitorToken) {
      visitorToken = generateToken();
      isNewVisitor = true;
    }

    const supabase = createAdminClient();

    // visitor_sessions upsert
    if (isNewVisitor) {
      await supabase.from('visitor_sessions').insert({
        visitor_token: visitorToken,
        first_seen_at: new Date().toISOString(),
        last_seen_at: new Date().toISOString(),
      });
    } else {
      await supabase
        .from('visitor_sessions')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('visitor_token', visitorToken);
    }

    // page_visits insert
    await supabase.from('page_visits').insert({
      visitor_token: visitorToken,
      path,
      referrer: request.headers.get('referer') || null,
      user_agent: ua || null,
    });

    const response = NextResponse.json({ ok: true });

    if (isNewVisitor) {
      response.cookies.set('inmind_visitor', visitorToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1년
      });
    }

    return response;
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
