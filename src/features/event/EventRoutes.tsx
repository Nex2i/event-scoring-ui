import { CoreLayout } from '@/layouts/core-layout/CoreLayout';
import { FC } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { EventsHomePage } from './pages/EventsHome.page';
import { eventRoutes } from '@/routes/RouteConstants';

interface EventRoutesProps {}

export const EventRoutes: FC<EventRoutesProps> = ({}) => {
  return (
    <CoreLayout>
      <Route>
        <Route path={'/'} element={<EventsHomePage />} />
        <Route path={'*'} element={<Navigate to={'/' + eventRoutes.base} />} />
      </Route>
    </CoreLayout>
  );
};
