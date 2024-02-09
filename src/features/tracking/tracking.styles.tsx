import { Box, styled } from '@mui/material';

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

export const ScoreTableContainer = styled(Box)(({}) => ({
  width: '100%',
  marginBottom: '15vh',
  maxHeight: '30vh',
  overflow: 'auto',
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
