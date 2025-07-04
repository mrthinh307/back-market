import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const AppConfig = {
  name: 'Back Market',
  locales: ['en', 'jp'],
  defaultLocale: 'en',
  localePrefix,
};
