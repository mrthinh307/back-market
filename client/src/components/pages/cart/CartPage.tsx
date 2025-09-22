'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/cards/ProductCard';
import { SlideCarousel } from '@/components/carousels';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CartItem, sampleCartItems, recommendedProducts } from './sample_cart_data';
import CartPerksSection from './components/CartPerksSection';

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="mb-6">
              <Image
                src="/assets/images/empty-cart.svg"
                alt="Empty cart"
                width={120}
                height={120}
                className="mx-auto opacity-50"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-primary">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-button-hover text-primary-foreground">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="bg-sub-background h-screen flex flex-col overflow-y-auto lg:flex-row lg:overflow-y-hidden lg:pb-0">
          {/* SECTION: YOUR CART */}
          <div className='relative grow h-auto lg:h-[calc(100dvh-60px)] lg:overflow-y-scroll'> 
            <div className='mx-auto mb-6 w-full grow md:mb-12 md:max-w-[820px]'>
              <div className='flex-shrink-0 pb-4 pt-6 mt-6'>
                <h2 className="text-xl font-semibold text-primary">Your cart</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <ProductCard
                        productCard={{
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          newPrice: item.originalPrice,
                          colors: item.color
                            ? [{ label: item.color, color: "#000000" }]
                            : undefined,
                        }}
                        variant="cart"
                        cartProps={{
                          quantity: item.quantity,
                          deliveryInfo: item.deliveryInfo,
                          availability:
                            item.stockQuantity === 1
                              ? "Only 1 left"
                              : item.stockQuantity === 0
                              ? "Out of stock"
                              : "In stock",
                          savings: item.savings,
                          badge: item.badge,
                          condition: item.condition,
                          onQuantityChange: (newQuantity) =>
                            updateQuantity(item.id, newQuantity),
                          onRemove: () => removeItem(item.id),
                        }}
                        className="mb-4"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <hr className='border-static-default-low border-t my-10 md:my-10'></hr>

              {/* SECTION: COMPLETE YOUR CART */}
              <div className='overflow-y-auto'>
                <SlideCarousel
                  carouselTitle='Complete your cart:'
                  desktopSlidesToScroll={3}
                >
                  <CarouselContent className='pt-3 pb-5'>
                    {recommendedProducts.map((product) => (
                      <CarouselItem key={product.id} className='basis-auto'>
                        <ProductCard productCard={product} className='w-[256px]' />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </SlideCarousel>
              </div>

              <hr className='border-static-default-low border-t my-10 md:my-10'></hr>

              {/* SECTION: YOUR PERKS */}
              <div className='px-6'>
                <CartPerksSection />
              </div>
            </div>
          </div>

          {/* SECTION: SUMMARY */}
          <div className='flex justify-center px-4 lg:bg-sub-background lg:w-[27.5rem] h-auto lg:h-[calc(100dvh-60px)] lg:overflow-auto'>
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex-1 flex flex-col">
                <div className='flex-shrink-0 pb-4 pt-6 mt-6'>
                    <h2 className="text-xl font-semibold text-primary">Summary</h2>
                </div>
                <div className='rounded-lg shadow-sm bg-background-secondary h-full border border-border mt-3'>
                  <div className="flex-1 flex flex-col overflow-y-auto p-6 pb-6">
                    <div className="space-y-4 flex-1">
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-start gap-3">
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between">
                                <p className="text-sm font-medium text-primary leading-snug flex-1">{item.name}</p>
                                <p className="text-sm font-semibold whitespace-nowrap ml-2 text-primary">£{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                <p>Shipping</p>
                                <p>Free</p>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                        <hr className='border-border border-t my-4'></hr>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                              <span>Subtotal</span>
                              <span>£{subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="underline">Quality Assurance Fee</span>
                              <span>£7.49</span>
                          </div>
                          <hr className='border-border border-t my-4'></hr>
                          <div className="flex justify-between text-lg font-semibold">
                              <span>Total including taxes</span>
                              <span>£{(subtotal + 7.49).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 mb-[140px]">
                        <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-button-hover text-primary-foreground h-12 text-base font-semibold"
                        disabled={cartItems.length === 0}
                        >
                        Go to shipping
                        </Button>

                        <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
                        By confirming this order you accept our{" "}
                        <Link
                            href="#"
                            className="underline hover:text-primary"
                        >
                            Terms of Use Agreement
                        </Link>
                        ,{" "}
                        <Link href="#" className="underline hover:text-primary">
                            Terms of Sale
                        </Link>
                        , and our{" "}
                        <Link href="#" className="underline hover:text-primary">
                            data protection policy
                        </Link>
                        .
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CartPage;