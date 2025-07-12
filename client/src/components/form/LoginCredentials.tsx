'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

import { Env } from '@/libs/Env';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import Input from './Input';

function LoginCredentials({ email: initialEmail }: { email?: string }) {
  const t = useTranslations('LoginCredentials');
  const { isLoading, login } = useAuth();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(initialEmail || '', password);
  };

  return (
    <>
      <Input
        label={t('password_label')}
        type="password"
        value={password}
        onChange={(handlePasswordChange) =>
          setPassword(handlePasswordChange.target.value)
        }
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
        onClick={handleSubmit}
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
    </>
  );
}

export default LoginCredentials;
