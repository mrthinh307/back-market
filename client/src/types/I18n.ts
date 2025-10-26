import type { routing } from '@/libs/i18n/I18nRouting';
import type messages from '@/locales/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
