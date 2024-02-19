export interface UserCourseDataModel {
  courseId: string;
  totalScore: number;
  username: string;
  targets: UserTargetDataModel[];
}

export interface UserTargetDataModel {
  targetId: string;
  totalScore: number;
  shots: UserShotDataModel[];
}

export interface UserShotDataModel {
  shotId: string;
  score: number;
  time: Date;
}
