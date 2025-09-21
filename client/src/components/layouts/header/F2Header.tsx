'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const F2Header: React.FC = () => {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className='translate-y-0 opacity-100 bg-surface-default-low border-static-default-low fixed left-0 top-0 z-10 w-full items-center border-b px-8 py-4 transition-all duration-200 ease-in-out'>
      <div className='divide-static-default-low flex items-center gap-8 divide-x-1'>
        <div className='flex flex-col md:justify-center py-4 md:py-2'>
        {/* Mobile Header - Row 1 */}
          <div className='md:hidden flex items-center justify-between px-4 mb-3 relative'>
            {/* Menu Button */}
            <button
              className='p-2 rounded-full hover:bg-sub-background transition-colors cursor-pointer'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image
                src='/assets/images/menu-icon.svg'
                alt='Menu Icon'
                width={24}
                height={24}
                className='dark:invert'
              />
            </button>

            {/* Logo - Centered */}
            <div className='absolute left-1/2 transform -translate-x-1/2'>
              <Link href={`/${locale}/`}>
                <Image
                  src='/assets/images/header-logo-1.svg'
                  alt='Logo'
                  height={15}
                  width={140}
                  className='dark:invert'
                />
              </Link>
            </div>
          </div>
        {/* Desktop Header */}
          <div className='hidden md:flex container items-center gap-4 lg:gap-8'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link href={`/${locale}/`}>
                <Image
                  src='/assets/images/header-logo-1.svg'
                  alt='Logo'
                  height={24}
                  width={150}
                  className='dark:invert'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default F2Header;
