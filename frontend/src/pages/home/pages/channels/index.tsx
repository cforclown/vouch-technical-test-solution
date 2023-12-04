import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@/components/loader/Loader.style';

const Welcome =  lazy(() => import('../../pages/welcome'));
const Chat =  lazy(() => import('./channel-details.tsx'));

function Channels() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route key="welcome" path="/" element={<Welcome />} />
        <Route key="new" path="/new" element={<Chat />} />
        <Route key="messages" path="/:channelId" element={<Chat />} />
        <Route key="*" path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default Channels;
