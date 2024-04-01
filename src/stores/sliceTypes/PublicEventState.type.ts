import { EventModel } from '@/types/models/event/event.model';
import { UserCourseDataModel } from '@/types/models/userInteraction/userCourseData.model';

export class PublicEventState {
  activeEvent?: EventModel;
  activeShotId?: string;
  userCourseData?: Record<string, UserCourseDataModel>;
  poolNames: string[] = [];
  totalTargetScore: number = 0;
  activeUsername: string = '';
}

export interface RecordShotPayload {
  courseId: string;
  targetId: string;
  shotId: string;
  score: number;
}
