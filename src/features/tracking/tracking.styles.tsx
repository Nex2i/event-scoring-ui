import { Box, styled } from '@mui/material';

export * from '@/common/style';

export const BullsEyeContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60%',
  padding: '10px',
}));

export const BullsEyeRing = styled('circle')(({}) => ({
  cursor: 'pointer',
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
}));

export const ScoreTableContainer = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '98%',
  marginBottom: '15vh',
  overflowY: 'auto',
  maxHeight: '50vh',
}));

export const ScoreCell = styled(Box)<{ active?: string }>(({ theme, active }) => ({
  cursor: 'pointer',
  width: '100px',
  height: '50px',
  margin: theme.spacing(1),
  borderRadius: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: active === 'true' ? theme.palette.secondary.main : theme.palette.common.white,
}));
