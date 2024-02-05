import { IBaseModel } from '../base.model';
import { PhotoModel } from '../photo/photo.model';

export interface LogModel extends IBaseModel {
  id: string;
  projectId: string;
  section: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  photos: PhotoModel[];
}
