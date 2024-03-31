import { FC } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { PublicEventIndividualRoutesWrapper } from './PublicEventIndividualRoutesWrapper';
import { PublicEventPoolRoutesWrapper } from './PublicEventPoolRoutesWrapper';
import { PublicEventRouter } from './PublicEventRouter';

interface PublicEventRoutesProps {}

export const PublicEventRoutes: FC<PublicEventRoutesProps> = ({}) => {
  return (
    <Routes>
      <Route path="/:id" element={<PublicEventRouter />} />
      <Route path="/:id/:recordingType/*" element={<RecordingTypeWrapper />} />
      <Route path={'*'} element={<Navigate to={'/' + publicEventRoutes.base} />} />
    </Routes>
  );
};

const RecordingTypeWrapper = () => {
  const { recordingType } = useParams() as { recordingType: string };
  switch (recordingType) {
    case 'individual':
      return <PublicEventIndividualRoutesWrapper />;
    case 'pool':
      return <PublicEventPoolRoutesWrapper />;
    default:
      return <Navigate to={'/' + publicEventRoutes.base} />;
  }
};
