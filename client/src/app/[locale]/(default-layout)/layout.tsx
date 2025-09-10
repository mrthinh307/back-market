import React from 'react';
import { Header} from '@/components/layouts';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mx-auto'>
      <Header />
      
      <div className='mx-auto'>
        {children}
      </div>

      {/* <Footer /> */}
    </main>
  );
}
