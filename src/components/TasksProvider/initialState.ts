import { ITask } from '../../types/task.types';
import { ITasksFilter } from './ITasksFilter';

export interface ITasksState {
  tasks: ITask[];
  filter: ITasksFilter;
  loading: boolean;
};

export const initialState: ITasksState = {
  tasks: [],
  filter: {},
  loading: false
};
