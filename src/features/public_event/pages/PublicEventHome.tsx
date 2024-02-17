import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useEventHook } from '@/hooks/event/useEvent.hook';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface PublicEventHomeProps {}

export const PublicEventHome: FC<PublicEventHomeProps> = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching, event } = useEventHook(id);

  if (isFetching) {
    return <LoadingComponent />;
  }
  if (!event) {
    return <div>Event not found</div>;
  }
  return (
    <div>
      PublicEventHome
      {event?.name}
    </div>
  );
};
