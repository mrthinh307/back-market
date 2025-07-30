import React, { useState } from 'react';
import {
  TopNavigation,
  MainHeader,
  MainNavigation,
  MobileMenu,
} from './header/index';
import { VerifiedIcon } from 'lucide-react';

const Header: React.FC = () => {
  const topNavItems = [
    { label: 'Verified Refurbished', icon: VerifiedIcon },
    { label: 'Repair & Care', href: '/repair' },
    { label: 'End fast tech', href: '/sustainability' },
    { label: 'Tech Journal', href: '/journal' },
  ];

  const mainNavItems = [
    { label: 'Good deals', href: '/deals', highlight: true },
    { label: 'Smartphones', href: '/smartphones' },
    { label: 'Laptops', href: '/laptops' },
    { label: 'Tablets', href: '/tablets' },
    { label: 'Game consoles', href: '/gaming' },
    { label: 'Smartwatches', href: '/smartwatches' },
    { label: 'Audio', href: '/audio' },
    { label: 'Home appliances', href: '/appliances' },
    { label: 'More', href: '/more' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-background border-b border-[#dfe1e7] dark:border-gray-600/30">
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
  );
};

export default Header;
