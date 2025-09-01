'use client';

import ProductPage from '@/components/layouts/ProductPage';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { logout } from '@/api/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export default function Product() {
  return (
    <main className="mx-auto">
      <Header />

      <ProductPage />

      <Footer />
    </main>
  );
}
