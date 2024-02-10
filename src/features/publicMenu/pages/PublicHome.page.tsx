import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../publicMenu.styles';
import useStateSafe from '@/libs/react/SafeState.hook';
import { BasicFilledInput } from '@/libs/ui/form/BasicFilledInput';

interface PublicHomePageProps {}
const navigateItems = {
  tracking: 'tracking',
};

export const PublicHomePage: FC<PublicHomePageProps> = ({}) => {
  const [numOfTargets, setNumOfTargets] = useStateSafe('10');
  const [numOfShotsPerTarget, setNumOfShotsPerTarget] = useStateSafe('2');

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
      <Styled.Title>Welcome To Event Score Tracking MVP</Styled.Title>
      <Styled.Row>
        <BasicFilledInput initialValue="Targets" value={numOfTargets} onValueChange={setNumOfTargets} />
        <BasicFilledInput
          initialValue="ShotsPerTarget"
          value={numOfShotsPerTarget}
          onValueChange={setNumOfShotsPerTarget}
        />
      </Styled.Row>
      <Button onClick={() => navigateTo(navigateItems.tracking)}>Start Tracking Here</Button>
    </Styled.Column>
  );
};
