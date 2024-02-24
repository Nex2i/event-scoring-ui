import { LeaderboardCourseRecord } from '@/types/models/leaderboard/leaderboard.type';
import { LeaderboardTableData } from './types';

export function mapLeaderboardToTableData(
  leaderBoard: LeaderboardCourseRecord[]
): LeaderboardTableData[] {
  return leaderBoard.map((record, i) => ({
    rank: i + 1,
    username: record.username,
    score: record.totalScore,
    userId: record.userId,
  }));
}
