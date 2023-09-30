import { ITask } from '../../types/task.types';

export interface ITasksFilter {
  name_like?: ITask['name'];
  isDone?: ITask['isDone'];
  userId?: ITask['userId'];
};
