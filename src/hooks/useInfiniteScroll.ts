import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 1.0, rootMargin = '100px' } = options;
  const [isFetching, setIsFetching] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const observer = useCallback(
    (node: HTMLElement | null) => {
      if (node) setElement(node);
    },
    []
  );

  useEffect(() => {
    if (!element || isFetching) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
          callback();
        }
      },
      { threshold, rootMargin }
    );

    intersectionObserver.observe(element);

    return () => {
      if (element) {
        intersectionObserver.unobserve(element);
      }
    };
  }, [element, callback, isFetching, threshold, rootMargin]);

  const resetFetching = useCallback(() => {
    setIsFetching(false);
  }, []);

  return { observer, isFetching, resetFetching };
}