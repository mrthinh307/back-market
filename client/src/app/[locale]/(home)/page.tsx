'use client';

import Link from 'next/link';

import { logout } from '@/api/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from 'next-intl';

export default function Home() {
  const locale = useLocale();
  const { accessToken, setAccessToken } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setAccessToken(null); 
      window.location.href = `/${locale}/email`;
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-blue-600 text-4xl font-bold mb-4 font-heading">
        Welcome to the Home Page
      </h1>
      <p className="text-muted text-lg font-duplet">
        This is the content of the home page.
      </p>
      <div className="mt-8 p-4 bg-amber-700 rounded-sm shadow-middle border-content border">
        <p className="text-muted">
          Testing custom colors and styles from tailwind.config.ts
        </p>
        <Link href="/en/email" className="text-content-secondary underline">
          Go to Sign In Page
        </Link>
      </div>
      <p className="text-muted mt-2">
        Access Token: <span className="text-content">{accessToken}</span>
      </p>
      {accessToken && (
        <button
          className="cursor-pointer"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </div>
  );
}
