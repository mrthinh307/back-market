export interface LoginSuccessResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    createdAt: Date;
  };
  access_token: string;
  refresh_token: string;
}

export interface LoginPhaseResponse {
  action: 'login' | 'signup';
  message: string;
}

export type LoginResult = LoginSuccessResponse | LoginPhaseResponse;

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface RequestWithCookies extends Request {
  cookies: {
    refresh_token?: string;
  };
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}
