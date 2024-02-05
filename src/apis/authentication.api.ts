import { User } from '@auth0/auth0-react';
import { BaseRepository } from '@/apis/base.repository';
import HttpClient from '@/libs/http/http.client';
import { UserModel } from '@/types/models/authentication/user.model';

interface IAuthenticationApi {
  login: (id: string) => Promise<UserModel>;
  registerNewUser: (user: User) => Promise<UserModel>;
  logout: () => Promise<void>;
}

export class AuthenticationApi extends BaseRepository implements IAuthenticationApi {
  login = async (id: string): Promise<UserModel> => {
    return HttpClient.get(`${this.apiUrl}/api/auth/v1/open/${id}`);
  };

  registerNewUser = async (user: User): Promise<UserModel> => {
    return HttpClient.post(`${this.apiUrl}/api/auth/v1/open/user`, { ...user });
  };

  logout = async (): Promise<void> => {
    return HttpClient.delete(`${this.apiUrl}/api/auth/v1/open/logout`);
  };
}
