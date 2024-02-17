import HttpClient from '@/libs/http/http.client';
import { Bullseye } from '@/types/models/tracker/tracker.type';
import { BaseRepository } from '../base.repository';

export class TargetApi extends BaseRepository {
  getTargetRingsByTypeId = async (targetTypeId: string): Promise<{ rings: Bullseye }> => {
    return HttpClient.get(`${this.apiUrl}/api/target-type/${targetTypeId}`);
  };
  getTargetRingsByTargetId = async (targetId: string): Promise<{ rings: Bullseye }> => {
    return HttpClient.get(`${this.apiUrl}/api/target-type?targetId=${targetId}`);
  };
}
