import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';
import { EventModel, EventModelCreate } from '@/types/models/event/event.model';

export class EventApi extends BaseRepository {
  getEventsByCompanyId = async (companyId: string): Promise<{ events: EventModel[] }> => {
    return HttpClient.get(`${this.apiUrl}/api/event?companyId=${companyId}`);
  };

  getEvent = async (eventId: string): Promise<{ event: EventModel }> => {
    return HttpClient.get(`${this.apiUrl}/api/event/${eventId}`);
  };

  createEvent = async (event: EventModelCreate): Promise<{ event: EventModel }> => {
    console.log('event', event);
    return HttpClient.post(`${this.apiUrl}/api/event/`, event);
  };

  updateEvent = async (_eventId: string, _event: any) => {
    return HttpClient.put(`${this.apiUrl}/api/event/`);
  };

  deleteEvent = async (_eventId: string) => {
    return HttpClient.delete(`${this.apiUrl}/api/event/`);
  };
}
