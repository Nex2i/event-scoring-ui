import { useRoutes } from 'react-router-dom';
import { SnackBarComponent } from '@/components/SnackBar/SnackBar.component';
import { HttpInterceptor } from '@/libs/http/http.interceptor';
import { snackBarSelector } from '@/stores/slices/SnackBar.slice';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { PublicRoutes } from './PublicRoutes';

export const MainRouter = () => {
  console.log('ENV VAR: ', import.meta.env);
  const snackbarProps = snackBarSelector();

  const element = useRoutes([...AuthenticatedRoutes, ...PublicRoutes]);

  const httpInterceptor = new HttpInterceptor();
  httpInterceptor.initializeInterceptor();

  return (
    <>
      {element}
      <code style={{ fontSize: '8px' }}>DEV Build: {import.meta.env.VITE_COMMIT_HASH}</code>
      <SnackBarComponent
        open={snackbarProps.open}
        message={snackbarProps.message}
        severity={snackbarProps.severity}
      />
    </>
  );
};
