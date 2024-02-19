import { Round } from '@/types/models/tracker/tracker.type';
import { EventModel } from '@/types/models/event/event.model';
import { UserCourseDataModel } from '@/types/models/userInteraction/userCourseData.model';
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

  public setActivePublicEvent(event: EventModel): void {
    setLocal(event.id, JSON.stringify(event));
  }

  public setPublicEventUsername(username: string): void {
    setLocal(LocalKeys.PUBLIC_EVENT_USERNAME, username);
  }

  public setUserCourseData(userCourseData: UserCourseDataModel): void {
    setLocal(userCourseData.courseId, JSON.stringify(userCourseData));
  }

  public getPublicEventUsername(): string | null {
    const username = getLocal(LocalKeys.PUBLIC_EVENT_USERNAME);
    if (username) return username;
    return null;
  }

  public getUserCourseData(courseId: string): UserCourseDataModel | null {
    const courseData = getLocal(courseId);
    if (courseData) return JSON.parse(courseData) as UserCourseDataModel;
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
