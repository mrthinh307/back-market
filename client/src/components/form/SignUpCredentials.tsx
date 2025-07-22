'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { usePasswordValidation } from '@/hooks/useAuthValidation';
import { Button } from '../ui/button';
import FormInput from './FormInput';
import { Checkbox } from '../ui/checkbox';

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
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={!!error}
        description={t('password_description')}
        isShowDescription={true}
      />
      <div className="mb-3">
        <FormInput
          label={t('first_name_label')}
          type="text"
          value={firstName || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          label={t('last_name_label')}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Checkbox className='size-5'/>
        <label htmlFor="marketing-checkbox" className="cursor-pointer">
          {t('checkbox_description')}
        </label>
      </div>
      <div className="mb-6">
        <p className="text-sm text-muted">
          {t('terms_of_use_description')}{' '}
          <strong className="text-primary underline">
            {t('terms_of_use')}
          </strong>
        </p>
      </div>
      <Button
        type="submit"
        disabled={!validPassword || !initialEmail || !firstName || !lastName}
        className={`${isLoading ? 'cursor-not-allowed' : ''}`}
        onClick={handleSignup}
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
          t('create_account')
        )}
      </Button>
      <div className="mt-6 text-sm text-muted">
        <p>
          {t('privacy_policy_description')}{' '}
          <strong className="text-primary underline">
            {t('privacy_policy')}
          </strong>
        </p>
      </div>
    </>
  );
}

export default SignUpCredentials;
