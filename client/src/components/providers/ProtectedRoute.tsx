'use client';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '../pages/LoadingPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/${locale}/email`);
    }
  }, [isAuthenticated, isLoading, router, locale]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
