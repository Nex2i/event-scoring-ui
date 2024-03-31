import { FC } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { usePublicEventHook } from '@/hooks/event/usePublicEvent.hook';
import * as Styled from '../publicEvent.styles';
import { PublicEventPoolSetup } from '../pages/PublicEventPoolSetup';

export const PublicEventPoolRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching } = usePublicEventHook(id);

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <Styled.PublicEventContainer>
      <Routes>
        <Route path="/" element={<PublicEventPoolSetup />} />
      </Routes>
    </Styled.PublicEventContainer>
  );
};
