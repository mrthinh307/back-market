'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState, useMemo, useEffect } from 'react';
import { VerifiedIcon } from 'lucide-react';

import { useScrollDirection } from '@/hooks/useScrollDirection';
import {
  TopNavigation,
  MainHeader,
  MainNavigation,
  MobileMenu,
} from './components';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { accessToken, getMe } = useAuth();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const isProductPage = pathname.includes('/product/');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken && getMe) {
      const result = getMe();
      if (result) {
        result
          .then((payload) => {
            if (payload && payload.profile) {
              setAvatarUrl(payload.profile.avatarUrl || null);
            } else {
              setAvatarUrl(null);
            }
          })
          .catch(() => {
            setAvatarUrl(null);
          });
      } else {
        setAvatarUrl(null);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [accessToken]);

  const headerConfig = {
    threshold: 300,
    hideThreshold: 30,
    mode: (isProductPage ? 'strict' : 'default') as 'strict' | 'default',
  };

  const { isHidden } = useScrollDirection(headerConfig);

  const topNavItems = useMemo(
    () => [
      { label: t('verified_refurbished'), icon: VerifiedIcon },
      { label: t('repair_care'), href: '/repair' },
      { label: t('end_fast_tech'), href: '/sustainability' },
      { label: t('tech_journal'), href: '/journal' },
    ],
    [t],
  );

  const mainNavItems = useMemo(
    () => [
      { label: t('good_deals'), href: '/deals', highlight: true },
      { label: t('smartphones'), href: '/smartphones' },
      { label: t('laptops'), href: '/laptops' },
      { label: t('tablets'), href: '/tablets' },
      { label: t('game_consoles'), href: '/gaming' },
      { label: t('smartwatches'), href: '/smartwatches' },
      { label: t('audio'), href: '/audio' },
      { label: t('home_appliances'), href: '/appliances' },
      { label: t('more'), href: '/more' },
    ],
    [t],
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`
          bg-white dark:bg-background border-b border-[#dfe1e7] dark:border-gray-600/30
          fixed top-0 left-0 right-0 z-50
          ${isHidden ? 'header-slide-up' : 'header-slide-down'}
        `}
      >
        {/* Top Navigation */}
        <TopNavigation topNavItems={topNavItems} />

        {/* Main Header */}
        <MainHeader
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          avatarUrl={avatarUrl}
        />

        {/* Main Navigation */}
        <MainNavigation mainNavItems={mainNavItems} />
      </header>
      {/* Mobile Menu */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        mainNavItems={mainNavItems}
        topNavItems={topNavItems}
      />
    </>
  );
};

export default Header;
