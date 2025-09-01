import React from 'react';
import Image from 'next/image';
import RatingStars from './RatingStars';

interface ProductInfoProps {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  savings: number;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  rating,
  reviewCount,
  price,
  originalPrice,
  savings,
  isWishlisted,
  onWishlistToggle,
}) => {
  return (
    <div className='w-full'>
      <div className='mb-16 hidden md:block'>
        <a
          className='bg-green-200 rounded-sm inline-flex items-center self-center p-2 pr-4 isolate mb-4 font-duplet font-semibold text-sm'
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
        </a>
        <h1 className='text-3xl font-heading font-semibold text-foreground'>{title}</h1>
        <button
          className='flex bg-transparent items-center'
          data-test='product-page-reviews-count'
          type='button'
        >
          <div className='mt-3 text-foreground flex items-center'>
            <div
              aria-label={`Rating of ${rating} out of 5 stars`}
              className='text-foreground flex items'
              role='img'
            >
              <RatingStars rating={rating} size={16} />
              <span
                aria-hidden='true'
                className='ml-2 mt-1 pb-2 md:mt-2 font-duplet font-semibold text-sm cursor-pointer'
              >
                {rating}/5  
              </span>
            </div>
            <div className='font-duplet font-semibold text-sm underline-offset-2 ml-3 underline cursor-pointer text-foreground'>
            ({reviewCount.toLocaleString()} reviews)
            </div>
          </div>
        </button>
        <div className='mt-6 flex items-center'>
          <div className='grow'>
            <div>
              <div className='flex flex-wrap items-baseline gap-x-4'>
                <span
                  className='text-2xl font-duplet font-bold text-foreground'
                  data-qa='productpage-product-price'
                  data-test='productpage-product-price'
                >
                  ${price.toFixed(2)}
                </span>
                <div className='flex flex-wrap gap-x-4'>
                  <span className='font-duplet font-semibold text-sm text-muted-foreground whitespace-nowrap'>
                    before trade-in
                  </span>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-x-2'>
                <span className='text-xs z-[1]'>
                  <span id='trigger-v-0-5-0-0'>
                    <button className='text-muted-foreground cursor-pointer whitespace-nowrap'>
                      <span className='text-muted-foreground line-through'>
                        <span className=''>${originalPrice.toFixed(2)}</span>{' '}
                        new
                      </span>
                    </button>
                  </span>
                </span>
                <div className='bg-green-300'>
                  <span
                    className='rounded-xs inline-block max-w-full truncate px-1 py-0 font-duplet font-bold text-sm'
                    title={`Save $${savings.toFixed(2)}`}
                  >
                    Save ${savings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            aria-disabled='false'
            className='bg-primary text-primary-foreground rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] grow hover:bg-button-hover'
            data-id='product-page-buy-button-desktop'
            data-qa='product-page-buy-button-desktop'
            type='button'
          >
            <span
              aria-hidden='false'
              className='pointer-events-none flex items-center justify-center'
            >
              <span className='font-duplet font-bold text-base truncate'>Add to cart</span>
            </span>
          </button>

          <button
            aria-disabled='false'
            aria-label='Add to Favorites'
            className={`hover:bg-accent rounded-sm relative max-w-full select-none no-underline motion-safe:ease-in inline-flex h-12 items-center justify-center px-3 motion-safe:transition motion-safe:duration-300 cursor-pointer border-solid mx-3 border-2 ${
              isWishlisted ? 'border-red-500 bg-red-50' : 'border-foreground'
            }`}
            data-qa='my-favorites-toggle'
            type='button'
            onClick={onWishlistToggle}
          >
            <svg
              aria-hidden='false'
              fill={isWishlisted ? 'currentColor' : 'foreground'}
              height='24'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
              className={`h-6 w-6 ${isWishlisted ? 'text-red-500' : 'text-foreground'}`}
            >
              <path
                fillRule='evenodd'
                d='M7.5 4.87a3.75 3.75 0 0 0-3.75 3.75c0 1.14.596 2.126 1.462 2.977l.014.014L12 19.01l6.774-7.4.014-.013c.866-.85 1.462-1.838 1.462-2.977a3.75 3.75 0 0 0-3.75-3.75c-.982 0-1.813.493-2.515 1.077a13.434 13.434 0 0 0-.7.634l-.209.197a4.47 4.47 0 0 1-.4.342C12.578 7.19 12.326 7.37 12 7.37c-.325 0-.578-.18-.676-.25a4.47 4.47 0 0 1-.4-.342L10.716 6.58c-.211-.2-.436-.414-.701-.634C9.313 5.363 8.482 4.87 7.5 4.87M2.25 8.62c0-2.9 2.35-5.25 5.25-5.25 1.503 0 2.672.757 3.474 1.423a15.976 15.976 0 0 1 .8.724A27.034 27.034 0 0 0 12 5.73a9.016 9.016 0 0 0 .226-.213 15.976 15.976 0 0 1 .8-.724c.802-.666 1.97-1.423 3.474-1.423 2.9 0 5.25 2.35 5.25 5.25 0 1.694-.888 3.038-1.896 4.033l-6.932 7.57a1.25 1.25 0 0 1-1.844 0l-6.932-7.57C3.138 11.658 2.25 10.313 2.25 8.62m9.51-2.692s.006-.005.017-.01a.077.077 0 0 1-.017.01m.463-.01a.087.087 0 0 1 .017.01l-.017-.01'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
