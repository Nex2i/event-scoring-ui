import { Navigate, Route } from 'react-router-dom';

import { AuthenticatedLayout } from '@/layouts/authentication/Authenticated.layout';
import { authRoutes } from '@/routes/RouteConstants';
import { Login } from './components/login/Login';
import { RegisterComponent } from './components/register/Register';

export const AuthenticationRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Route>
        <Route path={'login'} element={<Login />} />
        <Route path={'register'} element={<RegisterComponent />} />
        <Route path={'*'} element={<Navigate to={authRoutes.login} />} />
      </Route>
    </AuthenticatedLayout>
  );
};
