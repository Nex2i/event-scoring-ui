import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormSchema, getSchemaFromClass } from '@/libs/forms/BaseFormSchema';
import { FormFieldMapping } from '@/libs/forms/formMapping';

class CreateLogFormMapping extends BaseFormSchema {
  projectId: FormFieldMapping = {
    name: 'projectId',
    label: 'Project',
    tooltip: 'Which project do you want to assign this log to?',
    validationSchema: z.string().min(1),
  };

  section: FormFieldMapping = {
    name: 'section',
    label: 'Section',
    tooltip: 'Which section does this log belong to?',
    validationSchema: z.string().min(1),
  };

  title: FormFieldMapping = {
    name: 'title',
    label: 'Title',
    validationSchema: z.string().min(1),
  };

  description: FormFieldMapping = {
    name: 'description',
    label: 'Description',
    validationSchema: z.string().min(1),
  };

  public createEditSaveRequest(formData: CreateLogFormSchema) {
    return {
      name: formData.name,
    };
  }
}

export const createLogFormFields = new CreateLogFormMapping();

const schema = getSchemaFromClass(createLogFormFields);

export type CreateLogFormSchema = z.infer<typeof schema>;

export function useCreateLogForm(defaultValues: CreateLogFormSchema) {
  const createLogForm = useForm<CreateLogFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  return createLogForm;
}
