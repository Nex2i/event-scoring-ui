import { Navigate, Route } from 'react-router-dom';

import { trackingRoutes } from '@/routes/RouteConstants';
import { PublicLayout } from '@/layouts/public-layout/PublicLayout';
import { TrackingHomePage } from './pages/TrackingHome.page';

export const TrackingRoutes = () => {
  return (
    <PublicLayout>
      <Route>
        <Route path={'/'} element={<TrackingHomePage />} />
        <Route path={'*'} element={<Navigate to={'/' + trackingRoutes.base} />} />
      </Route>
    </PublicLayout>
  );
};
