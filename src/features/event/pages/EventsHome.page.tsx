import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { themeBase } from '@/assets/theme/base/borders';
import * as Styled from '../event.styles';
import { NewEventCube } from '../components/NewEventCube';
import { EventsCubes } from '../components/EventsCubes';

interface EventsHomePageProps {}

export const EventsHomePage: FC<EventsHomePageProps> = ({}) => {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h2" sx={{ margin: themeBase }}>
        Events
      </Typography>
      <Styled.EventsContainer>
        <NewEventCube />
        <EventsCubes />
      </Styled.EventsContainer>
    </Box>
  );
};
