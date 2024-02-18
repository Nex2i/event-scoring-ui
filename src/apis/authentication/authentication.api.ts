import { BaseRepository } from '@/apis/base.repository';
import HttpClient from '@/libs/http/http.client';
import { UserModel } from '@/types/models/authentication/user.model';
import { RegisterUserPayload } from './RegisterUserPayload';

interface IAuthenticationApi {
  login: (username: string, password: string) => Promise<{ user: UserModel }>;
  registerNewUser: (user: RegisterUserPayload) => Promise<{ user: UserModel }>;
  logout: () => Promise<void>;
}

export class AuthenticationApi extends BaseRepository implements IAuthenticationApi {
  login = async (email: string, password: string): Promise<{ user: UserModel }> => {
    return HttpClient.post(`${this.apiUrl}/api/auth/login`, {
      email,
      password,
    });
  };

  getLoggedInUser = async (): Promise<{ user: UserModel }> => {
    return HttpClient.get(`${this.apiUrl}/api/auth`);
  };

  createGuestUser = async (eventId: string): Promise<{ user: UserModel }> => {
    return HttpClient.post(`${this.apiUrl}/api/user/guest/${eventId}`);
  };

  registerNewUser = async (user: RegisterUserPayload): Promise<{ user: UserModel }> => {
    return HttpClient.post(`${this.apiUrl}/api/auth/register`, { ...user });
  };

  logout = async (): Promise<void> => {
    return HttpClient.delete(`${this.apiUrl}/api/auth/logout`);
  };
}
