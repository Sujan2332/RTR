import { useEffect } from 'react';
// Custom hook for handling swipe gestures
export function useSwipe({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }) {
    useEffect(() => {
      let touchStartX = 0;
      let touchEndX = 0;
  
      const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
      };
  
      const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
      };
  
      const handleTouchEnd = () => {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < minSwipeDistance) return;
  
        if (swipeDistance > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      };
  
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
  
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }, [onSwipeLeft, onSwipeRight, minSwipeDistance]);
  }