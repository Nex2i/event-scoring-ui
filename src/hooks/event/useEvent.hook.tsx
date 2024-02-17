import { ApiContext } from '@/apis/api.context';
import { EventModel } from '@/types/models/event/event.model';
import { useContext, useEffect, useState } from 'react';

interface hookResponse {
  isFetching: boolean;
  event: EventModel | undefined;
}

export const useEventHook = (eventId: string): hookResponse => {
  const [isFetching, setIsFetching] = useState(false);
  const [event, setEvent] = useState<EventModel>();
  const apis = useContext(ApiContext);

  useEffect(() => {
    let isMounted = true;

    setIsFetching(true);

    apis.event
      .getEvent(eventId)
      .then((res) => {
        if (res.event) {
          setEvent(res.event);
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

  return { isFetching, event };
};
