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
  onAffirmClick?: () => void;
  onTradeInClick?: () => void;
  onUnlimitedDataClick?: () => void;
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
  onAffirmClick,
  onTradeInClick,
  onUnlimitedDataClick,
}) => {
  return (
    <div className='w-full'>
      <div className='mb-16 hidden md:block'>
        <a
          className='bg-green-200 rounded-sm body-2-bold inline-flex items-center self-center p-2 pr-4 isolate mb-4'
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
        <h1 className='font-heading text-3xl font-bold'>{title}</h1>
        <button
          className='flex bg-transparent items-center'
          data-test='product-page-reviews-count'
          type='button'
        >
          <div className='text-action-default-hi flex items-center'>
            <div
              aria-label={`Rating of ${rating} out of 5 stars`}
              className='text-action-default-hi flex items-center'
              role='img'
            >
              <RatingStars rating={rating} size={16} />
              <span
                aria-hidden='true'
                className='ml-2 mt-1 pb-2 md:mt-2 body-2-bold cursor-pointer'
              >
                {rating}/5
              </span>
            </div>
          </div>
          <div className='body-2-link underline-offset-2 ml-3 underline cursor-pointer'>
            ({reviewCount.toLocaleString()} reviews)
          </div>
        </button>
        <div className='mt-6 flex items-center'>
          <div className='grow'>
            <div>
              <div className='flex flex-wrap items-baseline gap-x-4'>
                <span
                  className='text-2xl font-bold'
                  data-qa='productpage-product-price'
                  data-test='productpage-product-price'
                >
                  ${price.toFixed(2)}
                </span>
                <div className='flex flex-wrap gap-x-4'>
                  <span className='body-2-bold whitespace-nowrap'>
                    before trade-in
                  </span>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-x-2'>
                <span className='caption z-[1]'>
                  <span id='trigger-v-0-5-0-0'>
                    <button className='text-static-default-low cursor-pointer whitespace-nowrap'>
                      <span className='text-gray-700 line-through'>
                        <span className=''>${originalPrice.toFixed(2)}</span>{' '}
                        new
                      </span>
                    </button>
                  </span>
                </span>
                <div className='bg-green-300'>
                  <span
                    className='rounded-xs inline-block max-w-full truncate px-1 py-0 font-bold text-sl'
                    title={`Save $${savings.toFixed(2)}`}
                  >
                    Save ${savings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional offers section */}
          <div className='mt-4 space-y-3'>
            {/* Affirm Learn more */}
            <div className='flex items-center'>
              <div className='flex items-center text-sm text-gray-600'>
                <span className='mr-2'>affirm</span>
                <button
                  className='text-blue-600 underline hover:text-blue-800'
                  onClick={onAffirmClick}
                >
                  Buy now, pay later. Learn more
                </button>
              </div>
            </div>

            {/* Trade-in offer */}
            <button
              className='flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors'
              onClick={onTradeInClick}
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                />
              </svg>
              Get this for even less with Trade-in
            </button>

            {/* Unlimited data offer */}
            <button
              className='flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors'
              onClick={onUnlimitedDataClick}
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Save big: $20/month unlimited data
            </button>
          </div>

          {/* Action buttons */}
          <div className='mt-6 flex items-center'>
            <button
              aria-disabled='false'
              className='bg-black text-white rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] grow hover:bg-gray-800'
              data-id='product-page-buy-button-desktop'
              data-qa='product-page-buy-button-desktop'
              type='button'
            >
              <span
                aria-hidden='false'
                className='pointer-events-none flex items-center justify-center'
              >
                <span className='body-1-bold truncate'>Add to cart</span>
              </span>
            </button>

            <button
              aria-disabled='false'
              aria-label='Add to Favorites'
              className={`hover:bg-gray-200 rounded-sm relative max-w-full select-none no-underline motion-safe:ease-in inline-flex h-12 items-center justify-center px-3 motion-safe:transition motion-safe:duration-300 cursor-pointer border-solid mx-3 border-2 ${
                isWishlisted ? 'border-red-500 bg-red-50' : 'border-black'
              }`}
              data-qa='my-favorites-toggle'
              type='button'
              onClick={onWishlistToggle}
            >
              <span className='pointer-events-none flex items-center'>
                <span className='pointer-events-none flex items-center space-x-8'>
                  <span className='body-2-bold pointer-events-none truncate'>
                    <svg
                      aria-hidden='true'
                      fill={isWishlisted ? 'currentColor' : 'none'}
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                      className={`my-8 ${isWishlisted ? 'text-red-500' : ''}`}
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.5 4.87a3.75 3.75 0 0 0-3.75 3.75c0 1.14.596 2.126 1.462 2.977l.014.014L12 19.01l6.774-7.4.014-.013c.866-.85 1.462-1.838 1.462-2.977a3.75 3.75 0 0 0-3.75-3.75c-.982 0-1.813.493-2.515 1.077a13.434 13.434 0 0 0-.7.634l-.209.197a4.47 4.47 0 0 1-.4.342C12.578 7.19 12.326 7.37 12 7.37c-.325 0-.578-.18-.676-.25a4.47 4.47 0 0 1-.4-.342L10.716 6.58c-.211-.2-.436-.414-.701-.634C9.313 5.363 8.482 4.87 7.5 4.87M2.25 8.62c0-2.9 2.35-5.25 5.25-5.25 1.503 0 2.672.757 3.474 1.423a15.976 15.976 0 0 1 .8.724A27.034 27.034 0 0 0 12 5.73a9.016 9.016 0 0 0 .226-.213 15.976 15.976 0 0 1 .8-.724c.802-.666 1.97-1.423 3.474-1.423 2.9 0 5.25 2.35 5.25 5.25 0 1.694-.888 3.038-1.896 4.033l-6.932 7.57a1.25 1.25 0 0 1-1.844 0l-6.932-7.57C3.138 11.658 2.25 10.313 2.25 8.62m9.51-2.692s.006-.005.017-.01a.077.077 0 0 1-.017.01m.463-.01a.087.087 0 0 1 .017.01l-.017-.01'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
