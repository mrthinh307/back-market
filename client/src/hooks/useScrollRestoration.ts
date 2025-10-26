import { useEffect } from 'react';

const SCROLL_POSITION_KEY = 'product_variant_scroll_position';

/**
 * Custom hook to handle scroll position restoration when navigating between variant pages
 * 
 * @param isLoading - Loading state to wait for before restoring scroll
 * @param isReady - Additional ready state (e.g., data loaded)
 */
export const useScrollRestoration = (isLoading: boolean, isReady: boolean) => {
  useEffect(() => {
    // Check if there's a saved scroll position
    const savedScrollPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    
    if (savedScrollPosition && !isLoading && isReady) {
      const scrollY = Number.parseInt(savedScrollPosition, 10);
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollY,
          behavior: 'instant', // Use 'instant' for immediate scroll without animation
        });
        
        // Clear the saved position after restoring
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
      });
    }
  }, [isLoading, isReady]);
};

/**
 * Save current scroll position to sessionStorage before navigation
 */
export const saveScrollPosition = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  sessionStorage.setItem(SCROLL_POSITION_KEY, scrollY.toString());
};

/**
 * Clear saved scroll position from sessionStorage
 */
export const clearScrollPosition = () => {
  sessionStorage.removeItem(SCROLL_POSITION_KEY);
};
