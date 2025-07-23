'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { emailVerification } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { useEmailValidation } from '@/hooks/useAuthValidation';
import { facebookIcon, googleIcon, mailBoxIcon } from '@/public/assets/images';
import { parseAxiosError } from '@/utils/AxiosError';
import { useAuth } from '@/contexts/AuthContext';
import Input from './FormInput';
import LoadingSpinner from '../ui/LoadingSpinner';

function EmailCredentials() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('EmailCredentials');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const { loginWithGoogle, loginWithFacebook } = useAuth();
  const { email, error, isValid, handleEmailChange } = useEmailValidation();

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoginLoading || isGoogleLoading || isFacebookLoading) {
      return; // Prevent multiple submissions
    }

    if (isValid) {
      try {
        setIsLoginLoading(true);
        const response = await emailVerification(email);

        document.cookie = `email=${email}; path=/`;
        sessionStorage.setItem('email', email);

        // Redirect based on the response action
        const nextRoute = response.action === 'login' ? 'login' : 'signup';
        router.push(`/${locale}/email/${nextRoute}`);
      } catch (err) {
        const { message } = parseAxiosError(err);
        console.error('Error sending email verification:', message);
      } finally {
        setTimeout(() => {
          setIsLoginLoading(false);
        }, 5000); // Reset loading state after 5 seconds
      }
    }
  };

  const handleLoginWithGoogle = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoginLoading || isGoogleLoading || isFacebookLoading) {
      return; // Prevent multiple submissions
    }

    setIsGoogleLoading(true);
    loginWithGoogle();
  };

  const handleLoginWithFacebook = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFacebookLoading || isLoginLoading || isGoogleLoading) {
      return; // Prevent multiple submissions
    }

    setIsFacebookLoading(true);
    loginWithFacebook();
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
        className={`${isLoginLoading ? 'cursor-not-allowed' : ''}`}
        onClick={handleNext}
      >
        {isLoginLoading ? (
          <LoadingSpinner />
        ) : (
          t('next_button')
        )}
      </Button>
      <div>
        <div className="my-6">
          <div className="content-center">
            <hr className="border-muted border-t grow" />
            <span className="text-muted mx-4 mb-0.5">or</span>
            <hr className="border-muted border-t grow" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={handleLoginWithGoogle}
            className={`${isGoogleLoading ? 'cursor-not-allowed' : ''}`}
          >
            <Image src={googleIcon} alt="Google icon" className="size-5" />
            {t('continue_with_google')}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleLoginWithFacebook}
          >
            <Image
              src={facebookIcon}
              alt="Facebook icon"
              className="size-5.5 dark:invert"
            />
            {t('continue_with_apple')}
          </Button>
        </div>
      </div>
    </>
  );
}

export default EmailCredentials;
