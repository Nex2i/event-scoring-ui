import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import siteLogo from '@/assets/siteLogo';
import { authRoutes } from '@/routes/RouteConstants';
import { useRegisterUser } from '@/hooks/authentication/useRegisterUser.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { AuthButton } from '../Auth.button';
import * as Styled from '../auth.styles';

interface RegisterProps {}

export const Register: FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { loginWithRedirect, isAuthenticated, isLoading, user, logout } = useAuth0();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [submitRegistration, setSubmitRegistration] = useState<boolean>(false);

  useRegisterUser(submitRegistration, setIsFetching);

  const routeAction = queryParams.get('action');

  useEffect(() => {
    switch (routeAction) {
      case 'not-found':
        setSubmitRegistration(true);
        break;
      default:
        break;
    }
  }, [routeAction]);

  const register = () => {
    if (!user || !isAuthenticated) {
      loginWithRedirect();
    } else {
      //Handle new user registration to API
      setSubmitRegistration(true);
    }
  };

  const handleLoginLink = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate(authRoutes.login);
    }
  };

  if (isLoading || isFetching) return <LoadingComponent />;

  return (
    <Styled.AuthCardContainer>
      <Styled.LogoContainer srcSet={siteLogo} alt="temporary-site-logo" />
      <Typography variant={'h2'}>Register</Typography>
      <AuthButton onClick={register} text="Register" />
      <Typography variant="body2">
        Go Back to <Styled.Link onClick={handleLoginLink}>Login</Styled.Link>
      </Typography>
    </Styled.AuthCardContainer>
  );
};
