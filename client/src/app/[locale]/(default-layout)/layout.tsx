import React from 'react';
import { Footer, Header} from '@/components/layouts';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mx-auto'>
      <Header />
      
      <div className='mx-auto pt-[124px] md:pt-[133px]'>
        {children}
      </div>

      <Footer />
    </main>
  );
}
