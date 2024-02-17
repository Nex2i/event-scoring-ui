import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import {
  NewEventFormSchema,
  newEventFormFields,
  useNewEventForm,
} from '@/hooks/event/newEventForm';
import { FormFilledInput } from '@/libs/forms/formFilledComponents';
import { FormDatePicker } from '@/libs/forms/FormDatePicker';
import { NumberInputForm } from '@/libs/forms/NumberInputForm';
import { useNewEventHook } from '@/hooks/event/useNewEvent.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import * as Styled from '../event.styles';

interface NewEventDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const NewEventDialog: FC<NewEventDialogProps> = ({ isOpen, handleClose }) => {
  const [formValues, setFormValues] = useState<NewEventFormSchema>();

  const { isFetching } = useNewEventHook({ event: formValues });

  const onDialogClose = (_event: unknown, reason: string) => {
    if (reason !== 'escapeKeyDown' && reason !== 'backdropClick' && !isFetching) {
      handleClose();
    }
  };

  const { handleSubmit, control } = useNewEventForm();

  const handleValidForm = (formData: FieldValues) => {
    const formInfo = newEventFormFields.createEditSaveRequest(formData);
    setFormValues(formInfo);
  };

  const handleInvalidForm = (formData: FieldValues) => {
    const formInfo = newEventFormFields.createEditSaveRequest(formData);
    console.log('invalid form', formData, newEventFormFields, control, formInfo);
  };

  const onSubmitForm = handleSubmit(handleValidForm, handleInvalidForm);

  return (
    <Dialog open={isOpen} onClose={onDialogClose}>
      <DialogTitle>New Event</DialogTitle>
      <DialogContent>
        <Styled.BaseForm onSubmit={onSubmitForm}>
          <FormFilledInput fieldMapping={newEventFormFields.eventName} control={control} />
          <FormFilledInput fieldMapping={newEventFormFields.courseName} control={control} />
          <Styled.Row>
            <FormDatePicker fieldMapping={newEventFormFields.startDate} control={control} />
            <FormDatePicker fieldMapping={newEventFormFields.endDate} control={control} />
          </Styled.Row>
          <Styled.Row>
            <NumberInputForm fieldMapping={newEventFormFields.numberOfTargets} control={control} />
            <NumberInputForm
              fieldMapping={newEventFormFields.numberOfShotsPerTarget}
              control={control}
            />
          </Styled.Row>
        </Styled.BaseForm>
      </DialogContent>
      {isFetching ? (
        <LoadingComponent animateOnly={true} />
      ) : (
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={onSubmitForm}>Create</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
