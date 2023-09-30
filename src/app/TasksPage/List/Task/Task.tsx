import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Checkbox,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { ITask } from '../../../../types/task.types';
import * as tasksApi from '../../../../api/tasks';
import { TasksContext } from '../../../../components/TasksProvider';
interface Props {
  task: ITask;
}

export const Task = ({ task }: Props) => {

  return (
    <ListItem sx={{fontSize: "22px"}}>
      <ListItemText
        primary={task.name}
        secondary={ task.userId}
      />
    </ListItem>
  );
};
