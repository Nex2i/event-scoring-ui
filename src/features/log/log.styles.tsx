export * from '@/common/style';

import { Box, Button, SwipeableDrawer, styled } from '@mui/material';

export const BottomDrawer = styled(SwipeableDrawer)(({}) => ({
  width: '100vw',
}));

const pullerWidth = 64;
const pullerTop = 12;
export const Puller = styled(Box)(({ theme }) => ({
  width: pullerWidth,
  height: 8,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
  borderRadius: theme.spacing(2),
  position: 'absolute',
  top: pullerTop,
  left: `calc(50% - ${pullerWidth / 2}px)`,
}));

export const DateTimeHolder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: pullerTop * 2,
  right: theme.spacing(1),
}));

export const DrawerContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  padding: theme.spacing(4),
  height: '100%',
}));

export const CreateButton = styled(Button)(({}) => ({
  // position: 'relative',
  // bottom: theme.spacing(2),
}));
