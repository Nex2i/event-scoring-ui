import { Navigate, RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';

import { AuthCheckProvider } from '@/providers/AuthProviders';
import { logRoutes, pokemonRoutes, profileRoutes } from './RouteConstants';
const { PokemonRoutes } = lazyImport(() => import('@/features/pokemon/PokemonRoutes'), 'PokemonRoutes');
const { LogRoutes } = lazyImport(() => import('@/features/log/LogRoutes'), 'LogRoutes');
const { ProfileRoutes } = lazyImport(() => import('@/features/profile/ProfileRoutes'), 'ProfileRoutes');

export const AuthenticatedRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <AuthCheckProvider />,
    children: [
      {
        path: logRoutes.base + '/*',
        element: <LogRoutes />,
      },
      {
        path: profileRoutes.base + '/*',
        element: <ProfileRoutes />,
      },
      {
        path: pokemonRoutes.base + '/*',
        element: <PokemonRoutes />,
      },
      {
        path: '*',
        element: <Navigate to={'/auth'} />,
      },
    ],
  },
];
