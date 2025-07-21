'use client';

import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useRouterRedirect } from '@/hooks/useRouterRedirect';
import LoadingPage from '@/components/LoadingPage';

export default function AdminPage() {
  const { accessToken, isLoading, getMe } = useAuth();
  const { redirectToLogin, redirectToHome } = useRouterRedirect();

  const [isAdmin, setIsAdmin] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        if (!hasRedirected) {
          setHasRedirected(true);
          redirectToLogin();
        }
        return;
      }

      const userData = await getMe();

      if (!userData || userData.role !== 'ADMIN') {
        if (!hasRedirected) {
          setHasRedirected(true);
          redirectToHome();
        }
        return;
      }

      setIsAdmin(true);
    };

    if (!isLoading && !isAdmin && !hasRedirected) {
      checkAuth();
    }
  }, [accessToken, isLoading, isAdmin, hasRedirected]);

  if (isLoading || !isAdmin) {
    return <LoadingPage />;
  }

  return <div>Welcome, admin!</div>;
}
