import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';

import { authRoutes, publicEventRoutes, publicMenuRoutes } from './RouteConstants';
import { Redirect } from './redirect';

const { AuthenticationRoutes } = lazyImport(
  () => import('@/features/authentication/AuthenticationRoutes'),
  'AuthenticationRoutes'
);

const { PublicEventRoutes } = lazyImport(
  () => import('@/features/public_event/routes/PublicEventRoutes'),
  'PublicEventRoutes'
);

const { PublicMenuRoutes } = lazyImport(
  () => import('@/features/publicMenu/PublicMenuRoutes'),
  'PublicMenuRoutes'
);

export const PublicRoutes: RouteObject[] = [
  {
    path: `/${authRoutes.base}/*`,
    element: <AuthenticationRoutes />,
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
