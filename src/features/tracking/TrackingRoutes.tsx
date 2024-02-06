import { Navigate, Route } from 'react-router-dom';

import { CoreLayout } from '@/layouts/core-layout/CoreLayout';
import { trackingRoutes } from '@/routes/RouteConstants';

export const TrackingRoutes = () => {
  return (
    <CoreLayout>
      <Route>
        <Route path={'/'} element={<div> TRACKING </div>} />
        <Route path={'*'} element={<Navigate to={'/' + trackingRoutes.base} />} />
      </Route>
    </CoreLayout>
  );
};
