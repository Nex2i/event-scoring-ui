import { FC } from 'react';
import * as Styled from '../event.styles';
import { Typography } from '@mui/material';

interface NewEventCubeProps {}

export const NewEventCube: FC<NewEventCubeProps> = ({}) => {
  return (
    <Styled.NewEventCube>
      <Styled.NewEventIcon />
      <Typography variant="body1" sx={{ fontSize: '1rem' }}>
        New Event
      </Typography>
    </Styled.NewEventCube>
  );
};
