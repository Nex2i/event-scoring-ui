import { FC } from 'react';
import { Routes } from 'react-router-dom';
import * as Styled from './auth.styles';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <Styled.AuthOutletContainer>
      <Routes>{children}</Routes>
    </Styled.AuthOutletContainer>
  );
};
