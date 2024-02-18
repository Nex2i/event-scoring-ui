import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import { EventModel } from '@/types/models/event/event.model';
import { useAppDispatch } from '@/stores/store.hooks';
import { initializeEvent, publicEventSelector } from '@/stores/slices/PublicEvent.slice';

interface hookResponse {
  isFetching: boolean;
  event: EventModel | undefined;
}

export const usePublicEventHook = (eventId: string): hookResponse => {
  const [isFetching, setIsFetching] = useState(false);
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const eventSlice = publicEventSelector();

  useEffect(() => {
    let isMounted = true;

    setIsFetching(true);

    if (eventSlice.activeEvent) {
      setIsFetching(false);
      return;
    }

    apis.event
      .getEvent(eventId)
      .then((res) => {
        if (res.event) {
          dispatch(initializeEvent(res.event));
        }
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

  return { isFetching, event: eventSlice.activeEvent };
};
