import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import { HttpStatusCodes } from '@/libs/http/http.config';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';

export enum loginActions {
  login = 'login',
  logout = 'logout',
  register = 'register',
}

type hookResponse = { loginAction: loginActions | undefined; isAuthorizing: boolean; isAuthorized: boolean };

export function useLogin(email: string, password: string): hookResponse {
  const [action, setAction] = useState<loginActions>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const apis = useContext(ApiContext);

  const dispatch = useAppDispatch();

  function loginDataIsValid(): boolean {
    return email && password ? true : false;
  }

  useEffect(() => {
    let isMounted = true;

    if (!loginDataIsValid()) return;

    setIsFetching(true);

    apis.authentication
      .login(email, password)
      .then((res) => {
        if (!isMounted) return;

        const { user } = res;

        setAction(loginActions.login);
        setIsAuthorized(true);

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

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'User Session Fetched',
            severity: 'success',
          })
        );
      })
      .catch(async (err) => {
        if (!isMounted) return;

        switch (err.code) {
          case HttpStatusCodes.NotFound:
            await handleUserNotFound();
            break;
          default:
            dispatch(
              setSnackbarProps({
                open: true,
                message: 'User Could Not Be Logged In',
                severity: 'error',
              })
            );
            break;
        }
      })
      .finally(() => {
        if (!isMounted) return;

        setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [email, password]);

  async function handleUserNotFound() {
    dispatch(
      setSnackbarProps({
        open: true,
        message: 'User Not Found',
        severity: 'error',
      })
    );
    setAction(loginActions.register);
  }

  return {
    loginAction: action,
    isAuthorizing: isFetching,
    isAuthorized: isAuthorized,
  };
}
