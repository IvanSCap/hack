import { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import {
  List as MuiList,
  Typography,
  CircularProgress,
  Paper
} from '@mui/material';
import { ITask } from '../../../types/task.types';
import { scrollBarStyling } from '../../../themes/themes';
import { TasksContext } from '../../../components/TasksProvider';
import { Task } from './Task/Task';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    height: '60vh',
    padding: theme.spacing(1.5),
    ...scrollBarStyling
  },
  search: {
    textAlign: 'center'
  }
}));

export const List = () => {
  const classes = useStyles();
  const { tasks, loading } = useContext(TasksContext);

  return (
    <Paper className={classes.container}>
      <MuiList dense>
        {loading && (
          <CircularProgress
            size={36}
            style={{ marginLeft: '50%', marginTop: 12 }}
          />
        )}

        {!tasks.length ? (
          <Typography align="center">No users found</Typography>
        ) : tasks.map((task: ITask) => (
          <Task key={task.id} task={task} />
        ))}
      </MuiList>
    </Paper>
  );
};
