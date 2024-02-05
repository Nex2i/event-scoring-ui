import { Typography, styled } from '@mui/material';

export const NavBarText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  textDecoration: 'none',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  fontSize: '1.3em',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  '-webkit-user-select': 'none' /* Safari */,
  '-ms-user-select': 'none' /* IE 10 and IE 11 */,
  userSelect: 'none' /* Standard syntax */,
}));
