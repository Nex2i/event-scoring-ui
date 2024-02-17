import { Bullseye } from '@/features/tracking/components/bullseye';
import { EventModel } from '@/types/models/event/event.model';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface PublicTargetProps {
  event: EventModel;
}

export const PublicTarget: FC<PublicTargetProps> = ({ event }) => {
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };
  const bullseyeClick = (shotScore: number) => {};
  return (
    <div>
      <Bullseye onClick={bullseyeClick} activeTargetId={targetId} rings={[]} />
      PublicTarget: {courseId} {targetId}
    </div>
  );
};
