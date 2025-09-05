import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  mainNavItems: Array<{
    label: string;
    href: string;
    highlight?: boolean;
  }>;
  topNavItems: Array<{
    label: string;
    icon?: React.ElementType;
    href?: string;
  }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  mainNavItems,
  topNavItems,
}) => {
  if (!isMenuOpen) return null;

  return (
    <div className='fixed inset-0 z-50 md:hidden bg-background flex flex-col animate-slide-in-left'>
      {/* Mobile Menu Header - Fixed at top */}
      <div className='flex items-center justify-between bg-white dark:bg-background p-4 border-b border-gray-200 dark:border-gray-600/30 relative px-4 py-2'>
        {/* Empty space for balance */}
        <div className='w-10'></div>

        {/* Logo - Centered */}
        <div className='absolute left-1/2 transform -translate-x-1/2'>
          <Link href='/' onClick={() => setIsMenuOpen(false)}>
            <Image
              src='/assets/images/header-logo-1.svg'
              alt='Logo'
              height={14}
              width={120}
              className='dark:invert'
            />
          </Link>
        </div>

        {/* Close Button */}
        <button
          className='p-2 rounded-full hover:bg-sub-background cursor-pointer transition-colors'
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src='/assets/images/x-icon.svg'
            alt='Close'
            width={24}
            height={24}
            className='dark:invert'
          />
        </button>
      </div>

      {/* Mobile Menu Content - Scrollable middle section */}
      <div className='flex-1 overflow-y-auto scrollbar-none bg-white dark:bg-background'>
        {/* Shop Section */}
        <div className='p-6'>
          <h2 className='text-secondary mb-4'>Shop</h2>

          {/* All main nav items */}
          <div className='flex flex-col'>
            {mainNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='flex items-center justify-between py-5 last:pb-0'
                onClick={() => setIsMenuOpen(false)}
              >
                <div className='flex items-center'>
                  {item.highlight && (
                    <Image
                      src='/assets/images/good-deal.svg'
                      alt='Highlight Icon'
                      width={24}
                      height={24}
                      className='mr-2 dark:invert'
                    />
                  )}
                  <span
                    className={`font-semibold ${
                      item.highlight ? 'text-[#9D3963] dark:text-[#E26B91]' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <Image
                  src='/assets/images/chevron-right.svg'
                  alt='Arrow'
                  width={24}
                  height={24}
                  className='dark:invert'
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Footer - Fixed at bottom */}
      <div className='bg-white dark:bg-background'>
        {/* Additional Links Section */}
        <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-600/30'>
          {topNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href || '#'}
              className='block py-2 text-sm font-semibold'
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className='px-6 py-4'>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
