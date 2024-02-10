import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateSafe from '@/libs/react/SafeState.hook';
import { BasicFilledInput } from '@/libs/ui/form/BasicFilledInput';
import { useAppDispatch } from '@/stores/store.hooks';
import { resetTracker } from '@/stores/slices/Tracker.slice';
import * as Styled from '../publicMenu.styles';

interface PublicHomePageProps {}
const navigateItems = {
  tracking: 'tracking',
};

export const PublicHomePage: FC<PublicHomePageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [numOfTargets, setNumOfTargets] = useStateSafe('10');
  const [numOfShotsPerTarget, setNumOfShotsPerTarget] = useStateSafe('2');

  const resetCache = () => {
    dispatch(resetTracker());
  };

  const navigate = useNavigate();

  const navigateTo = (item: string) => {
    switch (item) {
      case navigateItems.tracking:
        navigate(`/tracking?targets=${numOfTargets}&shotsPerTarget=${numOfShotsPerTarget}`);
        break;
    }
  };
  return (
    <Styled.Column>
      <Styled.Title>Welcome!</Styled.Title>
      <Styled.Row>
        <BasicFilledInput initialValue="Targets" value={numOfTargets} onValueChange={setNumOfTargets} />
        <BasicFilledInput
          initialValue="ShotsPerTarget"
          value={numOfShotsPerTarget}
          onValueChange={setNumOfShotsPerTarget}
        />
      </Styled.Row>
      <Button onClick={() => navigateTo(navigateItems.tracking)}>Start Round</Button>
      <br />
      <Button onClick={resetCache}>Reset Round</Button>
    </Styled.Column>
  );
};
