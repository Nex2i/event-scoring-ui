import AddIcon from '@mui/icons-material/Add';
import { Box, Card, TableContainer, styled } from '@mui/material';

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

export const EventCube = styled(BaseEventCard)(({}) => ({}));

export const NewEventCube = styled(BaseEventCard)(({}) => ({
  justifyContent: 'center',
  alignItems: 'center',
  // marginLeft: '0',
}));

export const NewEventIcon = styled(AddIcon)(({ theme }) => ({
  width: '5em',
  height: '5em',
  padding: '0',
  margin: '0',
  color: theme.palette.grey[500],
}));

export const EventsContainer = styled(Box)(({}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '1rem',
  width: '100%',
  marginLeft: '0',
}));

export const LeaderboardTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '30vh',
  width: '30vw',
  border: `2px solid ${theme.palette.grey[300]}`,
}));

export const CourseResultCell = styled(Card)(({}) => ({
  maxWidth: '50%',
}));
