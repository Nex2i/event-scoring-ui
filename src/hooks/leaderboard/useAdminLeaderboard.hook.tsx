import { ApiContext } from '@/apis/api.context';
import {
  LeaderboardAverageUserShot,
  LeaderboardCourseRecord,
} from '@/types/models/leaderboard/leaderboard.type';
import { useContext, useEffect, useState } from 'react';

interface hookResponse {
  isFetching: boolean;
  userLeaderboard: LeaderboardCourseRecord[] | null;
  targetAverages: LeaderboardAverageUserShot[] | null;
}

export const useAdminLeaderboard = (eventId: string): hookResponse => {
  const [isFetching, setIsFetching] = useState(false);
  const [userLeaderboard, setUserLeaderboard] = useState<LeaderboardCourseRecord[] | null>(null);
  const [targetAverages, setTargetAverages] = useState<LeaderboardAverageUserShot[] | null>(null);
  const { leaderboardApi } = useContext(ApiContext);

  useEffect(() => {
    let isMounted = true;
    if (!eventId) return;

    setIsFetching(true);

    leaderboardApi
      .getAdminLeaderboard(eventId)
      .then((res) => {
        if (isMounted) {
          setUserLeaderboard(res.courseRecords);
          setTargetAverages(res.averageUserShot);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [eventId]);
  return {
    isFetching,
    userLeaderboard,
    targetAverages,
  };
};
