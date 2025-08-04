import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../../ui/button';
import { useState } from 'react';

function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseBanner = () => {
    setIsVisible(false);
  };

  // Don't render banner if it's not visible
  if (!isVisible) {
    return null;
  }

  return (
    <aside className='bg-[#b3c8ef] dark:bg-[#1e2a3c] w-full content-center cursor-pointer hover:bg-[#a0b6de] dark:hover:bg-[#1a2435] focus-within:bg-[#a0b6de] dark:focus-within:bg-[#1a2435] hover:no-underline focus-within:no-underline transition-colors ease-in'>
      <Link href='/en/' className='flex-1 p-4 ml-2 md:text-center text-sm'>
        <span className='pr-1'>Your one-stop shop for refurbished tech</span>
        <span className='underline font-semibold'>Get start</span>
      </Link>
      <Button
        size='icon'
        className='hover:bg-icon-button-hover bg-transparent mr-2 dark:hover:bg-gray-700 transition-colors ease-in'
        onClick={handleCloseBanner}
      >
        <Image
          src='/assets/images/x-icon.svg'
          alt='Close Button'
          width={24}
          height={24}
          className='dark:invert'
        />
      </Button>
    </aside>
  );
}

export default Banner;
