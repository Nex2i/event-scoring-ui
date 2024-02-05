import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormSchema, getSchemaFromClass } from '@/libs/forms/BaseFormSchema';
import { FormFieldMapping } from '@/libs/forms/formMapping';

class loginFormMapping extends BaseFormSchema {
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

  public createEditSaveRequest(formData: LoginFormSchema) {
    return {
      username: formData.username,
      password: formData.password,
    };
  }
}

export const loginFormFields = new loginFormMapping();

const schema = getSchemaFromClass(loginFormFields);

export type LoginFormSchema = z.infer<typeof schema>;

export function useLoginForm(defaultValues: LoginFormSchema) {
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  return loginForm;
}
