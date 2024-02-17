import { FC } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { CoreLayout } from '@/layouts/core-layout/CoreLayout';
import { eventRoutes } from '@/routes/RouteConstants';
import { EventsHomePage } from './pages/EventsHome.page';
import { SingleEventPage } from './pages/SingleEvent.page';

interface EventRoutesProps {}

export const EventRoutes: FC<EventRoutesProps> = ({}) => {
  return (
    <CoreLayout>
      <Route>
        <Route path={'/'} element={<EventsHomePage />} />
        <Route path={'/:id'} element={<SingleEventPage />} />
        <Route path={'*'} element={<Navigate to={'/' + eventRoutes.base} />} />
      </Route>
    </CoreLayout>
  );
};
