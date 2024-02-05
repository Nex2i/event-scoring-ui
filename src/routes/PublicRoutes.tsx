import { Navigate, RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { authBase } from './RouteConstants';

const { AuthenticationRoutes } = lazyImport(
  () => import('@/features/authentication/AuthenticationRoutes'),
  'AuthenticationRoutes'
);

export const PublicRoutes: RouteObject[] = [
  {
    path: `/${authBase}/*`,
    element: <AuthenticationRoutes />,
  },
  {
    path: '/*',
    element: <Navigate to={`/${authBase}`} />,
  },
];
