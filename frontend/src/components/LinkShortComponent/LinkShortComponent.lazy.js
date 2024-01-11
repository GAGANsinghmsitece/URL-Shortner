import React, { lazy, Suspense } from 'react';

const LazyLinkShortComponent = lazy(() => import('./LinkShortComponent'));

const LinkShortComponent = props => (
  <Suspense fallback={null}>
    <LazyLinkShortComponent {...props} />
  </Suspense>
);

export default LinkShortComponent;
