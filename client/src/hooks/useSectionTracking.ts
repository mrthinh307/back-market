import { useEffect, useRef, useCallback } from 'react';

interface UseSectionTrackingOptions {
  sectionCount: number;
  trackingEnabled?: boolean;
  onProgressChange?: (
    currentSection: number,
    totalSections: number,
    progressPercentage: number,
  ) => void;
}

export const useSectionTracking = (options: UseSectionTrackingOptions) => {
  const { sectionCount, trackingEnabled = true, onProgressChange } = options;
  const sectionsRef = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef({
    currentSection: 0,
    totalSections: 0,
    progressPercentage: 0,
  });

  const registerSection = useCallback(
    (element: HTMLElement | null, index: number) => {
      if (element) {
        sectionsRef.current[index] = element;
      }
    },
    [],
  );

  const calculateCurrentSection = useCallback((mouseY?: number) => {
    if (!containerRef.current || sectionsRef.current.length === 0) return 0;

    const containerRect = containerRef.current.getBoundingClientRect();

    const targetY = mouseY !== undefined ? mouseY : window.innerHeight / 2;

    if (targetY < containerRect.top) return 0;

    if (targetY > containerRect.bottom) return sectionsRef.current.length;

    let currentSection = 0;

    for (let i = 0; i < sectionsRef.current.length; i++) {
      const section = sectionsRef.current[i];
      if (section) {
        const sectionRect = section.getBoundingClientRect();

        if (targetY >= sectionRect.top && targetY <= sectionRect.bottom) {
          currentSection = i + 1; 
          break;
        } else if (targetY > sectionRect.bottom) {
          currentSection = i + 1; 
        }
      }
    }

    return currentSection;
  }, []);

  // Handle mouse move event
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!trackingEnabled || !onProgressChange) return;

      const currentSection = calculateCurrentSection(event.clientY);
      const progressPercentage =
        sectionCount > 0 ? (currentSection / sectionCount) * 100 : 0;

      // Only call callback if progress changed
      const lastProgress = lastProgressRef.current;
      if (
        lastProgress.currentSection !== currentSection ||
        lastProgress.totalSections !== sectionCount ||
        Math.abs(lastProgress.progressPercentage - progressPercentage) > 0.1
      ) {
        lastProgressRef.current = {
          currentSection,
          totalSections: sectionCount,
          progressPercentage,
        };
        onProgressChange(currentSection, sectionCount, progressPercentage);
      }
    },
    [trackingEnabled, calculateCurrentSection, sectionCount, onProgressChange],
  );

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (!trackingEnabled || !onProgressChange) return;

    const currentSection = calculateCurrentSection();
    const progressPercentage =
      sectionCount > 0 ? (currentSection / sectionCount) * 100 : 0;

    // Only call callback if progress changed
    const lastProgress = lastProgressRef.current;
    if (
      lastProgress.currentSection !== currentSection ||
      lastProgress.totalSections !== sectionCount ||
      Math.abs(lastProgress.progressPercentage - progressPercentage) > 0.1
    ) {
      lastProgressRef.current = {
        currentSection,
        totalSections: sectionCount,
        progressPercentage,
      };
      onProgressChange(currentSection, sectionCount, progressPercentage);
    }
  }, [
    trackingEnabled,
    calculateCurrentSection,
    sectionCount,
    onProgressChange,
  ]);

  // Setup tracking
  useEffect(() => {
    if (!trackingEnabled) return;

    // Add mouse move and scroll listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackingEnabled, handleMouseMove, handleScroll]);

  // Reset when component unmounts
  useEffect(() => {
    return () => {
      // Only reset if callback exists and we have been tracking
      if (onProgressChange && sectionCount > 0) {
        onProgressChange(0, 0, 0);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return {
    containerRef,
    registerSection,
  };
};
