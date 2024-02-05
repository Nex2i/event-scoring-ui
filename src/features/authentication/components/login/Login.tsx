import { Button } from '@mui/material';
import { FC, useState, useEffect } from 'react';

import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormFilledInput } from '@/libs/forms/formFilledComponents';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { useLogin } from '@/hooks/authentication/useLogin.hook';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import { useAuth } from '@/hooks/authentication/useAuth.hook';
import * as Styled from '../auth.styles';
import { loginFormFields, useLoginForm } from './loginForm';

interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<{ username: string; password: string }>({ username: '', password: '' });
  const [_, isAuthorizing, isAuthorized] = useLogin(formValues.username, formValues.password);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthorized || isAuthenticated) {
      navigate(homeRoute);
    }
  }, [isAuthorized, isAuthenticated]);

  const { handleSubmit, control } = useLoginForm({
    username: '',
    password: '',
  });

  // Will implement with Google
  // eslint-disable-next-line
  const google = () => {
    window.open('http://localhost:8085/api/auth/v1/open/passport/google', '_self');
  };

  const redirectToRegister = () => {
    navigate(authRoutes.register);
  };

  const handleValidForm = (formData: FieldValues) => {
    const formInfo = loginFormFields.createEditSaveRequest(formData);
    setFormValues(formInfo);
  };

  const handleInvalidForm = (formData: FieldValues) => {
    console.log('invalid form', formData);
  };
  const onSubmitForm = handleSubmit(handleValidForm, handleInvalidForm);

  return (
    <div>
      <Styled.BaseForm onSubmit={onSubmitForm}>
        <Styled.FormTitle>Sign In</Styled.FormTitle>
        <FormFilledInput fieldMapping={loginFormFields.username} control={control} />
        <FormFilledInput fieldMapping={loginFormFields.password} control={control} />
        {isAuthorizing && <LoadingComponent animateOnly={true} />}
        <Button onClick={onSubmitForm} data-cy="login-btn">
          Login
        </Button>
        <Button color="secondary" onClick={redirectToRegister} data-cy="register-btn">
          Register
        </Button>
      </Styled.BaseForm>
    </div>
  );
};
