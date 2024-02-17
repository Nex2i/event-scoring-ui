import { FC } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../event.styles';
import { useEventsHook } from '@/hooks/event/useEvents.hook';
import { eventRoutes } from '@/routes/RouteConstants';

interface EventsCubesProps {}

export const EventsCubes: FC<EventsCubesProps> = ({}) => {
  const { isFetching, events } = useEventsHook();

  const navigate = useNavigate();

  const onCubeClick = (eventId: string) => {
    navigate(`/${eventRoutes.base}/${eventId}`);
  };

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {events && events.length === 0 && <p>No events found</p>}
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <Styled.EventCube key={event.id} onClick={() => onCubeClick(event.id)}>
            <p>{event.name}</p>
            <Styled.Row>
              <p>{formatDate(event.startDate)}</p> - <p>{formatDate(event.endDate)}</p>
            </Styled.Row>
          </Styled.EventCube>
        ))}
    </>
  );
};

function formatDate(date: Date) {
  return dayjs(date).format('MMM D');
}
