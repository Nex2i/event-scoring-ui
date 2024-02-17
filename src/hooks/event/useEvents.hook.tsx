import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../authentication/useAuth.hook';
import { ApiContext } from '@/apis/api.context';
import { EventModel } from '@/types/models/event/event.model';

interface hookResponse {
  isFetching: boolean;
  events: EventModel[] | undefined;
}

export const useEventsHook = (): hookResponse => {
  const [isFetching, setIsFetching] = useState(false);
  const [events, setEvents] = useState<EventModel[]>();
  const apis = useContext(ApiContext);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    setIsFetching(true);

    apis.event
      .getEventsByCompanyId(user.companyId)
      .then((res) => {
        if (res.events.length) {
          setEvents(res.events);
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
  }, []);
  return {
    events,
    isFetching,
  };
};
