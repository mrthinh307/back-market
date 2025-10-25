import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import { ServerHealthProvider } from '@/components/providers/ServerHealthProvider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { routing } from '@/libs/i18n/I18nRouting';
import '@/styles/global.css';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${locale}`}>
      <body className='antialiased'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <ServerHealthProvider>
                <AuthProvider>{props.children}</AuthProvider>
              </ServerHealthProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
