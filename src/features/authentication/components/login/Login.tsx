import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingComponent } from '@/components/loading/Loading.Component';
import { loginActions, useLogin } from '@/hooks/authentication/useLogin.hook';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import siteLogo from '@/assets/siteLogo';
import { AuthButton } from '../Auth.button';
import * as Styled from '../auth.styles';

interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const [authId, setAuthId] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const navigate = useNavigate();

  const action = useLogin(authId, setIsFetching);

  useEffect(() => {
    if (!isFetching && isAuthenticated && user) {
      setAuthId(user.sub);
    }
  }, [isAuthenticated, user, isFetching]);

  useEffect(() => {
    if (!isFetching && isAuthenticated) {
      handleActionNavigation();
    }
  }, [isFetching, action, isAuthenticated]);

  const handleActionNavigation = () => {
    switch (action) {
      case loginActions.register:
        navigate(authRoutes.register + '?action=not-found');
        break;
      case loginActions.login:
        navigate(homeRoute);
        break;
      default:
        break;
    }
  };

  const login = () => {
    if (!isAuthenticated) loginWithRedirect();
  };

  if (isLoading || isAuthenticated || isFetching) return <LoadingComponent />;

  return (
    !isAuthenticated && (
      <Styled.AuthCardContainer>
        <Styled.LogoContainer srcSet={siteLogo} alt="temporary-site-logo" />
        <div>
          <Typography variant={'h2'}>Sign in</Typography>
          <Typography variant={'body2'}>Accomplish Your Dreams Here!</Typography>
        </div>
        <AuthButton onClick={() => login()} text="Login" />
        <Typography variant="body2">
          Don't have an account? <Styled.Link onClick={() => navigate(authRoutes.register)}>Sign up</Styled.Link>
        </Typography>
      </Styled.AuthCardContainer>
    )
  );
};
