import { FC } from 'react';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useLogs } from '@/hooks/logs/useLogs.hook';
import { LogListItem } from './LogListItem';

interface LogListProps {}

export const LogList: FC<LogListProps> = ({}) => {
  const { logs, isFetching } = useLogs({});

  if (isFetching) return <LoadingComponent loadingText="Fetching Logs" />;

  if (!logs.length) return <div> No Logs Found </div>;

  return (
    <div>
      {logs.map((log) => (
        <LogListItem log={log} key={log.id} />
      ))}
    </div>
  );
};
