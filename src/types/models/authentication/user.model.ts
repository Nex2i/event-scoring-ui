import { USER_TYPE } from '@/stores/sliceTypes/Authentication.type';
import { IBaseModel } from '../base.model';

export interface UserModel extends IBaseModel {
  userId: string;
  phoneNumber: string | null;
  token: string;
  email: string;
  companyId: string;
  userType: USER_TYPE;
}
