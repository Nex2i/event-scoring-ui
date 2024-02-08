import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../publicMenu.styles';

interface PublicHomePageProps {}
const navigateItems = {
  tracking: 'tracking',
};

export const PublicHomePage: FC<PublicHomePageProps> = ({}) => {
  const navigate = useNavigate();

  const navigateTo = (item: string) => {
    switch (item) {
      case navigateItems.tracking:
        navigate('/tracking');
        break;
    }
  };
  return (
    <Styled.Column>
      <Styled.Title>Welcome To Event Score Tracking MVP</Styled.Title>
      <Button onClick={() => navigateTo(navigateItems.tracking)}>Start Tracking Here</Button>
    </Styled.Column>
  );
};
