'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { toast } from 'sonner';
import {
  getAccessToken,
  setAccessToken as setTokenGlobal,
} from '@/libs/token-manager';
import {
  initiateFacebookOAuth,
  initiateGoogleOAuth,
  loginWithPassword,
  refreshToken,
  signUp,
} from '@/api/auth.api';
import { successToastProps } from '@/libs/toast/toast-props';
import { parseAxiosError } from '@/utils/AxiosError';
import { Env } from '@/libs/Env';
import { fetchProfile } from '@/api/user.api';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (params: SignUpParams) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  getMe: () => Promise<any> | undefined;
}

interface SignUpParams {
  initialEmail: string | undefined;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: () => {},
  loginWithFacebook: () => {},
  getMe: async () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const locale = useLocale();
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = (token: string | null) => {
    setTokenGlobal(token);
    setAccessTokenState(token);
  };

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const tokens = await refreshToken();
        setAccessToken(tokens.access_token);
      } catch (err) {
        console.warn('Error refreshing access token:', err);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    tryRefresh();
  }, []);

  // Sync state with token-manager (for UI reactivity)
  useEffect(() => {
    const currentToken = getAccessToken();
    if (currentToken !== accessToken) {
      setAccessTokenState(currentToken);
    }
  }, [accessToken]);

  const login = async (initialEmail: string, password: string) => {
    if (isLoading) {
      return; // Prevent multiple submissions
    }

    try {
      setIsLoading(true);

      if (initialEmail && password) {
        const response = await loginWithPassword(initialEmail, password);

        toast.success('Welcome back !', {
          description: 'Navigate to dashboard ...',
          ...successToastProps,
        });

        const { access_token } = response;
        setAccessToken(access_token);

        router.back(); // Redirect to previous page
      }
    } catch (err: any) {
      const { message } = parseAxiosError(err);

      if (Env.NODE_ENV === 'development') {
        console.warn(
          'Development Environtment Message - Error login:',
          message,
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (sigupParams: SignUpParams) => {
    const { initialEmail, password, firstName, lastName } = sigupParams;

    if (isLoading) {
      return; // Prevent multiple submissions
    }

    try {
      setIsLoading(true);
      if (initialEmail && password && firstName && lastName) {
        const response = await signUp(
          initialEmail,
          password,
          firstName,
          lastName,
        );

        toast.success('Sign up successfully !', {
          description: 'Redirecting to your dashboard...',
          ...successToastProps,
        });

        const { access_token } = response;
        setAccessToken(access_token);

        router.push(`/${locale}`);
      }
    } catch (err: any) {
      const { message } = parseAxiosError(err);

      if (Env.NODE_ENV === 'development') {
        console.warn(
          'Development Environtment Message - Error sign up:',
          message,
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    if (isLoading) {
      return; // Prevent multiple submissions
    }

    try {
      setIsLoading(true);
      initiateGoogleOAuth(); // Redirect browser to Google
    } catch (err: any) {
      const { message } = parseAxiosError(err);

      if (Env.NODE_ENV === 'development') {
        console.warn('Development Environment Message - Error login:', message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  //FIXME: Facebook login function
  const loginWithFacebook = () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      initiateFacebookOAuth();
    } catch (err: any) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getMe = async () => {
    if (!accessToken) {
      return;
    }

    try {
      setIsLoading(true);

      const userData = await fetchProfile();
      console.log('User data fetched:', userData);
      return userData;
    } catch (err: any) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        loginWithFacebook,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
