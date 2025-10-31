import React from 'react';
import { F2Header } from '@/components/layouts';
import CartSummarySection from '@/components/pages/cart/CartSummarySection';
import { CartProvider, ProtectedRoute } from '@/providers';

export async function generateMetadata() {
  return {
    title: `Your green cart | Back Market`,
    description: `Review your cart items and proceed to checkout. Enjoy great deals on refurbished products!`,
  };
}

export default function F2Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <CartProvider>
        <main className='mx-auto'>
          <F2Header />

          <div className='mx-auto pt-16 h-[calc(100vh-4rem)]'>
            <div className='bg-background flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-y-auto'>
              {/* Main content area */}
              <div className='relative flex-1 px-6 lg:pt-12 lg:overflow-y-auto'>
                <div className='mx-auto w-full grow lg:mb-12 lg:max-w-[820px]'>
                  {children}
                </div>
              </div>

              {/* Shared Cart Summary Section */}
              <CartSummarySection />
            </div>
          </div>
        </main>
      </CartProvider>
    </ProtectedRoute>
  );
}
