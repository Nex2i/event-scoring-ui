import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bullseye as BullseyeType } from '@/types/models/tracker/tracker.type';
import { Bullseye } from '@/features/tracking/components/bullseye';
import { EventModel } from '@/types/models/event/event.model';
import { useTargetTypeHook } from '@/hooks/target/useTargetType.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { TargetModel } from '@/types/models/target/target.model';
import * as Styled from '../publicEvent.styles';
import { BasicFilledSelect } from '@/libs/ui/form/BasicFilledSelect';

interface PublicTargetProps {
  event: EventModel;
}

export const PublicTarget: FC<PublicTargetProps> = ({ event }) => {
  const [activeShotId, setActiveShotId] = useState();
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };
  const { isFetching, bullseye } = useTargetTypeHook({ targetId });
  const target = getTargetFromEvent(event, courseId, targetId);

  const bullseyeClick = (shotScore: number) => {
    console.log('bullseyeClick', shotScore);
  };

  const recordShot = (shotId: string, newValue: string) => {};

  if (isFetching) return <LoadingComponent />;
  if (!target) return <p>Could Not Find Target</p>;
  const scoreCellOptions = shotValueOptions(bullseye);
  return (
    <div>
      {!bullseye || !bullseye.rings.length ? (
        <p>Target Not Found</p>
      ) : (
        <Bullseye onClick={bullseyeClick} activeTargetId={targetId} rings={bullseye?.rings} />
      )}
      <p>Distance: {target.distance}</p>
      {target.Shots.map((shot, shotIndex) => {
        return (
          <Styled.ScoreCell
            key={shotIndex}
            style={{ cursor: 'pointer' }}
            active={(targetId === target.id && activeShotId === shot.id).toString()}
          >
            <BasicFilledSelect
              value={shot.value ? shot.value.toString() : ''}
              onValueChange={(updatedValue: string) => recordShot(shot.id, updatedValue)}
              options={scoreCellOptions}
            />
          </Styled.ScoreCell>
        );
      })}
    </div>
  );
};

function shotValueOptions(bullseye?: BullseyeType): { value: string }[] {
  if (!bullseye) return [];
  return bullseye.rings.map((ring) => ({ value: ring.value.toString() }));
}

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
