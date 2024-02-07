import { Navigate, Route } from 'react-router-dom';

import { trackingRoutes } from '@/routes/RouteConstants';
import { PublicLayout } from '@/layouts/public-layout/PublicLayout';
import { PublicHomePage } from './pages/publicHome.page';

export const PublicMenuRoutes = () => {
  return (
    <PublicLayout>
      <Route>
        <Route path={'/'} element={<PublicHomePage />} />
        <Route path={'*'} element={<Navigate to={'/' + trackingRoutes.base} />} />
      </Route>
    </PublicLayout>
  );
};
