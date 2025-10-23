import { cookies } from 'next/headers';
import { routing } from '@/libs/i18n/I18nRouting';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

/**
 * Server-side wrapper for serverFetch that automatically forwards cookies from Next.js request.
 * Use this in server components/actions when making authenticated requests to the backend.
 *
 * @param url - The URL to fetch
 * @param options - Fetch options (headers, cache, etc.)
 * @returns Promise<Response>
 *
 * @example
 * ```ts
 * const res = await serverFetchWithCookies(`${Env.NEXT_PUBLIC_API_URL}/users/me`, {
 *   cache: 'no-store',
 * });
 * ```
 */
export async function serverFetchWithCookies(
  url: string,
  options: RequestInit = {},
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return fetch(url, {
    credentials: 'include',
    headers: {
      ...(options.headers || {}),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    ...options,
  });
}
