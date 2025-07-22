export interface LoginPhaseResponse {
  action: 'login' | 'signup';
  message: string;
}
export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  readonly sub: string;
  readonly email: string;
}

export interface RequestWithCookies extends Request {
  cookies: {
    refresh_token?: string;
  };
}

export interface OAuthUserInfo {
  provider: string;
  providerId: string;
  email: string;
  emailVerified?: boolean;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}
