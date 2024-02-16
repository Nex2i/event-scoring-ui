import { FC } from 'react';
import * as Styled from '../event.styles';
import { NewEventCube } from '../components/NewEventCube';
import { Box } from '@mui/material';

interface EventsHomePageProps {}

export const EventsHomePage: FC<EventsHomePageProps> = ({}) => {
  return (
    <Box sx={{ padding: '1rem' }}>
      <h1>Events</h1>
      <Styled.EventsContainer>
        <NewEventCube />
      </Styled.EventsContainer>
    </Box>
  );
};
