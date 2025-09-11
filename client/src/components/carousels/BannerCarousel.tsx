import React, { useEffect, useState, useMemo } from 'react';
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
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // ✅ Memoize plugins để tránh reinitialize
  const plugins = useMemo(
    () => [
      Fade(),
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
      }),
    ],
    [],
  );

  const bannerImages = isMobile ? mobileBannerImages : desktopBannerImages;

  // ✅ Initialize loading state for all images
  useEffect(() => {
    setImagesLoaded(new Array(bannerImages.length).fill(false));
  }, [bannerImages.length]);

  // ✅ Handle image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // ✅ Follow interaction
  useEffect(() => {
    const autoplayPlugin = plugins.find(
      (plugin) => plugin.name === 'autoplay',
    ) as any;
    if (!autoplayPlugin) return;

    const interval = setInterval(() => {
      if (!hasInteracted && !autoplayPlugin.isPlaying()) {
        setHasInteracted(true);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [plugins, hasInteracted]);

  return (
    <CarouselWithAutoplay
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={plugins}
      className={`w-full ${className}`}
    >
      <CarouselContent className='ml-0'>
        {bannerImages.map((image: string, index: number) => (
          <CarouselItem key={index} className={`pl-0 ${carouselItemClassName}`}>
            <div className="relative h-full">
              {/* Skeleton loader */}
              {!imagesLoaded[index] && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-none xl:rounded-lg" />
              )}
              
              {/* Actual image */}
              <Image
                src={image}
                alt={`Banner carousel ${index + 1}`}
                className={`size-full object-cover transition-opacity duration-300 ${
                  imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                width={0}
                height={0}
                sizes='100vw'
                onLoad={() => handleImageLoad(index)}
                priority={index === 0} // Prioritize first image
              />
            </div>
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
