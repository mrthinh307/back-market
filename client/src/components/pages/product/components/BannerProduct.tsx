import Image from 'next/image';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { AddToCartButton } from './AddToCartButton';

interface ProgressData {
  currentSection: number;
  totalSections: number;
  progressPercentage: number;
}

function BannerProduct({
  productVariantId,
  productName,
  imageUrl,
  subtitleText,
  priceWithCurrency,
  progressData,
}: {
  productVariantId: string;
  productName: string;
  imageUrl?: string;
  subtitleText: string;
  priceWithCurrency: string;
  progressData: ProgressData;
}) {
  const { isHidden } = useScrollDirection({
    threshold: 500,
    hideThreshold: 30,
    mode: 'strict',
  });

  const { progressPercentage, totalSections } = progressData;
  return (
    <>
      <div
        className={`flex bg-secondary-background border-[#dfe1e7] dark:border-[#3b3f45] inset-x-0 z-10 border-solid px-6 top-0 border-b py-3.5 fixed ${isHidden ? 'header-slide-down' : 'header-slide-up'}`}
      >
        <div className='flex justify-center w-full py-[1px]'>
          <div className='container'>
            <div className='flex items-center gap-3'>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={`small banner product - ${subtitleText}`}
                  width={51}
                  height={51}
                  sizes='50vw'
                  decoding='async'
                  className='mr-1 h-auto max-h-full max-w-full leading-none hidden sm:flex'
                />
              )}
              <p className='font-semibold text-secondary-foreground flex-wrap pr-6 xl:pr-0 text-xs sm:text-sm lg:text-base'>
                {subtitleText}
              </p>
              <div className='hidden md:flex grow flex-col items-end'>
                <div className='flex items-center justify-end'>
                  <span className='text-secondary-foreground text-xl lg:text-[22px] xl:text-2xl font-semibold whitespace-nowrap'>
                    {priceWithCurrency}
                  </span>
                </div>
              </div>
              <div className='hidden md:block ml-3 lg:ml-5 w-full max-w-[256px]'>
                <AddToCartButton
                  className='w-full'
                  productVariantId={productVariantId}
                  productName={productName}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-input-hover absolute bottom-0 left-0 right-0 h-[0.2rem] w-full'>
          <div
            className='bg-primary absolute bottom-0 left-0 top-0 h-full pl-18 transition-all duration-500 ease-out motion-reduce:transition-none md:pl-[100px]'
            style={{
              width:
                totalSections > 0
                  ? `${progressPercentage}%`
                  : 'calc(100% - 72px)',
              paddingLeft: totalSections > 0 ? '0' : '100px',
            }}
          ></div>
        </div>
      </div>
      {/* Mobile bottom banner */}
      <div 
        className={`bg-secondary-background py-3 px-6 flex md:hidden z-10 border-[#dfe1e7] dark:border-[#3b3f45] border-t fixed bottom-0 left-0 right-0 transition-transform duration-300 ${
          isHidden ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex-1 pr-10'>
          <div className='size-full flex items-center justify-start'>
            <span className='text-secondary-foreground text-xl sm:text-2xl font-semibold whitespace-nowrap'>
              {priceWithCurrency}
            </span>
          </div>
        </div>
        <div className='ml-3 lg:ml-5 w-full max-w-[256px]'>
          <AddToCartButton
            className='w-full'
            productVariantId={productVariantId}
            productName={productName}
          />
        </div>
      </div>
    </>
  );
}

export default BannerProduct;
