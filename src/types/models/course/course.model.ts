import { IBaseModel } from '../base.model';
import { TargetModel } from '../target/target.model';

export interface CourseModel extends IBaseModel {
  id: string;
  name: string;
  eventId: string;
  Targets: TargetModel[];
}

export interface CourseModelCreate {
  name: string;
  eventId: string;
  targets: TargetModel[];
}
