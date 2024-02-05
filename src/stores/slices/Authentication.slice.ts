import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationState } from '@/stores/sliceTypes/Authentication.type';
import { useAppSelector } from '@/stores/store.hooks';

export const initialAuthenticationState: AuthenticationState = {};

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: initialAuthenticationState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthenticationState>) => {
      state = action.payload;
    },
  },
});

export const authenticationSelector = () => useAppSelector((store) => store.authentication);

export const { setAuthentication } = authenticationSlice.actions;

export default authenticationSlice.reducer;
