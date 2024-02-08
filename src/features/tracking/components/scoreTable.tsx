import { useState, useEffect } from 'react';
import { Round } from '@/types/models/tracker/tracker.type';
import * as Styled from '../tracking.styles';

type DynamicTableProps = {
  roundData: Round;
  onCellClick: (targetId: string, shotId: string) => void;
};

const DynamicTable = ({ roundData, onCellClick }: DynamicTableProps) => {
  const [round, setRound] = useState<Round>(roundData);

  useEffect(() => {
    setRound(roundData);
  }, [roundData]);

  if (!round) return <p>NO ACTIVE ROUND</p>;

  return (
    <Styled.Column>
      <Styled.Row>
        <p>Target</p>
        {round.targets.length > 0 && round.targets[0].shots.map((shot) => <p key={shot.id}>{shot.name}</p>)}
      </Styled.Row>
      {round.targets.map((target, targetIndex) => (
        <Styled.Row key={targetIndex}>
          <p>{target.name}</p>
          {target.shots.map((shot, shotIndex) => (
            <p key={shotIndex} onClick={() => onCellClick(target.id, shot.id)} style={{ cursor: 'pointer' }}>
              {shot.score ? shot.score : '-'}
            </p>
          ))}
        </Styled.Row>
      ))}
    </Styled.Column>
  );
};

export default DynamicTable;
