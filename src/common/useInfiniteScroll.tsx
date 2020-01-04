import { useRef, useEffect } from 'react';

export default function useInfiniteScroll(
  loadMore: () => void,
  isLoading: boolean,
  hasMore: boolean,
  rootMargin = '200px',
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || isLoading || !hasMore) { return; }

        loadMore();
      },
      {
        rootMargin,
      },
    );

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isLoading, loadMore, rootMargin, hasMore]);

  return ref;
}