import React, { lazy, Suspense } from 'react';

const LazyUserForm = lazy(() => import('./UserForm'));

const UserForm = props => (
  <Suspense fallback={null}>
    <LazyUserForm {...props} />
  </Suspense>
);

export default UserForm;
