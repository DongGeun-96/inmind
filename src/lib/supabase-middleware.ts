import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;
  const skipBanCheck = pathname.startsWith('/auth') ||
    pathname.startsWith('/banned') ||
    pathname.startsWith('/api') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/feed.xml' ||
    pathname === '/manifest.webmanifest';

  const { data: { user } } = await supabase.auth.getUser();

  // Check if logged-in user is banned (skip for auth/api/static routes)
  if (user && !skipBanCheck) {
    const { data: userData } = await supabase
      .from('users')
      .select('is_banned')
      .eq('id', user.id)
      .single();

    if (userData?.is_banned) {
      await supabase.auth.signOut();
      const bannedUrl = request.nextUrl.clone();
      bannedUrl.pathname = '/banned';
      const redirectResponse = NextResponse.redirect(bannedUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, {
          ...cookie,
        });
      });
      return redirectResponse;
    }
  }

  return supabaseResponse;
}
