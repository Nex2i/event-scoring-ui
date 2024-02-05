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

type hookResponse = [loginActions | undefined, boolean, boolean];

export function useLogin(username: string, password: string): hookResponse {
  const [action, setAction] = useState<loginActions>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const apis = useContext(ApiContext);

  const dispatch = useAppDispatch();

  function loginDataIsValid(): boolean {
    return username && password ? true : false;
  }

  useEffect(() => {
    let isMounted = true;

    if (!loginDataIsValid()) return;

    setIsFetching(true);

    apis.authentication
      .login(username, password)
      .then((res) => {
        if (!isMounted) return;

        setAction(loginActions.login);
        setIsAuthorized(true);

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
  }, [username, password]);

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

  return [action, isFetching, isAuthorized];
}
