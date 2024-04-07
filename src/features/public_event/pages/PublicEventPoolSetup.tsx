import { Button, Input, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateCharGUID } from '@/utils/guidGenerator';
import { EventModel } from '@/types/models/event/event.model';
import { addPoolUsername, publicEventSelector } from '@/stores/slices/PublicEvent.slice';
import * as Styled from '../publicEvent.styles';
import { EventInfoAndStartContainer } from '../components/EventInfoAndStartContainer';

interface PublicEventPoolSetupProps {
  event: EventModel;
}

export const PublicEventPoolSetup: FC<PublicEventPoolSetupProps> = ({ event }) => {
  const dispatch = useDispatch();
  const { poolUsernames } = publicEventSelector();
  const [currentContestant, setCurrentContestant] = useState<string>('');

  const updateCurrentContestant = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentContestant(e.target.value);
  };

  const addContestant = () => {
    if (!currentContestant) return;
    const uniqueContestant = currentContestant + '-' + generateCharGUID(4);
    dispatch(addPoolUsername(uniqueContestant));
    setCurrentContestant('');
  };

  return (
    <div id="event-home-container" style={{ width: '100%' }}>
      <Styled.PublicEventHomeInfoContainer>
        <Typography variant="h3">Pool Setup</Typography>
        <Typography variant="h6">Contestants</Typography>

        <Input
          placeholder="Enter Contestant Name"
          value={currentContestant}
          onChange={updateCurrentContestant}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addContestant();
            }
          }}
        />
        <Button onClick={addContestant}>Add Contestant</Button>
        <ul>
          {poolUsernames.map((contestant, i) => (
            <li key={i}>{contestant}</li>
          ))}
        </ul>
      </Styled.PublicEventHomeInfoContainer>
      <EventInfoAndStartContainer event={event} disableStart={!poolUsernames.length} />
    </div>
  );
};
