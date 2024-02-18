import { IBaseModel } from '../base.model';
import { ShotModel, ShotModelCreate } from '../shot/shot.model';

export interface TargetModel extends IBaseModel {
  id: string;
  courseId: string;
  name: string;
  distance: number;
  targetTypeId: string;
  Shots: ShotModel[];
}

export interface TargetModelCreate {
  name: string;
  distance: number;
  targetTypeId: string;
  shots: ShotModelCreate[];
}
