import { AppBar, Container, Toolbar } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { noAuthHomeRoute } from '@/routes/RouteConstants';
import { useAuth } from '@/hooks/authentication/useAuth.hook';
import * as Styled from './Styles';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface coreNavbarProps {}

export const PublicAppBar: FC<coreNavbarProps> = ({}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

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
            </Styled.Row>
          </Toolbar>
        </Container>
      </AppBar>
    </Styled.CoreLayoutAppbar>
  );
};
