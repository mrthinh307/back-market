'use client';

import ProductPage from '@/components/layouts/ProductPage';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Section2 from '@/components/layouts/Section_2';
import Section3 from '@/components/layouts/Section3';

export default function Product() {
  return (
    <main className='mx-auto bg-background-secondary dark:bg-background'>
      <Header />

      <ProductPage />

      <Section2 />

      <Section3 />

      <Footer />
    </main>
  );
}
