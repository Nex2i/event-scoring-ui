import { FC } from 'react';
import { Box } from '@mui/material';
import * as Styled from '../event.styles';
import { NewEventCube } from '../components/NewEventCube';
import { EventsCubes } from '../components/EventsCubes';

interface EventsHomePageProps {}

export const EventsHomePage: FC<EventsHomePageProps> = ({}) => {
  return (
    <Box sx={{ padding: '1rem' }}>
      <h1>Events</h1>
      <Styled.EventsContainer>
        <NewEventCube />
        <EventsCubes />
      </Styled.EventsContainer>
    </Box>
  );
};
