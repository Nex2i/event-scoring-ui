import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { EventModel } from '@/types/models/event/event.model';
import { BasicFilledSelect } from '@/libs/ui/form/BasicFilledSelect';
import { publicEventSelector, setActiveUsername } from '@/stores/slices/PublicEvent.slice';
import * as Styled from '../publicEvent.styles';
import { PublicTarget } from '../components/PublicTarget';

interface PoolTargetProps {
  event: EventModel;
}

export const PoolTarget: FC<PoolTargetProps> = ({ event }) => {
  return (
    <Styled.Column>
      <ActiveUsernameSelect />
      <PublicTarget event={event} />
    </Styled.Column>
  );
};

interface ActiveUsernameSelectProps {}

export const ActiveUsernameSelect: FC<ActiveUsernameSelectProps> = ({}) => {
  const dispatch = useDispatch();
  const { poolUsernames, activeUsername } = publicEventSelector();

  const options = poolUsernames.map((username) => ({ value: username }));

  function changeUsername(value: string) {
    dispatch(setActiveUsername(value));
  }
  return (
    <BasicFilledSelect value={activeUsername} onValueChange={changeUsername} options={options} />
  );
};
