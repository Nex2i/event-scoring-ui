import { BaseRepository } from '@/apis/base.repository';
import HttpClient from '@/libs/http/http.client';
import { UserModel } from '@/types/models/authentication/user.model';
import { RegisterUserPayload } from './RegisterUserPayload';
import { RegisterUserResponse } from './RegisterUserResponse';
import { AuthResponse } from './AuthResponse';

interface IAuthenticationApi {
  login: (username: string, password: string) => Promise<AuthResponse<UserModel>>;
  registerNewUser: (user: RegisterUserPayload) => Promise<AuthResponse<RegisterUserResponse>>;
  logout: () => Promise<void>;
}

export class AuthenticationApi extends BaseRepository implements IAuthenticationApi {
  login = async (email: string, password: string): Promise<AuthResponse<UserModel>> => {
    return HttpClient.post(`${this.apiUrl}/api/auth/login`, {
      email,
      password,
    });
  };

  getLoggedInUser = async (): Promise<AuthResponse<UserModel>> => {
    return HttpClient.get(`${this.apiUrl}/api/auth`);
  };

  createGuestUser = async (eventId: string): Promise<AuthResponse<UserModel>> => {
    return HttpClient.post(`${this.apiUrl}/api/user/guest/${eventId}`);
  };

  registerNewUser = async (
    user: RegisterUserPayload
  ): Promise<AuthResponse<RegisterUserResponse>> => {
    return HttpClient.post(`${this.apiUrl}/api/auth/register`, { ...user });
  };

  logout = async (): Promise<void> => {
    return HttpClient.delete(`${this.apiUrl}/api/auth/logout`);
  };
}
