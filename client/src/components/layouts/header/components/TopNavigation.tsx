import Link from 'next/link';
import React from 'react';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface TopNavigationProps {
  topNavItems: Array<{
    label: string;
    icon?: React.ElementType;
    href?: string;
  }>;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  topNavItems,
}: TopNavigationProps) => {
  return (
    <div className='hidden md:flex bg-sub-background dark:border-gray-600/30'>
      <div className='container max-w-7xl'>
        <div className='flex items-center justify-between h-8 text-[12.5px]'>
          <div className='flex items-center space-x-6'>
            {topNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href || '#'}
                className='flex items-center space-x-1 font-semibold hover:underline hover:text-secondary-foreground transition-colors'
              >
                {item.icon && <item.icon size={14} />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className='flex items-center'>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
