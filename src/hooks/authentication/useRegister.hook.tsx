import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import { HttpStatusCodes } from '@/libs/http/http.config';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { RegisterUserPayload } from '@/apis/authentication/RegisterUserPayload';

export enum registerActions {
  login = 'login',
  alreadyExists = 'alreadyExists',
}

type hookResponse = [registerActions | undefined, boolean, boolean];

export function useRegister(userPayload: RegisterUserPayload): hookResponse {
  const [action, setAction] = useState<registerActions>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const apis = useContext(ApiContext);

  const dispatch = useAppDispatch();

  function registerDataIsValid(): boolean {
    return true;
  }

  useEffect(() => {
    let isMounted = true;

    if (!registerDataIsValid()) return;

    setIsFetching(true);

    apis.authentication
      .registerNewUser(userPayload)
      .then((res) => {
        if (!isMounted) return;

        setAction(registerActions.login);
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
          case HttpStatusCodes.Conflict:
            await handleUserAlreadyExists();
            break;
          default:
            dispatch(
              setSnackbarProps({
                open: true,
                message: 'New User Could Not Be Registered',
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
  }, [userPayload]);

  async function handleUserAlreadyExists() {
    dispatch(
      setSnackbarProps({
        open: true,
        message: 'User Already Exists',
        severity: 'error',
      })
    );
    setAction(registerActions.alreadyExists);
  }

  return [action, isFetching, isAuthorized];
}
