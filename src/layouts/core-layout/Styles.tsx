import { BottomNavigation, BottomNavigationAction, Box, Card, Drawer, styled } from '@mui/material';
export * from '@/common/style';
export * from '../styles';

export const CoreLayoutContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
`;

export const CoreLayoutAppbar = styled(Box)`
  display: flex;
`;

export const CoreLayoutSidebar = styled(Box)``;

export const CoreRow = styled(Box)<{ width?: string }>(({ width }) => ({
  display: 'flex',
  width: width || 'auto',
}));

export const CoreColumn = styled(Box)<{ width?: string }>(({ width }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: width || 'auto',
}));

export const CoreLayoutOutlet = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
`;

export const CoreCardContent = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: 0,
  width: '100%',
}));

export const CoreDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    position: relative;
    margin: 0;
    border-radius: 0;
  }
`;

export const BottomNavigationContainer = styled(BottomNavigation)(({}) => ({
  position: 'relative',
  paddingBottom: '15px', // Adjust this for the circle button
  gap: '50px',
}));

const BaseBottomNavButton = styled(BottomNavigationAction)(({}) => ({
  cursor: 'pointer',
  boxShadow: 'none',
  outline: 'none !important',
}));

export const CreateAction = styled(BaseBottomNavButton)(({}) => ({
  position: 'absolute',
  top: '-30px', // Half outside
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
}));

export const BottomNavigationButton = styled(BaseBottomNavButton)(({}) => ({
  top: '6px', // Half outside
}));
