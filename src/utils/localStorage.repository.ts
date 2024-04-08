import { Round } from '@/types/models/tracker/tracker.type';
import { EventModel } from '@/types/models/event/event.model';
import { UserCourseDataModel } from '@/types/models/userInteraction/userCourseData.model';
import { IGuestAuthentication } from '@/stores/sliceTypes/Authentication.type';
import { getLocal, LocalKeys, removeLocal, setLocal } from './localStorage';

class LocalStorageRepository {
  public getUserToken(): string | null {
    const adminToken = this.getAdminUserToken();
    const guestToken = this.getGuestUserToken();
    if (adminToken) return adminToken;
    if (guestToken) return guestToken;
    return null;
  }
  public getAdminUserToken(): string | null {
    const userToken = getLocal(LocalKeys.ADMIN_USER_TOKEN);
    if (userToken) return userToken;
    return null;
  }

  public getGuestUserToken(): string | null {
    const userToken = getLocal(LocalKeys.GUEST_USER_TOKEN);
    if (userToken) return userToken;
    return null;
  }

  public setUserToken(userToken: string): void {
    setLocal(LocalKeys.ADMIN_USER_TOKEN, userToken);
  }

  public setGuestUserToken(userToken: string): void {
    setLocal(LocalKeys.GUEST_USER_TOKEN, userToken);
  }

  public setGuestPayload(payload: IGuestAuthentication): void {
    payload.localCacheSetDate = new Date();
    setLocal(LocalKeys.GUEST_PAYLOAD, JSON.stringify(payload));
  }

  public getGuestPayload(): IGuestAuthentication | null {
    const guestPayload = getLocal(LocalKeys.GUEST_PAYLOAD);
    if (guestPayload) {
      const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const cachePayload = JSON.parse(guestPayload) as IGuestAuthentication;
      if (!cachePayload.localCacheSetDate || cachePayload.localCacheSetDate <= oneDayAgo) {
        removeLocal(LocalKeys.GUEST_PAYLOAD);
        return null;
      }

      return cachePayload;
    }
    return null;
  }

  public deleteUserToken(): void {
    removeLocal(LocalKeys.ACTIVE_LOCATION);
    removeLocal(LocalKeys.ADMIN_USER_TOKEN);
  }

  public getActiveRound(): Round | null {
    const activeRound = getLocal(LocalKeys.ACTIVE_ROUND);
    if (activeRound) return JSON.parse(activeRound) as Round;
    return null;
  }

  public setActiveRound(round: Round): void {
    setLocal(LocalKeys.ACTIVE_ROUND, JSON.stringify(round));
  }

  public setActivePublicEvent(event: EventModel): void {
    setLocal(event.id, JSON.stringify(event));
  }

  public setPublicEventUsername(username: string): void {
    setLocal(LocalKeys.PUBLIC_EVENT_USERNAME, username);
  }

  public setPublicEventPoolUsernames(poolUsernames: string[]): void {
    setLocal(LocalKeys.PUBLIC_EVENT_POOL_USERNAMES, JSON.stringify(poolUsernames));
  }

  public setUserCourseData(
    courseId: string,
    userCourseData: Record<string, UserCourseDataModel>
  ): void {
    setLocal(courseId, JSON.stringify(userCourseData));
  }

  public getPublicEventUsername(): string | null {
    const username = getLocal(LocalKeys.PUBLIC_EVENT_USERNAME);
    if (username) return username;
    return null;
  }

  public getPublicEventPoolUsernames(): string[] | null {
    const poolUsernames = getLocal(LocalKeys.PUBLIC_EVENT_POOL_USERNAMES);
    if (poolUsernames) return JSON.parse(poolUsernames) as string[];
    return null;
  }

  public getUserCourseData(courseId: string): Record<string, UserCourseDataModel> | null {
    const courseData = getLocal(courseId);
    if (courseData) return JSON.parse(courseData) as Record<string, UserCourseDataModel>;
    return null;
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
