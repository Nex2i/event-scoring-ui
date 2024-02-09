import { useState, useEffect } from 'react';
import { BullseyeRing, Round } from '@/types/models/tracker/tracker.type';
import { BasicFilledSelect } from '@/libs/ui/form/BasicFilledSelect';
import * as Styled from '../tracking.styles';

type DynamicTableProps = {
  roundData: Round;
  onCellChange: (targetId: string, shotId: string, newValue: string) => void;
  activeTargetId: string;
  activeShotId: string;
};

const DynamicTable = ({ roundData, onCellChange, activeShotId, activeTargetId }: DynamicTableProps) => {
  const [round, setRound] = useState<Round>(roundData);

  useEffect(() => {
    setRound(roundData);
  }, [roundData]);

  if (!round) return <p>NO ACTIVE ROUND</p>;

  const scoreCellOptions = createOptionsFromTarget(
    round.targets.find((target) => target.id === activeTargetId)?.bullseye.rings ?? []
  );

  const handleCellValueChange = (targetId: string, shotId: string, newValue: string) => {
    onCellChange(targetId, shotId, newValue);
  };

  return (
    <Styled.ScoreTableContainer>
      <Styled.Row>
        <Styled.ScoreCell>Target</Styled.ScoreCell>
        {round.targets.length > 0 &&
          round.targets[0].shots.map((shot) => <Styled.ScoreCell key={shot.id}>{shot.name}</Styled.ScoreCell>)}
      </Styled.Row>
      {round.targets.map((target, targetIndex) => (
        <Styled.Row key={targetIndex}>
          <Styled.ScoreCell>{target.name}</Styled.ScoreCell>
          {target.shots.map((shot, shotIndex) => {
            return (
              <Styled.ScoreCell
                key={shotIndex}
                style={{ cursor: 'pointer' }}
                active={(activeTargetId === target.id && activeShotId === shot.id).toString()}
              >
                <BasicFilledSelect
                  value={shot.score ? shot.score.toString() : ''}
                  onValueChange={(updatedValue: string) => handleCellValueChange(target.id, shot.id, updatedValue)}
                  options={scoreCellOptions}
                />
              </Styled.ScoreCell>
            );
          })}
        </Styled.Row>
      ))}
    </Styled.ScoreTableContainer>
  );
};

export default DynamicTable;

function createOptionsFromTarget(target: BullseyeRing[]): { value: string | number; displayName?: string }[] {
  return target.map((ring) => ({ value: ring.score, displayName: ring.score.toString() }));
}
