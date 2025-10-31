'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useCart } from '@/contexts/CartContext';
import { useUserAddress } from '@/hooks/useUserAddress';
import LoadingPage from '../LoadingPage';

function CartSummarySection() {
  const { cartItems, cartData, isRemoving, isLoading } = useCart();
  const router = useRouter();
  const pathName = usePathname();

  const { data: userAddress } = useUserAddress();

  const subtotal = cartData?.totalPrice || 0;

  const handleGoToShippingPage = () => {
    const hasAddress = Boolean(
      userAddress?.fullName && userAddress?.city && userAddress?.district,
    );

    const targetPage = hasAddress
      ? '/shipping/confirmation-address'
      : '/shipping/shipping-address';

    router.push(targetPage);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className='px-6 pt-6 pb-6 lg:bg-sub-background lg:pt-12 w-full lg:w-120 shrink-0 overflow-y-auto'>
      <div className='relative flex flex-col gap-6 text-[1.4rem] w-full'>
        <h2 className='relative flex flex-col gap-6 text-[22px] font-semibold'>
          Summary
        </h2>
        <div className='rounded-lg shadow-sm bg-secondary-background p-6'>
          <div className='space-y-6'>
            {cartItems.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <div className='relative flex shrink-0'>
                  {/* Image container with border */}
                  <div className='relative w-12 h-12 p-1 border border-border rounded-sm bg-background'>
                    <Image
                      src={
                        item.productVariant.ProductVariantImage[0]?.image
                          .imageUrl || '/assets/images/placeholder-image.png'
                      }
                      alt={
                        item.productVariant.ProductVariantImage[0]?.image
                          .altText || item.productVariant.product.name
                      }
                      width={40}
                      height={40}
                      className='rounded object-cover overflow-hidden'
                    />
                  </div>

                  {/* Quantity badge */}
                  {item.quantity >= 1 && (
                    <div className='absolute -top-2 -right-2 w-5 h-4 bg-[#b3c8ef] text-[#0e1016] rounded-full flex items-center justify-center'>
                      <span className='text-xs font-semibold leading-none'>
                        {item.quantity}
                      </span>
                    </div>
                  )}
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-start gap-2'>
                    <p className='text-sm font-semibold leading-snug truncate'>
                      {item.productVariant.title}
                    </p>
                    <p className='text-sm whitespace-nowrap text-primary'>
                      $
                      {(
                        Number(item.productVariant.price) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className='flex justify-between text-sm text-muted-foreground mt-1'>
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                </div>
              </div>
            ))}
            <hr className='border-border my-4'></hr>
            <div className='space-y-3'>
              <div className='flex justify-between text-sm text-muted-foreground'>
                <span>Subtotal</span>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='underline'>Quality Assurance Fee</span>
                <span>$ 7.49</span>
              </div>
              <hr className='border-border my-4'></hr>
              <div className='flex justify-between text-base sm:text-lg font-semibold'>
                <span>Total including taxes</span>
                <span>$ {(subtotal + 7.49).toFixed(2)}</span>
              </div>
            </div>

            <div className='mt-6'>
              <Button
                className={`w-full ${pathName.includes('cart') ? '' : 'hidden'}`}
                disabled={cartItems.length === 0 || isRemoving}
                onClick={handleGoToShippingPage}
              >
                {isRemoving || isLoading ? (
                  <LoadingSpinner />
                ) : (
                  'Go to shipping'
                )}
              </Button>

              <p className='text-xs text-secondary-foreground text-center mt-3 leading-relaxed'>
                By confirming this order you accept our{' '}
                <Link
                  href='/'
                  className='underline font-semibold text-foreground'
                >
                  Terms of Use Agreement
                </Link>
                ,{' '}
                <Link
                  href='/'
                  className='underline font-semibold text-foreground'
                >
                  Terms of Sale
                </Link>
                , and our{' '}
                <Link
                  href='/'
                  className='underline font-semibold text-foreground'
                >
                  data protection policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummarySection;
