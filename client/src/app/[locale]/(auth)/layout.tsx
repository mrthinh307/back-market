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
  const { accessToken, isLoading } = useAuth();
  const { redirectToHome } = useRouterRedirect();

  useEffect(() => {
    if (accessToken) {
      redirectToHome();
    }
  }, [accessToken]);

  return accessToken || isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <F2Header />
      <main className='my-10 py-16'>{props.children}</main>
    </>
  );
}
