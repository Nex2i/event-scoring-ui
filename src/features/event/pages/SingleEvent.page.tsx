import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import { useEventHook } from '@/hooks/event/useEvent.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { QrCode } from '@/components/qr/QrCode';
import { ApiContext } from '@/apis/api.context';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '@/shared/formatDate';
import * as Styled from '../event.styles';
import { AdminLeaderboard } from '../components/AdminLeaderboard';
import { EventDetails } from '../components/EventDetails';

interface SingleEventPageProps {}

export const SingleEventPage: FC<SingleEventPageProps> = ({}) => {
  const { id } = useParams() as { id: string };

  const { isFetching: isEventFetching, event } = useEventHook(id);

  if (isEventFetching) return <LoadingComponent loadingText="Fetching Event" />;
  if (!event) return <p>Error: No event found</p>;

  return (
    <Styled.ScrollableContainer maxHeight="90vh" width="90vw">
      <EventDetails event={event} />
      <AdminLeaderboard eventId={id} />
    </Styled.ScrollableContainer>
  );
};
