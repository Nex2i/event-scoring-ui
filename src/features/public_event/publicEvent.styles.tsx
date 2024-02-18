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
