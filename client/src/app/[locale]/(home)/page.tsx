'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import { logout } from '@/api/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

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
  };

  return (
    <div className="mx-auto">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <h1 className="text-blue-600 text-4xl font-bold mb-4 font-heading">
          Welcome to the Home Page
        </h1>
        <p className="text-muted text-lg font-duplet">
          This is the of the home page.
        </p>
        <div className="mt-8 p-4 bg-amber-700 rounded-sm shadow-middle border-[#e2b93b] border">
          <p className="text-muted">
            Testing custom colors and styles from tailwind.config.ts
          </p>
          <Link href="/en/email" className="text-secondary underline">
            Go to Sign In Page
          </Link>
        </div>
        <p className="mt-2">Access Token: {accessToken}</p>
        <div>
          <Link href="/en/admin" className="text-secondary underline">
            <strong className="text-destructive">Go to Admin page</strong>
          </Link>
        </div>
        {accessToken && (
          <button className="cursor-pointer" onClick={handleLogout}>
            Log out
          </button>
        )}
        <div className="mt-4">
          <span className="mr-2">Toggle Dark Mode</span>
          <ModeToggle />
        </div>
      </div>

      <Footer />
    </div>
  );
}
