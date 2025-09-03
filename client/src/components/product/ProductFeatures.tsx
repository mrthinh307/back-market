import React from 'react';
import { ProductFeaturesProps } from '@/types/product-selection.type';

// Arrow right icon component
const ArrowRightIcon = () => (
  <svg
    aria-hidden='true'
    fill='currentColor'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    className='h-24 w-full'
  >
    <path
      fillRule='evenodd'
      d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
      clipRule='evenodd'
    ></path>
  </svg>
);

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  features,
  className = '',
}) => {
  return (
    <div className={`mb-7 md:mb-8 mt-6 w-full ${className}`}>
      <div className='flex flex-col gap-2 w-full'>
        {features.map((feature) => {
          const Component = feature.onClick ? 'button' : 'div';

          return (
            <Component
              key={feature.id}
              className={`bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in w-full`}
              onClick={feature.onClick}
            >
              <div className='mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12'>
                {feature.icon}
              </div>
              <div className='flex w-full items-center justify-between text-left'>
                <div className='flex flex-col'>
                  <div className='font-bold text-base'>{feature.title}</div>
                  {feature.description && (
                    <div className='caption'>
                      <div className='w-full'>{feature.description}</div>
                    </div>
                  )}
                </div>
                {feature.onClick && (
                  <div className='ml-2 flex h-10 w-10 items-center'>
                    <ArrowRightIcon />
                  </div>
                )}
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFeatures;
