import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'always';

export const AppConfig = {
  name: 'Back Market',
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix,
};
