import { Round } from '@/types/models/tracker/tracker.type';
import { useState, useEffect } from 'react';

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

  console.log('target0', round.targets[0]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Target</th>
            {round.targets.length > 0 && round.targets[0].shots.map((shot) => <th key={shot.id}>{shot.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {round.targets.map((target, targetIndex) => (
            <tr key={target.id}>
              <th>{target.name}</th>
              {target.shots.map((shot, shotIndex) => (
                <td key={shot.id} onClick={() => onCellClick(target.id, shot.id)} style={{ cursor: 'pointer' }}>
                  {shot.score ? shot.score : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
