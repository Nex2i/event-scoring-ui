import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '@/apis/api.context';
import { homeRoute } from '@/routes/RouteConstants';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { UserModel } from '@/types/models/authentication/user.model';

export function useRegisterUser(submitRegistration: boolean, setIsFetching: (fetching: boolean) => void) {
  const apis = useContext(ApiContext);
  const navigate = useNavigate();
  const { user, logout } = useAuth0();

  const [userModel, setUserModel] = useState<UserModel>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isMounted = true;
    if (!submitRegistration) return;
    if (!user?.sub) return;

    setIsFetching(true);

    user &&
      apis.authentication
        .registerNewUser(user)
        .then((res) => {
          if (!isMounted) return;

          setUserModel(res);
          dispatch(
            setSnackbarProps({
              open: true,
              message: 'New User Successfuly Created',
              severity: 'success',
            })
          );
          navigate(homeRoute + '?action=new-user');
        })
        .catch((err) => {
          if (!isMounted) return;

          switch (err.message.name) {
            case 'UserAlreadyExistsException':
              handleUserExists();
              break;
            default:
              break;
          }
        })
        .finally(() => {
          if (!isMounted) return;

          setIsFetching(false);
        });
  }, [user?.sub, submitRegistration]);

  function handleUserExists() {
    dispatch(
      setSnackbarProps({
        open: true,
        message: 'Cannot Register User, This User Already Exists',
        severity: 'error',
      })
    );
    logout();
  }

  return userModel;
}
