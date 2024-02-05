import { createContext } from 'react';
import { PokemonApi } from './pokemon.api';
import { AuthenticationApi } from './authentication.api';

interface Apis {
  pokemon: PokemonApi;
  authentication: AuthenticationApi;
}

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  authentication: new AuthenticationApi(),
};

export const ApiContext = createContext<Apis>(initializedApis);
