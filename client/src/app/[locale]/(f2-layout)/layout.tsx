import React from 'react';
import { F2Header } from '@/components/layouts';

export default function F2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mx-auto overflow-hidden pt-[60px] h-screen'>
      <F2Header />
      
      <div className='mx-auto overflow-hidden h-screen'>
        {children}
      </div>
    </main>
  );
}
