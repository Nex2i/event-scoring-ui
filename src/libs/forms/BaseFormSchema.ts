import { ZodObject, z } from 'zod';
import { FormFieldMapping } from './formMapping';

export class BaseFormSchema {}

export function getSchemaFromClass<T extends BaseFormSchema>(formSchema: T): ZodObject<any> {
  const schemaObject: any = {};

  for (const key in formSchema) {
    const field = (formSchema as any)[key] as FormFieldMapping;
    if (field && field.validationSchema) {
      schemaObject[key] = field.validationSchema;
    }
  }

  return z.object(schemaObject);
}
