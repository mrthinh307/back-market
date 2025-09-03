import React from 'react';
import Image from 'next/image';
import RatingStars from './RatingStars';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import PriceBlock from './ProductInfo/PriceBlock';
import WishlistButton from './ProductInfo/WishlistButton';

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
  const {
    scrollContainerRef,
    handleScroll,
    handleScrollLeft,
    isAtStart,
    isAtEnd,
  } = useHorizontalScroll();
  return (
    <div className='w-full'>
      <div className='mb-4 hidden md:block'>
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
        <h1 className='text-3xl font-heading font-semibold text-foreground'>
          {title}
        </h1>
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
        <div className='mt-6 flex items-center mb-4'>
          <div className='grow'>
            <PriceBlock
              price={price}
              originalPrice={originalPrice}
              savings={savings}
            />
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
              <span className='font-duplet font-bold text-base truncate'>
                Add to cart
              </span>
            </span>
          </button>

          <WishlistButton
            isWishlisted={isWishlisted}
            onClick={onWishlistToggle}
          />
        </div>

        <div
          className='flex items-center gap-x-4 body-2 text-primary'
          tabIndex={-1}
        >
          <div className='flex flex-wrap items-center gap-4 self-center w-[40px] flex-shrink-0 mr-2'>
            <Image
              alt='Afirm'
              src='/assets/images/GooglePay.png'
              width={40}
              height={40}
              className='bg-green-200'
            />
          </div>
          <div className='grow'>
            Buy now, pay later. <br />
            <a
              className='affirm-product-modal font-bold underline'
              data-qa='affirm-product-modal'
              data-test='affirm-product-modal'
              href='#'
            >
              Learn more
            </a>
          </div>
        </div>

        <div className='mt-6 md:relative'>
          <div
            ref={scrollContainerRef}
            className='flex flex-col gap-3 md:flex-row md:flex-nowrap md:items-center md:overflow-x-auto md:scroll-smooth scrollbar-hide'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Trade-in Button */}
            <button
              className='bg-gray-300 text-black rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-400 transition-colors duration-200 min-w-max'
              type='button'
            >
              <div className='mr-2 shrink-0'>
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-purple-500'
                >
                  <path
                    fillRule='evenodd'
                    d='M7 3.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M4.75 7a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0'
                    clipRule='evenodd'
                  />
                  <path d='M13 6.25a.75.75 0 0 0 0 1.5h5.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.647-2.646a1.25 1.25 0 0 0 0-1.768L17.53 3.47a.75.75 0 1 0-1.06 1.06l1.72 1.72H13m-7.19 10H11a.75.75 0 0 1 0 1.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.647-2.646a1.25 1.25 0 0 1 0-1.768L6.47 13.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72' />
                  <path
                    fillRule='evenodd'
                    d='M14.5 13.25a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 0 1.25 1.25h5a1.25 1.25 0 0 0 1.25-1.25v-5a1.25 1.25 0 0 0-1.25-1.25h-5m.25 6v-4.5h4.5v4.5h-4.5'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='line-clamp-1 overflow-hidden text-ellipsis text-left md:overflow-auto md:text-clip'>
                Get this for even less with Trade-in
              </p>
              <svg
                aria-hidden='true'
                fill='currentColor'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
                className='shrink-0 ml-2'
              >
                <path
                  fillRule='evenodd'
                  d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                  clipRule='evenodd'
                />
              </svg>
            </button>

            {/* Verizon Button */}
            <button
              className='bg-gray-300 text-black rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-400 transition-colors duration-200 min-w-max'
              type='button'
            >
              <div className='mr-2 shrink-0'>
                <img
                  alt='Visible by verizon tiny logo'
                  className='h-auto max-h-full max-w-full leading-none'
                  height='20'
                  width='20'
                  src='https://front-office.statics.backmarket.com/f74eb5792e465b9340119f7163be88c6179486d9/img/visible-by-verizon/visible-by-verizon-logo-tiny.svg'
                />
              </div>
              <p className='line-clamp-1 overflow-hidden text-ellipsis text-left md:overflow-auto md:text-clip'>
                Save big: $20/month unlimited data
              </p>
              <svg
                aria-hidden='true'
                fill='currentColor'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
                className='shrink-0 ml-2'
              >
                <path
                  fillRule='evenodd'
                  d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                  clipRule='evenodd'
                />
              </svg>
            </button>

            {/* Additional buttons for scrolling demo */}
            <button
              className='bg-gray-300 text-black rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-400 transition-colors duration-200 min-w-max'
              type='button'
            >
              <div className='mr-2 shrink-0'>
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-purple-500'
                >
                  <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
                </svg>
              </div>
              <p className='line-clamp-1 overflow-hidden text-ellipsis text-left md:overflow-auto md:text-clip'>
                Free shipping on orders over $50
              </p>
              <svg
                aria-hidden='true'
                fill='currentColor'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
                className='shrink-0 ml-2'
              >
                <path
                  fillRule='evenodd'
                  d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                  clipRule='evenodd'
                />
              </svg>
            </button>

            <button
              className='bg-gray-300 text-black rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-400 transition-colors duration-200 min-w-max'
              type='button'
            >
              <div className='mr-2 shrink-0'>
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-purple-500'
                >
                  <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <p className='line-clamp-1 overflow-hidden text-ellipsis text-left md:overflow-auto md:text-clip'>
                Extended warranty available
              </p>
              <svg
                aria-hidden='true'
                fill='currentColor'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
                className='shrink-0 ml-2'
              >
                <path
                  fillRule='evenodd'
                  d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>

          {/* View More Button - Right Side (hidden at end) */}
          {!isAtEnd && (
            <div className='absolute right-0 top-[-2px] z-[1] hidden w-[104px] items-center justify-end md:flex bg-gradient-to-r from-transparent via-white/30 to-white'>
              <button
                aria-label='View more'
                className='focus:outline-none focus:ring-2 focus:ring-foreground rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition-all duration-300 ease-in-out w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
                type='button'
                onClick={handleScroll}
              >
                <svg
                  aria-hidden='true'
                  aria-label='View more'
                  fill='currentColor'
                  height='24'
                  role='img'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          )}

          {/* View Back Button - Left Side (hidden at start) */}
          {!isAtStart && (
            <div className='absolute left-0 top-[-2px] z-[1] hidden w-[104px] items-center justify-start md:flex bg-gradient-to-l from-transparent via-white/30 to-white'>
              <button
                aria-label='View previous'
                className='focus:outline-none focus:ring-2 focus:ring-foreground rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition-all duration-300 ease-in-out w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
                type='button'
                onClick={handleScrollLeft}
              >
                <svg
                  aria-hidden='true'
                  aria-label='View previous'
                  fill='currentColor'
                  height='24'
                  role='img'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                  className='rotate-180'
                >
                  <path
                    fillRule='evenodd'
                    d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
