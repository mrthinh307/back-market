import { useEffect } from 'react';

/**
 * Custom hook to lock body scroll when a modal/dialog is open
 * Prevents background content from scrolling while maintaining scroll position
 * 
 * @param isLocked - Boolean to control whether scroll should be locked
 * 
 * @example
 * ```tsx
 * function MyModal({ isOpen }) {
 *   useBodyScrollLock(isOpen);
 *   
 *   if (!isOpen) return null;
 *   return <div>Modal content</div>;
 * }
 * ```
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll and preserve position
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      
      // Unlock body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Scroll back to original position
      window.scrollTo(0, Number.parseInt(scrollY || '0') * -1);
    }

    // Cleanup on unmount - ensure body is always unlocked
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isLocked]);
}
