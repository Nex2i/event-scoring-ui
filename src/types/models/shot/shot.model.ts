import { IBaseModel } from '../base.model';

export interface ShotModel extends IBaseModel {
  id: string;
  value: number;
}

export interface ShotModelCreate {}
