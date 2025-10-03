'use client';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '../pages/LoadingPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken, isLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!isLoading && !accessToken) {
      router.replace(`/${locale}/email`);
    }
  }, [accessToken, isLoading, router, locale]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
