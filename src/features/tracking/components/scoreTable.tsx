import { useState, useEffect } from 'react';
import { Round } from '@/types/models/tracker/tracker.type';
import * as Styled from '../tracking.styles';

type DynamicTableProps = {
  roundData: Round;
  onCellClick: (targetId: string, shotId: string) => void;
  activeTargetId: string;
  activeShotId: string;
};

const DynamicTable = ({ roundData, onCellClick, activeShotId, activeTargetId }: DynamicTableProps) => {
  const [round, setRound] = useState<Round>(roundData);

  useEffect(() => {
    setRound(roundData);
  }, [roundData]);

  if (!round) return <p>NO ACTIVE ROUND</p>;

  return (
    <Styled.ScoreTableContainer>
      <Styled.Column>
        <Styled.Row>
          <Styled.ScoreCell>Target</Styled.ScoreCell>
          {round.targets.length > 0 &&
            round.targets[0].shots.map((shot) => <Styled.ScoreCell key={shot.id}>{shot.name}</Styled.ScoreCell>)}
        </Styled.Row>
        {round.targets.map((target, targetIndex) => (
          <Styled.Row key={targetIndex}>
            <Styled.ScoreCell>{target.name}</Styled.ScoreCell>
            {target.shots.map((shot, shotIndex) => (
              <Styled.ScoreCell
                key={shotIndex}
                onClick={() => onCellClick(target.id, shot.id)}
                style={{ cursor: 'pointer' }}
                active={activeTargetId === target.id && activeShotId === shot.id}
              >
                {shot.score ? shot.score : '-'}
              </Styled.ScoreCell>
            ))}
          </Styled.Row>
        ))}
      </Styled.Column>
    </Styled.ScoreTableContainer>
  );
};

export default DynamicTable;
