import { Response, CookieOptions } from 'express';

export function getCookieOptions(): CookieOptions {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    domain: isProd ? process.env.DOMAIN_NAME || 'mrthinh.site' : undefined,
    path: '/',
  };
}

export function setAuthCookies(
  res: Response,
  tokens: { access_token: string; refresh_token: string },
) {
  const cookieOptions = getCookieOptions();

  // Set both access_token and refresh_token in cookies
  res.cookie('access_token', tokens.access_token, cookieOptions);
  res.cookie('refresh_token', tokens.refresh_token, cookieOptions);
}

export function getAccessTokenFromCookies(req: any): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return req.cookies?.access_token || null;
}

export function clearAuthCookies(res: Response) {
  const cookieOptions = getCookieOptions();
  
  res.clearCookie('access_token', cookieOptions);
  res.clearCookie('refresh_token', cookieOptions);
}

export function getRefreshTokenFromCookies(req: any): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return req.cookies?.refresh_token || null;
}
