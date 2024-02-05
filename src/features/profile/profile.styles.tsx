import { Typography, styled } from '@mui/material';

export * from '@/common/style';

export const LogoutLink = styled(Typography)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  textDecoration: 'underline',
  position: 'fixed',
  bottom: theme.spacing(14),
  left: 0,
  right: 0,
}));
