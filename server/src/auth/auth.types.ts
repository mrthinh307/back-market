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

export interface UserAuth {
  id: string;
  email: string;
  emailVerified: boolean;
  provider?: string;
  providerId?: string;
  role?: string;
}

export interface UserProfile {
  id: string;
  authId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  provider?: string | null;
  providerId?: string | null;
  role: string;
  profile: {
    id: string;
    authId: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
  };
}
