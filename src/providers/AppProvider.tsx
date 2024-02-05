import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Provider as ReduxProvider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

import { store } from '@/stores/store';
import { ApiContext, initializedApis } from '@/apis/api.context';

const Auth0Domain = import.meta.env['VITE_AUTH0_DOMAIN'] as string;
const Auth0ClientId = import.meta.env['VITE_AUTH0_CLIENT_ID'] as string;

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div
          id="fallback-loader"
          style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <CircularProgress />
        </div>
      }
    >
      <Auth0Provider
        domain={Auth0Domain}
        clientId={Auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin + '/auth/login',
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <ApiContext.Provider value={initializedApis}>
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </ApiContext.Provider>
      </Auth0Provider>
    </React.Suspense>
  );
};
