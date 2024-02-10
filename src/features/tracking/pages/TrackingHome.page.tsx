import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Styled from '../tracking.styles';
import { Tracker } from '../components/tracker';

interface TrackingHomePageProps {}

export const TrackingHomePage: FC<TrackingHomePageProps> = ({}) => {
  const [searchParams] = useSearchParams();
  const targets = searchParams.get('targets') ?? '10';
  const shotsPerTarget = searchParams.get('shotsPerTarget') ?? '2';

  return (
    <Styled.Column>
      <Tracker targets={targets} shotsPerTarget={shotsPerTarget} />
    </Styled.Column>
  );
};
