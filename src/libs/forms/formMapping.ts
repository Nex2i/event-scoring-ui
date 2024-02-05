import { ZodTypeAny } from 'zod';
import { CustomMaskDefinition } from './customMask/customMaskDefinition';

export interface FormFieldMapping {
  name: string;
  label: string;
  tooltip?: string;
  initialValue?: string | number | boolean;
  validationSchema: ZodTypeAny;
  customMaskDefinition?: CustomMaskDefinition;
}
