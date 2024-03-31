export interface IAuthenticationState {
  userId: string;
  phoneNumber: string | null;
  token: string;
  email: string;
  companyId: string;
  userType: USER_TYPE;
}

export interface IGuestAuthentication {
  token: string;
  companyId: string;
  userType: USER_TYPE;
  userId: string;
  localCacheSetDate?: Date;
}

export enum USER_TYPE {
  GUEST,
  ADMIN,
}
