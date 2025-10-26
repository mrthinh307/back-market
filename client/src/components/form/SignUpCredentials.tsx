'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { usePasswordValidation } from '@/hooks/useAuthValidation';
import { Button } from '../ui/button';
import FormInput from './FormInput';
import { Checkbox } from '../ui/checkbox';
import LoadingSpinner from '../ui/LoadingSpinner';

function SignUpCredentials({ email: initialEmail }: { email?: string }) {
  const {
    password,
    error,
    isValid: validPassword,
    handlePasswordChange,
  } = usePasswordValidation();
  const t = useTranslations('SignUpCredentials');
  const { isLoading, signup } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const signUpParams = {
      initialEmail,
      password,
      firstName,
      lastName,
    };

    await signup(signUpParams);
  };

  return (
    <>
      <FormInput
        label={t('password_label')}
        type='password'
        value={password}
        onChange={handlePasswordChange}
        error={!!error}
        description={t('password_description')}
        isShowDescription={true}
      />
      <div className='mb-3'>
        <FormInput
          label={t('first_name_label')}
          type='text'
          value={firstName || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          label={t('last_name_label')}
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='flex items-center gap-3 mb-3'>
        <Checkbox className='size-5' />
        <label htmlFor='marketing-checkbox' className='cursor-pointer'>
          {t('checkbox_description')}
        </label>
      </div>
      <div className='mb-6'>
        <p className='text-sm text-muted-foreground'>
          {t('terms_of_use_description')}{' '}
          <strong className='underline'>
            {t('terms_of_use')}
          </strong>
        </p>
      </div>
      <Button
        type='submit'
        disabled={!validPassword || !initialEmail || !firstName || !lastName}
        className={`${isLoading ? 'cursor-not-allowed' : ''}`}
        onClick={handleSignup}
      >
        {isLoading ? <LoadingSpinner /> : t('create_account')}
      </Button>
      <div className='mt-6 text-sm text-muted-foreground'>
        <p>
          {t('privacy_policy_description')}{' '}
          <strong className='underline'>
            {t('privacy_policy')}
          </strong>
        </p>
      </div>
    </>
  );
}

export default SignUpCredentials;
