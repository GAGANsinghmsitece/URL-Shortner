import React, { lazy, Suspense } from 'react';

const LazyListHistoryComponent = lazy(() => import('./ListHistoryComponent'));

const ListHistoryComponent = props => (
  <Suspense fallback={null}>
    <LazyListHistoryComponent {...props} />
  </Suspense>
);

export default ListHistoryComponent;
