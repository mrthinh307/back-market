import React from 'react';

export const useHorizontalScroll = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const updateEdges = React.useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) return;
    const threshold = 4;
    const atStart = element.scrollLeft <= threshold;
    const atEnd =
      element.scrollLeft + element.clientWidth >=
      element.scrollWidth - threshold;
    setIsAtStart(atStart);
    setIsAtEnd(atEnd);
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
    updateEdges();
    element.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      element.removeEventListener('scroll', updateEdges as EventListener);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  return {
    scrollContainerRef,
    isAtStart,
    isAtEnd,
    handleScroll: handleScrollRight,
    handleScrollLeft,
  } as const;
};

export default useHorizontalScroll;
