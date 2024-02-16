import { RouteObject } from 'react-router-dom';

import { AuthCheckProvider } from '@/providers/AuthProviders';
import { eventRoutes } from './RouteConstants';
import { Redirect } from './redirect';
import { EventRoutes } from '@/features/event/EventRoutes';

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
