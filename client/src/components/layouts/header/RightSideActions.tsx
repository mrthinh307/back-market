import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '../../ui/mode-toggle';

const RightSideActions = () => {
  return (
    <div className="flex items-center gap-0.5">
      {/* Need help */}
      <Link
        className="hidden md:flex text-base font-semibold hover:text-secondary-foreground transition-colors hover:underline px-3 py-2"
        href="/en/email"
      >
        Need help?
      </Link>

      {/* User Account */}
      <Link
        className="p-2 rounded-full hover:bg-sub-background transition-colors duration-300"
        href="/"
      >
        <Image
          src={'/assets/images/user-icon.svg'}
          alt="User Icon"
          width={24}
          height={24}
          className="dark:invert"
        />
      </Link>

      {/* Shopping Cart */}
      <Link
        className="p-2 rounded-full hover:bg-sub-background transition-colors relative duration-300"
        href="/"
      >
        <Image
          src={'/assets/images/cart-icon.svg'}
          alt="Shopping Cart Icon"
          width={24}
          height={24}
          className="dark:invert"
        />
        {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span> */}
      </Link>

      {/* Module Toggle Theme */}
      <ModeToggle className="hidden md:flex rounded-full hover:bg-sub-background" />
    </div>
  );
};

export default RightSideActions;
