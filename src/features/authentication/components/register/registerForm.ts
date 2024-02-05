import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormSchema, getSchemaFromClass } from '@/libs/forms/BaseFormSchema';
import { FormFieldMapping } from '@/libs/forms/formMapping';
import { RegisterUserPayload } from '@/apis/authentication/RegisterUserPayload';

class registerFormMapping extends BaseFormSchema {
  username: FormFieldMapping = {
    name: 'username',
    label: 'Username',
    tooltip: 'Insert Username please',
    validationSchema: z.string().min(1),
  };

  password: FormFieldMapping = {
    name: 'password',
    label: 'Password',
    tooltip: 'Password',
    validationSchema: z.string().min(1),
  };

  confirmPassword: FormFieldMapping = {
    name: 'confirmPassword',
    label: 'Confirm Password',
    tooltip: 'Confirm Password',
    validationSchema: z.string().min(1),
  };

  firstName: FormFieldMapping = {
    name: 'firstName',
    label: 'First Name',
    tooltip: 'First Name',
    validationSchema: z.string().min(1),
  };

  lastName: FormFieldMapping = {
    name: 'lastName',
    label: 'Last Name',
    tooltip: 'Last Name',
    validationSchema: z.string().min(1),
  };

  email: FormFieldMapping = {
    name: 'email',
    label: 'Email',
    tooltip: 'Email',
    validationSchema: z.string().min(1),
  };

  picture: FormFieldMapping = {
    name: 'picture',
    label: 'Picture',
    tooltip: 'Picture',
    validationSchema: z.string().default(''),
  };

  phoneNumber: FormFieldMapping = {
    name: 'phoneNumber',
    label: 'Phone Number',
    tooltip: 'Phone Number',
    validationSchema: z.string().min(1),
  };

  streetAddress1: FormFieldMapping = {
    name: 'streetAddress1',
    label: 'Street Address 1',
    tooltip: 'Street Address 1',
    validationSchema: z.string().min(1),
  };

  streetAddress2: FormFieldMapping = {
    name: 'streetAddress2',
    label: 'Street Address 2',
    tooltip: 'Street Address 2',
    validationSchema: z.string().default(''),
  };

  city: FormFieldMapping = {
    name: 'city',
    label: 'City',
    tooltip: 'City',
    validationSchema: z.string().min(1),
  };

  state: FormFieldMapping = {
    name: 'state',
    label: 'State',
    tooltip: 'State',
    validationSchema: z.string().min(1),
  };

  zipCode: FormFieldMapping = {
    name: 'zipCode',
    label: 'Zip Code',
    tooltip: 'Zip Code',
    validationSchema: z.string().min(1),
  };

  public createEditSaveRequest(formData: RegisterFormSchema): RegisterUserPayload {
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      picture: formData.picture,
      strategyId: formData.email,
      phoneNumber: formData.phoneNumber,
      streetAddress1: formData.streetAddress1,
      streetAddress2: formData.streetAddress2,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      userName: formData.username,
      password: formData.password,
    };
  }
}

export const registerFormFields = new registerFormMapping();

const schema = getSchemaFromClass(registerFormFields).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords does not match',
});

export type RegisterFormSchema = z.infer<typeof schema>;

export function useRegisterForm(defaultValues: RegisterFormSchema) {
  const registerForm = useForm<RegisterFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  return registerForm;
}
