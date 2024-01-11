import React, { lazy, Suspense } from 'react';

const LazyEmptyHistoryState = lazy(() => import('./EmptyHistoryState'));

const EmptyHistoryState = props => (
  <Suspense fallback={null}>
    <LazyEmptyHistoryState {...props} />
  </Suspense>
);

export default EmptyHistoryState;
