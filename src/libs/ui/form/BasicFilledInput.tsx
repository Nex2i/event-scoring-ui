import { FC } from 'react';
import { FilledInputProps, TextField } from '@mui/material';

interface BasicFilledInput extends FilledInputProps {
  value: string;
  onValueChange: (updatedValue: string) => void;
  initialValue?: string;
  type?: string;
  disabled?: boolean;
  rows?: number;
  tooltip?: string;
}

export const BasicFilledInput: FC<BasicFilledInput> = ({
  value,
  onValueChange,
  initialValue,
  type,
  disabled,
  sx,
  rows,
}) => {
  const handleInputChange = (newValue: string) => {
    onValueChange(newValue);
  };

  return (
    <TextField
      sx={sx}
      disabled={disabled}
      value={value}
      type={type}
      rows={rows}
      multiline={rows ? true : false}
      onChange={(e) => handleInputChange(e.target.value)}
      label={initialValue ?? ''}
      // variant="outlined"
      size="small"
      fullWidth
    />
  );
};
