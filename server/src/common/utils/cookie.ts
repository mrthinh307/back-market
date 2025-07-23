import { Response, CookieOptions } from 'express';

export function getCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };
}

export function setAuthCookies(
  res: Response,
  tokens: { access_token: string; refresh_token: string },
) {
  res.cookie('refresh_token', tokens.refresh_token, getCookieOptions());
}
