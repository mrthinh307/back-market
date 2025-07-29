'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/libs/i18n/I18nRouting';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RectangleFlag } from './RectangleFlag';
import { languages } from '@/config/languages';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const currentLanguage = languages.find((lang) => lang.locale === locale);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <RectangleFlag
            countryCode={currentLanguage?.countryCode.toLowerCase()!}
          />
          <span className="px-2 py-1 font-semibold">
            {currentLanguage?.countryCode.toUpperCase()}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-auto min-w-[320px] rounded-sm shadow-lg px-0 py-2 bg-card border-0 dark:border"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.locale}
            onClick={() => switchLanguage(lang.locale)}
            disabled={lang.locale === locale}
            className="rounded-none px-6 py-2 cursor-pointer gap-0 flex items-center justify-between text-left border-b last:border-0"
          >
            <div className="flex grow flex-1 items-center justify-start">
              <RectangleFlag countryCode={lang.countryCode} className="mr-2" />
              <span className="text-base text-primary">{lang.label}</span>
            </div>
            <span className="text-sm text-muted ml-6">{lang.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
