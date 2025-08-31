import React from 'react';

const ProductFeatures: React.FC = () => {
  return (
    <div className='mb-7 md:mb-8 mt-6'>
      <div className='flex flex-col gap-2'>
        <div className='bg-blue-100 rounded-lg flex flex-row items-center p-2'>
          <div className='mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12'>
            <svg
              aria-hidden='true'
              fill='currentColor'
              height='24'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 md:h-8 md:w-8'
            >
              <path
                fillRule='evenodd'
                d='M2.25 5.5A.75.75 0 0 1 3 4.75h10.5a1.25 1.25 0 0 1 1.225 1h2.966a1.25 1.25 0 0 1 1.118.691l1.655 3.31H20.5A1.25 1.25 0 0 1 21.75 11v5a1.25 1.25 0 0 1-1.25 1.25h-.854a2.751 2.751 0 0 1-5.292 0h-3.207a2.751 2.751 0 0 1-5.293 0H5A1.25 1.25 0 0 1 3.75 16v-5.5a.75.75 0 0 1 1.5 0v5.25h.604a2.751 2.751 0 0 1 5.292 0h2.104v-9.5H3A.75.75 0 0 1 2.25 5.5m18 10.25h-.604a2.751 2.751 0 0 0-4.896-.832V11.25h5.5v4.5m-5.5-6v-2.5h2.787l1.25 2.5H14.75m-7.5 6.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M17 15.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5'
                clipRule='evenodd'
              ></path>
              <path d='M3.5 7.25a.75.75 0 0 0 0 1.5H7a.75.75 0 0 0 0-1.5H3.5'></path>
            </svg>
          </div>
          <div className='flex w-full items-center justify-between text-left'>
            <div className='flex flex-col'>
              <div className='text-base font-bold'>
                <div>
                  <div>
                    <span>Free delivery by Aug 6 - Aug 7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className='bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in w-full'>
          <div className='mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12'>
            <svg
              aria-hidden='true'
              fill='currentColor'
              height='24'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 md:h-6 md:w-6'
            >
              <path d='M17.53 8.54a.75.75 0 0 0-1.06-1.061L11 12.949l-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0l5.646-5.647'></path>
              <path
                fillRule='evenodd'
                d='M4.5 2.759a1.25 1.25 0 0 0-1.25 1.25V8.73c0 9.392 7.29 12.1 8.395 12.455a1.147 1.147 0 0 0 .71 0C13.46 20.83 20.75 18.122 20.75 8.73V4.01a1.25 1.25 0 0 0-1.25-1.25h-15m.25 5.97V4.26h14.5v4.47c0 8.106-6.024 10.573-7.25 10.992-1.226-.419-7.25-2.886-7.25-10.992'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='flex w-full items-center justify-between text-left'>
            <div className='flex flex-col'>
              <div className='font-bold text-base'>
                <div className='w-full'>Works with all carriers</div>
              </div>
              <div className='caption'>
                <div className='w-full'>This phone is unlocked</div>
              </div>
            </div>
            <div className='ml-2 flex h-10 w-10 items-center'>
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
            </div>
          </div>
        </button>

        <button className='bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in'>
          <div className='mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12'>
            <svg
              aria-hidden='true'
              fill='currentColor'
              height='24'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 md:h-6 md:w-6'
            >
              <path d='M16.548 9.512a.75.75 0 1 0-1.096-1.024L10.4 13.901l-1.852-1.984a.75.75 0 0 0-1.096 1.023l2.034 2.18a1.25 1.25 0 0 0 1.828 0l5.234-5.608'></path>
              <path
                fillRule='evenodd'
                d='M13.764 3.401c-.993-1.535-3.24-1.535-4.233 0A1.021 1.021 0 0 1 8.306 3.8C6.6 3.141 4.782 4.462 4.88 6.288A1.021 1.021 0 0 1 4.124 7.33C2.357 7.8 1.662 9.937 2.816 11.356a1.021 1.021 0 0 1 0 1.288c-1.154 1.42-.46 3.556 1.308 4.026a1.021 1.021 0 0 1 .757 1.042C4.782 19.538 6.6 20.86 8.306 20.201a1.021 1.021 0 0 1 1.225.398c.993 1.535 3.24 1.535 4.233 0A1.021 1.021 0 0 1 14.99 20.2c1.706.658 3.523-.663 3.425-2.489a1.021 1.021 0 0 1 .757-1.042c1.767-.47 2.461-2.607 1.308-4.026a1.021 1.021 0 0 1 0-1.288c1.153-1.42.46-3.556-1.308-4.026a1.021 1.021 0 0 1-.757-1.042c.098-1.826-1.719-3.147-3.425-2.489A1.021 1.021 0 0 1 13.765 3.4M10.79 4.216a1.021 1.021 0 0 1 1.715 0A2.521 2.521 0 0 0 15.529 5.2a1.021 1.021 0 0 1 1.387 1.008 2.521 2.521 0 0 0 1.869 2.572 1.021 1.021 0 0 1 .53 1.631 2.521 2.521 0 0 0 0 3.18 1.021 1.021 0 0 1-.53 1.63 2.521 2.521 0 0 0-1.869 2.573 1.021 1.021 0 0 1-1.387 1.008 2.521 2.521 0 0 0-3.024.983 1.021 1.021 0 0 1-1.715 0A2.521 2.521 0 0 0 7.766 18.8a1.021 1.021 0 0 1-1.387-1.008 2.521 2.521 0 0 0-1.87-2.572 1.021 1.021 0 0 1-.53-1.631 2.521 2.521 0 0 0 0-3.18 1.021 1.021 0 0 1 .53-1.63 2.521 2.521 0 0 0 1.87-2.573 1.021 1.021 0 0 1 1.387-1.008 2.521 2.521 0 0 0 3.024-.983'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='flex w-full items-center justify-between text-left'>
            <div className='flex flex-col'>
              <div className='font-bold text-base'>
                <div>Free 30-day returns</div>
                <div>1-year warranty</div>
              </div>
              <div className='caption'></div>
            </div>
            <div className='ml-2 flex h-10 w-10 items-center'>
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
            </div>
          </div>
        </button>

        <button className='bg-blue-100 cursor-pointer hover:bg-blue-200 rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in'>
          <div className='mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12'>
            <svg
              aria-hidden='true'
              fill='currentColor'
              height='24'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 md:h-8 md:w-8'
            >
              <path d='M16.548 9.512a.75.75 0 1 0-1.096-1.024L10.4 13.901l-1.852-1.984a.75.75 0 0 0-1.096 1.023l2.034 2.18a1.25 1.25 0 0 0 1.828 0l5.234-5.608'></path>
              <path
                fillRule='evenodd'
                d='M13.764 3.401c-.993-1.535-3.24-1.535-4.233 0A1.021 1.021 0 0 1 8.306 3.8C6.6 3.141 4.782 4.462 4.88 6.288A1.021 1.021 0 0 1 4.124 7.33C2.357 7.8 1.662 9.937 2.816 11.356a1.021 1.021 0 0 1 0 1.288c-1.154 1.42-.46 3.556 1.308 4.026a1.021 1.021 0 0 1 .757 1.042C4.782 19.538 6.6 20.86 8.306 20.201a1.021 1.021 0 0 1 1.225.398c.993 1.535 3.24 1.535 4.233 0A1.021 1.021 0 0 1 14.99 20.2c1.706.658 3.523-.663 3.425-2.489a1.021 1.021 0 0 1 .757-1.042c1.767-.47 2.461-2.607 1.308-4.026a1.021 1.021 0 0 1 0-1.288c1.153-1.42.46-3.556-1.308-4.026a1.021 1.021 0 0 1-.757-1.042c.098-1.826-1.719-3.147-3.425-2.489A1.021 1.021 0 0 1 13.765 3.4M10.79 4.216a1.021 1.021 0 0 1 1.715 0A2.521 2.521 0 0 0 15.529 5.2a1.021 1.021 0 0 1 1.387 1.008 2.521 2.521 0 0 0 1.869 2.572 1.021 1.021 0 0 1 .53 1.631 2.521 2.521 0 0 0 0 3.18 1.021 1.021 0 0 1-.53 1.63 2.521 2.521 0 0 0-1.869 2.573 1.021 1.021 0 0 1-1.387 1.008 2.521 2.521 0 0 0-3.024.983 1.021 1.021 0 0 1-1.715 0A2.521 2.521 0 0 0 7.766 18.8a1.021 1.021 0 0 1-1.387-1.008 2.521 2.521 0 0 0-1.87-2.572 1.021 1.021 0 0 1-.53-1.631 2.521 2.521 0 0 0 0-3.18 1.021 1.021 0 0 1 .53-1.63 2.521 2.521 0 0 0 1.87-2.573 1.021 1.021 0 0 1 1.387-1.008 2.521 2.521 0 0 0 3.024-.983'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='flex w-full items-center justify-between text-left'>
            <div className='flex flex-col'>
              <div className='font-bold text-base'>Verified Refurbished</div>
              <div className='caption'></div>
            </div>
            <div className='ml-2 flex h-10 w-10 items-center'>
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
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductFeatures;
