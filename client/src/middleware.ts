// middleware.ts
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

  // Bỏ qua các file static và API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/assets/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Lấy locale từ pathname
  const pathnameLocale = pathname.split('/')[1] || '';
  const locale = ['en', 'ja'].includes(pathnameLocale) ? pathnameLocale : 'en';

  // Loại bỏ locale prefix để check route
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // Check nếu là protected route
  const isProtectedRoute = protectedRoutes.some((route) => {
    return (
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );
  });

  // Check nếu là public route
  const isPublicRoute = publicRoutes.some((route) => {
    return (
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );
  });

  // Nếu là protected route, check authentication
  if (isProtectedRoute) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    // Không có refresh token → redirect về trang email
    if (!refreshToken) {
      const loginUrl = new URL(`/${locale}/email`, request.url);
      // Lưu URL hiện tại để redirect lại sau khi login
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Có refresh token → cho phép truy cập
    // ProtectedRoute component sẽ check accessToken ở client-side
  }

  // Nếu đã login và vào public route (login/register), redirect về home
  if (isPublicRoute) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (
      refreshToken &&
      (pathWithoutLocale === '/email' || pathWithoutLocale === '/login')
    ) {
      // User đã login nhưng vẫn cố vào trang login → redirect về home
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  // Chạy intl middleware cho tất cả các routes còn lại
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
