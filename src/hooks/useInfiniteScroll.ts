import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback: () => void) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { 
        threshold: 0.1, // Trigger as soon as even 10% of the trigger is visible
        rootMargin: '400px' // Start loading 400px before reaching the bottom
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback]);

  return observerTarget;
};
