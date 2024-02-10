import { Box, Paper, styled } from '@mui/material';

export * from '@/common/style';

export const BullsEyeContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60%',
}));

export const BullsEyeRing = styled('circle')(({}) => ({
  cursor: 'pointer',
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
}));

export const ScoreTableContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minWidth: '95%',
  maxHeight: '45vh',
  overflow: 'auto',
  backgroundColor: theme.palette.grey[200],
}));

export const ScoreCell = styled(Box)<{ active?: string }>(({ theme, active }) => ({
  width: '100px',
  height: '50px',
  margin: theme.spacing(1),
  borderRadius: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: active === 'true' ? theme.palette.secondary.main : theme.palette.common.white,
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
}));
