import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bullseye } from '@/features/tracking/components/bullseye';
import { EventModel } from '@/types/models/event/event.model';
import { useTargetTypeHook } from '@/hooks/target/useTargetType.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { TargetModel } from '@/types/models/target/target.model';
import {
  publicEventSelector,
  recordScore,
  setActiveShotId,
} from '@/stores/slices/PublicEvent.slice';
import { NextTargetButton } from '../components/NextTargetButton';
import { TargetShots } from '../components/TargetShots';
import { useAppDispatch } from '@/stores/store.hooks';

interface PublicTargetProps {
  event: EventModel;
}

export const PublicTarget: FC<PublicTargetProps> = ({ event }) => {
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };
  const { isFetching, bullseye } = useTargetTypeHook({ targetId });
  const dispatch = useAppDispatch();
  const target = getTargetFromEvent(event, courseId, targetId);
  const { userCourseData, activeShotId } = publicEventSelector();
  const { totalScore } = userCourseData ?? { totalScore: 0 };

  useEffect(() => {
    if (target) {
      dispatch(setActiveShotId(target.Shots[0].id));
    }
  }, [targetId]);

  const bullseyeClick = (shotScore: number) => {
    if (!activeShotId || !target) return;

    const currentShotIndex = target.Shots.findIndex((shot) => shot.id === activeShotId);
    if (currentShotIndex === -1) return;

    dispatch(
      recordScore({
        courseId: courseId,
        targetId: targetId,
        shotId: activeShotId,
        score: shotScore,
      })
    );

    const isLastShot = currentShotIndex === target.Shots.length - 1;
    if (isLastShot) return;

    const nextShotId = target.Shots[currentShotIndex + 1].id;

    dispatch(setActiveShotId(nextShotId));
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
