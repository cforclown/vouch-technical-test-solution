import Loader from '@/components/loader/Loader.style';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Welcome =  React.lazy(() => import('../pages/welcome'));
const Channels =  React.lazy(() => import('../pages/channels/index.tsx'));

function Content(): JSX.Element {
  return (
    <div id="content" className="relative w-full h-full overflow-auto">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route key="welcome" path="/" element={<Welcome />} />
          <Route key="channels" path="channels/*" element={<Channels />} />
          <Route key="*" path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Content;
