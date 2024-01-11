import React, { lazy, Suspense } from 'react';

const LazyLinkStateLoader = lazy(() => import('./LinkStateLoader'));

const LinkStateLoader = props => (
  <Suspense fallback={null}>
    <LazyLinkStateLoader {...props} />
  </Suspense>
);

export default LinkStateLoader;
