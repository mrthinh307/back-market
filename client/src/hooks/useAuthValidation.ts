'use client';

import { useEffect, useState } from 'react';
import { emailSchema, passwordSchema } from '@/validations/FormValidation';

export function useEmailValidation(savedEmail?: string) {
  const [email, setEmail] = useState(savedEmail || '');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setError(null);
      setIsValid(false);
      return;
    }

    try {
      emailSchema.parse({ email: value });
      setError(null);
      setIsValid(true);
    } catch (validationError: any) {
      const errorMessage =
        validationError.errors?.[0]?.message || 'Invalid email';
      setError(errorMessage);
      setIsValid(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
  };

  // Validate saved email on initial load
  useEffect(() => {
    if (savedEmail) {
      validateEmail(savedEmail);
    }
  }, [savedEmail]);

  const resetValidation = () => {
    setEmail('');
    setError(null);
    setIsValid(false);
  };

  return {
    email,
    error,
    isValid,
    handleEmailChange,
    resetValidation,
  };
}

export function usePasswordValidation() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const validatePassword = (value: string) => {
    setPassword(value);

    if (!value.trim()) {
      setError(null);
      setIsValid(false);
      return;
    }

    try {
      // Assuming passwordSchema is defined in FormValidation.ts
      passwordSchema.parse({ password: value });
      setError(null);
      setIsValid(true);
    } catch (validationError: any) {
      const errorMessage =
        validationError.errors?.[0]?.message || 'Invalid password';
      console.warn('Password validation error:', errorMessage);
      setError(errorMessage);
      setIsValid(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validatePassword(e.target.value);
  };

  const resetValidation = () => {
    setPassword('');
    setError(null);
    setIsValid(false);
  };

  return {
    password,
    error,
    isValid,
    handlePasswordChange,
    resetValidation,
  };
}
