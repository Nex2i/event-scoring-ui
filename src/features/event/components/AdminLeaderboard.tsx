import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useAdminLeaderboard } from '@/hooks/leaderboard/useAdminLeaderboard.hook';
import { Card } from '@mui/material';
import { FC } from 'react';
import * as Styled from '../event.styles';

interface AdminLeaderboardProps {
  eventId: string;
}

export const AdminLeaderboard: FC<AdminLeaderboardProps> = ({ eventId }) => {
  const {
    isFetching: isLeaderboardFetching,
    userLeaderboard,
    targetAverages,
  } = useAdminLeaderboard(eventId);

  if (isLeaderboardFetching) return <LoadingComponent />;
  return (
    <Styled.Column>
      <Card>
        TargetAverages:
        {targetAverages?.map((average) => (
          <div key={average.targetId}>
            <p>{average.targetName}</p>
            <p>{average.averageScore}</p>
          </div>
        ))}
      </Card>
      <Card>
        UserLeaderboard:
        {userLeaderboard?.map((record) => (
          <div key={record.id}>
            <p>User Id: {record.User.id}</p>
            <p>Score: {record.totalScore}</p>
          </div>
        ))}
      </Card>
    </Styled.Column>
  );
};
