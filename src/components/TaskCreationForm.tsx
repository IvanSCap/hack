import { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { preventDefault } from '../helpers';
import { Yup } from '../utils/validation';
import { TasksContext } from './TasksProvider';
import { TextField } from './TextField';
import { DateTimePicker } from './DateTimePicker';
import { TaskPrioritiesSelect } from '../modules/tasks/TaskPrioritiesSelect';
import { Priority } from '../modules/tasks/TaskPrioritiesSelect/Priority.enum';

interface Props {
  onSubmited: () => void;
};

interface FormValues {
  name: string | null,
  description: string | null,
  isDone: boolean,
  time: string | null,
  priority: Priority | null
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3)
  }
}));

const defaultValues = {
  name: null,
  description: null,
  isDone: false,
  time: null,
  priority: null
};

export const schema = Yup.object({
  name: Yup.string().nullable().required(),
  description: Yup.string().nullable(),
  isDone: Yup.boolean().nullable(),
  time: Yup.mixed().nullable(),
  priority: Yup.mixed().nullable()
});

export const TaskCreationForm = ({ onSubmited }: Props) => {
  const classes = useStyles();
  const { addTask } = useContext(TasksContext);
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleSubmit = (values: FormValues) => {
    addTask(values);
    onSubmited();
  };

  return (
    <FormProvider {...form}>
      <Grid
        noValidate
        container
        spacing={2}
        alignItems="center"
        direction="column"
        component="form"
        className={classes.container}
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <Grid item xs>
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            margin="dense"
            placeholder="Enter task name..."
            variant="outlined"
          />

          <TextField
            fullWidth
            multiline
            name="description"
            label="Description"
            margin="dense"
            maxRows={4}
            placeholder="Enter description..."
          />

          <DateTimePicker
            fullWidth
            name="time"
            label="Due date"
            margin="dense"
            placeholder="Enter due date..."
            variant="outlined"
          />

          <TaskPrioritiesSelect
            name="priority"
            margin="dense"
            variant="outlined"
            label="Priority"
          />
        </Grid>

        <Grid item>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
