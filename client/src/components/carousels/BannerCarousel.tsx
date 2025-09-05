'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  CarouselWithAutoplay,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDotsWithProgress,
  CarouselDots,
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

function BannerCarousel({
  desktopBannerImages,
  mobileBannerImages,
  className,
  carouselItemClassName,
  navigationClassName,
}: {
  desktopBannerImages: string[];
  mobileBannerImages: string[];
  className?: string;
  carouselItemClassName?: string;
  navigationClassName?: string;
}) {
  const isMobile = useIsMobile();

  // ✅ Autoplay instance
  const [hasInteracted, setHasInteracted] = useState(false);
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
    }),
  );

  // ✅ Fade instance - memoized to prevent reinitializing Embla
  const [fade] = useState(() => Fade());

  // ✅ Follow interaction
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasInteracted && !autoplay.isPlaying()) {
        setHasInteracted(true);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [autoplay, hasInteracted]);

  const bannerImages = isMobile ? mobileBannerImages : desktopBannerImages;

  return (
    <CarouselWithAutoplay
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[fade, autoplay]}
      className={`w-full ${className}`}
    >
      <CarouselContent className='ml-0'>
        {bannerImages.map((image: string, index: number) => (
          <CarouselItem key={index} className={`pl-0 ${carouselItemClassName}`}>
            <Image
              src={image}
              alt={`Banner carousel ${index + 1}`}
              className='size-full object-cover'
              width={0}
              height={0}
              sizes='100vw'
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Desktop navigation */}
      <div
        className={`hidden md:flex container mt-4 items-center justify-between ${navigationClassName}`}
      >
        <div className='relative flex w-full min-h-[24px]'>
          {/* Dots with progress */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex ${
              hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <CarouselDotsWithProgress />
          </div>

          {/* Static dots */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex ${
              hasInteracted ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <CarouselDots />
          </div>
        </div>

        <div className='flex gap-3'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      {/* Mobile */}
      <div className='md:hidden relative flex justify-center mt-4 min-h-[24px]'>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex justify-center ${
            hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <CarouselDotsWithProgress />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex justify-center ${
            hasInteracted ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <CarouselDots />
        </div>
      </div>
    </CarouselWithAutoplay>
  );
}

export default BannerCarousel;
