import { Box, Card, Drawer, styled } from '@mui/material';
export * from '@/common/style';

export const CoreLayoutContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const CoreLayoutAppbar = styled(Box)`
  display: flex;
`;

export const CoreLayoutSidebar = styled(Box)``;

export const CoreRow = styled(Box)`
  display: flex;
`;

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
  minWidth: '300px',
  minHeight: '100px',
}));

export const CoreDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    position: relative;
    margin: 0;
    border-radius: 0;
  }
`;
