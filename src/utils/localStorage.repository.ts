import { Round } from '@/types/models/tracker/tracker.type';
import { EventModel } from '@/types/models/event/event.model';
import { getLocal, LocalKeys, removeLocal, setLocal } from './localStorage';

class LocalStorageRepository {
  public getUserToken(): string | null {
    const userToken = getLocal(LocalKeys.USER_TOKEN);
    if (userToken) return userToken;
    return null;
  }

  public setUserToken(userToken: string): void {
    setLocal(LocalKeys.USER_TOKEN, userToken);
  }

  public deleteUserToken(): void {
    removeLocal(LocalKeys.ACTIVE_LOCATION);
    removeLocal(LocalKeys.USER_TOKEN);
  }

  public getActiveRound(): Round | null {
    const activeRound = getLocal(LocalKeys.ACTIVE_ROUND);
    if (activeRound) return JSON.parse(activeRound) as Round;
    return null;
  }

  public setActiveRound(round: Round): void {
    setLocal(LocalKeys.ACTIVE_ROUND, JSON.stringify(round));
  }

  setActivePublicEvent(event: EventModel): void {
    setLocal(event.id, JSON.stringify(event));
  }

  getActivePublicEvent(eventId: string): EventModel | null {
    const event = getLocal(eventId);
    if (event) return JSON.parse(event) as EventModel;
    return null;
  }

  public deleteActiveRound(): void {
    removeLocal(LocalKeys.ACTIVE_ROUND);
  }

  public resetActiveLogoAndLocation(): void {
    removeLocal(LocalKeys.ACTIVE_LOGO);
    removeLocal(LocalKeys.ACTIVE_LOCATION);
  }
}

export default new LocalStorageRepository();
