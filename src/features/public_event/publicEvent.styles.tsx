import { styled, Box } from '@mui/material';

export * from '@/common/style';

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

export const PublicEventContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '95vw',
  height: '95vh',
  gap: theme.spacing(8),
  padding: `0 2.5vw`,
  '@media (min-width:600px)': {
    maxWidth: '600px',
  },
}));

export const PublicTargetsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '90%',
  gap: theme.spacing(2),
}));
