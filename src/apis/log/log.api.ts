import HttpClient from '@/libs/http/http.client';
import { LogModel } from '@/types/models/log/log.model';
import { BaseRepository } from '../base.repository';
import { NewLogPayload } from './NewLogPayload';

interface ILogApi {}

export class LogApi extends BaseRepository implements ILogApi {
  getLogs = async (projectId?: string): Promise<LogModel[]> => {
    return HttpClient.get(`${this.apiUrl}/api/log/v1?projectId=${projectId ? projectId : ''}`);
  };
  createLog = async (payload: NewLogPayload): Promise<LogModel> => {
    return HttpClient.post(`${this.apiUrl}/api/log/v1`, payload);
  };
}
