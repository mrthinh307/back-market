import { useState, useEffect } from 'react';

export interface ScrollDirection {
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
  isHidden: boolean;
}

interface UseScrollDirectionOptions {
  threshold?: number; // Ngưỡng tối thiểu để bắt đầu ẩn header
  hideThreshold?: number; // Khoảng cách scroll tối thiểu để trigger hide/show
  mode?: 'default' | 'strict'; // default: show khi scroll up, strict: chỉ show khi về threshold
}

export const useScrollDirection = (options: UseScrollDirectionOptions = {}): ScrollDirection => {
  const { threshold = 300, hideThreshold = 30, mode = 'default' } = options;
  
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // Nếu ở đầu trang, luôn hiện header
      if (currentScrollY < threshold) {
        setIsHidden(false);
        setScrollY(currentScrollY);
        ticking = false;
        return;
      }

      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);

      if (mode === 'strict') {
        // Strict mode: Chỉ hiển thị header khi scroll về đúng threshold hoặc thấp hơn
        if (currentScrollY <= threshold) {
          setIsHidden(false);
        } else {
          // Ẩn header khi scroll xuống qua threshold
          setIsHidden(true);
        }
        
        // Cập nhật direction và lastScrollY
        if (scrollDiff >= hideThreshold) {
          setScrollDirection(direction);
          setLastScrollY(currentScrollY);
        }
      } else {
        // Default mode: Hiển thị ngay khi scroll lên
        if (direction === 'up' && currentScrollY !== lastScrollY) {
          setScrollDirection(direction);
          setLastScrollY(currentScrollY);
          setIsHidden(false);
        }
        // Chỉ ẩn khi scroll xuống đủ xa
        else if (direction === 'down' && scrollDiff >= hideThreshold && currentScrollY > threshold) {
          setScrollDirection(direction);
          setLastScrollY(currentScrollY);
          setIsHidden(true);
        }
      }

      setScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    // Set initial scroll position
    setScrollY(window.scrollY);
    setLastScrollY(window.scrollY);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastScrollY, threshold, hideThreshold, mode]);

  return {
    scrollDirection,
    scrollY,
    isHidden,
  };
};