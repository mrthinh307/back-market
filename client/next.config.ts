import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

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
        hostname: '**.backmarket.co.uk',
        pathname: '/**',
      },
            {
        protocol: 'https',
        hostname: '**.backmarket.de',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.backmarket.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2e6ccujb3mkqf.cloudfront.net',
        pathname: '/**',
      },
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
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
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
};

const configWithPlugins = createNextIntlPlugin('./src/libs/i18n/I18n.ts')(
  baseConfig,
);

export default configWithPlugins;
