import { FC } from 'react';
import * as Styled from '../publicEvent.styles';
import { Route, Routes, useParams } from 'react-router-dom';
import { PublicEventPoolSetup } from '../pages/PublicEventPoolSetup';
import { usePublicEventHook } from '@/hooks/event/usePublicEvent.hook';

export const PublicEventPoolRoutesWrapper: FC = ({}) => {
  const { id } = useParams() as { id: string };
  const { isFetching, event } = usePublicEventHook(id);
  return (
    <Styled.PublicEventContainer>
      <Routes>
        <Route path="/" element={<PublicEventPoolSetup />} />
      </Routes>
    </Styled.PublicEventContainer>
  );
};
