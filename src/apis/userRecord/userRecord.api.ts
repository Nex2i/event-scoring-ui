import { UserCourseDataModel } from '@/types/models/userInteraction/userCourseData.model';
import { BaseRepository } from '../base.repository';
import HttpClient from '@/libs/http/http.client';
import localStorageRepository from '@/utils/localStorage.repository';

export class UserRecordApi extends BaseRepository {
  submitCourse = async (payload: UserCourseDataModel): Promise<void> => {
    return HttpClient.post(`${this.apiUrl}/api/user-record/course/submit`, payload);
  };
}
