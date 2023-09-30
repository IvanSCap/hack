import { Controller, useFormContext } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers';
import { TextField } from './TextField';

type Props = TextFieldProps & {
  name: string;
};

export const DateTimePicker = ({ name, margin, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref, ...field }, 
        fieldState: { error } }) => (
        // @ts-ignore
        <MuiDateTimePicker
          disablePast
          renderInput={(params) => <TextField 
            name={name} margin={margin} {...params} />}
          error={!!error}
          helperText={error?.message}
          inputRef={ref}
          // @ts-ignore
          onChange={(value) =>
            onChange(value)
          }

          {...field}
          {...props}
        />
      )}
    />
  );
};
