'use client';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { ProtectedRoute } from '@/providers';

export default function ProfileSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  const tabs = [
    {
      key: null as null | 'orders' | 'favourites',
      label: 'Profile',
      description:
        'Who am I? Where am I? Why am I? Look no further for the answers.',
      href: `/${locale}/dashboard/profile`,
    },
    {
      key: 'orders' as const,
      label: 'Orders',
      description: 'Delivery tracking, customer service, etc.',
      href: `/${locale}/dashboard/orders`,
    },
    {
      key: 'favourites' as const,
      label: 'Favourites',
      description: 'Your favorite items, all in one place.',
      href: `/${locale}/dashboard/favourites`,
    },
  ];

  return (
    <ProtectedRoute>
      <div className='mb-16'>
        <div className='mb-6 mt-2 flex pl-6 md:my-8 justify-center md:pl-0 z-9'>
          <nav className='relative -mx-1 px-1 max-w-full overflow-x-auto'>
            <div className="w-max after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:bg-border after:content-['']">
              <ul className='-mx-1 flex max-w-full list-none px-1 gap-8'>
                {tabs.map((tab) => {
                  // Try multiple matching strategies
                  const exactMatch = pathname === tab.href;
                  const withoutLocale =
                    pathname === tab.href.replace(`/${locale}`, '');
                  const endsWithPath = pathname.endsWith(
                    tab.href.split('/').pop() || '',
                  );
                  const isActive = exactMatch || withoutLocale || endsWithPath;

                  return (
                    <li
                      key={tab.href}
                      className='relative flex h-14 list-none items-center whitespace-nowrap'
                    >
                      <Link
                        href={tab.href}
                        className={clsx(
                          'flex h-full items-center border-none bg-transparent px-4 py-2 text-center no-underline motion-safe:transition motion-safe:duration-200 cursor-pointer overflow-hidden text-ellipsis md:text-[17px] rounded-t-sm relative z-8',
                          isActive
                            ? 'text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[""]'
                            : 'text-muted-foreground hover:text-foreground hover:bg-input-hover',
                        )}
                      >
                        <span>{tab.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div className='flex justify-center'>{children}</div>
      </div>
    </ProtectedRoute>
  );
}
