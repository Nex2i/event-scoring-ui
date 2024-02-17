import { FormControl, NativeSelect } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface BasicFilledSelectProps {
  value: string;
  onValueChange: (updatedValue: string) => void;
  options: { value: string | number; displayName?: string }[];
}

export const BasicFilledSelect: FC<BasicFilledSelectProps> = ({
  value,
  onValueChange,
  options,
}) => {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <NativeSelect
        inputProps={{
          name: 'score',
          id: 'uncontrolled-native',
        }}
        value={value}
        onChange={onChange}
        fullWidth
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.value ? option.value : '-'}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
