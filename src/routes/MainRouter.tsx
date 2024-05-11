import { useRoutes } from 'react-router-dom';
import { SnackBarComponent } from '@/components/SnackBar/SnackBar.component';
import { HttpInterceptor } from '@/libs/http/http.interceptor';
import { snackBarSelector } from '@/stores/slices/SnackBar.slice';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { PublicRoutes } from './PublicRoutes';

const stickyBottomStyle: React.CSSProperties = {
  position: 'fixed', // Positioning context fixed relative to the viewport
  bottom: '10px', // Align to the bottom of the viewport
  left: '10px', // Align to the left of the viewport
  zIndex: 1000, // Ensures it stays on top of other content
  backgroundColor: 'transparent', // Background color
  textAlign: 'center', // Center the text inside the element
  fontSize: '8px',
};

export const MainRouter = () => {
  const snackbarProps = snackBarSelector();

  const element = useRoutes([...AuthenticatedRoutes, ...PublicRoutes]);

  const httpInterceptor = new HttpInterceptor();
  httpInterceptor.initializeInterceptor();

  return (
    <>
      {element}
      <code style={stickyBottomStyle}>Build:{import.meta.env.VITE_COMMIT_HASH?.slice(0, 7)}</code>
      <SnackBarComponent
        open={snackbarProps.open}
        message={snackbarProps.message}
        severity={snackbarProps.severity}
      />
    </>
  );
};
