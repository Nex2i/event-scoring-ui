import { FC } from 'react';
import * as Styled from './auth.styles';

interface LoginButtonProps {
  onClick: () => void;
  text: string;
}

export const AuthButton: FC<LoginButtonProps> = ({ onClick, text }) => {
  return <Styled.LoginButton onClick={onClick}>{text}</Styled.LoginButton>;
};
