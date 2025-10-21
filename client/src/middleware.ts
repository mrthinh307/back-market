import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Tạo intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

const protectedRoutes = ['/cart', '/profile', '/dashboard'];

const publicRoutes = ['/email', '/email/login', '/signup', '/forgot-password'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/assets/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split('/')[1] || '';
  const locale = ['en', 'ja'].includes(pathnameLocale) ? pathnameLocale : 'en';

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const isProtectedRoute = protectedRoutes.some((route) => {
    return (
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );
  });

  const isPublicRoute = publicRoutes.some((route) => {
    return (
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );
  });

  if (isProtectedRoute) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      const loginUrl = new URL(`/${locale}/email`, request.url);
      // Lưu URL hiện tại để redirect lại sau khi login
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isPublicRoute) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (
      refreshToken &&
      (pathWithoutLocale === '/email' || pathWithoutLocale === '/login')
    ) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ja|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
