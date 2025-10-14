import {
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

function SlideCarousel({
  carouselTitle,
  desktopSlidesToScroll = 3,
  className,
  children,
  navigationClassName,
}: {
  carouselTitle: string;
  desktopSlidesToScroll?: number;
  className?: string;
  children: React.ReactNode;
  navigationClassName?: string;
}) {
  const isMobile = useIsMobile();

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
        slidesToScroll: isMobile ? 1 : desktopSlidesToScroll,
      }}
      className={`w-full ${className}`}
    >
      <div className={`w-full pr-6 xl:pr-0 flex items-center justify-between ${navigationClassName}`}>
        <h2 className='font-semibold text-[22px] mb-1'>{carouselTitle}</h2>
        <div className='hidden md:flex items-center gap-3'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      {children}
    </Carousel>
  );
}

export default SlideCarousel;
