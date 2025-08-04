import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.backmarket.*', 
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale/admin',
        destination: '/:locale/admin/dashboard',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      'd2e6ccujb3mkqf.cloudfront.net',
      'product-page.statics.backmarket.com',
      'front-office.statics.backmarket.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-office.statics.backmarket.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'product-page.statics.backmarket.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2e6ccujb3mkqf.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
};

// Initialize the Next-Intl plugin
const configWithPlugins = createNextIntlPlugin('./src/libs/i18n/I18n.ts')(
  baseConfig,
);

export default configWithPlugins;
