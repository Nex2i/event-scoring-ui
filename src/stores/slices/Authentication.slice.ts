import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticationState, USER_TYPE } from '@/stores/sliceTypes/Authentication.type';
import { useAppSelector } from '@/stores/store.hooks';
import localStorageRepository from '@/utils/localStorage.repository';

export const initialAuthenticationState: IAuthenticationState = {
  userId: '',
  phoneNumber: null,
  token: '',
  email: '',
  companyId: '',
  userType: USER_TYPE.GUEST,
};

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: initialAuthenticationState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<IAuthenticationState>) => {
      localStorageRepository.setUserToken(action.payload.token);
      Object.assign(state, action.payload);
    },
    removeAuthentication: (state) => {
      localStorageRepository.deleteUserToken();
      Object.assign(state, initialAuthenticationState);
    },
  },
});

export const authenticationSelector = () => useAppSelector((store) => store.authentication);

export const { setAuthentication, removeAuthentication } = authenticationSlice.actions;

export default authenticationSlice.reducer;
