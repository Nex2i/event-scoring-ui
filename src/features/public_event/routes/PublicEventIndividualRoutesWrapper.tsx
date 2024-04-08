import { FC } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useIndividualGuestAuth } from '@/hooks/authentication/useIndividualGuestAuth.hook';
import { usePublicEventHook } from '@/hooks/event/usePublicEvent.hook';
import { PublicEventHome } from '../pages/PublicEventHome';
import * as Styled from '../publicEvent.styles';
import { EventNotFound } from '../components/EventNotFound';
import { IndividualTarget } from '../pages/IndividualTarget';

export const PublicEventIndividualRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching: isAuthFetching } = useIndividualGuestAuth(id);
  const { isFetching, event } = usePublicEventHook(id);

  if (isFetching || isAuthFetching) {
    return <LoadingComponent />;
  }
  if (!event) {
    return <EventNotFound />;
  }
  return (
    <Styled.PublicEventContainer>
      <Routes>
        <Route path="/" element={<PublicEventHome event={event} />} />
        <Route path="/:courseId/:targetId" element={<IndividualTarget event={event} />} />
      </Routes>
    </Styled.PublicEventContainer>
  );
};
