import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Styled from '../publicEvent.styles';

interface PublicEventRouterProps {}

export const PublicEventRouter: FC<PublicEventRouterProps> = ({}) => {
  const { id } = useParams() as { id: string };
  return (
    <Styled.PublicEventContainer>
      <Styled.PublicEventHomeInfoContainer>
        <Typography variant="h5">Are you recording for yourself or an group?</Typography>
        <br />
        <Styled.SpreadRow>
          <Link to={`/open/event/${id}/individual`}>
            <Button>Individual</Button>
          </Link>
          <br />
          <Link to={`/open/event/${id}/pool`}>
            <Button>Group</Button>
          </Link>
        </Styled.SpreadRow>
      </Styled.PublicEventHomeInfoContainer>
    </Styled.PublicEventContainer>
  );
};
