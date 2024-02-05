import { Control, Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import * as Styled from '../form.styles';
import { CheckBoxToValueTransformer, ValueToCheckBoxTransformer } from './FormFilledCheckBoxTransformers';

interface FormFilledCheckboxProps<T> {
  name: string;
  control: Control;
  checkBoxToValueTransformer: CheckBoxToValueTransformer<T>;
  valueToCheckBoxTransformer: ValueToCheckBoxTransformer<T>;
  initialValue: T | boolean;
  label?: string;
  disabled?: boolean;
}

export const FormFilledCheckbox = <T,>({
  name,
  control,
  checkBoxToValueTransformer,
  valueToCheckBoxTransformer,
  label,
  initialValue,
  disabled,
}: FormFilledCheckboxProps<T>) => {
  return (
    <FormControl data-e2e={`${name}-checkbox-form-control`}>
      <Controller
        name={name}
        control={control}
        defaultValue={ConvertBoolToInt(initialValue)}
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  id={'e2e-' + name}
                  data-e2e={`${name}-checkbox`}
                  onChange={(event) => onChange(checkBoxToValueTransformer(event.target.checked))}
                  checked={valueToCheckBoxTransformer(value)}
                  disabled={disabled}
                />
              }
              label={label ?? ''}
            />

            <Styled.ErrorFormHelperText data-e2e={`${name}-form-select-input-error`}>
              {fieldState.error?.message}
            </Styled.ErrorFormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

function ConvertBoolToInt(val: any) {
  return val ? 1 : 0;
}
