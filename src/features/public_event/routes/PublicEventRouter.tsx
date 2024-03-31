import { Button } from '@mui/material';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Styled from '../publicEvent.styles';

interface PublicEventRouterProps {}

export const PublicEventRouter: FC<PublicEventRouterProps> = ({}) => {
  const { id } = useParams() as { id: string };
  return (
    <Styled.PublicEventContainer>
      <div>
        Are you recording for yourself or an individual?
        <br />
        <Link to={`/open/event/${id}/individual`}>
          <Button>Individual</Button>
        </Link>
        <br />
        <Link to={`/open/event/${id}/pool`}>
          <Button>Pool</Button>
        </Link>
      </div>
    </Styled.PublicEventContainer>
  );
};
