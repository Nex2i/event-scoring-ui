export * from '@/common/style';

import { Button, Card, styled } from '@mui/material';

export const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.typography.button.color,
  textAlign: 'center',
  cursor: 'pointer',
  textDecoration: 'none',
}));

export const AuthCardContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  minWidth: '300px',
}));

export const LogoContainer = styled('img')(({}) => ({
  maxWidth: '140px',
}));
