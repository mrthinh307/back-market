import React from 'react';
import { Footer, F2Header } from '@/components/layouts';

export default function F2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mx-auto overflow-hidden'>
      <F2Header />
      
      <div className='mx-auto pt-[80px] h-[calc(100vh-80px)]'>
        {children}
      </div>
    </main>
  );
}
