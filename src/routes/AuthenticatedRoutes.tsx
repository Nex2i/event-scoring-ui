import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';

import { AuthCheckProvider } from '@/providers/AuthProviders';
import { eventRoutes, pokemonRoutes } from './RouteConstants';
import { Redirect } from './redirect';
const { EventRoutes } = lazyImport(() => import('@/features/event/EventRoutes'), 'EventRoutes');

export const AuthenticatedRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <AuthCheckProvider />,
    children: [
      {
        path: eventRoutes.base + '/*',
        element: <EventRoutes />,
      },
      {
        path: '*',
        element: <Redirect />,
      },
    ],
  },
];
