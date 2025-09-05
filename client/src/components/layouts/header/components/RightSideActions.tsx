import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ModeToggle } from '../../../ui/mode-toggle';

const RightSideActions = () => {
  const t = useTranslations('Header');
  return (
    <div className='flex items-center gap-0.5'>
      {/* Need help */}
      <Link
        className='hidden md:flex text-base font-semibold hover:text-secondary-foreground transition-colors hover:underline px-3 py-2'
        href='/en/email'
      >
        {t('need_help')}
      </Link>

      {/* User Account */}
      <Link
        className='p-2 rounded-full hover:bg-icon-button-hover transition-colors duration-300'
        href='/'
      >
        <Image
          src={'/assets/images/user-icon.svg'}
          alt='User Icon'
          width={24}
          height={24}
          className='dark:invert'
        />
      </Link>

      {/* Shopping Cart */}
      <Link
        className='p-2 rounded-full hover:bg-icon-button-hover transition-colors relative duration-300'
        href='/'
      >
        <Image
          src={'/assets/images/cart-icon.svg'}
          alt='Shopping Cart Icon'
          width={24}
          height={24}
          className='dark:invert'
        />
        {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span> */}
      </Link>

      {/* Module Toggle Theme */}
      <ModeToggle
        className='hidden md:flex rounded-full hover:bg-icon-button-hover'
        menuClassName='rounded-sm border-0 dark:border shadow-lg p-0 mt-1'
        menuItemClassName='rounded-none leading-6 border-b last:border-0'
      />
    </div>
  );
};

export default RightSideActions;
