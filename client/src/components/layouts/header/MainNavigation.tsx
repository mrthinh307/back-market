import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MainNavigationProps {
  mainNavItems: Array<{
    label: string;
    href: string;
    highlight?: boolean;
  }>;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  mainNavItems,
}: MainNavigationProps) => {
  return (
    <nav className="hidden md:flex">
      <div className="container">
        <div className="flex items-center justify-center gap-8 h-12 -mb-1 p-1 overflow-x-auto overflow-y-hidden scrollbar-none">
          {mainNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center space-x-1 whitespace-nowrap text-[15px] font-regular transition-colors relative
                ${
                  item.highlight
                    ? 'text-[#9D3963] dark:text-[#E26B91]'
                    : 'text-primary after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-[-9px] after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform'
                }
              `}
            >
              {item.highlight && (
                <Image
                  src="/assets/images/good-deal.svg"
                  alt="Highlight Icon"
                  width={24}
                  height={24}
                  className="mr-1 dark:invert"
                />
              )}
              <span className="hover:font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
