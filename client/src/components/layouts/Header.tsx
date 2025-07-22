import React, { useState } from 'react';
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  RefreshCw,
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const topNavItems = [
    { label: 'Verified Refurbished', icon: RefreshCw },
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
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6">
              {topNavItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href || '#'}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.icon && <item.icon size={14} />}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Globe size={16} className="text-gray-600" />
              <span className="text-gray-600">GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="bg-black text-white px-2 py-1 rounded text-lg font-bold">
                  BackMarket
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isSearchFocused
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-300'
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Need help */}
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Need help?
            </button>

            {/* User Account */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <User size={20} className="text-gray-600" />
            </button>

            {/* Shopping Cart */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            {mainNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center space-x-1 whitespace-nowrap text-sm font-medium transition-colors ${
                  item.highlight
                    ? 'text-pink-600 hover:text-pink-700'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.highlight && (
                  <span className="text-pink-600 mr-1">🔥</span>
                )}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {mainNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  item.highlight
                    ? 'text-pink-600 hover:text-pink-700'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.highlight && (
                  <span className="text-pink-600 mr-2">🔥</span>
                )}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
