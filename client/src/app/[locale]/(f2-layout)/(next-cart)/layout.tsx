'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

const CART_STEPS = [
  {
    path: 'shipping',
    label: '2/4 Delivery',
    progress: '1/2',
  },
  {
    path: 'payment',
    label: '3/4 Payment',
    progress: '3/4',
  },
  {
    path: 'review',
    label: '4/4 Review',
    progress: '4/4',
  },
] as const;

function ShippingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  const currentStep =
    CART_STEPS.find((step) => pathName.includes(step.path)) || CART_STEPS[0];

  console.log('Current Step:', currentStep);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex flex-col gap-6 md:gap-12'>
      <nav className='relative flex items-center'>
        <Button
          size='icon'
          variant='ghost'
          className='mt-2 absolute left-0'
          onClick={handleBack}
        >
          <ArrowLeftIcon className='size-5 text-foreground' />
        </Button>
        <div className='h-14 w-full content-center px-10'>
          <p className='text-center flex-1'>{currentStep.label}</p>
        </div>
        <div className='border-t-2 border-border w-full absolute bottom-0 h-0.5'>
          <div
            className='border-t-2 border-dark ease-in-out transition-all duration-200 h-0.5 absolute -top-0.5 left-0'
            style={{ width: `calc((${currentStep.progress}) * 100%)` }}
          ></div>
        </div>
      </nav>

      {children}
    </div>
  );
}

export default ShippingLayout;
