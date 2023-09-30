import { FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import MuiTextField, { FormControlProps } from '@mui/material/FormControl';
import { ReactPropTypes } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { Select, SelectProps } from '../../../components/Select';
import { Priority } from './Priority.enum';

export const TaskPrioritiesSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <MenuItem value={Priority.High}>high</MenuItem>
      <MenuItem value={Priority.Medium}>medium</MenuItem>
      <MenuItem value={Priority.Low}>low</MenuItem>
    </Select>
  );
};

