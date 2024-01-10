import React, { lazy, Suspense } from 'react';

const LazyShortedUrl = lazy(() => import('./ShortedUrl'));

const ShortedUrl = props => (
  <Suspense fallback={null}>
    <LazyShortedUrl {...props} />
  </Suspense>
);

export default ShortedUrl;
