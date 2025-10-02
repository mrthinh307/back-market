'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import logo from '@/public/assets/images/header-logo-1.svg';

const F2Header: React.FC = () => {
  const locale = useLocale();
  
  return (
    <header className='bg-background border-b border-[#dfe1e7] dark:border-gray-600/30 min-h-16 flex justify-start items-center px-8 py-4 flex-shrink-0 fixed inset-x-0 top-0 z-99'>
      <Link href={`/${locale}`} className='h-[14px] shrink-0'>
        <Image src={logo} alt='logo' className='h-full w-auto dark:invert' />
      </Link>
    </header>
  );
};

export default F2Header;
