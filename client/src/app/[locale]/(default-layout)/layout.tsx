import React from 'react';
import { Header} from '@/components/layouts';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mx-auto bg-background-secondary dark:bg-background'>
      <Header />
      
      <div className='min-h-screen'>
        {children}
      </div>
      
      {/* <Footer /> */}
    </main>
  );
}
