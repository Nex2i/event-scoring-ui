import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { FormFieldMapping } from './formMapping';
import * as Styled from './formFilledComponents/form.styles';

interface NumberInputFormProps {
  fieldMapping: FormFieldMapping;
  control: Control;
  initialValue?: string;
  disabled?: boolean;
}

export const NumberInputForm: FC<NumberInputFormProps> = ({
  fieldMapping,
  control,
  initialValue,
  disabled,
}) => {
  return (
    <FormControl className="form-filled-input-control" variant="filled">
      <Controller
        name={fieldMapping.name}
        control={control}
        defaultValue={initialValue ?? ''}
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <TextField
              variant="outlined"
              error={!!fieldState.error}
              label={fieldMapping.label}
              value={value}
              onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
              disabled={disabled}
              type="number"
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
  );
};
