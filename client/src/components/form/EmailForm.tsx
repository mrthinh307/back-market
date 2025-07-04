'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { emailVerification } from '@/apis/auth.api';
import Input from '@/components/form/Input';
import { Button } from '@/components/ui/button';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { appleIcon, googleIcon, mailBoxIcon } from '@/public/assets/images';
import { parseAxiosError } from '@/utils/AxiosError';

export default function EmailForm() {
  const router = useRouter();
  const locale = useLocale();
  const { email, error, isValid, handleEmailChange } = useEmailValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const t = useTranslations('EmailForm');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading || isDisabled) {
      return; // Prevent multiple submissions
    }

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await emailVerification(email);

        setIsDisabled(true);
        document.cookie = `email=${email}; path=/`;
        sessionStorage.setItem('email', email);

        // Redirect based on the response action
        const nextRoute = response.action === 'login' ? 'login' : 'sign-up';
        router.push(`/${locale}/email/${nextRoute}`);
      } catch (err) {
        const { message } = parseAxiosError(err);
        console.error('Error sending email verification:', message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="mx-auto w-full max-w-[34rem]">
        <div className="mb-4">
          <h1 className="text-[20px] leading-6 md:text-[22px] md:leading-7 text-content-secondary font-duplet-bold">
            {t('email_form_title')}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className={isDisabled ? 'pointer-events-none' : ''}
        >
          {/* Disable pointer events and reduce opacity if form is disabled */}
          <div className="w-full max-w-[36rem] flex flex-col bg-white rounded-lg shadow-sm p-6">
            <Input
              label={t('email_label')}
              icon={mailBoxIcon}
              value={email}
              onChange={handleEmailChange}
              error={!!error}
              description={error || ''}
              isShowDescription={true}
              className="mb-6"
            />
            <Button
              type="submit"
              disabled={!isValid}
              className={`${isLoading ? 'cursor-not-allowed' : ''}`}
            >
              {isLoading || isDisabled ? (
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
                t('next_button')
              )}
            </Button>
            <div>
              <div className="my-6">
                <div className="content-center">
                  <hr className="border-[#dfe1e7] border-t grow" />
                  <span className="text-muted mx-4 mb-0.5">or</span>
                  <hr className="border-[#dfe1e7] border-t grow" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="outline" type="button">
                  <Image
                    src={googleIcon}
                    alt="Google icon"
                    className="size-5"
                  />
                  {t('continue_with_google')}
                </Button>
                <Button variant="outline" type="button">
                  <Image src={appleIcon} alt="Apple icon" className="size-5" />
                  {t('continue_with_apple')}
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <a
            href="https://www.backmarket.co.uk/en-gb/legal/data-protection"
            className="text-content-secondary text-base font-duplet-bold underline"
          >
            {t('privacy_policy')}
          </a>
        </div>
      </div>
    </div>
  );
}
