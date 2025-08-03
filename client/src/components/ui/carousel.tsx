'use client';

import * as React from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EmblaCarouselType } from 'embla-carousel';

import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';

// Types
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

type UseAutoplayProgressType = {
  showAutoplayProgress: boolean;
  progressPercentage: number;
};

// Context
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

// Hooks
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    // Initial setup
    onInit(emblaApi);
    onSelect(emblaApi);

    // Add event listeners
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    // ✅ PROPER CLEANUP - Remove ALL event listeners
    return () => {
      emblaApi?.off('reInit', onInit);
      emblaApi?.off('reInit', onSelect);
      emblaApi?.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined,
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = React.useState(false);

  const onAutoplayButtonClick = React.useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi],
  );

  const toggleAutoplay = React.useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  React.useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // Event handlers
    const handleAutoplayPlay = () => setAutoplayIsPlaying(true);
    const handleAutoplayStop = () => setAutoplayIsPlaying(false);
    const handleReInit = () => setAutoplayIsPlaying(autoplay.isPlaying());

    // Initial state
    setAutoplayIsPlaying(autoplay.isPlaying());

    // Add event listeners
    emblaApi
      .on('autoplay:play', handleAutoplayPlay)
      .on('autoplay:stop', handleAutoplayStop)
      .on('reInit', handleReInit);

    // ✅ PROPER CLEANUP
    return () => {
      emblaApi
        ?.off('autoplay:play', handleAutoplayPlay)
        ?.off('autoplay:stop', handleAutoplayStop)
        ?.off('reInit', handleReInit);
    };
  }, [emblaApi]);

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
};

const useAutoplayProgress = (
  emblaApi: EmblaCarouselType | undefined,
): UseAutoplayProgressType => {
  const [showAutoplayProgress, setShowAutoplayProgress] = React.useState(false);
  const [progressPercentage, setProgressPercentage] = React.useState(0);
  const intervalRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const durationRef = React.useRef<number>(0);

  const startProgress = React.useCallback((timeUntilNext: number | null) => {
    if (timeUntilNext === null) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setShowAutoplayProgress(true);
    setProgressPercentage(0);
    startTimeRef.current = Date.now();
    durationRef.current = timeUntilNext;

    // Update progress every 50ms for smooth animation
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / durationRef.current) * 100, 100);

      setProgressPercentage(progress);

      // Stop when we reach 100%
      if (progress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 50);
  }, []);

  const stopProgress = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowAutoplayProgress(false);
    setProgressPercentage(0);
  }, []);

  React.useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // Event handlers
    const onTimerSet = () => {
      const timeUntilNext = autoplay.timeUntilNext();
      if (timeUntilNext) {
        startProgress(timeUntilNext);
      }
    };

    const onTimerStopped = () => {
      stopProgress();
    };

    // Add event listeners
    emblaApi
      .on('autoplay:timerset', onTimerSet)
      .on('autoplay:timerstopped', onTimerStopped)
      .on('autoplay:stop', onTimerStopped);

    // Start progress if autoplay is already running
    if (autoplay.isPlaying()) {
      const timeUntilNext = autoplay.timeUntilNext();
      if (timeUntilNext) {
        startProgress(timeUntilNext);
      }
    }

    // ✅ PROPER CLEANUP - Remove ALL event listeners and clear intervals
    return () => {
      emblaApi
        ?.off('autoplay:timerset', onTimerSet)
        ?.off('autoplay:timerstopped', onTimerStopped)
        ?.off('autoplay:stop', onTimerStopped);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [emblaApi, startProgress, stopProgress]);

  // ✅ Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return {
    showAutoplayProgress,
    progressPercentage,
  };
};

// ✅ SHARED CAROUSEL LOGIC - Eliminates code duplication
const useCarouselLogic = (
  opts?: CarouselOptions,
  plugins?: CarouselPlugin,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  setApi?: (api: CarouselApi) => void,
) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  // Set API reference
  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  // ✅ PROPER EVENT HANDLING - No memory leaks, no duplicates
  React.useEffect(() => {
    if (!api) return;

    // Event handlers
    const handleReInit = () => onSelect(api);
    const handleSelect = () => onSelect(api);

    // Initial setup
    onSelect(api);

    // Add event listeners
    api.on('reInit', handleReInit);
    api.on('select', handleSelect);

    // ✅ PROPER CLEANUP - Remove ALL event listeners
    return () => {
      api?.off('reInit', handleReInit);
      api?.off('select', handleSelect);
    };
  }, [api, onSelect]);

  return {
    carouselRef,
    api,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    handleKeyDown,
  };
};

