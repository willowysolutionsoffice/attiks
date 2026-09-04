import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtPayload(token: string): { exp?: number; role?: string; email?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('attiks_admin_token')?.value;
  const isLoginPage = pathname === '/admin/login';

  let isAuthenticated = false;
  let isAdmin = false;

  if (token) {
    const payload = decodeJwtPayload(token);
    if (payload) {
      const isExpired = payload.exp ? payload.exp * 1000 < Date.now() : false;
      if (!isExpired) {
        isAuthenticated = true;
        isAdmin = payload.role === 'ADMIN';
      }
    }
  }

  // If already logged in as Admin and visiting login page, redirect to dashboard or redirect param
  if (isLoginPage) {
    if (isAuthenticated && isAdmin) {
      const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/admin/dashboard';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // For all protected /admin routes: verify authentication and ADMIN role
  if (!isAuthenticated || !isAdmin) {
    const loginUrl = new URL('/admin/login', request.url);
    const returnUrl = pathname + search;
    loginUrl.searchParams.set('redirect', returnUrl);

    const response = NextResponse.redirect(loginUrl);
    // Clear invalid or expired cookie
    if (token && (!isAuthenticated || !isAdmin)) {
      response.cookies.delete('attiks_admin_token');
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
