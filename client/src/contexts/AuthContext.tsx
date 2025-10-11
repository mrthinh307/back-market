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
  initiateFacebookOAuth,
  initiateGoogleOAuth,
  loginWithPassword,
  logOut,
  refreshToken,
  signUp,
} from '@/api/auth.api';
import { errorToastProps, successToastProps } from '@/libs/toast/toast-props';
import { parseAxiosError } from '@/utils/AxiosError';
import { Env } from '@/libs/Env';
import { fetchProfile } from '@/api/user.api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (params: SignUpParams) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  getMe: () => Promise<any> | undefined;
  checkAuth: () => Promise<void>;
}

interface SignUpParams {
  initialEmail: string | undefined;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  loginWithGoogle: () => {},
  loginWithFacebook: () => {},
  getMe: async () => undefined,
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const locale = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to check authentication status
  const checkAuth = async () => {
    try {
      // Try to refresh token (this will validate cookies on server)
      await refreshToken();
      setIsAuthenticated(true);
    } catch (err) {
      console.warn('User not authenticated:', err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (initialEmail: string, password: string) => {
    if (isLoading) {
      return; // Prevent multiple submissions
    }

    try {
      setIsLoading(true);

      if (initialEmail && password) {
        await loginWithPassword(initialEmail, password);

        toast.success('Welcome back !', {
          description: 'Navigate to dashboard ...',
          ...successToastProps,
        });

        setIsAuthenticated(true);
        router.push(`/${locale}`); // Redirect to previous page
      }
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        toast.error('Invalid credentials.', {
          ...errorToastProps,
        });
      }
      setIsAuthenticated(false);
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
        await signUp(
          initialEmail,
          password,
          firstName,
          lastName,
        );

        toast.success('Sign up successfully !', {
          description: 'Redirecting to your dashboard...',
          ...successToastProps,
        });

        setIsAuthenticated(true);
        router.push(`/${locale}`);
      }
    } catch (err: any) {
      setIsAuthenticated(false);
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

  const logout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      window.location.href = `/${locale}/email`;
    }
  };

  const getMe = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setIsLoading(true);

      const userData = await fetchProfile();
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
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        loginWithGoogle,
        loginWithFacebook,
        getMe,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
