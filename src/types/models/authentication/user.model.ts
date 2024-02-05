import { IBaseModel } from '../base.model';

export interface UserModel extends IBaseModel {
  id: string;
  name: string;
  username: string;
  nickname: string;
  email: string;
  picture: string;
  o_auth_sub: string;
}
