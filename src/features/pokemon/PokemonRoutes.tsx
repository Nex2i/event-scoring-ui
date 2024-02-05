import { Navigate, Route } from 'react-router-dom';

import { CoreLayout } from '@/layouts/core-layout/CoreLayout';
import { pokemonRoutes } from '@/routes/RouteConstants';
import { Pokemon } from './components/pokemon/Pokemon.component';
import { Pokemons } from './components/pokemons/Pokemons.component';

export const PokemonRoutes = () => {
  return (
    <CoreLayout>
      <Route>
        <Route path={'/'} element={<Pokemons />} />
        <Route path={'/:id'} element={<Pokemon />} />
        <Route path={'*'} element={<Navigate to={'/' + pokemonRoutes.base} />} />
      </Route>
    </CoreLayout>
  );
};
