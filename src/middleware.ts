import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if it exists
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If accessing a public property page, allow access
  if (req.nextUrl.pathname.match(/^\/properties\/[^\/]+$/)) {
    return res;
  }

  // If accessing dashboard without session, redirect to login
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If we have a session and trying to access auth routes, redirect to dashboard
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/properties/:path*'
  ],
};
