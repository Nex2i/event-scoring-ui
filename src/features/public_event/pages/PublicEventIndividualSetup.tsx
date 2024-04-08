import { Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '@/shared/formatDate';
import { useQuery } from '@/libs/routing/useQuery.hook';
import { BasicFilledInput } from '@/libs/ui/form/BasicFilledInput';
import { resetCourse, setActiveUsername } from '@/stores/slices/PublicEvent.slice';
import { generateCharGUID } from '@/utils/guidGenerator';
import localStorageRepository from '@/utils/localStorage.repository';
import * as Styled from '../publicEvent.styles';
import { EventInfoAndStartContainer } from '../components/EventInfoAndStartContainer';

interface PublicEventHomeProps {
  event: EventModel;
}

export const PublicEventHome: FC<PublicEventHomeProps> = ({ event }) => {
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(
    () => localStorageRepository.getPublicEventUsername()?.split('-')[0] ?? ''
  );

  const [isSubmitted] = useQuery(['submitted']);

  const preStart = () => {
    dispatch(resetCourse());
    dispatch(setActiveUsername(localUsername + '-' + generateCharGUID(4)));
  };

  const updateUsername = (value: string) => {
    if (value.length > 15) return;
    setLocalUsername(value);
  };

  const disabeldStart = localUsername.length <= 0;

  return (
    <div id="event-home-container" style={{ width: '100%' }}>
      <Styled.PublicEventHomeInfoContainer>
        <Typography variant="h4">{event.name}</Typography>
        <BasicFilledInput
          disabled={!!isSubmitted}
          initialValue="Username"
          onValueChange={updateUsername}
          value={localUsername}
        />
        <Styled.Row>
          <Typography variant="h6">Start Date: {formatDate(event.startDate)}</Typography>
          <Typography variant="h6">End Date: {formatDate(event.endDate)}</Typography>
        </Styled.Row>
      </Styled.PublicEventHomeInfoContainer>
      <EventInfoAndStartContainer
        event={event}
        disableStart={disabeldStart}
        preStartCallback={preStart}
      />
    </div>
  );
};
