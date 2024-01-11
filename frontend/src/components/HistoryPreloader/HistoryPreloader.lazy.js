import React, { lazy, Suspense } from 'react';

const LazyHistoryPreloader = lazy(() => import('./HistoryPreloader'));

const HistoryPreloader = props => (
  <Suspense fallback={null}>
    <LazyHistoryPreloader {...props} />
  </Suspense>
);

export default HistoryPreloader;
