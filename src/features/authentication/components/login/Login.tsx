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
  const [formValues, setFormValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const { isAuthorizing, isAuthorized } = useLogin(formValues.email, formValues.password);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthorized || isAuthenticated) {
      navigate(homeRoute);
    }
  }, [isAuthorized, isAuthenticated]);

  const { handleSubmit, control } = useLoginForm({
    email: '',
    password: '',
  });

  const redirectToRegister = () => {
    navigate(authRoutes.register);
  };

  const handleValidForm = (formData: FieldValues) => {
    const formInfo = loginFormFields.createEditSaveRequest(formData);
    setFormValues(formInfo);
  };

  const handleInvalidForm = (_formData: FieldValues) => {};
  const onSubmitForm = handleSubmit(handleValidForm, handleInvalidForm);

  return (
    <div>
      <Styled.BaseForm onSubmit={onSubmitForm}>
        <Styled.FormTitle>Sign In</Styled.FormTitle>
        <FormFilledInput fieldMapping={loginFormFields.email} control={control} />
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
