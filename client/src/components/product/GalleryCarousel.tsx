'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from '@/components/ui/carousel';
import Fade from 'embla-carousel-fade';

function GalleryCarousel({
  galleryImages,
  className,
  carouselItemClassName,
  navigationClassName,
}: {
  galleryImages: string[];
  className?: string;
  carouselItemClassName?: string;
  navigationClassName?: string;
}) {
  // ✅ Fade instance - memoized to prevent reinitializing Embla
  const [fade] = useState(() => Fade());

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[fade]}
      className={`${className}`}
    >
      <CarouselContent className='ml-0 cursor-pointer'>
        {galleryImages.map((image: string, index: number) => (
          <CarouselItem key={index} className={`pl-0 ${carouselItemClassName}`}>
            <Image
              src={image}
              alt={`Banner carousel ${index + 1}`}
              className='rounded-lg block !h-[66.7vw] max-h-full max-w-full w-auto leading-none md:!h-auto md:w-full lg:w-[29.125rem] object-cover'
              width={0}
              height={0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Carousel navigation */}
      <div
        className={`flex mt-4 items-center justify-center ${navigationClassName}`}
      >
        <CarouselPrevious className='size-8 mx-2 my-1' />
        <ul className='flex list-none gap-2 overflow-hidden py-1 px-0.5 justify-center'>
          <li className='flex'>
            <button className='flex rounded-sm'>
              <div className='appearance-none overflow-hidden no-underline transition-colors -inset-y-1 left-0 rounded-sm flex size-10 justify-center border border-solid border-dark dark:border-muted-foreground'>
                <Image
                  src={galleryImages[0] || ''}
                  alt={`Thumbnail ${1}`}
                  className='h-[40px] w-auto max-h-full max-w-full leading-none object-cover'
                  width={0}
                  height={0}
                />
              </div>
            </button>
          </li>
        </ul>
        <CarouselNext className='size-8 mx-2 my-1' />
      </div>
    </Carousel>
  );
}

export default GalleryCarousel;
