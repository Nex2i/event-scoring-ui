export interface LeaderboardCourseRecord {
  id: string;
  userId: string;
  courseId: string;
  totalScore: number;
  dateCreated: string;
  dateUpdated: string;
  User: LeaderboardUser;
}

export interface LeaderboardUser {
  id: string;
  type: string;
  companyId: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface LeaderboardAverageUserShot {
  targetId: string;
  targetName: string;
  orderIndex: number;
  averageScore: number;
}
