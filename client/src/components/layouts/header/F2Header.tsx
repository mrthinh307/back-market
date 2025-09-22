'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const F2Header: React.FC = () => {
  const locale = useLocale();
  return (
    <header className='bg-white border-static-default-low fixed left-0 top-0 z-10 w-full items-center border-b px-9 py-6 transition-all duration-200 ease-in-out translate-y-0 opacity-100'>
      <div className='divide-static-default-low flex items-center gap-8 divide-x-1'>
        <Link href={`/${locale}/`}>
          <Image
            className='dark:invert'
            src='/assets/images/header-logo-1.svg'
            alt='Logo'
            height={20}
            width={120}
          />
        </Link>
      </div>
    </header>
  );
};

export default F2Header;
