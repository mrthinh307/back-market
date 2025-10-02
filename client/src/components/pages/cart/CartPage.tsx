'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CartItem, sampleCartItems } from './seed/sample_cart_data';
import { YourCartSection, CartSummarySection } from './components';

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className='bg-background'>
        <div className='relative grow px-6 pt-0 md:pt-12 lg:overflow-y-hidden'>
          <div className='mx-auto mb-6 w-full grow md:mb-12 md:max-w-[820px]'>
            <div className='flex flex-col gap-6 md:gap-12'>
              <div className='flex flex-col md:flex-row md:items-center pt-6 md:px-6 md:pt-0 lg:px-0'>
                <div className='flex flex-col justify-center md:mb-0 mb-4 md:mr-14'>
                  <p className='text-muted text-sm mb-[2px]'>
                    Hey! Don't miss it.
                  </p>
                  <h2 className='text-3xl font-semibold mb-2 text-primary font-heading'>
                    Your shopping cart is empty.
                  </h2>
                  <p className='text-muted'>
                    All these excellent products don't just add themselves to
                    your shopping cart!
                  </p>
                  <Button className='mt-5 hidden md:block'>
                    <Link href='/'>Start shopping now !</Link>
                  </Button>
                </div>
                <div className='min-w-[40%] flex-initial items-center justify-center md:mb-0 md:w-[448px] md:min-w-[448px] order-1 md:ml-auto'>
                  <Image
                    src='https://front-office.statics.backmarket.com/09f25aadc0b9878a750cc5f71b09a9184000c6d1/img/checkout/emptyBasket.svg'
                    alt='Empty cart'
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-auto max-h-full max-w-full leading-none'
                    loading='lazy'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-sub-background flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-y-auto'>
      <YourCartSection
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      <CartSummarySection cartItems={cartItems} subtotal={subtotal} />
    </div>
  );
}

export default CartPage;
