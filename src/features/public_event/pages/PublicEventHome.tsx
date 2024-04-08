import { Typography } from '@mui/material';
import { debounce } from 'lodash';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '@/shared/formatDate';
import { useQuery } from '@/libs/routing/useQuery.hook';
import { BasicFilledInput } from '@/libs/ui/form/BasicFilledInput';
import { publicEventSelector, setActiveUsername } from '@/stores/slices/PublicEvent.slice';
import * as Styled from '../publicEvent.styles';
import { EventInfoAndStartContainer } from '../components/EventInfoAndStartContainer';

interface PublicEventHomeProps {
  event: EventModel;
}

export const PublicEventHome: FC<PublicEventHomeProps> = ({ event }) => {
  const dispatch = useDispatch();
  const { activeUsername: username } = publicEventSelector();

  const [isSubmitted] = useQuery(['submitted']);

  const debouncedChangeHandler = useCallback(
    debounce((nextValue: string) => {
      if (nextValue.length >= 15) {
        return;
      }
      return dispatch(setActiveUsername(nextValue));
    }, 50),
    []
  );

  const updateUsername = (usernameValue: string) => {
    debouncedChangeHandler(usernameValue);
  };

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const disabeldStart = username.length <= 0;

  return (
    <div id="event-home-container" style={{ width: '100%' }}>
      <Styled.PublicEventHomeInfoContainer>
        <Typography variant="h4">{event.name}</Typography>
        <BasicFilledInput
          disabled={!!isSubmitted}
          initialValue="Username"
          onValueChange={updateUsername}
          value={username}
        />
        <Styled.Row>
          <Typography variant="h6">Start Date: {formatDate(event.startDate)}</Typography>
          <Typography variant="h6">End Date: {formatDate(event.endDate)}</Typography>
        </Styled.Row>
      </Styled.PublicEventHomeInfoContainer>
      <EventInfoAndStartContainer event={event} disableStart={disabeldStart} />
    </div>
  );
};
