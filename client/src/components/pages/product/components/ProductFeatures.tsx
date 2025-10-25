/* eslint-disable @next/next/no-img-element */
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

import { useHorizontalScrollGradientMask } from '@/hooks/useHorizontalScrollGradientMask';
import { getProductFeatures } from '../seed/temp-data-product';
import FeatureIcon from './FeatureIcon';

export interface FeatureItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ProductFeatures: React.FC = ({
  className = '',
}: {
  className?: string;
}) => {
  const {
    scrollContainerRef,
    handleScroll,
    handleScrollLeft,
    isAtStart,
    isAtEnd,
    gradientMaskClass,
  } = useHorizontalScrollGradientMask();

  // Get features for iPhone 13 (you can make this dynamic based on product ID)
  const features: FeatureItem[] = getProductFeatures('iphone-13').map((feature) => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: <FeatureIcon iconType={feature.iconType} />,
    onClick: feature.onClick,
  }));

  return (
    <div className={`mb-7 md:mb-8 mt-6 w-full ${className}`}>
      {/* Product Features 1 - Scrollable container with gradient mask */}
      <div className='mb-6 md:relative'>
        {/* Scrollable container with gradient mask */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-3 flex-nowrap items-center overflow-x-auto scroll-smooth scrollbar-hide ${gradientMaskClass}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Trade-in Button */}
          <button
            className='bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-300 transition-colors duration-200 min-w-max cursor-pointer'
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
              className='shrink-0 ml-1'
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
            className='bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-300 transition-colors duration-200 min-w-max cursor-pointer'
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
              className='shrink-0 ml-1'
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
            className='bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-300 transition-colors duration-200 min-w-max cursor-pointer'
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
            className='bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex h-9 w-fit max-w-full shrink-0 items-center px-3 hover:bg-gray-300 transition-colors duration-200 min-w-max cursor-pointer'
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
                className='text-blue-300'
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
          <div className='absolute right-0 top-[-2px] z-[1] hidden w-[104px] items-center justify-end md:flex bg-gradient-to-r from-transparent via-white/30 to-white dark:via-gray-900/30 dark:to-gray-900'>
            <button
              aria-label='View more'
              className='focus:outline-none focus:ring-1 focus:ring-sidebar-ring rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition-all duration-300 ease-in-out w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-500'
              type='button'
              onClick={handleScroll}
            >
              <ArrowRight className='size-4' />
            </button>
          </div>
        )}

        {/* View Back Button - Left Side (hidden at start) */}
        {!isAtStart && (
          <div className='absolute left-0 top-[-2px] z-[1] hidden w-[104px] items-center justify-start md:flex bg-gradient-to-l from-transparent via-white/30 to-white dark:via-gray-900/30 dark:to-gray-900'>
            <button
              aria-label='View previous'
              className='focus:outline-none focus:ring-1 focus:ring-sidebar-ring rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition-all duration-300 ease-in-out w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-500'
              type='button'
              onClick={handleScrollLeft}
            >
              <ArrowLeft className='size-4' />
            </button>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-2 w-full'>
        {features.map((feature) => {
          const Component = feature.onClick ? 'button' : 'div';

          return (
            <Component
              key={feature.id}
              className='bg-[#ecf0fe] hover:bg-[#c2d3f5] dark:bg-[#1e293b] dark:hover:bg-[#334155] cursor-pointer rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in w-full'
              onClick={feature.onClick}
            >
              <div className='mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12'>
                {feature.icon}
              </div>
              <div className='flex w-full items-center justify-between text-left'>
                <div className='flex flex-col'>
                  <div className='font-semibold text-sm'>{feature.title}</div>
                  {feature.description && (
                    <div className='text-xs'>
                      <div className='w-full'>{feature.description}</div>
                    </div>
                  )}
                </div>
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFeatures;
