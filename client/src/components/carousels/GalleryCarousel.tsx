'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState, useMemo } from 'react';

import Fade from 'embla-carousel-fade';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbnails,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // ✅ Memoize plugin to avoid reinitialize
  const plugins = useMemo(() => [Fade()], []);

  // ✅ Initialize loading state for all images
  useEffect(() => {
    setImagesLoaded(Array.from({ length: galleryImages.length }).fill(false));
  }, [galleryImages.length]);

  // ✅ Handle image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

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

  // ✅ Early return if no images
  if (!galleryImages || galleryImages.length === 0) {
    return <div className="text-center p-4 text-lg">Images being refurbished !!</div>;
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={plugins}
      className={className}
    >
      {/* Main Carousel Content */}
      <CarouselContent className='ml-0 cursor-pointer'>
        {galleryImages.map((image: string, index: number) => (
          <CarouselItem
            key={index}
            className={`pl-0 ${carouselItemClassName || ''}`}
          >
            <div className="relative h-full">
              {/* Skeleton loader */}
              {!imagesLoaded[index] && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
              )}
              
              {/* Actual image */}
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                className={`rounded-lg block h-[66.7vw] max-h-full max-w-full w-auto leading-none md:h-auto md:w-full lg:w-[29.125rem] object-cover transition-opacity duration-500 ${
                  imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                width={0}
                height={0}
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 29.125rem'
                onLoad={() => handleImageLoad(index)}
                priority={index === 0} // Prioritize first image
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Thumbnail Navigation */}
      <div className='content-center pt-3'>
        <CarouselPrevious className='size-8 mx-2' />
        <CarouselThumbnails
          images={galleryImages}
          selectedIndex={selectedImageIndex}
          onThumbnailClick={handleThumbnailClick}
          className={`mt-4 ${navigationClassName || ''}`}
        />
        <CarouselNext className='size-8 mx-2' />
      </div>
    </Carousel>
  );
}

export default GalleryCarousel;
