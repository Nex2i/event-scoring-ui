import { PhotoModel } from '@/types/models/photo/photo.model';

export class NewLogPayload {
  projectId: string = '';
  section: string = '';
  title: string = '';
  description: string = '';
  startTime: string = '';
  endTime: string = '';
  photos: PhotoModel[] = [];
}
