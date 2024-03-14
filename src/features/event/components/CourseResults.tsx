import { FC } from 'react';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useAdminLeaderboard } from '@/hooks/leaderboard/useAdminLeaderboard.hook';
import * as Styled from '../event.styles';
import { CourseStats } from './CourseStats';
import { AdminLeaderboard } from './AdminLeaderboard';

interface CourseResultsProps {
  eventId: string;
}

export const CourseResults: FC<CourseResultsProps> = ({ eventId }) => {
  const {
    isFetching: isLeaderboardFetching,
    userLeaderboard,
    targetAverages,
  } = useAdminLeaderboard(eventId);

  if (isLeaderboardFetching) return <LoadingComponent />;
  return (
    <Styled.SpreadRow width="100%">
      <CourseStats averages={targetAverages} />
      <AdminLeaderboard leaderBoard={userLeaderboard} />
    </Styled.SpreadRow>
  );
};
