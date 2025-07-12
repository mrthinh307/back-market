'use client';

import { redirect } from 'next/navigation';
import { routing } from '@/libs/i18n/I18nRouting';

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
