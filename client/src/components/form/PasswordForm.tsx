'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { toast } from 'sonner';
import Input from '@/components/form/Input';
import { Button } from '@/components/ui/button';
import { successToastProps } from '@/libs/toast/toast-props';
import { Env } from '@/libs/Env';
import { loginWithPassword } from '@/apis/auth.api';
import { parseAxiosError } from '@/utils/AxiosError';

export default function PasswordForm({
  email: initialEmail,
}: {
  email?: string;
}) {
  const locale = useLocale();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('PasswordForm');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) {
      return; // Prevent multiple submissions
    }

    try {
      setIsLoading(true);
      if (initialEmail) {
        const response = await loginWithPassword(initialEmail, password);
        toast.success('Welcome back!', {
          description: 'Redirecting to your dashboard...',
          ...successToastProps,
        });
        // TODO: Handle response
        console.log('Login response:', response);
        window.location.href = `/${locale}`;
      }
    } catch (err: any) {
      if (Env.NODE_ENV === 'development') {
        const { message } = parseAxiosError(err);
        console.warn(
          'Development Environtment Message - Error login:',
          message,
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="mx-auto w-full max-w-[34rem]">
        <div className="mb-4">
          <h1 className="text-[18px] leading-6 md:text-[20px] md:leading-7 text-content-secondary font-duplet-bold">
            {t('glad_to_see_you')}
          </h1>
          <p className="text-[14px] text-muted">
            {t('enter_your_password')}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-[36rem] flex flex-col bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <p className="font-duplet-bold font-500 mb-1">
                {initialEmail || t('where_is_your_email')}
              </p>
              <Link
                href={`/${locale}/email`}
                className="text-[14px] text-muted underline"
              >
                {t('go_back')}
              </Link>
            </div>
            <Input
              label={t('password_label')}
              type="password"
              value={password}
              onChange={(handlePasswordChange) =>
                setPassword(handlePasswordChange.target.value)
              }
              className="mb-[10px]"
            />
            <Link
              href={Env.NEXT_PUBLIC_DEV_FACEBOOK_URL}
              target="_blank"
              className="text-muted font-duplet-bold font-500 underline mb-8"
            >
              {t('forgot_password')}
            </Link>
            <Button
              type="submit"
              disabled={!password || !initialEmail}
              className={`${isLoading ? 'cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <svg
                  aria-hidden="false"
                  aria-label="Loading"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin text-inherit"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75A8.25 8.25 0 1 0 20.25 12a.75.75 0 0 1 1.5 0c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25a.75.75 0 0 1 0 1.5"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                t('sign_in_button')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
