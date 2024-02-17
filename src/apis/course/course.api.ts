import { CourseModel, CourseModelCreate } from '@/types/models/course/course.model';
import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class CourseApi extends BaseRepository {
  createCourse = async (course: CourseModelCreate): Promise<{ course: CourseModel }> => {
    return HttpClient.post(`${this.apiUrl}/api/course/`, course);
  };
}
