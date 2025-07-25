'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AuthFormContainer({
  email: initialEmail,
  formTitle,
  formSubtitle,
  children,
  showPrivacyPolicyLabel = false,
}: {
  email?: string;
  formTitle?: string;
  formSubtitle?: string;
  children?: React.ReactNode;
  showPrivacyPolicyLabel?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('AuthFormContainer');

  return (
    <div className="container">
      <div className="mx-auto w-full max-w-[34rem]">
        <div className="mb-4">
          <h1 className="text-[18px] leading-6 md:text-[20px] md:leading-7 text-content-secondary font-duplet-bold">
            {formTitle}
          </h1>
          <p className="text-[14px] text-muted">{formSubtitle}</p>
        </div>
        <div>
          <form className="w-full max-w-[36rem] flex flex-col bg-white rounded-lg shadow-sm p-6">
            <div className={initialEmail ? 'mb-6' : ''}>
              <p className="font-duplet-bold font-500 mb-1">{initialEmail}</p>
              {initialEmail && (
                <Link
                  href={`/${locale}/email`}
                  className="text-[14px] text-muted underline"
                >
                  {t('go_back')}
                </Link>
              )}
            </div>

            {/* Render children components here */}
            {/* This allows for dynamic content like LoginCredentials to be passed in */}
            {children}
          </form>
          {showPrivacyPolicyLabel && (
            <div className="mt-4">
              <a
                href="https://www.backmarket.co.uk/en-gb/legal/data-protection"
                className="text-content-secondary text-base font-duplet-bold underline"
              >
                {t('privacy_policy')}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
