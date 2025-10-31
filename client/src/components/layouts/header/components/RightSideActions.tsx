'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useCartCount } from '@/hooks/useCartCount';
import { ModeToggle } from '../../../ui/mode-toggle';

const RightSideActions = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const { isAuthenticated } = useAuth();
  const { data: cartCount } = useCartCount();

  const handleButtonClick = (url: string) => {
    if (`/${locale}${pathName}` === url) return;
    
    if (isAuthenticated) {
      router.push(url);
    } else {
      router.push(`/${locale}/email`);
    }
  };

  return (
    <div className='flex items-center gap-0.5'>
      {/* Need help */}
      <Link
        className='hidden md:flex text-base font-semibold transition-colors hover:underline px-3 py-2'
        href={`/${locale}`}
      >
        {t('need_help')}
      </Link>

      {/* User Account */}
      <button
        type='button'
        className={`rounded-full hover:bg-icon-button-hover transition-colors duration-300 cursor-pointer ${isAuthenticated && 'bg-icon-button-hover'}`}
        onClick={() => handleButtonClick(`/${locale}/dashboard/profile`)}
      >
        <Image
          src={avatarUrl || '/assets/images/user-icon.svg'}
          alt='User Icon'
          width={0}
          height={0}
          sizes='100vw'
          className={`${avatarUrl ? 'w-8 h-8 rounded-full object-cover m-1' : 'w-6 h-6 dark:invert m-2'}`}
        />
      </button>

      {/* Shopping Cart */}
      <button
        type='button'
        className='p-2 rounded-full hover:bg-icon-button-hover transition-colors relative duration-300 cursor-pointer'
        onClick={() => handleButtonClick(`/${locale}/cart`)}
      >
        <Image
          src='/assets/images/cart-icon.svg'
          alt='Shopping Cart Icon'
          width={24}
          height={24}
          className='dark:invert'
        />
        {(isAuthenticated && cartCount?.totalItems && cartCount.totalItems > 0) ? (
          <span className='absolute top-px right-px bg-chart-5 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold border border-white dark:border-[#000000]'>
            {cartCount.totalItems > 99 ? '99+' : cartCount.totalItems}
          </span>
        ) : null}
      </button>

      {/* Module Toggle Theme */}
      <ModeToggle
        className='hidden md:flex rounded-full hover:bg-icon-button-hover border-none bg-transparent!'
        menuClassName='rounded-sm border-0 dark:border shadow-md p-0 mt-1'
        menuItemClassName='rounded-none leading-6 border-b last:border-0'
      />
    </div>
  );
};

export default RightSideActions;
