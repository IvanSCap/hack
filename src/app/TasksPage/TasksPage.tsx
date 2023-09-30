import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { List } from './List/List';
import { TasksProvider } from '../../components/TasksProvider';
import { Search } from '../../components/Search';

const useStyles = makeStyles(() => ({
  listContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export const TasksPage = () => {
  const classes = useStyles();

  return (
    <TasksProvider>
      <Box className={classes.listContainer}>
        <div>
          <Search />
        </div>
        <List />
      </Box>
    </TasksProvider>
  );
};
