import { Box, Paper, styled } from '@mui/material';

export * from '@/common/style';

export const BullsEyeContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  padding: '20px',
}));

export const BullsEyeRing = styled('circle')(({}) => ({
  cursor: 'pointer',
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
}));

export const ScoreTableContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '98%',
  marginBottom: '15vh',
  overflowY: 'scroll',
}));

export const ScoreCell = styled(Paper)<{ active?: boolean }>(({ theme, active }) => ({
  cursor: 'pointer',
  width: '150px',
  height: '50px',
  margin: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: active ? theme.palette.secondary.main : theme.palette.common.white,
}));
