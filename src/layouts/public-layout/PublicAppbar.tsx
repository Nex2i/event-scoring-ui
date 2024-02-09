import { AppBar, Container, Toolbar } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { noAuthHomeRoute } from '@/routes/RouteConstants';
import * as Styled from './Styles';

interface coreNavbarProps {}

export const PublicAppBar: FC<coreNavbarProps> = ({}) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate(noAuthHomeRoute);
  };

  return (
    <Styled.CoreLayoutAppbar data-cy="core-app-bar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ maxHeight: '40px' }}>
            <Styled.Row>
              <button onClick={navigateToHome}>
                <AdbIcon />
              </button>
              <Styled.Title>Score Tracker</Styled.Title>
            </Styled.Row>
          </Toolbar>
        </Container>
      </AppBar>
    </Styled.CoreLayoutAppbar>
  );
};
