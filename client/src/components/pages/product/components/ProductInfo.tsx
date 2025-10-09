import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { StarIcon } from 'lucide-react';
import { Button } from '../../../ui/button';
import { heartedIcon, heartIcon } from '@/public/assets/images';
import { successToastProps } from '@/libs/toast/toast-props';
import { useLocale } from 'next-intl';

interface ProductInfoProps {
  title: string;
  subtitle?: string;
  rating: number;
  reviewCount: number;
  priceWithCurrency: string;
  originalPrice?: string;
  savings?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  subtitle,
  rating,
  reviewCount,
  priceWithCurrency,
  originalPrice,
  savings,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const [isLiked, setIsLiked] = React.useState(true);
  
  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    toast.message(newLikedState ? 'Saved to Favorites' : 'Not ready to say goodbye?', {
      action: {
        label: newLikedState ? 'View Favorites' : 'Undo',
        onClick: () => {
          if (newLikedState) {
            router.push(`/${locale}/dashboard/favourites`);
          } else {
            setIsLiked(true);
          }
        },
      },
    });
  };

  return (
    <div className='w-full'>
      {/* Product info */}
      <div className='mb-4 mt-6 md:mt-0'>
        {/* Title + Subtitle */}
        <div className='flex justify-between items-start gap-6'>
          <h1 className='mb-2 flex flex-col'>
            <span className='text-3xl font-heading font-semibold text-secondary leading-10'>
              {title}
            </span>
            <span className='text-sm md:text-base font-medium text-secondary'>
              {subtitle}
            </span>
          </h1>

          <button
            className='size-[40px] rounded-full content-center md:!hidden hover:!bg-icon-button-hover cursor-pointer dark:!bg-gray-700 dark:hover:!bg-gray-600 transition-colors duration-200'
            onClick={handleLikeClick}
          >
            <Image
              src={isLiked ? heartedIcon : heartIcon}
              alt='Heart Icon'
              width={24}
              height={24}
              className={`dark:invert`}
            />
          </button>

          {/* <a
            className='bg-chart-2 rounded-sm hidden lg:inline-flex items-center self-center p-2 pr-4 isolate mb-4 font-semibold text-sm dark:hidden shrink-0'
            href='#ecoBlocks'
          >
            <Image
              alt=''
              className='stroke-success'
              height='24'
              src='https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/eco-block/butterfly.svg'
              width='24'
            />
            <span className='ml-1 underline'>More sustainable than new</span>
          </a> */}
        </div>

        {/* Rating */}
        <div className='flex gap-1.5 items-center h-[20px] cursor-pointer'>
          <div className='flex mt-[1px] gap-0.5'>
            {(() => {
              const stars = rating as number;
              return [...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`size-[15px] text-primary ${index + 1 <= stars ? 'fill-primary' : ''}`}
                />
              ));
            })()}
          </div>
          <span className='text-sm font-semibold'>{rating}/5</span>

          <span className='text-sm font-semibold underline'>
            ({reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price Block */}
        <div className='mt-6 flex items-center gap-4'>
          <div className='grow'>
            <span
              className='text-3xl font-semibold text-secondary'
              data-qa='productpage-product-price'
              data-test='productpage-product-price'
            >
              {priceWithCurrency}
            </span>

            {originalPrice && savings && (
              <div className='mt-1 flex items-center gap-2'>
                <span
                  id='trigger-v-0-5-0-0'
                  className='text-sm z-[1] text-muted line-through whitespace-nowrap'
                >
                  {originalPrice}
                </span>
                <span
                  className='bg-[#94F5BC] rounded-xs inline-block max-w-full truncate px-2 text-sm font-semibold text-[#006B40]'
                  title={`Save ${savings}`}
                >
                  Save {savings}
                </span>
              </div>
            )}
          </div>

          {/* Add to cart Button */}
          <Button className='md:min-w-[164px] md:max-w-[256px] md:grow' onClick={() => {
            toast.success('Added to cart ! Navigating...', successToastProps);
            router.push(`/${locale}/cart`);
          }}>
            Add to cart
          </Button>

          {/* Save/Like Button */}
          <Button variant='outline' className='px-3 hidden md:inline-flex' onClick={handleLikeClick}>
            <Image
              src={isLiked ? heartedIcon : heartIcon}
              alt='Heart Icon'
              width={0}
              height={0}
              className='size-6 dark:invert'
            />
          </Button>
        </div>
      </div>

      <hr className='border-gray-200 dark:border-gray-700 border-t my-4 md:hidden' />

      {/* Google pay Badge */}
      <div
        className='flex items-center gap-x-2 text-sm text-primary'
        tabIndex={-1}
      >
        <div className='flex flex-wrap items-center self-center px-2 py-1 bg-[#94F5BC] rounded-xs'>
          <Image
            alt='Afirm'
            src='/assets/images/GooglePay.png'
            width={0}
            height={0}
            sizes='100vw'
            className='h-[16px] w-auto'
          />
        </div>
        <div className='grow text-secondary'>
          <span>Buy now, pay later. </span>
          <a
            className='affirm-product-modal font-semibold underline'
            data-qa='affirm-product-modal'
            data-test='affirm-product-modal'
            href='#'
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
