import { FC } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useGuestAuth } from '@/hooks/authentication/useGuestAuth.hook';
import { usePublicEventHook } from '@/hooks/event/usePublicEvent.hook';
import { PublicEventHome } from './pages/PublicEventHome';
import { PublicTarget } from './pages/PublicTarget';
import * as Styled from './publicEvent.styles';

interface PublicEventRoutesProps {}

export const PublicEventRoutes: FC<PublicEventRoutesProps> = ({}) => {
  return (
    <Styled.CoreLayoutOutlet>
      <Routes>
        <Route path="/:id/*" element={<PublicEventRoutesWrapper />} />
        <Route path={'*'} element={<Navigate to={'/' + publicEventRoutes.base} />} />
      </Routes>
    </Styled.CoreLayoutOutlet>
  );
};

export const PublicEventRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching: isAuthFetching } = useGuestAuth(id);
  const { isFetching, event } = usePublicEventHook(id);

  if (isFetching || isAuthFetching) {
    return <LoadingComponent />;
  }
  if (!event) {
    return <div>Event not found</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<PublicEventHome event={event} />} />
      <Route path="/:courseId/:targetId" element={<PublicTarget event={event} />} />
    </Routes>
  );
};
