import { FC } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { PublicLayout } from '@/layouts/public-layout/PublicLayout';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useEventHook } from '@/hooks/event/useEvent.hook';
import { PublicEventHome } from './pages/PublicEventHome';
import { PublicTarget } from './pages/PublicTarget';

interface PublicEventRoutesProps {}

export const PublicEventRoutes: FC<PublicEventRoutesProps> = ({}) => {
  return (
    <PublicLayout>
      <Route path="/:id/*" element={<PublicEventRoutesWrapper />} />
      <Route path={'*'} element={<Navigate to={'/' + publicEventRoutes.base} />} />
    </PublicLayout>
  );
};

export const PublicEventRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching, event } = useEventHook(id);

  if (isFetching) {
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
