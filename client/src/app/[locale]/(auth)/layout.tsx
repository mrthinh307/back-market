'use client';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useRouterRedirect } from '@/hooks/useRouterRedirect';
import LoadingPage from '@/components/pages/LoadingPage';
import { F2Header } from '@/components/layouts';

export default function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const { redirectToHome } = useRouterRedirect();

  useEffect(() => {
    if (isAuthenticated) {
      redirectToHome();
    }
  }, [isAuthenticated]);

  return isAuthenticated || isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <F2Header />
      <main className='my-10 py-16'>{props.children}</main>
    </>
  );
}
