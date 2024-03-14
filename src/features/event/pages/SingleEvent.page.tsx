import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useEventHook } from '@/hooks/event/useEvent.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import * as Styled from '../event.styles';
import { EventDetails } from '../components/EventDetails';
import { CourseResults } from '../components/CourseResults';

interface SingleEventPageProps {}

export const SingleEventPage: FC<SingleEventPageProps> = ({}) => {
  const { id } = useParams() as { id: string };

  const { isFetching: isEventFetching, event } = useEventHook(id);

  if (isEventFetching) return <LoadingComponent loadingText="Fetching Event" />;
  if (!event) return <p>Error: No event found</p>;

  return (
    <Styled.ScrollableContainer maxHeight="90vh" width="90vw">
      <EventDetails event={event} />
      <CourseResults eventId={id} />
    </Styled.ScrollableContainer>
  );
};
