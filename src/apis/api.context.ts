import { createContext } from 'react';
import { PokemonApi } from './pokemon.api';
import { AuthenticationApi } from './authentication/authentication.api';
import { LogApi } from './log/log.api';

interface Apis {
  pokemon: PokemonApi;
  authentication: AuthenticationApi;
  logs: LogApi;
}

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  authentication: new AuthenticationApi(),
  logs: new LogApi(),
};

export const ApiContext = createContext<Apis>(initializedApis);
