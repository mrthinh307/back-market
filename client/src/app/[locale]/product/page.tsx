'use client';

import ProductPage from '@/components/layouts/ProductPage';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export default function Product() {
  return (
    <main className='mx-auto bg-background-secondary dark:bg-background'>
      <Header />

      <ProductPage />

      <Footer />
    </main>
  );
}
