import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthenticationState } from '@/stores/sliceTypes/Authentication.type';
import { authenticationSelector, removeAuthentication } from '@/stores/slices/Authentication.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { ApiContext } from '@/apis/api.context';

type hookResponse = { user: IAuthenticationState; error: any; isAuthenticated: boolean; logout: () => Promise<void> };
export function useAuth(): hookResponse {
  const navigate = useNavigate();
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const authSlice = authenticationSelector();
  const [isAuthenticated, setIsAuthenticated] = useState(() => isAuthValid(authSlice.token));

  useEffect(() => {
    setIsAuthenticated(isAuthValid(authSlice.token));
  }, [authSlice]);

  async function logout(): Promise<void> {
    apis.authentication.logout().finally(() => {
      setIsAuthenticated(false);
      dispatch(removeAuthentication());
      navigate('/');
    });
  }

  return { user: authSlice, error: {}, isAuthenticated, logout };
}

function isAuthValid(jwt: string): boolean {
  return !!jwt;
}

export function isUserModelLocal(user: IAuthenticationState): boolean {
  return !!user.token && !!user.picture && !!user.email;
}
