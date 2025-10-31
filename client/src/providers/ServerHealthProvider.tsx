'use client';
import { useEffect, useState } from 'react';

import GlobalErrorComponent from '@/components/pages/GlobalErrorComponent';
import { Env } from '@/libs/Env';
import LoadingPage from '@/components/pages/LoadingPage';

export function ServerHealthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isServerHealthy, setIsServerHealthy] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${Env.NEXT_PUBLIC_API_URL}/health`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setIsServerHealthy(true);
        } else {
          setIsServerHealthy(false);
        }
      } catch (error) {
        console.error('Health check failed:', error);
        setIsServerHealthy(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkHealth();

    // Re-check every 30 seconds
    const intervalId = setInterval(checkHealth, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Show loading state briefly
  if (isChecking) {
    return <LoadingPage />;
  }

  // Show ServerDown component if health check fails
  if (!isServerHealthy) {
    return (
      <GlobalErrorComponent
        headerComponent='f2-header'
        statusCode='503'
        title='Server is being refurbished :))'
        message='If you’re here, it might be because the server isn’t active right now. Please try again later.'
        buttonText='Contact support to active server for you'
        onButtonClick={() => {
          window.location.href = Env.NEXT_PUBLIC_DEV_FACEBOOK_URL;
        }}
      />
    );
  }

  return <>{children}</>;
}
