import { useRef, useEffect, useState } from 'react';
function useScroll() {
  const [direction, setDirection] = useState<string | null>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const scrollHandler = () => {
      if (scrollRef.current < window.pageYOffset) {
        if (direction !== 'down') setDirection('down');
      } else {
        if (direction !== 'up') setDirection('up');
      }
      scrollRef.current = window.pageYOffset;
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [direction]);

  return direction;
}

export default useScroll;
