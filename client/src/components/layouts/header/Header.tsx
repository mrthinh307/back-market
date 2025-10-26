'use client';

import { useQuery } from '@tanstack/react-query';
import { VerifiedIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState, useMemo } from 'react';

import { useScrollDirection } from '@/hooks/useScrollDirection';
import { fetchProfile } from '@/api/user.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import {
  TopNavigation,
  MainHeader,
  MainNavigation,
  MobileMenu,
} from './components';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC<{ avatarUrl?: string | null }> = ({
  avatarUrl: serverAvatarUrl,
}) => {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const isProductPage = pathname.includes('/product/');
  const { isAuthenticated } = useAuth();

  // Fallback to client-side fetching if server-side fetch failed
  const { data: clientUserInfo } = useQuery({
    queryKey: USE_QUERY_KEY.AUTH_USER(),
    queryFn: fetchProfile,
    enabled: !serverAvatarUrl && isAuthenticated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });

  // Use server data if available, otherwise fallback to client data
  const avatarUrl =
    serverAvatarUrl || clientUserInfo?.profile?.avatarUrl || null;

  const headerConfig = {
    threshold: 300,
    hideThreshold: 30,
    mode: (isProductPage ? 'strict' : 'default') as 'strict' | 'default',
  };

  const { isHidden } = useScrollDirection(headerConfig);

  const topNavItems = useMemo(
    () => [
      { label: t('verified_refurbished'), icon: VerifiedIcon },
      { label: t('repair_care'), href: '/' },
      { label: t('end_fast_tech'), href: '/' },
      { label: t('tech_journal'), href: '/' },
    ],
    [t],
  );

  const mainNavItems = useMemo(
    () => [
      { label: t('good_deals'), href: '/', highlight: true },
      { label: t('smartphones'), href: '/' },
      { label: t('laptops'), href: '/' },
      { label: t('tablets'), href: '/' },
      { label: t('game_consoles'), href: '/' },
      { label: t('smartwatches'), href: '/' },
      { label: t('audio'), href: '/' },
      { label: t('home_appliances'), href: '/' },
      { label: t('more'), href: '/' },
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
