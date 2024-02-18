import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import localStorageRepository from '@/utils/localStorage.repository';

interface hookResponse {
  isFetching: boolean;
}

export const useGuestAuth = (eventId: string): hookResponse => {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const persistedToken = localStorageRepository.getUserToken();

  useEffect(() => {
    let isMounted = true;

    if (!eventId || persistedToken) return;

    setIsFetching(true);

    apis.authentication
      .createGuestUser(eventId)
      .then((res) => {
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
        if (isMounted) {
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  return { isFetching };
};
