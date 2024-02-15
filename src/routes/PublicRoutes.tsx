import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { TrackingRoutes } from '@/features/tracking/TrackingRoutes';
import { PublicMenuRoutes } from '@/features/publicMenu/PublicMenuRoutes';
import { authRoutes, publicMenuRoutes, trackingRoutes } from './RouteConstants';
import { Redirect } from './redirect';

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
    element: <Redirect />,
  },
];
