import { useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import { makeStyles } from '@mui/styles';
import { InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TasksContext } from './TasksProvider';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1.5, 0, 3, 0)
  },
  inputSearch: {
    minWidth: 500
  }
}));

export const Search = () => {
  const { fetchTasks } = useContext(TasksContext);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleTaskSearch = useCallback(debounce(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    fetchTasks({
      name_like: value
    });
  }, 500), []);

  return (
    <div className={classes.container}>
      <OutlinedInput
        color="primary"
        size="small"
        className={classes.inputSearch}
        placeholder={t('search.placeholder')}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon color="secondary"/>
          </InputAdornment>
        }
        onChange={handleTaskSearch}
      />
    </div>
  );
};
