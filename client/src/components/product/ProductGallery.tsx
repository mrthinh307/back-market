import React from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedImage,
  onImageSelect,
}) => {
  return (
    <div className='relative w-full max-w-full grow-0 md:w-1/3 lg:w-1/2'>
      <div className='top-[7rem] md:sticky md:right-1/2 md:mr-14'>
        <div>
          <div className='flex justify-center' data-test='carousel'>
            <div className='relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden mt-3 md:mt-8 md:grow'>
              <div className='relative flex w-full grow justify-center'>
                <ul className='w-full list-none'>
                  <li
                    id='gallery-carousel'
                    aria-hidden='false'
                    className='flex w-full list-none justify-center motion-safe:animate-fade-in'
                  >
                    <button
                      className='relative focus-visible-outline-inset-hi rounded-sm cursor-pointer'
                      type='button'
                    >
                      <Image
                        fetchPriority='high'
                        className='rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none'
                        alt='iPhone 13 128GB - Pink - Unlocked'
                        decoding='async'
                        height='976'
                        loading='eager'
                        sizes='(max-width: 768px) 100vw, 466px'
                        src={images[selectedImage]}
                        width='976'
                      />
                    </button>
                  </li>
                </ul>
                <div className='sr-only' role='status'>
                  "{selectedImage + 1} / {images.length}. "
                  <span aria-labelledby='gallery-carousel'></span>
                </div>
              </div>
              <div className='relative isolate mx-auto flex w-full justify-center h-60'>
                <div className='flex items-center px-8 py-4 absolute left-0 z-10 mt-4'>
                  <button
                    className='bg-black rounded-full flex cursor-pointer items-center justify-center size-8 hover:bg-gray-700 duration-300'
                    type='button'
                    onClick={() =>
                      onImageSelect(Math.max(0, selectedImage - 1))
                    }
                  >
                    <svg
                      className='text-white'
                      aria-hidden='false'
                      aria-label='Previous'
                      fill='currentColor'
                      height='24'
                      role='img'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='m10.957 12 3.47-3.47a.75.75 0 1 0-1.06-1.06L9.72 11.116a1.25 1.25 0 0 0 0 1.768l3.646 3.646a.75.75 0 0 0 1.06-1.06L10.958 12'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <div className='gradient-mask-lr-60 absolute inset-x-0'>
                    <ul
                      className='flex list-none flex-row gap-8 overflow-hidden py-4 justify-normal'
                      style={{ paddingLeft: 56, paddingRight: 56 }}
                    >
                      {images.map((image, index) => (
                        <li key={index}>
                          <button
                            onClick={() => onImageSelect(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden ${
                              index === selectedImage
                                ? 'ring-2 ring-blue-500'
                                : 'ring-1 ring-gray-300'
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              width={64}
                              height={64}
                              className='w-full h-full object-cover'
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='flex items-center px-8 py-4 absolute right-0 z-10 mt-4'>
                  <button
                    className='bg-black rounded-full flex cursor-pointer items-center justify-center size-8 hover:bg-gray-700 duration-300'
                    type='button'
                    onClick={() =>
                      onImageSelect(
                        Math.min(images.length - 1, selectedImage + 1),
                      )
                    }
                  >
                    <svg
                      className='text-white'
                      aria-hidden='false'
                      aria-label='Next'
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
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
