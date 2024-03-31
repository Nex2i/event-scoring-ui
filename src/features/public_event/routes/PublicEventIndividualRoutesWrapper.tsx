import { FC } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useIndividualGuestAuth } from '@/hooks/authentication/useIndividualGuestAuth.hook';
import { usePublicEventHook } from '@/hooks/event/usePublicEvent.hook';
import { PublicEventHome } from '../pages/PublicEventHome';
import { PublicTarget } from '../pages/PublicTarget';
import * as Styled from '../publicEvent.styles';

export const PublicEventIndividualRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching: isAuthFetching } = useIndividualGuestAuth(id);
  const { isFetching, event } = usePublicEventHook(id);

  if (isFetching || isAuthFetching) {
    return <LoadingComponent />;
  }
  if (!event) {
    return <div>Event not found</div>;
  }
  return (
    <Styled.PublicEventContainer>
      <Routes>
        <Route path="/" element={<PublicEventHome event={event} />} />
        <Route path="/:courseId/:targetId" element={<PublicTarget event={event} />} />
      </Routes>
    </Styled.PublicEventContainer>
  );
};
