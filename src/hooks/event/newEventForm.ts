import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormSchema, getSchemaFromClass } from '@/libs/forms/BaseFormSchema';
import { FormFieldMapping } from '@/libs/forms/formMapping';

class newEventFormMapping extends BaseFormSchema {
  eventName: FormFieldMapping = {
    name: 'eventName',
    label: 'Event Name',
    tooltip: 'Event Name',
    validationSchema: z.string().min(1).max(50),
  };
  startDate: FormFieldMapping = {
    name: 'startDate',
    label: 'Start Date',
    tooltip: 'Start Date',
    validationSchema: z.date(),
  };

  endDate: FormFieldMapping = {
    name: 'endDate',
    label: 'End Date',
    tooltip: 'End Date',
    validationSchema: z.date(),
  };

  courseName: FormFieldMapping = {
    name: 'courseName',
    label: 'Course Name',
    tooltip: 'Course Name',
    validationSchema: z.string().min(1).max(50),
  };

  numberOfTargets: FormFieldMapping = {
    name: 'numberOfTargets',
    label: 'Number of Targets',
    tooltip: 'Number of Targets',
    validationSchema: z.number().int().positive(),
  };

  numberOfShotsPerTarget: FormFieldMapping = {
    name: 'numberOfShotsPerTarget',
    label: 'Number of Shots Per Target',
    tooltip: 'Number of Shots Per Target',
    validationSchema: z.number().int().positive(),
  };

  public createEditSaveRequest(formData: NewEventFormSchema) {
    return {
      eventName: formData.eventName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      courseName: formData.courseName,
      numberOfTargets: formData.numberOfTargets,
      numberOfShotsPerTarget: formData.numberOfShotsPerTarget,
    };
  }
}

export const newEventFormFields = new newEventFormMapping();

const schema = getSchemaFromClass(newEventFormFields);

export type NewEventFormSchema = z.infer<typeof schema>;

export function useNewEventForm() {
  const newEventForm = useForm<NewEventFormSchema>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  return newEventForm;
}
