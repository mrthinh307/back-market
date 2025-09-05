import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { VerifiedIcon } from 'lucide-react';

import {
  TopNavigation,
  MainHeader,
  MainNavigation,
  MobileMenu,
} from './components';
import Banner from '@/components/layouts/header/components/Banner';

const Header: React.FC = () => {
  const t = useTranslations('Header');
  const topNavItems = [
    { label: t('verified_refurbished'), icon: VerifiedIcon },
    { label: t('repair_care'), href: '/repair' },
    { label: t('end_fast_tech'), href: '/sustainability' },
    { label: t('tech_journal'), href: '/journal' },
  ];

  const mainNavItems = [
    { label: t('good_deals'), href: '/deals', highlight: true },
    { label: t('smartphones'), href: '/smartphones' },
    { label: t('laptops'), href: '/laptops' },
    { label: t('tablets'), href: '/tablets' },
    { label: t('game_consoles'), href: '/gaming' },
    { label: t('smartwatches'), href: '/smartwatches' },
    { label: t('audio'), href: '/audio' },
    { label: t('home_appliances'), href: '/appliances' },
    { label: t('more'), href: '/more' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className='bg-white dark:bg-background border-b border-[#dfe1e7] dark:border-gray-600/30'>
        {/* Top Navigation */}
        <TopNavigation topNavItems={topNavItems} />

        {/* Main Header */}
        <MainHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Main Navigation */}
        <MainNavigation mainNavItems={mainNavItems} />

        {/* Mobile Menu */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          mainNavItems={mainNavItems}
          topNavItems={topNavItems}
        />
      </header>
      {/* BANNER */}
      <Banner />
    </>
  );
};

export default Header;
