import { FC } from 'react';
import { EventModel } from '@/types/models/event/event.model';
import { PublicTarget } from '../components/PublicTarget';

interface IndividualTargetProps {
  event: EventModel;
}

export const IndividualTarget: FC<IndividualTargetProps> = ({ event }) => {
  return <PublicTarget event={event} />;
};
