import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function EmptyCart() {
  return (
    <div className='bg-background'>
      <div className='relative grow px-6 pt-0 md:pt-12 lg:overflow-y-hidden'>
        <div className='mx-auto mb-6 w-full grow md:mb-12 md:max-w-[820px]'>
          <div className='flex flex-col gap-6 md:gap-12'>
            <div className='flex flex-col md:flex-row md:items-center pt-6 md:px-6 md:pt-0 lg:px-0'>
              <div className='flex flex-col justify-center md:mb-0 mb-4 md:mr-14'>
                <p className='text-secondary-foreground mb-[2px]'>Hey! Don't miss it.</p>
                <h2 className='text-3xl font-bold mb-2 font-heading'>
                  Your shopping cart is empty.
                </h2>
                <p className='text-secondary-foreground'>
                  All these excellent products don't just add themselves to your
                  shopping cart!
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

export default EmptyCart;
