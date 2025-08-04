'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

import { Env } from '@/libs/Env';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import FormInput from './FormInput';
import LoadingSpinner from '../ui/LoadingSpinner';

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
      <FormInput
        label={t('password_label')}
        type='password'
        value={password}
        onChange={(handlePasswordChange) =>
          setPassword(handlePasswordChange.target.value)
        }
      />
      <Link
        href={Env.NEXT_PUBLIC_DEV_FACEBOOK_URL}
        target='_blank'
        className='text-muted font-semibold font-500 underline mb-8'
      >
        {t('forgot_password')}
      </Link>
      <Button
        type='submit'
        disabled={!password || !initialEmail}
        className={`${isLoading ? 'cursor-not-allowed' : ''}`}
        onClick={handleSubmit}
      >
        {isLoading ? <LoadingSpinner /> : t('sign_in_button')}
      </Button>
    </>
  );
}

export default LoginCredentials;
