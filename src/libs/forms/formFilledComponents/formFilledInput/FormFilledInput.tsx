import { FC } from 'react';
import { FormControl, InputLabel, FilledInput, FilledInputProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import * as Styled from '../form.styles';
import { CustomMaskDefinition } from '../../customMask/customMaskDefinition';
import { FormFieldMapping } from '../../formMapping';
import CustomMask from '../../customMask/CustomMask';
import { replaceDotsWithHyphens } from '../../_shared/format';

export interface FormFilledInputProps extends FilledInputProps {
  fieldMapping: FormFieldMapping;
  control: Control;
  initialValue?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

const defaultMask: CustomMaskDefinition = {
  mask: String,
  definitions: {},
};

export const FormFilledInput: FC<FormFilledInputProps> = ({
  fieldMapping,
  control,
  initialValue,
  type,
  disabled,
  required,
  sx,
  rows,
}) => {
  const { name, label, tooltip } = fieldMapping;

  console.log('rows', rows);

  return (
    <Styled.FormFilledInputContainer>
      <FormControl className="form-filled-input-control" variant="filled">
        <Controller
          name={name}
          control={control}
          defaultValue={initialValue ?? ''}
          render={({ field: { onChange, value }, fieldState }) => (
            <>
              {label && (
                <InputLabel htmlFor={name}>
                  {label}
                  {required && '*'}
                </InputLabel>
              )}
              <FilledInput
                sx={sx}
                disabled={disabled}
                value={value}
                error={!!fieldState.error}
                inputComponent={CustomMask as any}
                type={type}
                inputProps={{
                  ...(fieldMapping.customMaskDefinition ?? defaultMask),
                  onChange,
                }}
                rows={rows}
                multiline={rows ? true : false}
                id={'e2e-' + replaceDotsWithHyphens(name)}
                endAdornment={
                  tooltip && (
                    <Styled.HelpToolTip title={tooltip} placement={'bottom-end'} arrow>
                      <Styled.HelpAdornment />
                    </Styled.HelpToolTip>
                  )
                }
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
    </Styled.FormFilledInputContainer>
  );
};
