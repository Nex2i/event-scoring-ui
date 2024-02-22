import { UserModel } from '@/types/models/authentication/user.model';

export interface RegisterUserResponse extends UserModel {
  checkoutUrl: string;
}
