import { IBaseModel } from '../base.model';
import { CourseModel } from '../course/course.model';

export interface EventModel extends IBaseModel {
  id: string;
  companyId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  Courses?: CourseModel[];
}

export interface EventModelCreate {
  companyId: string;
  name: string;
  startDate: Date;
  endDate: Date;
}
