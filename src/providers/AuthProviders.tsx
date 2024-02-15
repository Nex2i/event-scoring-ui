import { FC, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { isUserModelLocal, useAuth } from '@/hooks/authentication/useAuth.hook';
import { ApiContext } from '@/apis/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { Redirect } from '@/routes/redirect';

interface AuthCheckProviderProps {}

export const AuthCheckProvider: FC<AuthCheckProviderProps> = ({}) => {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (!isUserModelLocal(user)) {
      apis.authentication
        .getLoggedInUser()
        .then((res) => {
          if (!isMounted) return;

          const { user } = res;
          dispatch(
            setAuthentication({
              userId: user.userId,
              companyId: user.companyId,
              token: user.token,
              phoneNumber: user.phoneNumber,
              email: user.email,
              userType: user.userType,
            })
          );
        })
        .finally(() => {
          if (!isMounted) return;

          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <LoadingComponent loadingText="Authenticating User" />;

  if (!isAuthenticated) {
    // LOGOUT REQUEST
    return <Redirect />;
  }

  return <Outlet />;
};
