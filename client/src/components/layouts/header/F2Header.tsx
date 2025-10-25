'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from '@/public/assets/images/header-logo-1.svg?url';

const F2Header: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  
  return (
    <header className={`bg-secondary-background dark:bg-background border-b border-[#dfe1e7] dark:border-gray-600/30 min-h-16 flex justify-start items-center px-8 py-4 flex-shrink-0 fixed inset-x-0 top-0 z-99 ${className}`}>
      <Link href={`/${locale}`} className='h-[14px] shrink-0'>
        <Image src={logo} alt='logo' className='h-full w-auto dark:invert' />
      </Link>
    </header>
  );
};

export default F2Header;
