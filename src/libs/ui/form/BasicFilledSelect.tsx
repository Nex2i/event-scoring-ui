import { FormControl, NativeSelect } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface BasicFilledSelectProps {
  value: string | null;
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
        value={value ? value : '0'}
        onChange={onChange}
        fullWidth
      >
        {options.map((option, i) => (
          <option value={option.value ? option.value : '0'} key={i}>
            {option.value ? option.value : '-'}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
