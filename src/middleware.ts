import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase-middleware';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
