import { Navigate, Route } from 'react-router-dom';

import { trackingRoutes } from '@/routes/RouteConstants';
import { PublicLayout } from '@/layouts/public-layout/PublicLayout';

export const PublicMenuRoutes = () => {
  return (
    <PublicLayout>
      <Route>
        <Route path={'/'} element={<div> PublicMenu </div>} />
        <Route path={'*'} element={<Navigate to={'/' + trackingRoutes.base} />} />
      </Route>
    </PublicLayout>
  );
};
