import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import ListAltIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLocation, useNavigate } from 'react-router-dom';
import { CreateLogDrawer } from '@/features/log/components/CreateLogDrawer';
import * as Styled from './Styles';

export default function CoreBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('logs');
  const [toggleCreateLogDrawer, setToggleCreateLogDrawer] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const baseRoute = location.pathname;
    const activeRouteValue = getActiveRouteValue(baseRoute);
    setValue(activeRouteValue);
  }, [location]);

  function navigationActionClick(_event: SyntheticEvent, value: string) {
    switch (value) {
      case 'logs':
        navigate('/log');
        break;
      case 'create':
        //OPEN DRAWER
        setToggleCreateLogDrawer(true);
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        navigate('/log');
        break;
    }
  }

  return (
    <>
      <Box sx={{ pb: 7 }} ref={ref} data-cy="core-bottom-navigation">
        <CreateLogDrawer trigger={toggleCreateLogDrawer} onClose={setToggleCreateLogDrawer} />
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 8, left: 0, right: 0 }} elevation={3}>
          <Styled.BottomNavigationContainer showLabels value={value} onChange={navigationActionClick}>
            <Styled.BottomNavigationButton value={'logs'} label="My Logs" icon={<ListAltIcon />} />
            <Styled.CreateAction value={'create'} label="Create Log" icon={<Styled.CreateActionIcon />} />
            <Styled.BottomNavigationButton value={'profile'} label="Profile" icon={<AccountCircleIcon />} />
          </Styled.BottomNavigationContainer>
        </Paper>
      </Box>
    </>
  );
}

const logRoutes = ['log'];
const profileRoutes = ['profile'];

function getActiveRouteValue(baseRoute: string): string {
  switch (true) {
    case logRoutes.some((route) => baseRoute.includes(route)):
      return 'logs';
    case profileRoutes.some((route) => baseRoute.includes(route)):
      return 'profile';
    default:
      return 'logs';
  }
}
