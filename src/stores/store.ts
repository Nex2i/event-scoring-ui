import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import featureFlagReducer from './slices/FeatureFlag.slice';
import authenticationReducer from './slices/Authentication.slice';
import snackBarReducer from './slices/SnackBar.slice';
import pokemonReducer from './slices/Pokemon.slice';

const rootReducer = combineReducers({
  featureFlag: featureFlagReducer,
  authentication: authenticationReducer,
  snackBar: snackBarReducer,
  pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const store = setupStore();
export type Store = ReturnType<typeof setupStore>;
