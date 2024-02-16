import AddIcon from '@mui/icons-material/Add';
import { Box, Card, styled } from '@mui/material';

export * from '@/common/style';

const BaseEventCard = styled(Card)(({ theme }) => ({
  height: '10vh',
  width: '10vh',
  display: 'flex',
  cursor: 'pointer',
  transition: 'color 0.5s ease, box-shadow 0.5s ease',
  '&:hover': {
    color: theme.palette.grey[700],
    boxShadow: theme.shadows[4],
  },
}));

export const EventCube = styled(BaseEventCard)(({ theme }) => ({}));

export const NewEventCube = styled(BaseEventCard)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '0',
}));

export const NewEventIcon = styled(AddIcon)(({ theme }) => ({
  width: '5em',
  height: '5em',
  padding: '0',
  margin: '0',
  color: theme.palette.grey[500],
}));

export const EventsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '1rem',
  //   padding: '1rem',
  width: '100%',
}));
