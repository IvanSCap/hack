import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import { FormControlProps } from '@mui/material/FormControl';
import { InputLabelProps } from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import { useController, useFormContext } from 'react-hook-form';

export type SelectProps = FormControlProps & {
  name: string;
  label: InputLabelProps['children']
};

export const Select = ({ name, label, children, ...props }: SelectProps) => {
  // React Hook Form
  const formContext = useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fieldState, field } = (formContext && useController({
    name, control: formContext?.control
  })) || {};
  const errorMessage = fieldState?.error?.message;

  return (
    <FormControl
      fullWidth
      error={!!fieldState?.error}

      {...props}
    >
      <InputLabel id={name}>{label}</InputLabel>

      <MuiSelect
        {...field}
        
        label={label}
        name={name}
        labelId={name}
      >
        {children}
      </MuiSelect>

      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

