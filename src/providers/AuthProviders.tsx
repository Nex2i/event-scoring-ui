import { useAuth0 } from '@auth0/auth0-react';
import { FC, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useLogin } from '@/hooks/authentication/useLogin.hook';
import { useLogout } from '@/hooks/authentication/useLogout.hook';

interface AuthCheckProviderProps {}

export const AuthCheckProvider: FC<AuthCheckProviderProps> = ({}) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const [authId, setAuthId] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [logoutSession, setLogoutSession] = useState<boolean>(false);

  useLogin(authId, setIsFetching);
  useLogout(logoutSession, setIsFetching);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user) {
      setLogoutSession(false);
      setAuthId(user.sub);
    }

    if (!isAuthenticated) {
      setLogoutSession(true);
    }
  }, [isAuthenticated, isLoading, user]);

  if (isLoading || isFetching) return <LoadingComponent loadingText="Authenticating User" />;

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/auth'} />
  );
};
