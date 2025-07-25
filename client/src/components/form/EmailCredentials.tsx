'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

import { emailVerification } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { useEmailValidation } from '@/hooks/useAuthValidation';
import { appleIcon, googleIcon, mailBoxIcon } from '@/public/assets/images';
import { parseAxiosError } from '@/utils/AxiosError';
import Input from './Input';

function EmailCredentials() {
  const router = useRouter();
  const locale = useLocale();
  const { email, error, isValid, handleEmailChange } = useEmailValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const t = useTranslations('EmailCredentials');

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
        const nextRoute = response.action === 'login' ? 'login' : 'signup';
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
    <>
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
        onClick={handleSubmit}
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
            <Image src={googleIcon} alt="Google icon" className="size-5" />
            {t('continue_with_google')}
          </Button>
          <Button variant="outline" type="button">
            <Image src={appleIcon} alt="Apple icon" className="size-5" />
            {t('continue_with_apple')}
          </Button>
        </div>
      </div>
    </>
  );
}

export default EmailCredentials;
