'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ServiceHighlights } from '@/components/pages/home/components';
import DeliveryAddressCard from '@/components/pages/profile/components/DeliveryAddressCard';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserAddress } from '@/hooks/useUserAddress';

function ConfirmationAddress() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { cartItems } = useCart();

  const { data: deliveryInfo } = useUserAddress();

  const handleEdit = () => {
    // Navigate to shipping-address with address data in state
    router.push('/shipping/shipping-address');
  };

  const handleNext = () => {
    router.push('/payment');
  };

  return (
    <div>
      <DeliveryAddressCard
        deliveryInfo={deliveryInfo ?? null}
        onEditButtonClick={handleEdit}
      />

      <div className='mt-14 space-y-4'>
        <h2 className='text-[22px] font-semibold'>Select delivery method</h2>
        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => (
            <div
              className='w-full p-6 shadow-sm rounded-lg bg-secondary-background'
              key={item.id}
            >
              {/* Product Image + Product name */}
              <div className='mb-6 flex items-center font-semibold text-sm gap-6'>
                <div className='relative shrink-0'>
                  <div className='relative w-12 h-12 p-1 border border-border rounded-sm bg-background'>
                    <Image
                      src={
                        item.productVariant.ProductVariantImage[0]?.image
                          .imageUrl || '/assets/images/placeholder-image.png'
                      }
                      alt='temp'
                      width={40}
                      height={40}
                      className='rounded object-cover overflow-hidden'
                    />
                  </div>

                  {/* Quantity badge */}
                  {item.quantity > 1 && (
                    <div className='absolute -top-2 -right-2 w-5 h-4 bg-[#b3c8ef] text-[#0e1016] rounded-full flex items-center justify-center'>
                      <span className='text-xs font-semibold leading-none'>
                        {item.quantity}
                      </span>
                    </div>
                  )}
                </div>
                <span>{item.productVariant.title}</span>
              </div>

              {/* Radio Group: Delivery Time */}
              <RadioGroup defaultValue='default'>
                <div className='flex items-start gap-4 p-4 border border-dark dark:border-ring rounded-sm'>
                  <RadioGroupItem
                    value='default'
                    id='r1'
                    className='size-5 mt-1'
                  />
                  <div className='flex flex-col gap-2 flex-1'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='r1' className='font-semibold text-base'>
                        Get it 30 Oct - 31 Oct
                      </Label>
                      <Label
                        htmlFor='r1'
                        className='text-[#006B40] dark:text-chart-2 font-semibold text-base'
                      >
                        Free delivery
                      </Label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Image
                        src='/assets/images/delivery-icon.svg'
                        alt='Delivery Icon'
                        width={20}
                        height={20}
                        className='dark:invert'
                      />
                      <Label className='text-sm text-secondary-foreground'>
                        Standard shipping
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className='w-full flex justify-end mt-14'>
        <Button onClick={handleNext}>Next</Button>
      </div>

      <div className='mt-6 md:mt-14'>
        <h2 className='text-[22px] font-semibold mb-4'>
          Your perks with every purchase:
        </h2>
        <ServiceHighlights
          className='grid-cols-1! sm:grid-cols-2! p-6 -mx-8'
          contentSize={isMobile ? 'md' : 'lg'}
        />
      </div>
    </div>
  );
}

export default ConfirmationAddress;
