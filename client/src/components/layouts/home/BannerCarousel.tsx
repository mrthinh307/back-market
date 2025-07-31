import Image from 'next/image';
import {
  CarouselWithAutoplay,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDotsWithProgress,
} from '@/components/ui/carousel';
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

  // Choose the appropriate image set based on screen size
  const bannerImages = isMobile ? mobileBannerImages : desktopBannerImages;

  return (
    <CarouselWithAutoplay
      opts={{
        align: 'start',
        loop: true,
      }}
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

      {/* Navigation with autoplay progress dots */}
      <div
        className={`hidden md:flex container mt-4 items-center justify-between ${navigationClassName}`}
      >
        <CarouselDotsWithProgress />
        <div className='flex items-center gap-3'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      {/* Mobile navigation - dots only */}
      <div className='md:hidden flex justify-center mt-4'>
        <CarouselDotsWithProgress />
      </div>
    </CarouselWithAutoplay>
  );
}

export default BannerCarousel;
