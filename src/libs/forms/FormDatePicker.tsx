import { FC } from 'react';

import dayjs from 'dayjs';
import { FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Control, Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import * as Styled from './formFilledComponents/form.styles';

import { FormFieldMapping } from './formMapping';

interface FormDatePickerProps {
  fieldMapping: FormFieldMapping;
  control: Control;
  initialValue?: string;
  disabled?: boolean;
}

export const FormDatePicker: FC<FormDatePickerProps> = ({
  fieldMapping,
  control,
  initialValue,
  disabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl className="form-filled-input-control" variant="filled">
        <Controller
          name={fieldMapping.name}
          control={control}
          defaultValue={initialValue ?? ''}
          render={({ field: { onChange, value }, fieldState }) => (
            <>
              <DesktopDatePicker
                defaultValue={dayjs(initialValue)}
                label={fieldMapping.label}
                value={value}
                onChange={(newValue) => {
                  onChange(newValue ? new Date(newValue) : null);
                }}
                disabled={disabled}
              />
              {fieldState.error && (
                <Styled.ErrorFormHelperText id={'e2e-error-' + name}>
                  {fieldState.error.message}
                </Styled.ErrorFormHelperText>
              )}
            </>
          )}
        />
      </FormControl>
    </LocalizationProvider>
  );
};
