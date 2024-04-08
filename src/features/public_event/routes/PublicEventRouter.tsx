import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from '../publicEvent.styles';
import { clearAll } from '@/utils/localStorage';

interface PublicEventRouterProps {}

enum navigationLocation {
  INDIVIDUAL = 'individual',
  POOL = 'pool',
}

export const PublicEventRouter: FC<PublicEventRouterProps> = ({}) => {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const navigateToTargets = (location: navigationLocation) => {
    clearAll();

    if (location === navigationLocation.INDIVIDUAL) {
      navigate(`/open/event/${id}/individual`);
    } else if (location === navigationLocation.POOL) {
      navigate(`/open/event/${id}/pool`);
    }
  };

  return (
    <Styled.PublicEventContainer>
      <Styled.PublicEventHomeInfoContainer>
        <Typography variant="h5">Are you recording for yourself or an group?</Typography>
        <br />
        <Styled.SpreadRow>
          <Button onClick={() => navigateToTargets(navigationLocation.INDIVIDUAL)}>
            Individual
          </Button>
          <br />
          <Button onClick={() => navigateToTargets(navigationLocation.POOL)}>Group</Button>
        </Styled.SpreadRow>
      </Styled.PublicEventHomeInfoContainer>
    </Styled.PublicEventContainer>
  );
};
