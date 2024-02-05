import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import { HttpStatusCodes } from '@/libs/http/http.config';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';

export enum loginActions {
  login = 'login',
  logout = 'logout',
  register = 'register',
}

export function useLogin(
  subId: string | undefined,
  setIsFetching: (fetching: boolean) => void
): loginActions | undefined {
  const [action, setAction] = useState<loginActions>();
  const apis = useContext(ApiContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (!subId) return;

    setIsFetching(true);

    subId &&
      apis.authentication
        .login(subId)
        .then((res) => {
          if (!isMounted) return;

          setAction(loginActions.login);
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
  }, [subId]);

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

  return action;
}
