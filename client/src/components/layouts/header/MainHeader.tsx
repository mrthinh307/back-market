import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../../ui/SearchBar';
import RightSideActions from './RightSideActions';

interface MainHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <div className='flex flex-col md:justify-center py-4 md:py-2'>
      {/* Mobile Header Row 1 */}
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
          <Link href='/'>
            <Image
              src='assets/images/header-logo-1.svg'
              alt='Logo'
              height={15}
              width={140}
              className='dark:invert'
            />
          </Link>
        </div>

        {/* Right Side Actions */}
        <RightSideActions />
      </div>
      {/* Mobile Search Row 2 */}
      <div className='md:hidden px-4'>
        <SearchBar />
      </div>

      {/* Desktop Header */}
      <div className='hidden md:flex container items-center gap-4 lg:gap-8'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src='assets/images/header-logo-1.svg'
              alt='Logo'
              height={24}
              width={213}
              className='dark:invert'
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className='flex z-[1] grow pl-2'>
          <SearchBar />
        </div>

        {/* Right Side Actions */}
        <RightSideActions />
      </div>
    </div>
  );
};

export default MainHeader;
