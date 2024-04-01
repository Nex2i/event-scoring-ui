import { UserCourseDataModel } from '@/types/models/userInteraction/userCourseData.model';
import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class UserRecordApi extends BaseRepository {
  submitCourse = async (payload: Record<string, UserCourseDataModel>): Promise<void> => {
    return HttpClient.post(`${this.apiUrl}/api/user-record/course/submit`, payload);
  };
}
