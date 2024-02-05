import { FC } from 'react';
import { LogModel } from '@/types/models/log/log.model';

interface LogListItemProps {
  log: LogModel;
}

export const LogListItem: FC<LogListItemProps> = ({ log }) => {
  return (
    <div>
      <div>{log.id}</div>
      <div>{log.title}</div>
      <div>{log.description}</div>
    </div>
  );
};
