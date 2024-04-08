import { FC } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { usePublicEventHook } from '@/hooks/event/usePublicEvent.hook';
import * as Styled from '../publicEvent.styles';
import { PublicEventPoolSetup } from '../components/PublicEventPoolSetup';
import { PoolTarget } from '../pages/PoolTarget';
import { EventNotFound } from '../components/EventNotFound';

export const PublicEventPoolRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching, event } = usePublicEventHook(id);

  if (isFetching) {
    return <div>Fetching...</div>;
  }
  if (!event) {
    return <EventNotFound />;
  }

  return (
    <Styled.PublicEventContainer>
      <Routes>
        <Route path="/" element={<PublicEventPoolSetup event={event} />} />
        <Route path="/:courseId/:targetId" element={<PoolTarget event={event} />} />
      </Routes>
    </Styled.PublicEventContainer>
  );
};
