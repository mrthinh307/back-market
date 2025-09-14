import React, { memo } from 'react';
import Image from 'next/image';
import { GalleryCarousel } from '@/components/carousels';
import { productImages } from '../seed/temp-data-product';

const CheckIcon = () => (
  <svg className='h-4 w-4 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M17.03 9.53a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0L17.03 9.53' />
    <path
      fillRule='evenodd'
      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0'
      clipRule='evenodd'
    />
  </svg>
);

const StarIcon = () => (
  <svg className='h-4 w-4 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
    <path d='m10.749 5.972-2.812 6.325A.5.5 0 0 0 8.394 13h2.231L9.93 17.864c-.05.345.43.483.571.165l2.812-6.326A.5.5 0 0 0 12.856 11h-2.231l.695-4.864c.05-.345-.43-.483-.571-.164' />
  </svg>
);

const LeftSideSelectionSection = memo(
  ({
    leftImage,
    leftCarouselImages,
    showLeftImageDescriptions = false,
    showExampleImageBadge = false,
  }: {
    leftImage?: { src: string; alt: string; width: number; height: number };
    leftCarouselImages?: string[];
    showLeftImageDescriptions?: boolean;
    showExampleImageBadge?: boolean;
  }) => {
    return (
      <div className='max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16'>
        <div className='flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out'>
          {!leftCarouselImages && (
            <div className='relative mb-4 max-w-[498px] md:mb-0 md:w-full md:min-w-[337px]'>
              <div className='relative -mb-4 flex min-h-64 lg:min-h-72 flex-col flex-wrap overflow-hidden w-full pb-4'>
                <div className='relative flex w-full grow justify-center'>
                  <div className='rounded-lg relative flex w-full md:rounded-[32px]'>
                    {leftImage ? (
                      <Image
                        src={leftImage.src}
                        alt={leftImage.alt}
                        width={leftImage.width}
                        height={leftImage.height}
                        className='rounded-lg h-auto w-full md:min-w-[337px] md:max-w-[498px] md:rounded-[32px] gradient-purple dark:bg-none'
                      />
                    ) : (
                      <div className='flex items-center justify-center w-full md:min-w-[337px] md:min-h-[337px] md:max-w-[498px] md:max-h-[498px] md:rounded-[32px] gradient-purple rounded-lg'>
                        <p className='text-gray-500'>
                          Opps! Image is being refurbished.
                        </p>
                      </div>
                    )}
                    {showExampleImageBadge && (
                      <div className='content-center bg-sub-background absolute right-2 top-2 md:right-3 md:top-3 p-1 rounded'>
                        <span className='text-xs text-muted-foreground'>
                          Example image
                        </span>
                      </div>
                    )}
                    {showLeftImageDescriptions && (
                      <div className='rounded-b-lg absolute inset-x-0 bottom-0 flex flex-col p-3 md:p-4 md:flex-row md:flex-wrap md:items-center md:rounded-b-[32px] md:pb-6 md:pl-6 lg:pl-8 md:pt-8 lg:pt-12 bg-gradient-to-t from-black/80 to-transparent'>
                        <p className='text-white text-lg md:text-xl mr-3 mt-1 font-semibold'>
                          <span>Body</span>
                        </p>
                        <div className='flex grow flex-row flex-wrap'>
                          <div className='bg-background rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center'>
                            <CheckIcon />
                            <span className='ml-1 text-left font-duplet text-foreground'>
                              Light signs of use
                            </span>
                          </div>
                          <div className='bg-background rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center'>
                            <CheckIcon />
                            <span className='ml-1 text-left font-duplet text-foreground'>
                              Verified parts
                            </span>
                          </div>
                          <div className='bg-background rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center'>
                            <StarIcon />
                            <span className='ml-1 text-left font-duplet text-foreground'>
                              Battery for daily use
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {leftCarouselImages && (
            <GalleryCarousel
              galleryImages={productImages}
              carouselItemClassName='flex justify-center'
            />
          )}
        </div>
      </div>
    );
  },
);

export default LeftSideSelectionSection;
