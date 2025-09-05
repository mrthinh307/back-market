'use client';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import ProductPage from '@/components/layouts/product/ProductPage';

export default function Product() {
  return (
    <main className='mx-auto bg-background-secondary dark:bg-background'>
      <Header />

      <ProductPage />

      <Footer />
    </main>
  );
}
