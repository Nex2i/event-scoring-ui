import { CourseModel, CourseModelCreate } from '@/types/models/course/course.model';
import { BaseRepository } from '../base.repository';
import HttpClient from '@/libs/http/http.client';

export class CourseApi extends BaseRepository {
  createCourse = async (course: CourseModelCreate): Promise<{ course: CourseModel }> => {
    return HttpClient.post(`${this.apiUrl}/api/course/`, course);
  };
}
