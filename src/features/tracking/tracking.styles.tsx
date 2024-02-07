import { Box, styled } from '@mui/material';

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
