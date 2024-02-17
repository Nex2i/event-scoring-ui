import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { TrackingRoutes } from '@/features/tracking/TrackingRoutes';
import { PublicMenuRoutes } from '@/features/publicMenu/PublicMenuRoutes';
import { authRoutes, publicEventRoutes, publicMenuRoutes, trackingRoutes } from './RouteConstants';
import { Redirect } from './redirect';
import { PublicEventRoutes } from '@/features/public_event/PublicEventRoutes';

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
    path: `/${publicEventRoutes.base}/*`,
    element: <PublicEventRoutes />,
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
