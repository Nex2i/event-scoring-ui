import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Bullseye } from '@/features/tracking/components/bullseye';
import { EventModel } from '@/types/models/event/event.model';

interface PublicTargetProps {
  event: EventModel;
}

export const PublicTarget: FC<PublicTargetProps> = ({}) => {
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };
  const bullseyeClick = (_shotScore: number) => {};
  return (
    <div>
      <Bullseye onClick={bullseyeClick} activeTargetId={targetId} rings={[]} />
      PublicTarget: {courseId} {targetId}
    </div>
  );
};
