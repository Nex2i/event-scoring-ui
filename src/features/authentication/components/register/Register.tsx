import { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import { FormFilledInput, FormFilledSelect } from '@/libs/forms/formFilledComponents';
import { useRegister } from '@/hooks/authentication/useRegister.hook';
import { getStateValueMap } from '@/types/location/States';
import { useAuth } from '@/hooks/authentication/useAuth.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { RegisterUserPayload } from '@/apis/authentication/RegisterUserPayload';
import * as Styled from '../auth.styles';
import { registerFormFields, useRegisterForm } from './registerForm';

const stateOptions = getStateValueMap();

interface RegisterComponentProps {}

export const RegisterComponent: FC<RegisterComponentProps> = ({}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [formValues, setFormValues] = useState<RegisterUserPayload>(new RegisterUserPayload());

  const { handleSubmit, control } = useRegisterForm({
    username: '',
    password: '',
  });

  const [_, isAuthorizing] = useRegister(formValues);

  const handleValidForm = (formData: FieldValues) => {
    const formInfo = registerFormFields.createEditSaveRequest(formData);
    setFormValues(formInfo);
  };

  const handleInvalidForm = (_formData: FieldValues) => {};

  const onSubmitForm = handleSubmit(handleValidForm, handleInvalidForm);

  const redirectToLogin = () => {
    navigate(authRoutes.login);
  };

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div>
      <Styled.BaseForm onSubmit={onSubmitForm}>
        <Styled.FormTitle>Register</Styled.FormTitle>
        {currentPage === 0 && (
          <>
            <FormFilledInput fieldMapping={registerFormFields.email} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.phoneNumber} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.password} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.confirmPassword} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.firstName} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.lastName} control={control} />
          </>
        )}
        {currentPage === 1 && (
          <>
            <FormFilledInput fieldMapping={registerFormFields.companyName} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.streetAddress1} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.streetAddress2} control={control} />
            <FormFilledInput fieldMapping={registerFormFields.city} control={control} />
            <FormFilledSelect
              options={stateOptions}
              fieldMapping={registerFormFields.state}
              control={control}
            />
            <FormFilledInput fieldMapping={registerFormFields.zipCode} control={control} />
          </>
        )}
        {isAuthorizing ? <LoadingComponent animateOnly={true} /> : null}
        {currentPage === 1 && (
          <Button onClick={onSubmitForm} data-cy="login-btn">
            Register Company
          </Button>
        )}
        {currentPage !== 1 && (
          <Button onClick={nextPage} data-cy="login-btn">
            Next
          </Button>
        )}
        {currentPage !== 0 ? (
          <Button color="secondary" onClick={previousPage} data-cy="register-btn">
            Back
          </Button>
        ) : (
          <Button color="secondary" onClick={redirectToLogin} data-cy="register-btn">
            Back To Login
          </Button>
        )}
      </Styled.BaseForm>
    </div>
  );
};
