import { ApiContext } from '@/apis/api.context';
import { LeaderboardCourseRecord } from '@/types/models/leaderboard/leaderboard.type';
import { useContext, useEffect, useState } from 'react';

interface hookResponse {
  isFetching: boolean;
  userLeaderboard: LeaderboardCourseRecord[] | null;
}

export const useGuestLeaderboard = (eventId: string): hookResponse => {
  const [isFetching, setIsFetching] = useState(false);
  const [userLeaderboard, setUserLeaderboard] = useState<LeaderboardCourseRecord[] | null>(null);
  const { leaderboardApi } = useContext(ApiContext);

  useEffect(() => {
    let isMounted = true;
    if (!eventId) return;

    setIsFetching(true);

    leaderboardApi
      .getGuestLeaderboard(eventId)
      .then((res) => {
        if (isMounted) {
          setUserLeaderboard(res);
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
  };
};
