import { FC, useState } from 'react';
import { Typography } from '@mui/material';
import * as Styled from '../event.styles';
import { NewEventDialog } from './NewEventDialog';

interface NewEventCubeProps {}

export const NewEventCube: FC<NewEventCubeProps> = ({}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const onFormClose = () => {
    setIsFormOpen(false);
  };
  const onNewEventClick = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <Styled.NewEventCube onClick={onNewEventClick}>
        <Styled.NewEventIcon />
        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
          New Event
        </Typography>
      </Styled.NewEventCube>
      {isFormOpen && <NewEventDialog isOpen={isFormOpen} handleClose={onFormClose} />}
    </>
  );
};