// Main Components - ✅ NO CODE DUPLICATION
function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const carouselLogic = useCarouselLogic(opts, plugins, orientation, setApi);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef: carouselLogic.carouselRef,
        api: carouselLogic.api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev: carouselLogic.scrollPrev,
        scrollNext: carouselLogic.scrollNext,
        canScrollPrev: carouselLogic.canScrollPrev,
        canScrollNext: carouselLogic.canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={carouselLogic.handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselWithAutoplay({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins = [Fade(), Autoplay({ delay: 5000, stopOnInteraction: true })],
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const carouselLogic = useCarouselLogic(opts, plugins, orientation, setApi);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef: carouselLogic.carouselRef,
        api: carouselLogic.api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev: carouselLogic.scrollPrev,
        scrollNext: carouselLogic.scrollNext,
        canScrollPrev: carouselLogic.canScrollPrev,
        canScrollNext: carouselLogic.canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={carouselLogic.handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

// Sub-components
function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <div
      ref={carouselRef}
      className='overflow-hidden'
      data-slot='carousel-content'
    >
      <div
        className={cn(
          'flex',
          !canScrollPrev && !canScrollNext ? 'justify-center items-center' : '',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel();

  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
}

// Navigation Components
function CarouselPrevious({
  className,
  variant = 'default',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot='carousel-previous'
      variant={variant}
      size={size}
      disabled={!canScrollPrev}
      hidden={!canScrollPrev && !canScrollNext}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = 'default',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot='carousel-next'
      variant={variant}
      size={size}
      disabled={!canScrollNext}
      hidden={!canScrollNext && !canScrollPrev}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
}

function CarouselNavigation({ className }: React.ComponentProps<'div'>) {
  return (
    <div
      className={`hidden md:flex container mt-4 items-center justify-between ${className}`}
    >
      <CarouselDots />
      <div className='flex items-center gap-3'>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </div>
  );
}

// Utility Components
const DotButton: React.FC<React.ComponentPropsWithRef<'button'>> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type='button' {...restProps}>
      {children}
    </button>
  );
};

function CarouselDots({ className }: React.ComponentProps<'div'>) {
  const { api } = useCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  if (scrollSnaps.length <= 1) {
    return null; // No dots needed if there's only one item
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-2 mt-4', className)}
    >
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-200 !border !border-primary',
            index === selectedIndex
              ? 'bg-primary'
              : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500',
          )}
        />
      ))}
    </div>
  );
}

function CarouselDotsWithProgress({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { api } = useCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);
  const { showAutoplayProgress, progressPercentage } = useAutoplayProgress(api);
  const { canScrollNext } = useCarousel();

  // Show progress only if autoplay is enabled and there are more than one item
  if (!showAutoplayProgress || scrollSnaps.length <= 1 || !canScrollNext) {
    return null;
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-2 mt-4', className)}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <div key={index} className='relative flex items-center'>
          {/* Show progress bar only for selected dot */}
          {index === selectedIndex ? (
            <DotButton
              onClick={() => onDotButtonClick(index)}
              className='w-8 h-2 rounded-full transition-all duration-200 !border !border-primary relative overflow-hidden'
            >
              {/* Progress bar - shows only for selected dot */}
              {showAutoplayProgress && (
                <div
                  className='absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-100 ease-linear'
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              )}
            </DotButton>
          ) : (
            /* Regular dots for non-selected items */
            <DotButton
              onClick={() => onDotButtonClick(index)}
              className='w-2 h-2 rounded-full transition-all duration-200 !border !border-primary bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500'
            />
          )}
        </div>
      ))}
    </div>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselWithAutoplay,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselNavigation,
  CarouselDots,
  CarouselDotsWithProgress,
  DotButton,
  useDotButton,
  useAutoplay,
  useAutoplayProgress,
  Autoplay,
};
