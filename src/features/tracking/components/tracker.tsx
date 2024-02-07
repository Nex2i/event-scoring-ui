import { FC } from 'react';
import * as Styled from '../tracking.styles';
import { Bullseye } from './bullseye';

interface TrackerProps {}

export const Tracker: FC<TrackerProps> = ({}) => {
  const handleBullseyeClick = (value: number) => {
    console.log('You scored:', value);
  };
  return (
    <Styled.Column>
      <Bullseye onClick={handleBullseyeClick} />
    </Styled.Column>
  );
};
