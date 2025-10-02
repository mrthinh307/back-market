import React from 'react';
import { F2Header } from '@/components/layouts';

export default function F2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mx-auto'>
      <F2Header />

      <div className='mx-auto pt-16 h-[calc(100vh-4rem)]'>
        {children}
      </div>
    </main>
  );
}