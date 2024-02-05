import { Navigate, Route } from 'react-router-dom';

import { CoreLayout } from '@/layouts/core-layout/CoreLayout';
import { ProfileNavigator } from './ProfileNavigator';

export const ProfileRoutes = () => {
  return (
    <CoreLayout title="Profile">
      <Route>
        <Route path={'/'} element={<ProfileNavigator />} />
        <Route path={'*'} element={<Navigate to={'/log'} />} />
      </Route>
    </CoreLayout>
  );
};
