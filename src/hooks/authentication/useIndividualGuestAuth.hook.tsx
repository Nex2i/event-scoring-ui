import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import {
  authenticationSelector,
  setGuestAuthentication,
} from '@/stores/slices/Authentication.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import localStorageRepository from '@/utils/localStorage.repository';

interface hookResponse {
  isFetching: boolean;
  userId: string;
}

export const useIndividualGuestAuth = (eventId: string): hookResponse => {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { userId } = authenticationSelector();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!eventId) return;

    setIsFetching(true);

    const cachedGuestUser = localStorageRepository.getGuestPayload();
    if (cachedGuestUser) {
      dispatch(setGuestAuthentication(cachedGuestUser));
      setIsFetching(false);
      return;
    }

    apis.authentication
      .createGuestUser(eventId)
      .then((res) => {
        const { user } = res;
        dispatch(
          setGuestAuthentication({
            userId: user.userId,
            companyId: user.companyId,
            token: user.token,
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

  return { isFetching, userId };
};
