import { createContext } from 'react';
import { PokemonApi } from './pokemon.api';
import { AuthenticationApi } from './authentication/authentication.api';
import { LogApi } from './log/log.api';
import { EventApi } from './event/event.api';
import { CourseApi } from './course/course.api';

interface Apis {
  pokemon: PokemonApi;
  authentication: AuthenticationApi;
  event: EventApi;
  course: CourseApi;
  logs: LogApi;
  apiUrl: string;
}

const { VITE_ENV } = import.meta.env;

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  authentication: new AuthenticationApi(),
  logs: new LogApi(),
  event: new EventApi(),
  course: new CourseApi(),
  apiUrl: import.meta.env[`VITE_API_BASE_URL_${VITE_ENV}`],
};

export const ApiContext = createContext<Apis>(initializedApis);
