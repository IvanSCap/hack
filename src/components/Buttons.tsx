import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, Badge } from '@mui/material';
import { TasksContext } from './TasksProvider';
import { ITasksFilter } from './TasksProvider/ITasksFilter';

export const Buttons = () => {
  const { tasks, fetchTasks } = useContext(TasksContext);
  const { t } = useTranslation();

  const badge = {
    total: tasks.length,
    isDone: tasks.filter((task) => task.isDone).length,
    inProgress: tasks.filter((task) => !task.isDone).length
  };

  const handleToggleFilter = (isDone: ITasksFilter['isDone']) => () => {
    fetchTasks({
      isDone
    });
  };

  return (
    <ButtonGroup fullWidth >
      <Badge
        showZero
        badgeContent={badge.total}
        color="secondary"
        sx={{ flexGrow: 1 }}
      >
        <Button
          sx={{ marginRight: 1 }}
          variant={badge.total ? 'contained' : 'outlined'}
          onClick={handleToggleFilter(null)}
        >
          {t('statuses.all')}
        </Button>
      </Badge>
  
      <Badge
        showZero
        badgeContent={badge.isDone}
        color="success"
        sx={{ flexGrow: 1 }}
      >
        <Button
          sx={{ marginRight: 1 }}
          variant={badge.isDone ? 'contained' : 'outlined'}
          onClick={handleToggleFilter(true)}
        >
          {t('statuses.done')}
        </Button>
      </Badge>
  
      <Badge
        showZero
        badgeContent={badge.inProgress}
        color="warning"
        sx={{ flexGrow: 1 }}
      >
        <Button
          variant={badge.inProgress ? 'contained' : 'outlined'}
          onClick={handleToggleFilter(false)}
        >
          {t('statuses.progress')}
        </Button>
      </Badge>
    </ButtonGroup>
  );
};  
