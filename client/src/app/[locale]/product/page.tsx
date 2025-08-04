'use client';

import ProductPage from '@/components/layouts/ProductPage';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { logout } from '@/api/auth.api';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Section2 from '@/components/layouts/Section_2';
import Section3 from '@/components/layouts/Section3';

export default function Product() {
  return (
    <div className="">
      <Header />

      <ProductPage />

      <Section2 />

      <Section3 />

      <Footer />
    </div>
  );
}
