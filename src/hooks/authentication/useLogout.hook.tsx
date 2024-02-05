import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '@/apis/api.context';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';

export function useLogout(logoutSession: boolean, setIsFetching: (fetching: boolean) => void) {
  const apis = useContext(ApiContext);
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (!logoutSession) return;

    setIsFetching(true);

    apis.authentication
      .logout()
      .then(async () => {
        if (!isMounted) return;

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'User Logged Out',
            severity: 'warning',
          })
        );
        await logoutUser();
        navigate('/');
      })
      .finally(() => {
        if (!isMounted) return;

        setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [logoutSession]);

  async function logoutUser() {
    await logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
