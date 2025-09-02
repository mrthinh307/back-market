'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbnails,
  type CarouselApi,
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [fade] = useState(() => Fade());

  const handleThumbnailClick = useCallback(
    (index: number) => {
      setSelectedImageIndex(index);
      api?.scrollTo(index);
    },
    [api],
  );

  const handleCarouselSelect = useCallback(() => {
    if (!api) return;
    setSelectedImageIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on('select', handleCarouselSelect);

    return () => {
      api.off('select', handleCarouselSelect);
    };
  }, [api, handleCarouselSelect]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[fade]}
      className={className}
    >
      {/* Main Carousel Content */}
      <CarouselContent className='ml-0 cursor-pointer'>
        {galleryImages.map((image: string, index: number) => (
          <CarouselItem
            key={index}
            className={`pl-0 ${carouselItemClassName || ''}`}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              className='rounded-lg block !h-[66.7vw] max-h-full max-w-full w-auto leading-none md:!h-auto md:w-full lg:w-[29.125rem] object-cover'
              width={0}
              height={0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Thumbnail Navigation */}
      <div className='flex items-center justify-center pt-3'>
        <CarouselPrevious className='size-8 mx-2 my-1' />
        <CarouselThumbnails
          images={galleryImages}
          selectedIndex={selectedImageIndex}
          onThumbnailClick={handleThumbnailClick}
          className={`mt-4 ${navigationClassName || ''}`}
        />
        <CarouselNext className='size-8 mx-2 my-1' />
      </div>
    </Carousel>
  );
}

export default GalleryCarousel;
