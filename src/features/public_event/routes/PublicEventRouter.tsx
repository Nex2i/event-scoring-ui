import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { clearButKeepAdminToken } from '@/utils/localStorage';
import * as Styled from '../publicEvent.styles';

interface PublicEventRouterProps {}

enum navigationLocation {
  INDIVIDUAL = 'individual',
  POOL = 'pool',
}

export const PublicEventRouter: FC<PublicEventRouterProps> = ({}) => {
  const { id } = useParams() as { id: string };
  const [searchParams] = useSearchParams();
  const submitted = searchParams.get('submitted') == 'true' ?? false;

  const navigate = useNavigate();

  const navigateToTargets = (location: navigationLocation) => {
    clearButKeepAdminToken();

    if (location === navigationLocation.INDIVIDUAL) {
      navigate(`/open/event/${id}/individual`);
    } else if (location === navigationLocation.POOL) {
      navigate(`/open/event/${id}/pool`);
    }
  };

  return (
    <Styled.PublicEventContainer>
      <Styled.PublicEventHomeInfoContainer>
        {submitted ? (
          <>
            <Typography variant="h5">Your score has been submitted!</Typography>
            <Typography variant="h6">Select an option below to go again</Typography>
          </>
        ) : (
          <Typography variant="h5">Are you recording for yourself or an group?</Typography>
        )}
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
