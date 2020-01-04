import React, { ReactNode } from 'react';

import useInfiniteScroll from './useInfiniteScroll';

export default function InfiniteScroll({ children, loadMore, loading, hasMore }: {
  children: ReactNode
  loadMore: () => void
  loading: boolean
  hasMore: boolean
}) {
  const ref = useInfiniteScroll(loadMore, loading, hasMore);

  return (
    <>
      {children}
      {!loading && hasMore && <div ref={ref}>a</div>}
    </>
  );
}
