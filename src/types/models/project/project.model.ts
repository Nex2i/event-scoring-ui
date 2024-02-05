import { IBaseModel } from '../base.model';

export interface ProjectModel extends IBaseModel {
  id: string;
  userId: string;
  aircraftId: string;
  name: string;
  number: string;
  zipCode: string;
}
