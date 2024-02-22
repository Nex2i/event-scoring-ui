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
    validationSchema: z.string(),
  };

  companyName: FormFieldMapping = {
    name: 'companyName',
    label: 'Company Name',
    validationSchema: z.string().min(1),
  };

  password: FormFieldMapping = {
    name: 'password',
    label: 'Password',
    validationSchema: z
      .string()
      .min(1)
      .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .regex(/(.*[0-9].*[0-9].*)/, 'Password must contain at least two numbers'),
  };

  confirmPassword: FormFieldMapping = {
    name: 'confirmPassword',
    label: 'Confirm Password',
    validationSchema: z.string().min(1),
  };

  firstName: FormFieldMapping = {
    name: 'firstName',
    label: 'First Name',
    validationSchema: z.string().min(1),
  };

  lastName: FormFieldMapping = {
    name: 'lastName',
    label: 'Last Name',
    validationSchema: z.string().min(1),
  };

  email: FormFieldMapping = {
    name: 'email',
    label: 'Email',
    validationSchema: z.string().email().min(1),
  };

  phoneNumber: FormFieldMapping = {
    name: 'phoneNumber',
    label: 'Phone Number',
    validationSchema: z.string().min(1),
  };

  streetAddress1: FormFieldMapping = {
    name: 'streetAddress1',
    label: 'Street Address 1',
    validationSchema: z.string().min(1),
  };

  streetAddress2: FormFieldMapping = {
    name: 'streetAddress2',
    label: 'Street Address 2',
    validationSchema: z.string().default(''),
  };

  city: FormFieldMapping = {
    name: 'city',
    label: 'City',
    validationSchema: z.string().min(1),
  };

  state: FormFieldMapping = {
    name: 'state',
    label: 'State',
    validationSchema: z.string().min(1),
  };

  zipCode: FormFieldMapping = {
    name: 'zipCode',
    label: 'Zip Code',
    validationSchema: z.string().min(1),
  };

  public createEditSaveRequest(formData: RegisterFormSchema): RegisterUserPayload {
    return new RegisterUserPayload({
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
    });
  }
}

export const registerFormFields = new registerFormMapping();

const schema = getSchemaFromClass(registerFormFields).refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  }
);

export type RegisterFormSchema = z.infer<typeof schema>;

export function useRegisterForm(defaultValues: RegisterFormSchema) {
  const registerForm = useForm<RegisterFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  return registerForm;
}
