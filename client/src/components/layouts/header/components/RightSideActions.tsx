'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { ModeToggle } from '../../../ui/mode-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const RightSideActions = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const { accessToken } = useAuth();

  const handleButtonClick = (url: string) => {
    if (accessToken) {
      router.push(url);
    } else {
      router.push(`/${locale}/email`);
    }
  };

  return (
    <div className='flex items-center gap-0.5'>
      {/* Need help */}
      <Link
        className='hidden md:flex text-base font-semibold hover:text-secondary-foreground transition-colors hover:underline px-3 py-2'
        href={`/${locale}`}
      >
        {t('need_help')}
      </Link>

      {/* User Account */}
      <button
        className='p-2 rounded-full hover:bg-icon-button-hover transition-colors duration-300 cursor-pointer'
        onClick={() => handleButtonClick(`/${locale}/dashboard/profile`)}
      >
        <Image
          src={avatarUrl || '/assets/images/user-icon.svg'}
          alt='User Icon'
          width={0}
          height={0}
          sizes='100vw'
          className={`dark:invert ${avatarUrl ? 'w-8 h-8 rounded-full object-cover' : 'w-6 h-6'}`}
        />
      </button>

      {/* Shopping Cart */}
      <button
        className='p-2 rounded-full hover:bg-icon-button-hover transition-colors relative duration-300 cursor-pointer'
        onClick={() => handleButtonClick(`/${locale}/cart`)}
      >
        <Image
          src={'/assets/images/cart-icon.svg'}
          alt='Shopping Cart Icon'
          width={24}
          height={24}
          className='dark:invert'
        />
        {/* <span className='absolute top-[2px] -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
          0
        </span> */}
      </button>

      {/* Module Toggle Theme */}
      <ModeToggle
        className='hidden md:flex rounded-full hover:bg-icon-button-hover border-none !bg-transparent'
        menuClassName='rounded-sm border-0 dark:border shadow-lg p-0 mt-1'
        menuItemClassName='rounded-none leading-6 border-b last:border-0'
      />
    </div>
  );
};

export default RightSideActions;
