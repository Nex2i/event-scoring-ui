import { PublicLayout } from '@/layouts/public-layout/PublicLayout';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { FC } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PublicEventHome } from './pages/PublicEventHome';

interface PublicEventRoutesProps {}

export const PublicEventRoutes: FC<PublicEventRoutesProps> = ({}) => {
  return (
    <PublicLayout>
      <Route path="/:id" element={<PublicEventHome />} />
      <Route path={'*'} element={<Navigate to={'/' + publicEventRoutes.base} />} />
    </PublicLayout>
  );
};
