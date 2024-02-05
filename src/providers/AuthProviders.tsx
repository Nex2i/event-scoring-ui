import { FC, useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { isUserModelLocal, useAuth } from '@/hooks/authentication/useAuth.hook';
import { ApiContext } from '@/apis/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';

interface AuthCheckProviderProps {}

export const AuthCheckProvider: FC<AuthCheckProviderProps> = ({}) => {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isUserModelLocal(user)) {
      apis.authentication
        .getLoggedInUser()
        .then((res) => {
          dispatch(
            setAuthentication({
              id: res.id,
              authId: res.authId,
              token: res.token,
              picture: res.picture,
              email: res.email,
              userName: res.userName,
              projects: res.projects,
            })
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <LoadingComponent loadingText="Authenticating User" />;

  if (!isAuthenticated) {
    // LOGOUT REQUEST
    return <Navigate to={'/auth'} />;
  }

  return <Outlet />;
};
