import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useEventHook } from '@/hooks/event/useEvent.hook';

interface SingleEventPageProps {}

export const SingleEventPage: FC<SingleEventPageProps> = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching, event } = useEventHook(id);

  if (isFetching) return <LoadingComponent loadingText="Fetching Event" />;
  if (!event) return <p>Error: No event found</p>;
  return (
    <div>
      SingleEventPage
      {id}
      {event.name}
    </div>
  );
};
