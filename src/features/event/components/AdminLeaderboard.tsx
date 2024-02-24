import { Card } from '@mui/material';
import { FC } from 'react';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useAdminLeaderboard } from '@/hooks/leaderboard/useAdminLeaderboard.hook';
import * as Styled from '../event.styles';
import { CourseStats } from './CourseStats';

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
    <Styled.Row>
      {targetAverages && <CourseStats averages={targetAverages} />}
      <Card>
        UserLeaderboard:
        {userLeaderboard?.map((record) => (
          <div key={record.id}>
            <p>User Id: {record.User.id}</p>
            <p>Score: {record.totalScore}</p>
          </div>
        ))}
      </Card>
    </Styled.Row>
  );
};
