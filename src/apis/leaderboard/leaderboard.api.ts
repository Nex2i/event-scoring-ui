import HttpClient from '@/libs/http/http.client';
import {
  LeaderboardAverageUserShot,
  LeaderboardCourseRecord,
} from '@/types/models/leaderboard/leaderboard.type';
import { BaseRepository } from '../base.repository';

interface AdminResponse {
  courseRecords: LeaderboardCourseRecord[];
  averageUserShot: LeaderboardAverageUserShot[];
}

export class LeaderboardApi extends BaseRepository {
  getAdminLeaderboard = async (eventId: string): Promise<AdminResponse> => {
    return HttpClient.get(`${this.apiUrl}/api/leaderboard/admin?eventId=${eventId}`);
  };
  getGuestLeaderboard = async (eventId: string): Promise<LeaderboardCourseRecord[]> => {
    return HttpClient.get(`${this.apiUrl}/api/leaderboard/guest?eventId=${eventId}`);
  };
}
