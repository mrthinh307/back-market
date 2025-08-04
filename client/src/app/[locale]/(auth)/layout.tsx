'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect } from 'react';

import logo from '@/public/assets/images/header-logo-1.svg';
import { useAuth } from '@/contexts/AuthContext';
import { useRouterRedirect } from '@/hooks/useRouterRedirect';
import LoadingPage from '@/components/layouts/LoadingPage';

export default function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(props.params);
  const { accessToken } = useAuth();
  const { redirectToHome } = useRouterRedirect();

  useEffect(() => {
    if (accessToken) {
      redirectToHome();
    }
  }, [accessToken]);

  return accessToken ? (
    <LoadingPage />
  ) : (
    <>
      <header className='bg-background border-b border-[#dfe1e7] dark:border-gray-600/30 min-h-16 flex justify-start items-center px-8 py-4'>
        <Link href={`/${locale}`} className='h-[14px] shrink-0'>
          <Image src={logo} alt='logo' className='h-full w-auto dark:invert' />
        </Link>
      </header>
      <main className='my-10'>{props.children}</main>
    </>
  );
}
