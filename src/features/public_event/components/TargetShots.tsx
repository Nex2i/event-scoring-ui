import { FC, useState } from 'react';
import { TargetModel } from '@/types/models/target/target.model';
import { BasicFilledSelect } from '@/libs/ui/form/BasicFilledSelect';
import { BullseyeRing } from '@/types/models/tracker/tracker.type';
import { useAppDispatch } from '@/stores/store.hooks';
import { recordScore } from '@/stores/slices/PublicEvent.slice';
import * as Styled from '../publicEvent.styles';

interface TargetShotsProps {
  target: TargetModel;
  rings?: BullseyeRing[];
}

export const TargetShots: FC<TargetShotsProps> = ({ target, rings }) => {
  const [activeShotId, setActiveShotId] = useState(target.Shots[0].id);
  const dispatch = useAppDispatch();

  const scoreCellOptions = shotValueOptions(rings);

  const recordShot = (shotId: string, newValue: string) => {
    const currentShotIndex = target.Shots.findIndex((shot) => shot.id === shotId);
    if (currentShotIndex === -1) return;

    const isLastShot = currentShotIndex === target.Shots.length - 1;
    if (isLastShot) return;

    const nextShotId = target.Shots[currentShotIndex + 1].id;

    dispatch(
      recordScore({
        courseId: target.courseId,
        targetId: target.id,
        shotId,
        score: parseInt(newValue),
      })
    );

    setActiveShotId(nextShotId);
  };

  return target.Shots.map((shot, shotIndex) => {
    return (
      <Styled.ScoreCell
        key={shotIndex}
        style={{ cursor: 'pointer' }}
        active={(activeShotId === shot.id).toString()}
      >
        <BasicFilledSelect
          value={shot.value ? shot.value.toString() : ''}
          onValueChange={(updatedValue: string) => recordShot(shot.id, updatedValue)}
          options={scoreCellOptions}
        />
      </Styled.ScoreCell>
    );
  });
};

function shotValueOptions(rings?: BullseyeRing[]): { value: string }[] {
  if (!rings) return [];
  return rings.map((ring) => ({ value: ring.value.toString() }));
}
