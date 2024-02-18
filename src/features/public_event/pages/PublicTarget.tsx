import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Bullseye } from '@/features/tracking/components/bullseye';
import { EventModel } from '@/types/models/event/event.model';
import { useTargetTypeHook } from '@/hooks/target/useTargetType.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { TargetModel } from '@/types/models/target/target.model';
import { publicEventSelector } from '@/stores/slices/PublicEvent.slice';
import { NextTargetButton } from '../components/NextTargetButton';
import { TargetShots } from '../components/TargetShots';

interface PublicTargetProps {
  event: EventModel;
}

export const PublicTarget: FC<PublicTargetProps> = ({ event }) => {
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };
  const { isFetching, bullseye } = useTargetTypeHook({ targetId });
  const target = getTargetFromEvent(event, courseId, targetId);
  const { totalScore } = publicEventSelector().userCourseData ?? { totalScore: 0 };

  const bullseyeClick = (shotScore: number) => {
    console.log('bullseyeClick', shotScore);
  };

  if (isFetching) return <LoadingComponent />;
  if (!target) return <p>Could Not Find Target</p>;
  return (
    <div style={{ border: 'solid black 1px' }}>
      {!bullseye || !bullseye.rings.length ? (
        <p>Target Not Found</p>
      ) : (
        <Bullseye onClick={bullseyeClick} activeTargetId={targetId} rings={bullseye?.rings} />
      )}
      <p>Distance: {target.distance}</p>
      <p>Current Score: {totalScore}</p>
      <TargetShots target={target} rings={bullseye?.rings} />
      <NextTargetButton event={event} />
    </div>
  );
};

function getTargetFromEvent(
  event: EventModel,
  courseId: string,
  targetId: string
): TargetModel | null {
  const targets = event.Courses?.find((course) => course.id === courseId)?.Targets.find(
    (target) => target.id === targetId
  );

  return targets ?? null;
}
