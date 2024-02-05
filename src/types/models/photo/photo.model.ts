import { IBaseModel } from '../base.model';

export interface PhotoModel extends IBaseModel {
  id: string;
  logId: string;
  url: string;
  name: string;
  description: string;
}
