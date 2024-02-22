import { createContext } from 'react';
import { PokemonApi } from './pokemon.api';
import { AuthenticationApi } from './authentication/authentication.api';
import { EventApi } from './event/event.api';
import { CourseApi } from './course/course.api';
import { TargetApi } from './target/target.api';
import { UserRecordApi } from './userRecord/userRecord.api';
import { LeaderboardApi } from './leaderboard/leaderboard.api';
import { BillingApi } from './billing/billing.api';

interface Apis {
  pokemon: PokemonApi;
  billingApi: BillingApi;
  authentication: AuthenticationApi;
  event: EventApi;
  userRecordApi: UserRecordApi;
  leaderboardApi: LeaderboardApi;
  course: CourseApi;
  target: TargetApi;
  apiUrl: string;
}

const { VITE_ENV } = import.meta.env;

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  billingApi: new BillingApi(),
  leaderboardApi: new LeaderboardApi(),
  authentication: new AuthenticationApi(),
  userRecordApi: new UserRecordApi(),
  event: new EventApi(),
  course: new CourseApi(),
  target: new TargetApi(),
  apiUrl: import.meta.env[`VITE_API_BASE_URL_${VITE_ENV}`],
};

export const ApiContext = createContext<Apis>(initializedApis);
