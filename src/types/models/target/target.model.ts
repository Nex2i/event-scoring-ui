import { IBaseModel } from '../base.model';
import { ShotModel } from '../shot/shot.model';

export interface TargetModel extends IBaseModel {
  name: string;
  distance: number;
  targetTypeId: string;
  shots: ShotModel[];
}
