import { Navigate, RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { authRoutes, noAuthHomeRoute, publicMenuRoutes, trackingRoutes } from './RouteConstants';
import { TrackingRoutes } from '@/features/tracking/TrackingRoutes';
import { PublicMenuRoutes } from '@/features/publicMenu/PublicMenuRoutes';

const { AuthenticationRoutes } = lazyImport(
  () => import('@/features/authentication/AuthenticationRoutes'),
  'AuthenticationRoutes'
);

export const PublicRoutes: RouteObject[] = [
  {
    path: `/${authRoutes.base}/*`,
    element: <AuthenticationRoutes />,
  },
  {
    path: `/${trackingRoutes.base}/*`,
    element: <TrackingRoutes />,
  },
  {
    path: `/${publicMenuRoutes.base}/*`,
    element: <PublicMenuRoutes />,
  },
  {
    path: '/*',
    element: <Navigate to={noAuthHomeRoute} />,
  },
];
