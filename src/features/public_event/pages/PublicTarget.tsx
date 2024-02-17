import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Bullseye } from '@/features/tracking/components/bullseye';
import { EventModel } from '@/types/models/event/event.model';
import { useTargetTypeHook } from '@/hooks/target/useTargetType.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';

interface PublicTargetProps {
  event: EventModel;
}

export const PublicTarget: FC<PublicTargetProps> = ({}) => {
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };
  const { isFetching, bullseye } = useTargetTypeHook({ targetId });

  const bullseyeClick = (shotScore: number) => {
    console.log('bullseyeClick', shotScore);
  };

  if (isFetching) return <LoadingComponent />;
  return (
    <div>
      {!bullseye || !bullseye.rings.length ? (
        <p>Target Not Found</p>
      ) : (
        <Bullseye onClick={bullseyeClick} activeTargetId={targetId} rings={bullseye?.rings} />
      )}
      PublicTarget: {courseId} {targetId}
    </div>
  );
};
