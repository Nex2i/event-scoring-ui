import { FC } from 'react';
import { TargetModel } from '@/types/models/target/target.model';
import { BasicFilledSelect } from '@/libs/ui/form/BasicFilledSelect';
import { BullseyeRing } from '@/types/models/tracker/tracker.type';
import { useAppDispatch } from '@/stores/store.hooks';
import {
  publicEventSelector,
  recordScore,
  setActiveShotId,
} from '@/stores/slices/PublicEvent.slice';
import { UserCourseDataModel } from '@/types/models/userInteraction/userCourseData.model';
import * as Styled from '../publicEvent.styles';

interface TargetShotsProps {
  target: TargetModel;
  rings?: BullseyeRing[];
}

export const TargetShots: FC<TargetShotsProps> = ({ target, rings }) => {
  const dispatch = useAppDispatch();
  const { userCourseData, activeShotId } = publicEventSelector();

  const scoreCellOptions = shotValueOptions(rings);

  const recordShot = (shotId: string, newValue: string) => {
    const currentShotIndex = target.Shots.findIndex((shot) => shot.id === shotId);
    if (currentShotIndex === -1) return;

    dispatch(
      recordScore({
        courseId: target.courseId,
        targetId: target.id,
        shotId,
        score: parseInt(newValue),
      })
    );

    const isLastShot = currentShotIndex === target.Shots.length - 1;
    if (isLastShot) return;

    const nextShotId = target.Shots[currentShotIndex + 1].id;

    dispatch(setActiveShotId(nextShotId));
  };

  return target.Shots.map((shot, shotIndex) => {
    return (
      <Styled.ScoreCell
        key={shotIndex}
        style={{ cursor: 'pointer' }}
        active={(activeShotId === shot.id).toString()}
      >
        <BasicFilledSelect
          value={getUserValue(target.id, shot.id, userCourseData)}
          onValueChange={(updatedValue: string) => recordShot(shot.id, updatedValue)}
          options={scoreCellOptions}
        />
      </Styled.ScoreCell>
    );
  });
};

function getUserValue(
  targetId: string,
  shotId: string,
  userCourseData?: UserCourseDataModel
): string | null {
  if (!userCourseData) return null;
  const target = userCourseData.targets.find((target) => target.targetId === targetId) ?? 0;
  if (!target) return null;

  const shot = target.shots.find((shot) => shot.shotId === shotId);
  return shot?.score.toString() ?? null;
}

function shotValueOptions(rings?: BullseyeRing[]): { value: string }[] {
  if (!rings) return [];
  return rings.map((ring) => ({ value: ring.value.toString() }));
}
