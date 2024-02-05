import { FC, useRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import * as Styled from '../form.styles';
import { FormFieldMapping } from '../../formMapping';
import { replaceDotsWithHyphens } from '../../_shared/format';

export interface FormFilledSelectValueMapping {
  value: string | number;
  displayName?: string;
}

interface FormFilledSelectComponentProps {
  fieldMapping: FormFieldMapping;
  control: Control;
  options: FormFilledSelectValueMapping[];
  initialValue?: string | number | boolean;
  defaultMenuItem?: boolean;
}

export const FormFilledSelect: FC<FormFilledSelectComponentProps> = ({
  fieldMapping,
  control,
  options,
  initialValue = '',
  defaultMenuItem = true,
}) => {
  const selectRef = useRef();
  const { name, label } = fieldMapping;

  return (
    <Styled.FormFilledSelectContainer>
      <FormControl className="form-filled-select-control" variant="filled">
        <Controller
          name={name}
          control={control}
          defaultValue={initialValue}
          render={({ field: { onChange, value }, fieldState }) => {
            const onClose = () => {};
            return (
              <>
                {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
                <Select
                  ref={selectRef}
                  variant="filled"
                  id={'e2e-' + replaceDotsWithHyphens(name)}
                  onChange={onChange}
                  onClose={onClose}
                  value={value}
                  error={!!fieldState.error}
                >
                  {defaultMenuItem && (
                    <MenuItem disabled value="">
                      Select an option
                    </MenuItem>
                  )}
                  {options.map((option) => (
                    <MenuItem value={option.value} key={option.value} id={'e2e-' + option.value}>
                      {option.displayName ?? option.value}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <Styled.ErrorFormHelperText id={'e2e-error-' + name}>
                    {fieldState.error.message}
                  </Styled.ErrorFormHelperText>
                )}
              </>
            );
          }}
        />
      </FormControl>
    </Styled.FormFilledSelectContainer>
  );
};
