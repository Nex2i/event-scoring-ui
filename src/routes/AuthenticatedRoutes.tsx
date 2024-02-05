import { Navigate, RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';

import { AuthCheckProvider } from '@/providers/AuthProviders';
import { pokemonRoutes } from './RouteConstants';
const { PokemonRoutes } = lazyImport(() => import('@/features/pokemon/PokemonRoutes'), 'PokemonRoutes');

export const AuthenticatedRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <AuthCheckProvider />,
    children: [
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
