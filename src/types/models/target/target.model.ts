import { IBaseModel } from '../base.model';
import { ShotModel } from '../shot/shot.model';

export interface TargetModel extends IBaseModel {
  id: string;
  name: string;
  distance: number;
  targetTypeId: string;
  Shots: ShotModel[];
}
