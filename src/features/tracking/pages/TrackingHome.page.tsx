import { FC } from 'react';
import * as Styled from '../tracking.styles';
import { Tracker } from '../components/tracker';

interface TrackingHomePageProps {}

export const TrackingHomePage: FC<TrackingHomePageProps> = ({}) => {
  return (
    <Styled.Column>
      <Tracker />
    </Styled.Column>
  );
};
