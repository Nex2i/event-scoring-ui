import { IBaseModel } from '../base.model';

export interface EventModel extends IBaseModel {
  id: string;
  companyId: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface EventModelCreate {
  companyId: string;
  name: string;
  startDate: Date;
  endDate: Date;
}
