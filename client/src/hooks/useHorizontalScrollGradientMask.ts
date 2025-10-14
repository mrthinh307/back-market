import React from 'react';

export type GradientMaskType = 'gradient-mask-lr-10-90' | 'gradient-mask-l-10' | 'gradient-mask-r-90' | '';

export const useHorizontalScrollGradientMask = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);
  const [gradientMaskClass, setGradientMaskClass] = React.useState<GradientMaskType>('');
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const updateScrollState = React.useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) return;
    
    const threshold = 2;
    const atStart = element.scrollLeft <= threshold;
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - threshold;
    
    setIsAtStart(atStart);
    setIsAtEnd(atEnd);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Add small delay for smoother transition
    timeoutRef.current = setTimeout(() => {
      // Determine gradient mask based on scroll position
      if (atStart && atEnd) {
        // Content fits entirely, no mask needed
        setGradientMaskClass('');
      } else if (atStart) {
        // At start, show right fade only
        setGradientMaskClass('gradient-mask-r-90');
      } else if (atEnd) {
        // At end, show left fade only
        setGradientMaskClass('gradient-mask-l-10');
      } else {
        // In middle, show both fades
        setGradientMaskClass('gradient-mask-lr-10-90');
      }
    }, 50);
  }, []);

  const handleScrollRight = React.useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) return;
    const viewport = element.clientWidth;
    const maxLeft = element.scrollWidth - viewport;
    const remainingRight = maxLeft - element.scrollLeft;
    if (remainingRight <= viewport) {
      element.scrollTo({ left: maxLeft, behavior: 'smooth' });
    } else {
      element.scrollBy({ left: viewport, behavior: 'smooth' });
    }
  }, []);

  const handleScrollLeft = React.useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) return;
    const viewport = element.clientWidth;
    if (element.scrollLeft <= viewport) {
      element.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      element.scrollBy({ left: -viewport, behavior: 'smooth' });
    }
  }, []);

  React.useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;
    
    updateScrollState();
    element.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    
    return () => {
      element.removeEventListener('scroll', updateScrollState as EventListener);
      window.removeEventListener('resize', updateScrollState);
      // Clean up timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [updateScrollState]);

  return {
    scrollContainerRef,
    isAtStart,
    isAtEnd,
    gradientMaskClass,
    handleScroll: handleScrollRight,
    handleScrollLeft,
  } as const;
};

export default useHorizontalScrollGradientMask;
